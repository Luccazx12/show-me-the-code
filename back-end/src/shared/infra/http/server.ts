import app from './app';
import '@shared/infra/typeorm';
import { SwaggerAutoGen } from '../swagger/SwaggerAutogen';
const port = process.env.PORT;

app.listen(port, () => {
  if (process.env.NODE_ENV === 'development') {
    new SwaggerAutoGen();
    console.log('API in Development mode! ✔');
  }
  console.log('Server running on port:', '\x1b[32m', `${port}`, '\x1b[0m', '✔');
});
