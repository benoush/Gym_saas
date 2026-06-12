import { typePlanAbonnementClient } from "enum/typePlanAbonnementClient";
import { OpenAPIV3 } from "openapi-types";

const planAbonnementClientTags: OpenAPIV3.TagObject = {
  name: "PlanAbonnementClient",
  description: "Operations related to PlanAbonnementClient",
};

const planAbonnementClientSchema: OpenAPIV3.ComponentsObject["schemas"] = {
  PlanAbonnementClientResponse: {
    properties: {
       id: { type: "string", format: "uuid" },
       clientId: { type: "string", format: "uuid" },
           type: {
             type: "string",
             enum: ["BASIC", "PRO", "PREMIUM"],
             description: "Type du plan abonnement client",
           },
           prix: { type: "number", format: "float" },
           createdAt: { type: "string", format: "date-time" },
           updatedAt: { type: "string", format: "date-time" },
           deleteAt: { type: "string", format: "date-time" },
    },
  },
};

const planAbonnementClientPath: OpenAPIV3.PathsObject = {
  "/planAbonnementClient": {
    post: {
      tags: ["PlanAbonnementClient"],
      summary: "Create a plan abonnement client",
      description: "Create a new plan abonnement client",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["clientId", "prix", "type"],
              properties: {
                type: { 
                  type: "string",
                  enum: ["BASIC", "PRO", "PREMIUM"],
                },
                prix: { type: "number", minimum: 0 },
                clientId: { type: "string", format: "uuid" },
              },
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Plan abonnement client created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/PlanAbonnementClientResponse" },
                },
              },
            },
          },
        },
        "400": { description: "Invalid input" },
        "404": { description: "User not found" },
        "409": { description: "PlanAbonnementClient already exists for this user" },
      },
    },
    get: {
      tags: ["PlanAbonnementClient"],
      summary: "Get plan abonnement clients with pagination",
      description: "Get all clients with optional type filter",
      parameters: [
        {
          name: "page",
          in: "query",
          schema: { type: "integer", default: 1 },
          description: "Page number",
        },
        {
          name: "limit",
          in: "query",
          schema: { type: "integer", default: 10 },
          description: "Number of items per page",
        },
        {
          name: "Type",
          in: "query",
          schema: {
            type: "string",
            enum: ["BASIC", "PRO", "PREMIUM"],
          },
          description: "Filter by type",
        },
      ],
      responses: {
        "200": {
          description: "Paginated Clients",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: {
                    type: "object",
                    properties: {
                      rows: {
                        type: "array",
                        items: { $ref: "#/components/schemas/PlanAbonnementClientResponse" },
                      },
                      count: { type: "integer" },
                      page: { type: "integer" },
                      limit: { type: "integer" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  "/planAbonnementClient/{id}": {
    get: {
      tags: ["PlanAbonnementClient"],
      summary: "Get plan abonnement client by ID",
      description: "Retrieve a plan abonnement client by their unique id",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
          description: "The unique identifier of the plan abonnement client",
        },
      ],
      responses: {
        "200": {
          description: "Plan abonnement client found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/PlanAbonnementClientResponse" },
                },
              },
            },
          },
        },
        "404": { description: "PlanAbonnementClient not found" },
      },
    },
    delete: {
      tags: ["PlanAbonnementClient"],
      summary: "Delete plan abonnement client by ID",
      description: "Soft delete a client by their unique id",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
          description: "The unique identifier of the client",
        },
      ],
      responses: {
        "200": { description: "Client deleted successfully" },
        "404": { description: "Client not found" },
      },
    },
  },

//   "/client/user/{userId}": {
//     get: {
//       tags: ["Client"],
//       summary: "Get client by userId",
//       description: "Retrieve a client by their associated userId",
//       parameters: [
//         {
//           name: "userId",
//           in: "path",
//           required: true,
//           schema: { type: "string", format: "uuid" },
//           description: "The userId associated with the client",
//         },
//       ],
//       responses: {
//         "200": {
//           description: "Client found",
//           content: {
//             "application/json": {
//               schema: {
//                 type: "object",
//                 properties: {
//                   success: { type: "boolean" },
//                   data: { $ref: "#/components/schemas/ClientResponse" },
//                 },
//               },
//             },
//           },
//         },
//         "404": { description: "Client not found" },
//       },
//     },
//   },

  "/planAbonnementClient/type/{id}": {
    patch: {
      tags: ["PlanAbonnementClient"],
      summary: "Update plan abonnement client type",
      description: "Change the type of a plan abonnement client",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
          description: "The unique identifier of the plan abonnement client",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["type"],
              properties: {
                type: {
                  type: "string",
                  enum: ["BASIC", "PRO", "PREMIUM"],
                },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Type updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/PlanAbonnementClientResponse" },
                },
              },
            },
          },
        },
        "404": { description: "PlanAbonnementClient not found" },
      },
    },
  },
};

export { planAbonnementClientTags, planAbonnementClientSchema, planAbonnementClientPath };