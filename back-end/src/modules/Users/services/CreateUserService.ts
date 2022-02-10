import { getRepository } from 'typeorm';
import { User } from '@modules/Users/infra/typeorm/entities/User';
import { Role } from '@modules/Roles/infra/typeorm/entities/Role';
import { dateGmt } from '@shared/utils/DateGmt-3';
import AppError from '@shared/errors/AppError';
import { Plan } from '@modules/Plans/infra/typeorm/entities/Plan';
import { UserRequest } from '@modules/Users/types/UserRequest';

export class CreateUserService {
  async execute({
    name,
    username,
    password,
    email,
    state,
    city,
    role_id,
    avatar_url,
    admin,
  }: UserRequest): Promise<User | AppError> {
    const userRepo = getRepository(User);
    const roleRepo = getRepository(Role);
    const planRepo = getRepository(Plan);

    if (!name || !username || !password || !email || !state || !city) {
      throw new AppError('Preencha todos os campos');
    } else if (!admin || !role_id) {
      const userRole = await roleRepo.findOne({
        where: {
          name: 'User',
        },
      });

      if (userRole) {
        role_id = userRole.id;
      }
    }

    //Criando um usuário sem plano
    const noPlan = await planRepo.findOne({
      where: {
        name: 'Sem plano',
      },
    });

    const plan_id = noPlan.id;

    if (!(await roleRepo.findOne(role_id))) {
      throw new AppError('Esse role não existe!');
    }

    username = username.toLowerCase();
    email = email.toLowerCase();

    const date = await dateGmt(new Date());
    const user = userRepo.create({
      name,
      username,
      password,
      email,
      state,
      city,
      role_id,
      plan_id,
      avatar_url,
      activated: true,
      created_at: date,
      updated_at: date,
    });

    await userRepo.save(user);
    return user;
  }
}
