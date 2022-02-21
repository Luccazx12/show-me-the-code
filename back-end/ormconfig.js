require('dotenv/config');

const devConfig = [
  {
    name: 'default',
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: process.env.POSTGRES_DATABASE,
    entities: [__dirname + '/src/modules/**/infra/typeorm/entities/*.ts'],
    migrations: [__dirname + '/src/shared/infra/typeorm/migrations/*.ts'],
    seeds: [__dirname + '/src/shared/infra/typeorm/seeders/*.ts'],
    factories: [__dirname + '/src/shared/infra/typeorm/factories/*.ts'],
    cli: {
      migrationsDir: __dirname + '/src/shared/infra/typeorm/migrations',
    },
  },
];

const testConfig = [
  {
    name: 'default',
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: 1234,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: process.env.POSTGRES_DATABASE,
    entities: [__dirname + '/src/modules/**/infra/typeorm/entities/*.ts'],
    migrations: [__dirname + '/src/shared/infra/typeorm/migrations/*.ts'],
    seeds: [__dirname + '/src/shared/infra/typeorm/seeders/*.ts'],
    factories: ['./src/shared/infra/typeorm/factories/*.ts'],
    cli: {
      migrationsDir:  __dirname + '/src/shared/infra/typeorm/migrations',
    },
  },
];

const prodConfig = [
  {
    name: 'default',
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: 5432, //Mudar quando for pra prod...
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: process.env.POSTGRES_DATABASE,
    entities: [__dirname + '/dist/modules/**/infra/typeorm/entities/*.js'],
    migrations: [__dirname + '/dist/shared/infra/typeorm/migrations/*.js'],
    seeds: [__dirname + '/dist/shared/infra/typeorm/seeders/*.js'],
    factories: [__dirname + '/dist/shared/infra/typeorm/factories/*.js'],
    cli: {
      migrationsDir: __dirname + '/dist/shared/infra/typeorm/migrations',
    },
  }
  ];

if (process.env.NODE_ENV === 'development') {
  module.exports = devConfig;
} else if (process.env.NODE_ENV === 'test') {
  module.exports = testConfig;
} else {
  module.exports = prodConfig;
}