import { getRepository } from 'typeorm';
import { Like } from 'typeorm';
import { User } from '@modules/Users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

export class SearchByUsernameService {
  async execute(username: string) {
    const repo = await getRepository(User);
    username = username.toLowerCase();
    const user = await repo.find({
      username: Like(`${username}%`),
    });

    if (!user) {
      throw new AppError('User does not exists!');
    }

    for (var i = 0; i < user.length; i++) {
      delete user[i].password;
    }

    return user;
  }
}
