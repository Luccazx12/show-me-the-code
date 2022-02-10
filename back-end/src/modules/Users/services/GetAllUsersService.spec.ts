import AppError from '@shared/errors/AppError';
import { GetAllUsersService } from './GetAllUsersService';

let allUsers: GetAllUsersService;

describe('GetAllTariffs', () => {
  beforeEach(() => {
    //Faltando implementar os fakes repositories
    //Faltando implementar os fakes hashProviders
    allUsers = new GetAllUsersService();
  });

  it('should be able to get all tariffs', async () => {
    const findedUsers = await allUsers.execute();

    expect(findedUsers);
  });

  it('should not be able to find all tariffs', async () => {
    await expect(allUsers.execute()).rejects.toBeInstanceOf(AppError);
  });
});
