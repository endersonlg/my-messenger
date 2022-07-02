import { EntityRepository, Repository } from 'typeorm';
import { Message } from '../entities/Message';

@EntityRepository(Message)
export class MessagesRespositories extends Repository<Message> {}
