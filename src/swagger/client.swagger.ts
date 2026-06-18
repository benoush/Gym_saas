import { OpenAPIV3 } from "openapi-types";

const clientTags: OpenAPIV3.TagObject = {
  name: "Client",
  description: "Operations related to Client",
};

const clientSchema: OpenAPIV3.ComponentsObject["schemas"] = {
  ClientResponse: {
    properties: {
      id: { type: "string", format: "uuid" },
      userId: { type: "string", format: "uuid" },
      users: {
        properties: {
          id: { type: "string", format: "uuid" },
          photo: { type: "string" },
          nom: { type: "string" },
          prenom: { type: "string" },
          email: { type: "string", format: "email" },
          tel: { type: "string" },
          sexe: { type: "string" },
          role: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      statut: {
        type: "string",
        enum: ["ACTIF", "INACTIF", "SUSPENDU"],
        default: "ACTIF",
      },
      createdAt: { type: "string", format: "date-time" },
      updatedAt: { type: "string", format: "date-time" },
    },
  },
};

const clientPath: OpenAPIV3.PathsObject = {
  "/client": {
    post: {
      tags: ["Client"],
      summary: "Create a client",
      description: "Create a new client linked to a user",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              required: [
                "photo",
                "nom",
                "prenom",
                "email",
                "tel",
                "sexe",
                "password",
                "statut",
              ],
              properties: {
                photo: { type: "string", format: "binary" },
                statut: {
                  type: "string",
                  enum: ["ACTIF", "INACTIF", "SUSPENDU"],
                  default: "ACTIF",
                },
                nom: { type: "string" },
                prenom: { type: "string" },
                email: { type: "string", format: "email" },
                tel: { type: "string" },
                sexe: { type: "string" },
                password: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Client created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/ClientResponse" },
                },
              },
            },
          },
        },
        "400": { description: "Invalid input" },
        "404": { description: "User not found" },
        "409": { description: "Client already exists for this user" },
      },
    },
    get: {
      tags: ["Client"],
      summary: "Get clients with pagination",
      description: "Get all clients with optional statut filter",
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
          name: "statut",
          in: "query",
          schema: {
            type: "string",
            enum: ["ACTIF", "INACTIF", "SUSPENDU"],
          },
          description: "Filter by statut",
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
                        items: { $ref: "#/components/schemas/ClientResponse" },
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

  "/client/{id}": {
    get: {
      tags: ["Client"],
      summary: "Get client by ID",
      description: "Retrieve a client by their unique id",
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
        "200": {
          description: "Client found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/ClientResponse" },
                },
              },
            },
          },
        },
        "404": { description: "Client not found" },
      },
    },
    delete: {
      tags: ["Client"],
      summary: "Delete client by ID",
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

  "/client/{id}/statut": {
    patch: {
      tags: ["Client"],
      summary: "Update client statut",
      description: "Change the statut of a client (ACTIF / INACTIF / SUSPENDU)",
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
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["statut"],
              properties: {
                statut: {
                  type: "string",
                  enum: ["ACTIF", "INACTIF", "SUSPENDU"],
                },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Statut updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/ClientResponse" },
                },
              },
            },
          },
        },
        "404": { description: "Client not found" },
      },
    },
  },
};

export { clientTags, clientSchema, clientPath };
