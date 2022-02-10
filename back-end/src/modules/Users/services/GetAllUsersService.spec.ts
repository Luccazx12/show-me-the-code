import AppError from '@shared/errors/AppError';
import { GetAllUsersService } from './GetAllUsersService';

let allUsers: GetAllUsersService;

describe('GetAllUsers', () => {
  beforeEach(() => {
    //Faltando implementar os fakes repositories
    //Faltando implementar os fakes hashProviders
    allUsers = new GetAllUsersService();
  });

  it('should be able to get all users', async () => {
    const findedUsers = await allUsers.execute();

    expect(findedUsers);
  });

  it('should not be able to find all users', async () => {
    await expect(allUsers.execute()).rejects.toBeInstanceOf(AppError);
  });
});
