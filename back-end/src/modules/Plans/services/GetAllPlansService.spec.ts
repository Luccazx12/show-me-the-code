import AppError from '@shared/errors/AppError';
import { GetAllPlansService } from './GetAllPlansService';

let allPlans: GetAllPlansService;

describe('GetAllPlans', () => {
  beforeEach(() => {
    //Faltando implementar os fakes repositories
    //Faltando implementar os fakes hashProviders
    allPlans = new GetAllPlansService();
  });

  it('should be able to get all plans', async () => {
    const findedPlans = await allPlans.execute();

    expect(findedPlans);
  });

  it('should not be able to find a plan for delete', async () => {
    await expect(allPlans.execute()).rejects.toBeInstanceOf(AppError); //ID que randômico que não existe no bd...
  });
});
