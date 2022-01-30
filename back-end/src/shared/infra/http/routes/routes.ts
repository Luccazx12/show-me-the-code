import express from 'express';
import { AuthController } from '@modules/Users/infra/http/controllers/AuthController';
import { ProductController } from '@modules/Products/infra/http/controllers/ProductController';
import { UserController } from '@modules/Users/infra/http/controllers/UserController';
import { CategoryController } from '@modules/Categories/infra/http/controllers/CategoryController';

class Routes {
  public router: express.Application;

  constructor() {
    this.router = express();
    this.routes();
  }

  private routes(): void {
    //Products
    this.router.get(
      '/allProducts',
      /*
      #swagger.tags = ["Products"]
      #swagger.path = '/allProducts'
      #swagger.method = 'get'
      #swagger.produces = ['application/json']
      #swagger.consumes = ['application/json']
      */
      new ProductController().getAllProducts,
    );

    //Categories
    this.router.get(
      '/allCategories',
      /*
      #swagger.tags = ["Categories"]
      #swagger.path = '/allCategories'
      #swagger.method = 'get'
      #swagger.produces = ['application/json']
      #swagger.consumes = ['application/json']
      */
      new CategoryController().getAlLCategories,
    );

    //Users

    this.router.get(
      '/user/:username',
      /*   
    #swagger.tags = ["Users"]
    #swagger.path = '/user/{username}'
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
      new UserController().getByUsername,
    );
    
    //Registro
    this.router.post(
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
    this.router.post(
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
}

export default new Routes().router;
