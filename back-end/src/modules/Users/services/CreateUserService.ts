import { getRepository } from 'typeorm'
import { User } from '@modules/Users/infra/typeorm/entities/User'
import { Role } from '@modules/Roles/infra/typeorm/entities/Role'
import { dateGmt } from '@shared/utils/DateGmt-3'
import AppError from '@shared/errors/AppError'

type UserRequest = {
  name: string
  username: string
  password: string
  email: string
  role_id: string
  admin: boolean
}

export class CreateUserService {
  async execute({
    name,
    username,
    password,
    email,
    role_id,
    admin,
  }: UserRequest): Promise<AppError | User> {
    const userRepo = getRepository(User)
    const roleRepo = getRepository(Role)

    if (!name || !username || !password || !email) {
      return new AppError('Missing information')
    } else if (!admin || !role_id) {
      const userRole = await roleRepo.findOne({
        where: {
          name: 'User',
        },
      })

      if (userRole) {
        role_id = userRole.id
      }
    }

    if (!(await roleRepo.findOne(role_id))) {
      throw new AppError('Role does not exists!')
    }

    username = username.toLowerCase()
    email = email.toLowerCase()

    if (await userRepo.findOne({ where: { username: username } })) {
      throw new AppError('Username already registred')
    } else if (await userRepo.findOne({ where: { email: email } })) {
      throw new AppError('Email already registred!')
    }

    const date = await dateGmt(new Date())
    const user = userRepo.create({
      name,
      username,
      password,
      email,
      role_id,
      activated: true,
      created_at: date,
      updated_at: date,
    })

    await userRepo.save(user)
    return user
  }
}
