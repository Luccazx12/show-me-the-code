import AppError from '@shared/errors/AppError';
import { CreateUserService } from '@modules/Users/services/CreateUserService';
import { v4 as uuid } from 'uuid';
import { GetAllRolesService } from '@modules/Roles/services/GetAllRolesService';
import { IUser } from '@modules/Users/types/iUser';

let createUser: CreateUserService;
let getRoles: GetAllRolesService;

describe('CreateUser', () => {
  beforeEach(() => {
    //Faltando implementar os fakes repositories
    //Faltando implementar os fakes hashProviders
    createUser = new CreateUserService();
    getRoles = new GetAllRolesService();
  });

  //Próprio usuário se registrando...

  it('should be able to create a new user', async () => {
    //Passando Admin como false porque não é um administrador registrando um usuário,
    // sim um usuário comum se registrando. Passamos essa informação pela controller,
    // verificando se na requisição, com o usuário logado e o token autenticado, existe
    // um usuário com role 'ADMIN', se houver, então passa admin como true.
    // Como não temos o express aqui para nos ajudar com isso e nem nosso middleware
    // então, admin será setado como false!
    const user = await createUser.execute({
      name: 'Lucca',
      username: 'luccazx12',
      password: '12345',
      email: 'mario-lucca2@hotmail.com',
      state: 35,
      city: 3550308,
      role_id: uuid(),
      avatar_url: '...',
      admin: false,
    });

    expect(user).toHaveProperty('created_at');
    expect(user).toHaveProperty('updated_at');
  });

  it('should not be able to create user with email already registred', async () => {
    await expect(
      createUser.execute({
        name: 'Lucca',
        username: 'luccazx12',
        password: '12345',
        email: 'mario-lucca2@hotmail.com',
        state: 35,
        city: 3550308,
        role_id: uuid(),
        avatar_url: '...',
        admin: false,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  //Administrador criando uma conta

  it('should be able a administrator to create a new administrator user', async () => {
    // Agora temos que passar um role válido, para ele poder criar tanto um usuário
    // administrador quanto um usuário comum. Por isso, vamos ter que dar um get
    // na tabela de roles.

    const roles = await getRoles.execute();

    let roleId;

    // Sabendo que só existem dois roles no banco de dados
    // e continuará sendo assim... Como neste caso queremos
    // registrar um usuário administrador, vamos verificar
    // se o nome do role da primeira posição é Admin,
    // se for ele recebe o id da primeira posição
    // se não, recebe da primeira.
    if (roles[0].name === 'Admin') {
      roleId = roles[0].id;
    } else {
      roleId = roles[1].id;
    }

    const user = await createUser.execute({
      name: 'Lucca',
      username: 'luccazx12',
      password: '12345',
      email: 'mario-lucca2@hotmail.com',
      state: 35,
      city: 3550308,
      role_id: roleId,
      avatar_url: '...',
      admin: true,
    });

    expect(user).toHaveProperty('created_at');
    expect(user).toHaveProperty('updated_at');
    expect(user.role_id).toEqual(roleId);
  });
});
