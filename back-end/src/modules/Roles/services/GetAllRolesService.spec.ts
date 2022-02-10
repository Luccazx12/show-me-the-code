import AppError from '@shared/errors/AppError';
import { GetAllRolesService } from './GetAllRolesService';
import { IRoles } from '@modules/Roles/types/iRoles';

describe('DeletePlanById', () => {
  const allRoles = new GetAllRolesService();

  it('should be able to get all roles', async () => {
    const findedRoles: IRoles[] = await allRoles.execute();

    expect(findedRoles)
  });

  it('should not be able to find a plan for delete', async () => {
    await expect(allRoles.execute()).rejects.toBeInstanceOf(AppError); //ID que randômico que não existe no bd...
  });
});
