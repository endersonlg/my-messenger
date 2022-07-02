import { Request, Response } from 'express';
import { CreateMessageService } from '../services/CreateMessageService';

export class CreateMessageController {
  async handle(request: Request, response: Response): Promise<Response | void> {
    const { user_sender, text } = request.body;

    const userId = request.user_id;

    const createMessageService = new CreateMessageService();

    const message = await createMessageService.execute({
      user_receiver: userId,
      user_sender,
      text,
    });

    return response.status(201).json(message);
  }
}
