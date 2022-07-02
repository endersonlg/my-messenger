import { Request, Response } from 'express';
import { ListOtherUsersService } from '../services/ListOtherUsersService';

export class ListOtherUsersController {
  async handle(request: Request, response: Response): Promise<Response | void> {
    const listOtherUsersService = new ListOtherUsersService();

    const userId = request.user_id;

    const users = await listOtherUsersService.execute(userId);

    return response.status(200).json(users);
  }
}
