import AppError from '@shared/errors/AppError';
import { GetAllTariffsService } from './GetAllTariffsService';

let allTariffs: GetAllTariffsService;

describe('GetAllTariffs', () => {
  beforeEach(() => {
    //Faltando implementar os fakes repositories
    //Faltando implementar os fakes hashProviders
    allTariffs = new GetAllTariffsService();
  });

  it('should be able to get all tariffs', async () => {
    const findedTariffs = await allTariffs.execute();

    expect(findedTariffs);
  });

  it('should not be able to find all tariffs', async () => {
    await expect(allTariffs.execute()).rejects.toBeInstanceOf(AppError);
  });
});
