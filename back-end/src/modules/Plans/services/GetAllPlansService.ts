import { getRepository } from 'typeorm';
import { MoreThan } from 'typeorm';
import { Plan } from '@modules/Plans/infra/typeorm/entities/Plan';

export class GetAllPlansService {
  async execute() {
    const repo = getRepository(Plan);
    const plans = await repo.find({
      where: {
        time_in_minutes: MoreThan(0),
      },
    });

    return plans;
  }
}
