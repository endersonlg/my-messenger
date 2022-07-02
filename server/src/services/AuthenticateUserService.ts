import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UsersRepositories';

interface IAuthenticateRequest {
  nickname: string;
}

export class AuthenticateUserService {
  async execute({ nickname }: IAuthenticateRequest): Promise<string | Error> {
    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = await usersRepositories.findOne({ nickname });

    if (!user) {
      throw new Error('Nickname incorrect');
    }

    const token = sign(
      {
        nickname: user.nickname,
      },
      process.env.APPLICATION_JWT_SECRET,
      {
        subject: user.id,
      },
    );

    return token;
  }
}
