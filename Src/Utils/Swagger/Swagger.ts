import swaggerJSDoc from "swagger-jsdoc";


const options = {
  definition: {
    openapi: '3.0.0', // Specify the version of OpenAPI
    info: {
      title: 'Express Swagger API',
      version: '1.0.0',
      description: 'A sample Express.js API with Swagger documentation',
    },
  },
  apis: ['./Routes/*.js'], // Specify the path to your API route files
};

const specs = swaggerJSDoc(options);

export default specs