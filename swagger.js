
const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Smart City Management API",
    version: "1.0.0",
    description: "API documentation for Smart City Backend",
  },
  servers: [
    {
      url: "https://smart-city-backend-1.onrender.com",
    },
  ],
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
  paths: {
    "/api/auth/register": {
      post: {
        summary: "Register new user",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
              },
            },
          },
        },
        responses: {
          201: { description: "User registered" },
        },
      },
    },
    "/api/auth/login": {
      post: {
        summary: "Login user",
        tags: ["Auth"],
        responses: {
          200: { description: "JWT Token returned" },
        },
      },
    },
    "/api/complaints": {
      post: {
        summary: "Create complaint",
        tags: ["Complaints"],
        security: [{ bearerAuth: [] }],
        responses: {
          201: { description: "Complaint created" },
        },
      },
      get: {
        summary: "Get complaints",
        tags: ["Complaints"],
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "List of complaints" },
        },
      },
    },
  },
};

module.exports = swaggerSpec;