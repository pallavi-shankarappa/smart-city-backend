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
        url: "https://smart-city-backend-1.onrender.com", // replace with real URL
      },
    ],

    // 🔐 ADD THIS PART
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ["**/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;