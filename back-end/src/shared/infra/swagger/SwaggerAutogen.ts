const swaggerAutogen = require('swagger-autogen')();
const host = process.env.HOST;

export class SwaggerAutoGen {
  //   private outputFile: any = process.cwd() + "/src/swagger/swaggerTest.json";
  //   private endPointsFiles: any = [
  //     process.cwd() + "/src/routes/routes.ts",
  //     process.cwd() + "/src/routes/AuthRoutes.ts",
  //   ];

  async execute() {
    const outputFile = './src/shared/infra/swagger/swagger.json';
    const endPointsFiles = ['./src/modules/**/infra/http/routes/**.ts'];

    const docs = {
      info: {
        title: 'TypeOrm_Postgre API',
        description: '...',
      },
      host: `${host}`,
      schemes: ['http'],
      securityDefinitions: {
        bearerAuth: {
          type: 'apiKey',
          name: 'authorization',
          in: 'header',
          description:
            "Please, insert in value the word 'Bearer' before token provided in signin route.\nExample: Bearer TOKEN",
        },
      },
      tags: [
        {
          name: 'Authenticated Routes',
          description: 'Routes authenticated by Bearer Token JWT.',
          externalDocs: {
            description: 'Find out more',
            url: 'http://swagger.io',
          },
        },
        {
          name: 'Users_auth',
          description:
            'Endpoints for getting information about Users with Authentication',
        },
        {
          name: 'Tariffs_auth',
          description:
            'Endpoints for getting information about Tariffs with Authentication',
        },
        {
          name: 'Plans_auth',
          description:
            'Endpoints for getting information about Plans with Authentication',
        },
        {
          name: 'Roles_auth',
          description:
            'Endpoints for getting information about Roles with Authentication',
        },
        {
          name: 'Open Routes',
          description: 'Routes of Class Users',
          externalDocs: {
            description: 'Find out more',
            url: 'http://swagger.io',
          },
        },
        {
          name: 'Users',
          description: 'Endpoints for getting information about Users',
        },
        // {
        //   name: 'Tariffs',
        //   description: 'Endpoints for getting information about Tariffs',
        // },
        // {
        //   name: 'Plans',
        //   description: 'Endpoints for getting information about Plans',
        // },
      ],
    };

    try {
      await swaggerAutogen(outputFile, endPointsFiles, docs);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

new SwaggerAutoGen().execute();
