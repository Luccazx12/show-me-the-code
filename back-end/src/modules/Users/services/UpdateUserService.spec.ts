import { UpdateUserService } from '@modules/Users/services/UpdateUserService';

let updateUser: UpdateUserService;

describe('UpdateUser', () => {
  beforeEach(() => {
    //Faltando implementar os fakes repositories
    //Faltando implementar os fakes hashProviders
    updateUser = new UpdateUserService();
  });

  it('should be able to update a user', async () => {
    const user = await updateUser.execute({
      username_path: 'admin',
      description: '1234',
    });

    expect(user.description).toBe('1234');
  });
});
