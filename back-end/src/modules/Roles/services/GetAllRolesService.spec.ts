import AppError from '@shared/errors/AppError';
import { GetAllRolesService } from './GetAllRolesService';
import { IRole } from '@modules/Roles/types/iRole';

let allRoles: GetAllRolesService;

describe('GetAllRoles', () => {
  beforeEach(() => {
    //Faltando implementar os fakes repositories
    //Faltando implementar os fakes hashProviders
    allRoles = new GetAllRolesService();
  });

  it('should be able to get all roles', async () => {
    const findedRoles: IRole[] = await allRoles.execute();

    expect(findedRoles);
  });

  it('should not be able to find all roles', async () => {
    await expect(allRoles.execute()).rejects.toBeInstanceOf(AppError);
  });
});
