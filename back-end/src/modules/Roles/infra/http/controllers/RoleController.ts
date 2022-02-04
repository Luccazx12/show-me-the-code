import { Request, Response } from 'express';
import { GetAllRolesService } from '@modules/Roles/services/GetAllRolesService';

export class RoleController {
  async getAllRoles(request: Request, response: Response) {
    const service = new GetAllRolesService();
    const roles = await service.execute();

    return response.json(roles);
  }
}
