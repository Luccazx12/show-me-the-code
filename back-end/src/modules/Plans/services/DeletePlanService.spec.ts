import AppError from '@shared/errors/AppError';
import { GetAllPlansService } from './GetAllPlansService';
import { DeletePlanService } from './DeletePlanService';
import { IPlan } from '@modules/Plans/types/iPlan';
import { v4 as uuid } from 'uuid';

describe('DeletePlanById', () => {
  const allPlans = new GetAllPlansService();
  const deletePlans = new DeletePlanService();

  it('should be able to delete a plan by id', async () => {
    const findedPlans: IPlan[] = await allPlans.execute();

    const deletedPlan = deletePlans.execute(findedPlans[0].id);

    expect(deletedPlan);
  });

  it('should not be able to find a plan for delete', async () => {
    await expect(deletePlans.execute(uuid())).rejects.toBeInstanceOf(AppError); //ID que randômico que não existe no bd...
  });
});
