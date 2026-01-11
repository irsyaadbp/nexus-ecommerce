import swaggerJsdoc, { Options } from 'swagger-jsdoc';

const options: Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Nexus Ecommerce API',
            version: '1.0.0',
            description: 'API Documentation for Nexus Ecommerce Backend',
            contact: {
                description: 'Nexus Ecommerce API with platform separation',
            },
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 5001}`,
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./src/routes/**/*.ts', './src/app.ts'], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
