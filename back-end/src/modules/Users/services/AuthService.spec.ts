import AppError from '@shared/errors/AppError';
import { SigninService } from './AuthService';
import { GetByUsernameService } from './GetByUsernameService';

let authenticateUser: SigninService;
let findUserByUsername: GetByUsernameService;

describe('AuthService', () => {
  beforeEach(() => {
    //Faltando implementar os fakes repositories
    //Faltando implementar os fakes hashProviders
    authenticateUser = new SigninService();
    findUserByUsername = new GetByUsernameService();
  });

  it('should be able to authenticate user', async () => {
    const user = await findUserByUsername.execute('admin');

    // Admin Account (seeders)
    //name: 'Admin',
    //username: 'admin',
    //password: password,
    //email: 'mario-lucca@hotmail.com',
    ////Estado de sp (uf)
    //state: 35,
    ////Cidade de sp (municipio)
    //city: 3550308,
    //activated: true,

    const auth = await authenticateUser.execute(
      'mario-lucca@hotmail.com',
      '1234',
    );

    expect(auth).toHaveProperty('token');
    expect(auth).toEqual(user);
  });

  it('should not be able to authenticate with wrong passowrd', async () => {
    await expect(
      authenticateUser.execute('mario-lucca@hotmail.com', 'wrong-password'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
