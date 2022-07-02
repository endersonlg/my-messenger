import { getCustomRepository } from 'typeorm';
import { Message } from '../entities/Message';
import { MessagesRespositories } from '../repositories/MessagesRepositories';

export interface IMessageRequest {
  user_receiver: string;
  user_sender: string;
  text: string;
}

export class CreateMessageService {
  async execute({
    user_receiver,
    user_sender,
    text,
  }: IMessageRequest): Promise<Message> {
    const messageRepository = getCustomRepository(MessagesRespositories);

    if (!user_sender || !user_receiver) {
      throw new Error('User sender/receiver required');
    }

    const message = messageRepository.create({
      user_sender,
      user_receiver,
      text,
    });

    await messageRepository.save(message);

    return message;
  }
}
