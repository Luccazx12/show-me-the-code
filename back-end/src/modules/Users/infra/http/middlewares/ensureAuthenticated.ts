import { Request, Response, NextFunction } from 'express';
import config from '@config/auth';
import { verify } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';

interface TokenPayload {
  id: string;
  username: string;
  email: string;
  role: string;
}

export class EnsureAuthenticated {
  async checkAuth(request: Request, response: Response, next: NextFunction) {
    response.header(
      'Access-Control-Allow-Headers',
      'Origin, Content-Type, Accept',
    );

    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new AppError('JWT token is missing.', 401);
    }

    const { secret } = config.jwt;

    const [_, token] = authHeader.split(' ');

    try {
      const decoded = await verify(token, secret);

      const { id, username, email, role } = decoded as TokenPayload;

      request.user = {
        id: id,
        username: username,
        email: email,
        role: role,
      };

      return next();
    } catch (err) {
      console.log(err);
      // throw new Error('Invalid JWT token');
      throw new AppError('Invalid JWT token', 401);
    }
  }
}
