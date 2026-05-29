import { OpenAPIV3 } from "openapi-types";

const abonnementClientTags: OpenAPIV3.TagObject = {
  name: "AbonnementClient",
  description: "Operations related to AbonnementClient",
};

const abonnementClientSchema: OpenAPIV3.ComponentsObject["schemas"] = {
  AbonnementClientResponse: {
    properties: {
      id: { type: "string", format: "uuid" },
      clientId: { type: "string", format: "uuid" },
      planId: { type: "string", format: "uuid" },
      type: {
        type: "string",
        enum: ["HEBDOMADAIRE", "TRIMESTRIEL", "SEMESTRIEL", "ANNUEL"],
      },
      // statut: {
      //   type: "string",
      //   enum: ["SUSPENDU", "ACTIF", "RESILIE", "EXPIRE"],
      // },
      // description: { type: "string" },
      nbre_sceance: { type: "number" },
      // montant: { type: "number" },
      debutAt: { type: "string", format: "date-time" },
      finAt: { type: "string", format: "date-time" },
      createdAt: { type: "string", format: "date-time" },
      updatedAt: { type: "string", format: "date-time" },
    },
  },
};

const abonnementClientPath: OpenAPIV3.PathsObject = {
  "/abonnementClient": {
    post: {
      tags: ["AbonnementClient"],
      summary: "Create an abonnementClient",
      security: [{ bearerAuth: [] }],
      description: "Create a new abonnement for a client",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["clientId", "planId", "type","nbre_sceance" ],
              properties: {
                clientId: { type: "string", format: "uuid" },
                planId: { type: "string", format: "uuid" },
                type: {
                  type: "string",
                  enum: ["HEBDOMADAIRE", "TRIMESTRIEL", "SEMESTRIEL", "ANNUEL"],
                },
                // statut: {
                //   type: "string",
                //   enum: ["SUSPENDU", "ACTIF", "RESILIE", "EXPIRE"],
                // },
                // description: { type: "string", maxLength: 255 },
                nbre_sceance: { type: "number" },
                // montant: { type: "number" },
              },
            },
          },
        },
      },
      responses: {
        "201": {
          description: "AbonnementClient created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/AbonnementClientResponse" },
                },
              },
            },
          },
        },
        "400": { description: "Invalid input" },
        "404": { description: "Client not found" },
      },
    },
    get: {
      tags: ["AbonnementClient"],
      summary: "Get abonnementClients with pagination",
      description: "Get all abonnementClients",
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
      ],
      responses: {
        "200": {
          description: "Paginated AbonnementClients",
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
                        items: { $ref: "#/components/schemas/AbonnementClientResponse" },
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

  "/abonnementClient/{id}": {
    get: {
      tags: ["AbonnementClient"],
      summary: "Get abonnementClient by ID",
      description: "Retrieve an abonnementClient by its unique id",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "The unique identifier of the abonnementClient",
        },
      ],
      responses: {
        "200": {
          description: "AbonnementClient found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/AbonnementClientResponse" },
                },
              },
            },
          },
        },
        "404": { description: "AbonnementClient not found" },
      },
    },
    patch: {
      tags: ["AbonnementClient"],
      summary: "Update abonnementClient data by ID",
      description: "Update type, description, nbre_sceance or montant of an abonnementClient",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "The unique identifier of the abonnementClient",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                type: {
                  type: "string",
                  enum: ["HEBDOMADAIRE", "TRIMESTRIEL", "SEMESTRIEL", "ANNUEL"],
                },
                description: { type: "string", maxLength: 255 },
                nbre_sceance: { type: "number", minimum: 0 },
                montant: { type: "number", minimum: 0 },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "AbonnementClient updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/AbonnementClientResponse" },
                },
              },
            },
          },
        },
        "404": { description: "AbonnementClient not found" },
      },
    },
    delete: {
      tags: ["AbonnementClient"],
      summary: "Delete abonnementClient by ID",
      description: "Soft delete an abonnementClient by its unique id",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "The unique identifier of the abonnementClient",
        },
      ],
      responses: {
        "200": { description: "AbonnementClient deleted successfully" },
        "404": { description: "AbonnementClient not found" },
      },
    },
  },

  "/abonnementClient/statut/{id}": {
    patch: {
      tags: ["AbonnementClient"],
      summary: "Update abonnementClient statut by ID",
      description: "Change the statut of an abonnementClient (ACTIF / SUSPENDU / RESILIE / EXPIRE)",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "The unique identifier of the abonnementClient",
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
                  enum: ["SUSPENDU", "ACTIF", "RESILIE", "EXPIRE"],
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
                  data: { $ref: "#/components/schemas/AbonnementClientResponse" },
                },
              },
            },
          },
        },
        "404": { description: "AbonnementClient not found" },
      },
    },
  },
};

export { abonnementClientTags, abonnementClientSchema, abonnementClientPath };