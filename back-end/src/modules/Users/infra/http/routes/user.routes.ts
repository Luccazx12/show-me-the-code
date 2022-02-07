import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

//Controllers
import { UserController } from '@modules/Users/infra/http/controllers/UserController';
import { AuthController } from '@modules/Users/infra/http/controllers/AuthController';

//Middlewares
import { EnsureAuthenticated } from '@modules/Users/infra/http/middlewares/ensureAuthenticated';
import { CheckUniqueKeys } from '@modules/Users/infra/http/middlewares/checkUniqueKeys';
import { CheckRole } from '@modules/Roles/infra/http/middlewares/checkRole';

const routes = Router();

// Instanciando classe EnsureAuthenticated e usando o método checkAuth para verificar
// se o usuário está retornando um token valido em sua requisição.
const checkAuth = new EnsureAuthenticated().checkAuth;
const checkUniqueKeys = new CheckUniqueKeys();

// Instânciando classe CheckRoles para verificar se o usuário é administrador
// em determinada rota.
const checkRole = new CheckRole().isAdmin;
const upload = multer(uploadConfig.multer);

//Instanciando controllers
const userController = new UserController();
const authController = new AuthController();

//Rotas livres

//Registro
routes.post(
  '/auth/signup',
  /*   
#swagger.tags = ["Users"]
#swagger.path = '/users/auth/signup'
#swagger.method = 'post'
#swagger.produces = ['application/json']
#swagger.consumes = ['application/json']

#swagger.parameters['obj'] = {
in: 'body',
description: 'User data.',
required: true,
schema: {
  "name": "Lucca",
  "username": "Luccazx12",
   "email": "whatdogs1222@gmail.com",
  "password": "teste123@",
  "state": 35,
  "city": "SP",
  }
}
*/
  [checkUniqueKeys.checkEmail, checkUniqueKeys.checkUsername],
  userController.createUser,
);

//Login
routes.post(
  '/auth/signin',
  /* 
#swagger.tags = ["Users"]
#swagger.auto = false
#swagger.path = '/users/auth/signin'
#swagger.method = 'post'
#swagger.produces = ['application/json']
#swagger.consumes = ['application/json']

#swagger.parameters['obj'] = {
in: 'body',
description: 'User data.',
required: true,
schema: {
  email: "mario-lucca@hotmail.com",
  password: "1234"
  }
}
*/
  authController.sign,
);

// Rotas autenticadas -------------------------------

//Criando usuário administrador (need Admin Role)
routes.post(
  '/create',
  /*   
    #swagger.auto = false
    #swagger.tags = ["Users_auth"]
    #swagger.path = '/users/create'
    #swagger.security = [{
        "bearerAuth": [{}]
    }] 
    #swagger.method = 'post'
    #swagger.parameters['avatar'] = {
      in: 'formData',
      type: 'file',
      required: 'true',
      description: 'Some description...',
    } 
    #swagger.parameters['username'] = {
    in: 'formData',
    description: 'User data.',
    required: true,
    }
    #swagger.parameters['name'] = {
    in: 'formData',
    description: 'User data.',
    required: true,
    }
    #swagger.parameters['email'] = {
    in: 'formData',
    description: 'User data.',
    required: true,
    }
    #swagger.parameters['password'] = {
    in: 'formData',
    description: 'User data.',
    required: true,
    }
    #swagger.parameters['role_id'] = {
    in: 'formData',
    description: 'User data.',
    required: true,
    }
    #swagger.parameters['state'] = {
    in: 'formData',
    description: 'User state.',
    required: true,
    }
    #swagger.parameters['city'] = {
    in: 'formData',
    description: 'User city.',
    required: true,
    }
    */
  [
    checkAuth,
    checkRole,
    checkUniqueKeys.checkEmail,
    checkUniqueKeys.checkUsername,
  ],
  upload.single('avatar'),
  userController.createUser,
);

routes.put(
  '/update/:username_path',
  /*
    #swagger.auto = false
    #swagger.tags = ["Users_auth"]
    #swagger.path = '/users/update/{username_path}'
    #swagger.security = [{
      "bearerAuth": [{}]
    }] 
    #swagger.method = 'put'
    #swagger.produces = ['application/json']
    #swagger.consumes = ['application/json']
    #swagger.parameters['username_path'] = {
      in: 'path',
      description: 'Username to be changed.',
      required: true,
      type: 'string'
      }
    }

    #swagger.parameters['avatar'] = {
      in: 'formData',
      type: 'file',
      required: 'false',
      description: 'Some description...',
    } 

    #swagger.parameters['username'] = {
    in: 'formData',
    description: 'User username.',
    required: false,
    }
    #swagger.parameters['email'] = {
    in: 'formData',
    description: 'User email.',
    required: false,
    }
    #swagger.parameters['name'] = {
    in: 'formData',
    description: 'User name.',
    required: false,
    }
    #swagger.parameters['state'] = {
    in: 'formData',
    description: 'User state.',
    required: false,
    }
    #swagger.parameters['city'] = {
    in: 'formData',
    description: 'User city.',
    required: false,
    }
    #swagger.parameters['description'] = {
    in: 'formData',
    description: 'User bio.',
    required: false,
    }
    #swagger.parameters['role_id'] = {
    in: 'formData',
    description: 'User role.',
    required: false,
    }
    #swagger.parameters['plan_id'] = {
    in: 'formData',
    description: 'User plan.',
    required: false,
    }
    #swagger.parameters['activated'] = {
    in: 'formData',
    description: 'User activation. (use true or false)',
    required: false,
    }

    */
  [checkAuth, checkUniqueKeys.checkEmail, checkUniqueKeys.checkUsername],
  upload.single('avatar'),
  userController.updateUser,
);

routes.get(
  '/all',
  /*
    #swagger.auto = false
    #swagger.tags = ["Users_auth"]
    #swagger.path = '/users/all'
    #swagger.security = [{
      "bearerAuth": [{}]
    }] 
    #swagger.method = 'get'
    #swagger.produces = ['application/json']
    #swagger.consumes = ['application/json']
      */
  [checkAuth, checkRole],
  userController.getAllUsers,
);

routes.get(
  '/search/:username',
  /*
    #swagger.auto = false
    #swagger.tags = ["Users_auth"]
    #swagger.path = '/users/search/{username}'
    #swagger.security = [{
      "bearerAuth": [{}]
    }] 
    #swagger.method = 'get'
    #swagger.produces = ['application/json']
    #swagger.consumes = ['application/json']
    #swagger.parameters['username'] = {
      in: 'path',
      description: 'User username.',
      required: true,
      type: 'string'
      }
    }
      */
  [checkAuth, checkRole],
  userController.searchByUsername,
);

//Users
routes.get(
  '/:username',
  /*   
#swagger.tags = ["Users_auth"]
#swagger.path = '/users/{username}'
#swagger.method = 'get'
#swagger.produces = ['application/json']
#swagger.consumes = ['application/json']
#swagger.parameters['username'] = {
  in: 'path',
  description: 'User username.',
  required: true,
  type: 'string'
  }
}
*/
  checkAuth,
  userController.getByUsername,
);

export default routes;
