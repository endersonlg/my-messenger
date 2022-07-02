import { getCustomRepository } from 'typeorm';
import { User } from '../entities/User';
import { UsersRepositories } from '../repositories/UsersRepositories';

export class ListUserById {
  async execute(id: string): Promise<User> {
    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = await usersRepositories.findOne({ id });

    return user;
  }
}
