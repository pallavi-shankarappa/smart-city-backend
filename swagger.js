const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Smart City Management API",
      version: "1.0.0",
      description: "API documentation for Smart City Backend",
    },
    servers: [
      {
        url: "https://your-render-url",
      },
    ],
  },
  apis: ["**/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;