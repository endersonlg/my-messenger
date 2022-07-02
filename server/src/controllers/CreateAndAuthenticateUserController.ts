import { Request, Response } from 'express';
import { AuthenticateUserService } from '../services/AuthenticateUserService';
import { CreateUserService } from '../services/CreateUserService';

export class CreateAndAuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response | void> {
    const { nickname, image } = request.body;

    const createUserService = new CreateUserService();
    const authenticateUserService = new AuthenticateUserService();

    const user = await createUserService.execute({
      nickname,
      image,
    });

    const token = await authenticateUserService.execute({
      nickname: user.nickname,
    });

    return response.status(201).json({
      user,
      token,
    });
  }
}
