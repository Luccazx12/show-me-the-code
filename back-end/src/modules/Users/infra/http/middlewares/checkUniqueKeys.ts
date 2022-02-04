import { Request, Response, NextFunction } from 'express';
import AppError from '@shared/errors/AppError';
import { getRepository } from 'typeorm';
import { User } from '@modules/Users/infra/typeorm/entities/User';

export class CheckUniqueKeys {
  async checkEmail(request: Request, response: Response, next: NextFunction) {
    const { email } = request.body;

    const userRepo = getRepository(User);

    const userByEmail = await userRepo.findOne({ where: { email: email } });

    if (userByEmail) {
      throw new AppError('Email já registrado!');
    }
    return next();
  }

  async checkUsername(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const { username } = request.body;

    const userRepo = getRepository(User);

    const userByUsername = await userRepo.findOne({
      where: {
        username: username,
      },
    });

    if (userByUsername) {
      throw new AppError(
        `O username ${userByUsername.username} já foi utilizado!`,
      );
    }
    return next();
  }
}
