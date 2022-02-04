import { Router } from 'express';

//Controllers
import { TariffController } from '@modules/Tariffs/infra/http/controllers/TariffController';

//Middlewares
import { EnsureAuthenticated } from '@modules/Users/infra/http/middlewares/ensureAuthenticated';

const routes = Router();

// Instânciando classe CheckRoles para verificar
// se o usuário é administrador em determinada rota
const checkAuth = new EnsureAuthenticated().checkAuth;

routes.get(
  '/all',
  /*
 #swagger.auto = false
    #swagger.tags = ["Tariffs_auth"]
    #swagger.path = '/tariffs/all'
    #swagger.security = [{
      "bearerAuth": [{}]
    }] 
    #swagger.method = 'get'
    #swagger.produces = ['application/json']
    #swagger.consumes = ['application/json'] 
*/
  checkAuth,
  new TariffController().getAllTariffs,
);

export default routes;
