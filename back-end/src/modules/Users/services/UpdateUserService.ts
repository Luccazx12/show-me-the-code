import { getRepository } from 'typeorm';
import { User } from '@modules/Users/infra/typeorm/entities/User';
import { Role } from '@modules/Roles/infra/typeorm/entities/Role';
import { dateGmt } from '@shared/utils/DateGmt-3';
import AppError from '@shared/errors/AppError';
import { Plan } from '@modules/Plans/infra/typeorm/entities/Plan';
import { UserRequest } from '@modules/Users/dtos/UserRequest';

export class UpdateUserService {
  async execute({
    username_path,
    role,
    name,
    username,
    email,
    state,
    city,
    role_id,
    avatar_url,
    description,
    plan_id,
    activated,
  }: UserRequest): Promise<Error | User> {
    const repo = await getRepository(User);
    const roleRepo = getRepository(Role);
    const planRepo = getRepository(Plan);

    if (username_path !== username && role !== 'Admin') {
      throw new AppError('Need Admin Role!', 401);
    }

    username_path = username_path.toLowerCase();

    const user = await repo.findOne({
      where: {
        username: username_path,
      },
    });

    if (!user) {
      throw new AppError('User does not exist');
    } else {
      if (user.activated === activated && activated !== null) {
        if (activated === true) {
          throw new AppError(`User ${username_path} already activated`);
        } else {
          throw new AppError(`User ${username_path} already desactivated`);
        }
      } else {
        //Verificando se estão enviando um role/plan e buscando-os no banco de dados
        if (role_id && !(await roleRepo.findOne(role_id))) {
          throw new AppError('Role does not exists!');
        }
        if (plan_id && !(await planRepo.findOne(plan_id))) {
          throw new AppError('Plan does not exists!');
        }

        const date = await dateGmt(new Date());

        user.username = username ? username.toLowerCase() : user.username;
        user.name = name ? name : user.name;
        user.email = email ? email : user.email;
        user.state = state ? state : user.state;
        user.city = city ? city : user.city;
        user.role_id = role_id ? role_id : user.role_id;
        user.plan_id = plan_id ? plan_id : user.plan_id;
        user.description = description ? description : user.description;
        user.avatar_url = avatar_url ? avatar_url : user.avatar_url;
        user.updated_at = date;

        if (activated === null) {
          user.activated = user.activated;
        } else {
          user.activated = activated;
        }

        await repo.save(user);

        return user;
      }
    }
  }
}
