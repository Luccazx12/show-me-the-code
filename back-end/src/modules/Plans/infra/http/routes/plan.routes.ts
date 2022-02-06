import { Router } from 'express';

//Controllers
import { PlanController } from '@modules/Plans/infra/http/controllers/PlanController';

//Middlewares
import { EnsureAuthenticated } from '@modules/Users/infra/http/middlewares/ensureAuthenticated';
import { CheckRole } from '@modules/Roles/infra/http/middlewares/CheckRole';

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
    #swagger.tags = ["Plans_auth"]
    #swagger.path = '/plans/all'
    #swagger.security = [{
      "bearerAuth": [{}]
    }] 
    #swagger.method = 'get'
    #swagger.produces = ['application/json']
    #swagger.consumes = ['application/json'] 
*/
  checkAuth,
  new PlanController().getAllPlans,
);

routes.delete(
  '/:id',
  /*
        #swagger.auto = false
        #swagger.tags = ["Plans_auth"]
        #swagger.path = '/plans/{id}'
        #swagger.security = [{
          "bearerAuth": [{}]
        }]
        #swagger.method = 'delete'
        #swagger.produces = ['application/json']
        #swagger.consumes = ['application/json']
        #swagger.parameters['id'] = {
          in: 'path',
          description: 'Category ID.',
          required: true,
          type: 'string'
          }
        }
          */
  checkAuth,
  checkRole,
  new PlanController().deletePlan,
);

export default routes;
