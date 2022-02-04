import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { dateGmt } from '@shared/utils/DateGmt-3';

export default class InsertTariffs implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    try {
      const date = await dateGmt(new Date());
      await connection
        .createQueryBuilder()
        .insert()
        .into('tariffs')
        .values([
          {
            id: uuid(),
            origin: 11,
            destiny: 16,
            coast_per_minute: 1.9,
            activated: true,
            created_at: date,
            updated_at: date,
          },
          {
            id: uuid(),
            origin: 16,
            destiny: 11,
            coast_per_minute: 2.9,
            activated: true,
            created_at: date,
            updated_at: date,
          },
          {
            id: uuid(),
            origin: 11,
            destiny: 17,
            coast_per_minute: 1.7,
            activated: true,
            created_at: date,
            updated_at: date,
          },
          {
            id: uuid(),
            origin: 17,
            destiny: 11,
            coast_per_minute: 2.7,
            activated: true,
            created_at: date,
            updated_at: date,
          },
          {
            id: uuid(),
            origin: 11,
            destiny: 18,
            coast_per_minute: 0.9,
            activated: true,
            created_at: date,
            updated_at: date,
          },
          {
            id: uuid(),
            origin: 18,
            destiny: 11,
            coast_per_minute: 1.9,
            activated: true,
            created_at: date,
            updated_at: date,
          },

          //Exemplo de tarifa desativada
          {
            id: uuid(),
            origin: 50,
            destiny: 50,
            coast_per_minute: 50,
            activated: false,
            created_at: date,
            updated_at: date,
          },
        ])
        .execute();
    } catch (error) {
      console.log(error);
    }
  }
}
