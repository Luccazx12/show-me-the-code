import { getRepository } from 'typeorm';
import config from '@config/auth';
import { User } from '@modules/Users/infra/typeorm/entities/User';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';

export class SigninService {
  async execute(email: string, password: string) {
    const repo = getRepository(User);
    email = email.toLowerCase();

    const user = await repo.findOne({
      where: { email: email },
      relations: ['role'],
    });

    if (!email || !password) {
      throw new AppError('Preencha todos os campos!');
    } else if (!user) {
      throw new AppError('Email ou senha estão inválidos!');
    } else if (!(await bcrypt.compareSync(password, user.password))) {
      throw new AppError('Email ou senha estão inválidos!');
    } else {
      var token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          role: user.role.name,
        },
        config.jwt.secret,
        { expiresIn: 86400 },
      );

      // const success = {
      //   id: user.id,
      //   username: user.username,
      //   email: user.email,
      //   role: user.role.name,
      //   token: token,
      // }

      return { user, token };
    }
  }
}
