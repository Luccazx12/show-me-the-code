import { Request, Response } from 'express';
import { GetAllPlansService } from '@modules/Plans/services/GetAllPlansService';
import { DeletePlanService } from '@modules/Plans/services/DeletePlanService';

export class PlanController {
  async getAllPlans(request: Request, response: Response) {
    const service = new GetAllPlansService();
    const plans = await service.execute();
    return response.json(plans);
  }

  async deletePlan(request: Request, response: Response) {
    const { id } = request.params;
    const service = new DeletePlanService();
    await service.execute(id);
    return response.status(204).end();
  }
}
