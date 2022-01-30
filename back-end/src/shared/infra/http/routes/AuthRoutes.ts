import express from 'express';
import { Request, Response, NextFunction } from 'express';
import config from '@config/auth';
import { CategoryController } from '@modules/Categories/infra/http/controllers/CategoryController';
import { UserController } from '@modules/Users/infra/http/controllers/UserController';
import { ProductController } from '@modules/Products/infra/http/controllers/ProductController';
import { CheckRoles } from '@modules/Users/infra/http/middlewares/CheckRoles';
import { verify } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';

interface TokenPayload {
  id: string;
  username: string;
  email: string;
  role: string;
}

class AuthRoutes {
  public authRoutes: express.Application;

  constructor() {
    this.authRoutes = express();
    this.routes();
  }

  private routes(): void {
    this.authRoutes.use(async function (
      request: Request,
      response: Response,
      next: NextFunction,
    ) {
      response.header(
        'Access-Control-Allow-Headers',
        'Origin, Content-Type, Accept',
      );

      const authHeader = request.headers.authorization;

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

    // Instânciando classe CheckRoles para verificar
    // se o usuário é administrador em determinada rota
    const checkRole = new CheckRoles().isAdmin;

    //Categories
    this.authRoutes.post(
      '/categories',
      /*  
   #swagger.auto = false
   #swagger.tags = ["Categories_auth"]
   #swagger.path = '/categories'
   #swagger.security = [{
      "bearerAuth": [{}]
    }] 
   #swagger.method = 'post'
   #swagger.produces = ['application/json']
   #swagger.consumes = ['application/json']
   #swagger.parameters['obj'] = {
     in: 'body',
     description: 'User data.',
     required: true,
     schema:  {
      "name": "Canecas Brancas2",
      "description": "",
      "defaultPrice": 50
      }
    }
      */
      checkRole,
      new CategoryController().createCategory,
    );
    this.authRoutes.put(
      '/categories/:id',
      /*
    #swagger.auto = false
    #swagger.tags = ["Categories_auth"]
    #swagger.path = '/categories/{id}'
    #swagger.security = [{
      "bearerAuth": [{}]
    }] 
    #swagger.method = 'put'
    #swagger.produces = ['application/json']
    #swagger.consumes = ['application/json']
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Category ID.',
      required: true,
      type: 'string'
    }
    #swagger.parameters['obj'] = {
     in: 'body',
     description: 'User data.',
     required: true,
     schema: {
       "name": "",
       "description": "",
       "defaultPrice": 0,
       "activated": true
     }
    }
      */
      checkRole,
      new CategoryController().updateCategory,
    );
    this.authRoutes.delete(
      '/categories/:id',
      /*
    #swagger.auto = false
    #swagger.tags = ["Categories_auth"]
    #swagger.path = '/categories/{id}'
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
      checkRole,
      new CategoryController().deleteCategory,
    );

    //Products
    this.authRoutes.post(
      '/products',
      /*
   #swagger.auto = false
   #swagger.tags = ["Products_auth"]
   #swagger.path = '/products'
   #swagger.security = [{
      "bearerAuth": [{}]
    }] 
   #swagger.method = 'post'
   #swagger.produces = ['application/json']
   #swagger.consumes = ['application/json']
   #swagger.parameters['obj'] = {
     in: 'body',
     description: 'User data.',
     required: true,
     schema:  {
      "name": "",
      "description": "",
      "category_id": ""
      }
    }
      */
      checkRole,
      new ProductController().createProducts,
    );

    this.authRoutes.put(
      '/changeProduct/:id',
      /*
   #swagger.auto = false
   #swagger.tags = ["Products_auth"]
   #swagger.path = '/changeProduct/{id}'
   #swagger.security = [{
      "bearerAuth": [{}]
    }] 
   #swagger.method = 'put'
   #swagger.produces = ['application/json']
   #swagger.consumes = ['application/json']
   #swagger.parameters['id'] = {
      in: 'path',
      description: 'Product ID.',
      required: true,
      type: 'string'
      }
    }
   #swagger.parameters['obj'] = {
     in: 'body',
     description: 'User data.',
     required: true,
     schema:  {
      "name": "",
      "description": "",
      "category_id": "",
      "activated": true
      }
    }
      */
      checkRole,
      new ProductController().updateProduct,
    );

    //Users

    //Criando usuário administrador (need Admin Role)
    this.authRoutes.post(
      '/users',
      /*
    #swagger.auto = false   
    #swagger.tags = ["Users_auth"]
    #swagger.path = '/users'
    #swagger.security = [{
      "bearerAuth": [{}]
    }] 
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
        "role_id":"",
      }
    }
    */
      new UserController().createUser,
    );

    this.authRoutes.get(
      '/allUsers',
      /*
    #swagger.auto = false
    #swagger.tags = ["Users_auth"]
    #swagger.path = '/allUsers'
    #swagger.security = [{
      "bearerAuth": [{}]
    }] 
    #swagger.method = 'get'
    #swagger.produces = ['application/json']
    #swagger.consumes = ['application/json']
      */
      checkRole,
      new UserController().getAllUsers,
    );
    this.authRoutes.get(
      '/users/roles',
      /*
    #swagger.auto = false
    #swagger.tags = ["Users_auth"]
    #swagger.path = '/users/roles'
    #swagger.security = [{
      "bearerAuth": [{}]
    }] 
    #swagger.method = 'get'
    #swagger.produces = ['application/json']
    #swagger.consumes = ['application/json']
      */
      checkRole,
      new UserController().getAllRoles,
    );

    this.authRoutes.get(
      '/users/search/:username',
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
      checkRole,
      new UserController().searchByUsername,
    );
  }
}

export default new AuthRoutes().authRoutes;
