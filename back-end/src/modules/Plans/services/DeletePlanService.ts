import { getRepository } from 'typeorm';
import { Plan } from '@modules/Plans/infra/typeorm/entities/Plan';
import AppError from '@shared/errors/AppError';

export class DeletePlanService {
  async execute(id: string) {
    const repo = getRepository(Plan);

    if (!(await repo.findOne(id))) {
      throw new AppError('Serviço não existente!');
    }

    await repo.delete(id);
  }
}
