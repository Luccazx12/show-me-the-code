import { getRepository } from 'typeorm';
import { User } from '@modules/Users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

export class GetByUsernameService {
  async execute(username: string) {
    const repo = await getRepository(User);
    username = username.toLowerCase();
    const user = await repo.findOne({
      where: {
        username: username,
      },
    });

    if (!user) {
      throw new AppError('User does not exists!');
    }
    delete user.password;
    return user;
  }
}
