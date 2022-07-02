import { getCustomRepository } from 'typeorm';
import { User } from '../entities/User';
import { UsersRepositories } from '../repositories/UsersRepositories';

export interface IUserRequest {
  nickname: string;
  image: string;
}

export class CreateUserService {
  async execute({ nickname, image }: IUserRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepositories);

    if (!nickname) {
      throw new Error('Nickname is required');
    }

    const userAlreadyExists = await usersRepository.findOne({
      nickname,
    });

    if (userAlreadyExists) {
      throw new Error('Nickname already registered');
    }

    const user = usersRepository.create({
      nickname,
      image,
    });

    await usersRepository.save(user);

    return user;
  }
}
