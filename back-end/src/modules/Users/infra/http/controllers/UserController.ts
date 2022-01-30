import { Request, Response } from 'express'
import config from '@config/auth'
import { CreateUserService } from '@modules/Users/services/CreateUserService'
import { SearchByUsernameService } from '@modules/Users/services/SearchByUsernameService'
import { GetByUsernameService } from '@modules/Users/services/GetByUsernameService'
import { GetAllUsersService } from '@modules/Users/services/GetAllUsersService'
import { GetAllRolesService } from '@modules/Users/services/GetAllRolesService'
import { verify } from 'jsonwebtoken'

interface TokenPayload {
  role: string
}

export class UserController {
  async createUser(request: Request, response: Response) {
    const { name, username, password, email, role_id } = request.body
    let admin = false

    const service = new CreateUserService()
    const authHeader = request.headers.authorization

    if (authHeader) {
      const [_, token] = authHeader.split(' ')
      const { role } = verify(token, config.jwt.secret) as TokenPayload
      if (role === 'Admin') {
        admin = true
      }
    }

    const result = await service.execute({
      name,
      username,
      password,
      email,
      role_id,
      admin,
    })

    return response.json(result)
  }

  async searchByUsername(request: Request, response: Response) {
    const { username } = request.params

    const service = new SearchByUsernameService()
    const result = await service.execute(username)

    return response.json(result)
  }

  async getByUsername(request: Request, response: Response) {
    const { username } = request.params

    const service = new GetByUsernameService()
    const result = await service.execute(username)

    return response.json(result)
  }

  async getAllUsers(request: Request, response: Response) {
    const service = new GetAllUsersService()
    const users = await service.execute()

    return response.json(users)
  }

  async getAllRoles(request: Request, response: Response) {
    const service = new GetAllRolesService()
    const users = await service.execute()

    return response.json(users)
  }
}
