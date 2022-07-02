import { Request, Response } from 'express';
import { ListMessagesService } from '../services/ListMessageService';

export class ListMessagesController {
  async handle(request: Request, response: Response): Promise<Response | void> {
    const listMessagesService = new ListMessagesService();

    const { user_sender } = request.params;

    const userId = request.user_id;

    const messages = await listMessagesService.execute({
      user_receiver: userId,
      user_sender,
    });

    return response.status(200).json(messages);
  }
}
