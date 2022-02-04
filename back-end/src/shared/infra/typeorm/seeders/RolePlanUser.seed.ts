import { Factory, Seeder } from 'typeorm-seeding';
import { Connection, getRepository } from 'typeorm';
import { Role } from '@modules/Roles/infra/typeorm/entities/Role';
import { User } from '@modules/Users/infra/typeorm/entities/User';
import { Plan } from '@modules/Plans/infra/typeorm/entities/Plan';
import { dateGmt } from '@shared/utils/DateGmt-3';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import uploadConfig from '@config/upload';

export default class InsertRolePlanAndAdminUser implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    try {
      const adminId = uuid();
      const date = await dateGmt(new Date());
      await connection
        .createQueryBuilder()
        .insert()
        .into(Role)
        .values([
          {
            id: uuid(),
            name: 'User',
            created_at: date,
            updated_at: date,
          },
          {
            id: adminId,
            name: 'Admin',
            created_at: date,
            updated_at: date,
          },
        ])
        .execute();

      const noPlanId = uuid();
      await getRepository(Plan).save([
        {
          id: noPlanId,
          name: 'Sem plano',
          description: 'usuários sem plano tem essa constraint',
          time_in_minutes: 0,
          image_url: uploadConfig.defaultPlanImage,
          price: 0,
          activated: true,
          created_at: date,
          updated_at: date,
        },
        {
          id: uuid(),
          name: 'FaleMais30',
          description:
            'Plano onde o cliente poderá falar de graça por 30 minutos',
          time_in_minutes: 30,
          image_url: uploadConfig.defaultPlanImage,
          price: 0,
          activated: true,
          created_at: date,
          updated_at: date,
        },
        {
          id: uuid(),
          name: 'FaleMais60',
          description:
            'Plano onde o cliente poderá falar de graça por 60 minutos',
          time_in_minutes: 60,
          image_url: uploadConfig.defaultPlanImage,
          price: 0,
          activated: true,
          created_at: date,
          updated_at: date,
        },
        {
          id: uuid(),
          name: 'FaleMais120',
          description:
            'Plano onde o cliente poderá falar de graça por 120 minutos',
          time_in_minutes: 120,
          image_url: uploadConfig.defaultPlanImage,
          price: 0,
          activated: true,
          created_at: date,
          updated_at: date,
        },
      ]);

      const password = await bcrypt.hashSync('1234', 10);
      await getRepository(User).save({
        id: uuid(),
        name: 'Admin',
        username: 'admin',
        password: password,
        email: 'mario-lucca@hotmail.com',
        //Estado de sp (uf)
        state: 35,
        //Cidade de sp (municipio)
        city: 3550308,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget nibh gravida, placerat enim sit amet, malesuada dui. Curabitur elementum mattis sagittis. Sed vel rutrum velit.',
        role_id: adminId,
        plan_id: noPlanId,
        avatar_url: uploadConfig.defaultAvatar,
        activated: true,
        created_at: date,
        updated_at: date,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
