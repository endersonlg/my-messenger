import { Message } from './entities/Message';
import { User } from './entities/User';
import { io } from './http';
import { ensureAuthenticatedSocket } from './middlewares/ensureAuthenticatedSocket';
import { CreateMessageService } from './services/CreateMessageService';
import { ListUserById } from './services/ListUserByIdService';

interface IDataSendMessage {
  text: string;
  user_receiver: string;
}

interface ISocketUsers {
  socketId: string;
  user: User;
}

const listUserById = new ListUserById();
const createMessageService = new CreateMessageService();

const socketUsers: ISocketUsers[] = [];

io.use(ensureAuthenticatedSocket);

io.on('connection', async socket => {
  if (!socketUsers.some(socketUser => socketUser.user.id === socket.user_id)) {
    const user = await listUserById.execute(socket.user_id);
    if (user) {
      socketUsers.push({
        socketId: socket.id,
        user,
      });
    }
  }

  socket.on('disconnecting', () => {
    const indexUser = socketUsers.findIndex(
      socketUser => socketUser.user.id === socket.user_id,
    );

    socketUsers.splice(indexUser, 1);
  });

  socket.on<string>(
    'send message',
    async ({ user_receiver, text }: IDataSendMessage): Promise<void> => {
      const message = await createMessageService.execute({
        user_receiver,
        text,
        user_sender: socket.user_id,
      });

      const idUsersToSend = [socket.id];

      const socketUserReceiver = socketUsers.find(
        socketUser => socketUser.user.id === user_receiver,
      );

      if (socketUserReceiver) {
        idUsersToSend.push(socketUserReceiver.socketId);
      }

      const socketUserSender = socketUsers.find(
        socketUser => socketUser.user.id === socket.user_id,
      );

      io.to(idUsersToSend).emit('chat', {
        ...message,
        userSender: socketUserSender?.user,
      } as Message);
    },
  );
});
