import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'AI-Ready DApp Backend API',
    version: '1.0.0',
    description: 'Well-documented, modular API for blockchain DApp',
  },
  servers: [
    { url: 'http://localhost:5000', description: 'Development server' },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
    },
  },
  security: [{ bearerAuth: [] }],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express): void {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
