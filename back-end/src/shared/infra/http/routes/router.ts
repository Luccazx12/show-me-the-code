import {Router} from 'express';
import { Request, Response, NextFunction } from 'express';
import { UserController } from '@modules/Users/infra/http/controllers/UserController';
import { AuthController } from '@modules/Users/infra/http/controllers/AuthController';
import tariffRouter from '@modules/Tariffs/infra/http/routes/tariff.routes';
import planRouter from '@modules/Plans/infra/http/routes/plan.routes';
import userRouter from '@modules/Users/infra/http/routes/user.routes';
import roleRouter from '@modules/Roles/infra/http/routes/role.routes';
import { verify } from 'jsonwebtoken';
import config from '@config/auth';
import AppError from '@shared/errors/AppError';

interface TokenPayload {
  id: string;
  username: string;
  email: string;
  role: string;
}

export class Router {
  public authRoutes: express.Application;
  public freeRoutes: express.Application;

  constructor() {
    this.authRoutes = express();
    this.freeRoutes = express();
    this.AuthRoutes();
    this.FreeRoutes();
  }

  private FreeRoutes(): void {
    //NOT AUTH
    //Registro
    this.freeRoutes.post(
      '/auth/signup',
      /*   
#swagger.tags = ["Users"]
#swagger.path = '/auth/signup'
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
    "password": "teste123@",
    "email": "whatdogs1222@gmail.com",
  }
}
*/
      new UserController().createUser,
    );

    //Login
    this.freeRoutes.post(
      '/auth/signin',
      /* 
#swagger.tags = ["Users"]
#swagger.auto = false
#swagger.path = '/auth/signin'
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
      new AuthController().sign,
    );
  }

  private AuthRoutes(): void {
    this.authRoutes.use(async function (
      request: Request,
      response: Response,
      next: NextFunction,
    ) {
      response.header(
        'Access-Control-Allow-Headers',
        'Origin, Content-Type, Accept',
      );
      const authHeader = request.headers['authorization'];

      if (!authHeader) {
        throw new AppError('JWT token is missing.', 401);
      }

      const { secret } = config.jwt;

      const [_, token] = authHeader.split(' ');

      try {
        const decoded = await verify(token, secret);

        const { id, username, email, role } = decoded as TokenPayload;

        request.user = {
          id: id,
          username: username,
          email: email,
          role: role,
        };

        return next();
      } catch (err) {
        console.log(err);
        // throw new Error('Invalid JWT token');
        throw new AppError('Invalid JWT token', 401);
      }
    });

    this.authRoutes.use('/tariffs', tariffRouter);
    this.authRoutes.use('/plans', planRouter);
    this.authRoutes.use('/users', userRouter);
    this.authRoutes.use('/roles', roleRouter);

    //     //Categories
    //     this.authRoutes.post(
    //       '/categories',
    //       /*
    //    #swagger.auto = false
    //    #swagger.tags = ["Categories_auth"]
    //    #swagger.path = '/categories'
    //    #swagger.security = [{
    //       "bearerAuth": [{}]
    //     }]
    //    #swagger.method = 'post'
    //    #swagger.produces = ['application/json']
    //    #swagger.consumes = ['application/json']
    //    #swagger.parameters['obj'] = {
    //      in: 'body',
    //      description: 'User data.',
    //      required: true,
    //      schema:  {
    //       "name": "Canecas Brancas2",
    //       "description": "",
    //       "defaultPrice": 50
    //       }
    //     }
    //       */
    //       checkRole,
    //       new CategoryController().createCategory,
    //     );
    //     this.authRoutes.put(
    //       '/categories/:id',
    //       /*
    //     #swagger.auto = false
    //     #swagger.tags = ["Categories_auth"]
    //     #swagger.path = '/categories/{id}'
    //     #swagger.security = [{
    //       "bearerAuth": [{}]
    //     }]
    //     #swagger.method = 'put'
    //     #swagger.produces = ['application/json']
    //     #swagger.consumes = ['application/json']
    //     #swagger.parameters['id'] = {
    //       in: 'path',
    //       description: 'Category ID.',
    //       required: true,
    //       type: 'string'
    //     }
    //     #swagger.parameters['obj'] = {
    //      in: 'body',
    //      description: 'User data.',
    //      required: true,
    //      schema: {
    //        "name": "",
    //        "description": "",
    //        "defaultPrice": 0,
    //        "activated": true
    //      }
    //     }
    //       */
    //       checkRole,
    //       new CategoryController().updateCategory,
    //     );
    //     this.authRoutes.delete(
    //       '/categories/:id',
    //       /*
    //     #swagger.auto = false
    //     #swagger.tags = ["Categories_auth"]
    //     #swagger.path = '/categories/{id}'
    //     #swagger.security = [{
    //       "bearerAuth": [{}]
    //     }]
    //     #swagger.method = 'delete'
    //     #swagger.produces = ['application/json']
    //     #swagger.consumes = ['application/json']
    //     #swagger.parameters['id'] = {
    //       in: 'path',
    //       description: 'Category ID.',
    //       required: true,
    //       type: 'string'
    //       }
    //     }
    //       */
    //       checkRole,
    //       new CategoryController().deleteCategory,
    //     );

    //     //Products
    //     this.authRoutes.post(
    //       '/products',
    //       /*
    //    #swagger.auto = false
    //    #swagger.tags = ["Products_auth"]
    //    #swagger.path = '/products'
    //    #swagger.security = [{
    //       "bearerAuth": [{}]
    //     }]
    //    #swagger.method = 'post'
    //    #swagger.produces = ['application/json']
    //    #swagger.consumes = ['application/json']
    //    #swagger.parameters['obj'] = {
    //      in: 'body',
    //      description: 'User data.',
    //      required: true,
    //      schema:  {
    //       "name": "",
    //       "description": "",
    //       "category_id": ""
    //       }
    //     }
    //       */
    //       checkRole,
    //       new ProductController().createProducts,
    //     );

    //     this.authRoutes.put(
    //       '/changeProduct/:id',
    //       /*
    //    #swagger.auto = false
    //    #swagger.tags = ["Products_auth"]
    //    #swagger.path = '/changeProduct/{id}'
    //    #swagger.security = [{
    //       "bearerAuth": [{}]
    //     }]
    //    #swagger.method = 'put'
    //    #swagger.produces = ['application/json']
    //    #swagger.consumes = ['application/json']
    //    #swagger.parameters['id'] = {
    //       in: 'path',
    //       description: 'Product ID.',
    //       required: true,
    //       type: 'string'
    //       }
    //     }
    //    #swagger.parameters['obj'] = {
    //      in: 'body',
    //      description: 'User data.',
    //      required: true,
    //      schema:  {
    //       "name": "",
    //       "description": "",
    //       "category_id": "",
    //       "activated": true
    //       }
    //     }
    //       */
    //       checkRole,
    //       new ProductController().updateProduct,
    //     );
  }
}
