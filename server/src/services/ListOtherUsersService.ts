import { getCustomRepository, Not } from 'typeorm';
import { User } from '../entities/User';
import { UsersRepositories } from '../repositories/UsersRepositories';

export class ListOtherUsersService {
  async execute(userId: string): Promise<User[] | Error> {
    const usersRepository = getCustomRepository(UsersRepositories);

    const users = await usersRepository.find({
      where: {
        id: Not(userId),
      },
    });

    return users;
  }
}
