# Show me the code

A LolDesign challenge

## About the project

This application was requested by the company LolDesign, where a customer can calculate the value of a call from its origin, destination and fixed rates. There are also plans, which discount the price of this call if the user selects it.

### Necessary tools to execute this project:

- Nodejs and NPM
- Docker
- docker-compose

### How to execute front web, back-end and database

#### First, pull the back-end and front-end images for the project with docker

```bash
$ sudo docker pull luccazx12/nodejs-typeorm:latest
```

```bash
$ sudo docker pull luccazx12/nextjs:latest
```

If you don't have postgres, which is the database we will use, please use the command:

```bash
$ docker pull postgres
```

#### Second, run the migrations and seeders to create the tables and populate our database:

In that folder, run:

```
 cd ./back-end && npm install
```

1 - Migrations:

```bash
$ yarn typeorm migration:run

or

$ npm run typeorm migration:run
```

2 - Seeders:

```bash
$ yarn seed:run

or

$ npm run seed:run
```

**Remember to rename `.env.sample` to `.env` to be able to run the application.**

### And finally... Run process with docker

It's very easy, just run the command: `$ sudo docker-compose up` in the current directory.
