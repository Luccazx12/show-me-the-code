import { Router } from 'express';

//Controllers
import { RoleController } from '@modules/Roles/infra/http/controllers/RoleController';

//Middlewares
import { EnsureAuthenticated } from '@modules/Users/infra/http/middlewares/ensureAuthenticated';
import { CheckRole } from '@modules/Roles/infra/http/middlewares/checkRole';

const routes = Router();

// Instanciando classe EnsureAuthenticated e usando o método checkAuth para verificar
// se o usuário está retornando um token valido em sua requisição.
const checkAuth = new EnsureAuthenticated().checkAuth;

// Instânciando classe CheckRoles para verificar se o usuário é administrador
// em determinada rota.
const checkRole = new CheckRole().isAdmin;

routes.get(
  '/all',
  /*
      #swagger.auto = false
      #swagger.tags = ["Roles_auth"]
      #swagger.path = '/roles/all'
      #swagger.security = [{
        "bearerAuth": [{}]
      }] 
      #swagger.method = 'get'
      #swagger.produces = ['application/json']
      #swagger.consumes = ['application/json']
        */
  checkAuth,
  checkRole,
  new RoleController().getAllRoles,
);

export default routes;
