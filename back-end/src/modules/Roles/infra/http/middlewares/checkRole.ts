import { Request, Response, NextFunction } from 'express';
import { GetAllRolesService } from '@modules/Roles/services/GetAllRolesService';
import { getIpAddressFromRequest } from '@shared/utils/GetUserIp';
import AppError from '@shared/errors/AppError';

export class CheckRole {
  async isAdmin(request: Request, response: Response, next: NextFunction) {
    const { user } = request;

    try {
      const service = new GetAllRolesService();

      const roles = await service.execute();
      const userRole = user.role;
      const userIp = getIpAddressFromRequest(request);

      if (userRole === 'Admin') {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === userRole) {
            console.log(
              '\n- Private Route',
              '\x1b[32m',
              `${request.path}`,
              '\x1b[0m',
              'accessed!',
              `\n- Username: ${user.username}. IP: ${userIp}.\n`,
            );
            next();
          }
        }
      } else {
        throw new AppError('Need ADMIN Role!');
      }
    } catch (err) {
      return response.status(500).json(err);
    }
  }
}
