import AppError from '@shared/errors/AppError';
import { GetAllTariffsService } from './GetAllTariffsService';
import { ITariff } from '@modules/Roles/types/iTariff';

describe('DeletePlanById', () => {
  const allTariffs = new GetAllTariffsService();

  it('should be able to get all tariffs', async () => {
    const findedTariffs: ITariff[] = await allTariffs.execute();

    expect(findedTariffs);
  });

  it('should not be able to find all tariffs', async () => {
    await expect(allTariffs.execute()).rejects.toBeInstanceOf(AppError);
  });
});
