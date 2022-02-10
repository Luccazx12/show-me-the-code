import AppError from '@shared/errors/AppError';
import { GetByUsernameService } from './GetByUsernameService';
import { v4 as uuid } from 'uuid';

let getByUsername: GetByUsernameService;

describe('FindByUsername', () => {
  beforeEach(() => {
    //Faltando implementar os fakes repositories
    //Faltando implementar os fakes hashProviders
    getByUsername = new GetByUsernameService();
  });
  it('should be able to find a user by username', async () => {
    const findedUsername = await getByUsername.execute('admin');

    expect(findedUsername.username).toEqual('admin')
  });

  it('should not be able to find a user by username', async () => {
    await expect(getByUsername.execute('wrong-username')).rejects.toBeInstanceOf(AppError); //ID que randômico que não existe no bd...
  });
});
