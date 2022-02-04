import { getRepository } from 'typeorm';
import { Tariff } from '@modules/Tariffs/infra/typeorm/entities/Tariff';

export class GetAllTariffsService {
  async execute() {
    const repo = getRepository(Tariff);
    const tariffs = await repo.find();
    return tariffs;
  }
}
