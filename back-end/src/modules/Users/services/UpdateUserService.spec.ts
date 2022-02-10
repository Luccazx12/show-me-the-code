import { UpdateUserService } from '@modules/Users/services/UpdateUserService';
import { v4 as uuid } from 'uuid';

let updateUser: UpdateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    //Faltando implementar os fakes repositories
    //Faltando implementar os fakes hashProviders
    updateUser = new UpdateUserService();
  });

  it('should be able to update a user', async () => {
    const user = await updateUser.execute({
      username_path: 'admin',
      description: "1234"
    });

    expect(user.description).toBe('1234')
  });
});
