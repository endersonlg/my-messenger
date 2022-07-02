import { Request, Response } from 'express';
import { AuthenticateUserService } from '../services/AuthenticateUserService';

export class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response | void> {
    const { nickname } = request.body;

    const authenticateUserService = new AuthenticateUserService();

    const token = await authenticateUserService.execute({ nickname });

    return response.status(200).json(token);
  }
}
