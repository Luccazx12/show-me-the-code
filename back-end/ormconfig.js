require("dotenv/config");

const devConfig = [
  {
    name: "default",
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: process.env.POSTGRES_DATABASE,
    entities: ["./src/modules/**/infra/typeorm/entities/*.ts"],
    migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
    seeds: ["./src/shared/infra/typeorm/seeders/*.ts"],
    factories: ["./src/shared/infra/typeorm/factories/*.ts"],
    cli: {
      migrationsDir: "./src/shared/infra/typeorm/migrations",
    },
  },
];

const testConfig = [
  {
    name: "default",
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: 1234,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: process.env.POSTGRES_DATABASE,
    entities: ["./src/modules/**/infra/typeorm/entities/*.ts"],
    migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
    seeds: ["./src/shared/infra/typeorm/seeders/*.ts"],
    factories: ["./src/shared/infra/typeorm/factories/*.ts"],
    cli: {
      migrationsDir: "./src/shared/infra/typeorm/migrations",
    },
  },
];

const prodConfig = [
  {
    name: "default",
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: 2345,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: process.env.POSTGRES_DATABASE,
    entities: ["./dist/modules/**/infra/typeorm/entities/*.js"],
    migrations: ["./dist/shared/infra/typeorm/migrations/*.js"],
    seeds: ["./dist/shared/infra/typeorm/seeders/*.js"],
    factories: ["./dist/shared/infra/typeorm/factories/*.js"],
    cli: {
      migrationsDir: "./dist/shared/infra/typeorm/migrations",
    },
  },
];

if(process.env.NODE_ENV === "development"){
  module.exports = devConfig;
}
else if (process.env.NODE_ENV === "test"){
  module.exports = testConfig;
}
else {
  module.exports = prodConfig;
}