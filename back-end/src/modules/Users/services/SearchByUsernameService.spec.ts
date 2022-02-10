import AppError from '@shared/errors/AppError';
import { SearchByUsernameService } from './SearchByUsernameService';

let searchByUsername: SearchByUsernameService;

describe('SearchByUsername', () => {
  beforeEach(() => {
    //Faltando implementar os fakes repositories
    //Faltando implementar os fakes hashProviders
    searchByUsername = new SearchByUsernameService();
  });
  it('should be able to search a user by username', async () => {
    // Traz todos os usuários que tem o username começando com adm...
    const searched = await searchByUsername.execute('adm');

    expect(searched);
  });

  it('should not be able to search a user by username', async () => {
    await expect(
      searchByUsername.execute('wrong-username'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
