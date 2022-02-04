import { Request, Response } from 'express';
import config from '@config/auth';
import uploadConfig from '@config/upload';
import { CreateUserService } from '@modules/Users/services/CreateUserService';
import { SearchByUsernameService } from '@modules/Users/services/SearchByUsernameService';
import { GetByUsernameService } from '@modules/Users/services/GetByUsernameService';
import { GetAllUsersService } from '@modules/Users/services/GetAllUsersService';
import { UpdateUserService } from '@modules/Users/services/UpdateUserService';
import { verify } from 'jsonwebtoken';

interface TokenPayload {
  role: string;
}

export class UserController {
  async createUser(request: Request, response: Response) {
    const { name, username, password, email, role_id, state, city } =
      request.body;
    let admin = false;
    let avatar_url = uploadConfig.defaultAvatar;

    if (request.file) {
      avatar_url = `/files/user-img/${request.file.filename}`;
    }

    const service = new CreateUserService();
    const authHeader = request.headers.authorization;

    if (authHeader) {
      const [_, token] = authHeader.split(' ');
      const { role } = verify(token, config.jwt.secret) as TokenPayload;
      if (role === 'Admin') {
        admin = true;
      }
    }

    const result = await service.execute({
      name,
      username,
      password,
      email,
      role_id,
      state,
      city,
      avatar_url,
      admin,
    });

    return response.json(result);
  }

  async updateUser(request: Request, response: Response) {
    const {
      name,
      username,
      email,
      role_id,
      plan_id,
      state,
      city,
      description,
      activated,
    } = request.body;
    const { username_path } = request.params;
    let avatar_url: string;
    const role = request.user.role;

    if (request.file) {
      avatar_url = `/files/user-img/${request.file.filename}`;
    }

    const service = new UpdateUserService();

    const result = await service.execute({
      username_path,
      role,
      name,
      username,
      email,
      role_id,
      plan_id,
      state,
      city,
      description,
      activated,
      avatar_url,
    });

    return response.json(result);
  }

  async searchByUsername(request: Request, response: Response) {
    const { username } = request.params;

    const service = new SearchByUsernameService();
    const result = await service.execute(username);

    return response.json(result);
  }

  async getByUsername(request: Request, response: Response) {
    const { username } = request.params;

    const service = new GetByUsernameService();
    const result = await service.execute(username);

    return response.json(result);
  }

  async getAllUsers(request: Request, response: Response) {
    const service = new GetAllUsersService();
    const users = await service.execute();

    return response.json(users);
  }
}
