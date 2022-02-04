import express from 'express';
import tariffRouter from '@modules/Tariffs/infra/http/routes/tariff.routes';
import planRouter from '@modules/Plans/infra/http/routes/plan.routes';
import userRouter from '@modules/Users/infra/http/routes/user.routes';
import roleRouter from '@modules/Roles/infra/http/routes/role.routes';

class Routes {
  public router: express.Application;

  constructor() {
    this.router = express();
    this.routes();
  }

  private routes(): void {
    this.router.use('/tariffs', tariffRouter);
    this.router.use('/plans', planRouter);
    this.router.use('/users', userRouter);
    this.router.use('/roles', roleRouter);
  }
}

export default new Routes().router;
