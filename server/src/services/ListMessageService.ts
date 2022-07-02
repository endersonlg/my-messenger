import { getCustomRepository, In } from 'typeorm';
import { Message } from '../entities/Message';
import { MessagesRespositories } from '../repositories/MessagesRepositories';

interface IListMessage {
  user_sender: string;
  user_receiver: string;
}

export class ListMessagesService {
  async execute({
    user_receiver,
    user_sender,
  }: IListMessage): Promise<Message[] | Error> {
    const messagesRepositories = getCustomRepository(MessagesRespositories);

    if (!user_sender || !user_receiver) {
      throw new Error('User sender/receiver required');
    }

    const messages = await messagesRepositories.find({
      where: {
        user_sender: In([user_sender, user_receiver]),
        user_receiver: In([user_sender, user_receiver]),
      },
    });

    return messages;
  }
}
