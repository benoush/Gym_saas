import { OpenAPIV3 } from "openapi-types";

const abonnementProprietaireTags: OpenAPIV3.TagObject = {
  name: "AbonnementProprietaire",
  description: "Operations related to AbonnementProprietaire",
};

const abonnementProprietaireSchema: OpenAPIV3.ComponentsObject["schemas"] = {
  AbonnementProprietaireResponse: {
    properties: {
      id: { type: "string", format: "uuid" },
      proprietaireId: { type: "string", format: "uuid" },
      planId: { type: "string", format: "uuid" },
      type: {
        type: "string",
        enum: ["HEBDOMADAIRE", "TRIMESTRIEL", "SEMESTRIEL", "ANNUEL"],
        description: "Type d'abonnement SaaS",
      },
    
      createdAt: { type: "string", format: "date-time" },
      updatedAt: { type: "string", format: "date-time" },
        finAt: { type: "string", format: "date-time" },
      deleteAt: { type: "string", format: "date-time" },
    },
  },
};

const abonnementProprietairePath: OpenAPIV3.PathsObject = {
  "/abonnementProprietaire": {
    post: {
      tags: ["AbonnementProprietaire"],
      summary: "Create an abonnementProprietaire",
      description: "Create a new abonnement for a proprietaire",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["proprietaireId", "planId", "type"],
              properties: {
                proprietaireId: { type: "string", format: "uuid" },
                planId: { type: "string", format: "uuid" },
                type: {
                  type: "string",
                  enum: ["HEBDOMADAIRE", "TRIMESTRIEL", "SEMESTRIEL", "ANNUEL"],
                },
              },
            },
          },
        },
      },
      responses: {
        "201": {
          description: "AbonnementProprietaire created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/AbonnementProprietaireResponse" },
                },
              },
            },
          },
        },
        "400": { description: "Invalid input" },
        "404": { description: "Proprietaire not found" },
      },
    },
    get: {
      tags: ["AbonnementProprietaire"],
      summary: "Get abonnementProprietaires with pagination",
      description: "Get all abonnementProprietaires",
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
          description: "Paginated AbonnementProprietaires",
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
                        items: { $ref: "#/components/schemas/AbonnementProprietaireResponse" },
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

  "/abonnementProprietaire/{id}": {
    get: {
      tags: ["AbonnementProprietaire"],
      summary: "Get abonnementProprietaire by ID",
      description: "Retrieve an abonnementProprietaire by its unique id",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "The unique identifier of the abonnementProprietaire",
        },
      ],
      responses: {
        "200": {
          description: "AbonnementProprietaire found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/AbonnementProprietaireResponse" },
                },
              },
            },
          },
        },
        "404": { description: "AbonnementProprietaire not found" },
      },
    },
    patch: {
      tags: ["AbonnementProprietaire"],
      summary: "Update abonnementProprietaire by ID",
      description: "Update the data of an abonnementProprietaire",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "The unique identifier of the abonnementProprietaire",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["proprietaireId", "planId", "type"],
              properties: {
                proprietaireId: { type: "string", format: "uuid" },
                planId: { type: "string", format: "uuid" },
                type: {
                  type: "string",
                  enum: ["HEBDOMADAIRE", "TRIMESTRIEL", "SEMESTRIEL", "ANNUEL"],
                },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "AbonnementProprietaire updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/AbonnementProprietaireResponse" },
                },
              },
            },
          },
        },
        "404": { description: "AbonnementProprietaire not found" },
      },
    },
    delete: {
      tags: ["AbonnementProprietaire"],
      summary: "Delete abonnementProprietaire by ID",
      description: "Soft delete an abonnementProprietaire by its unique id",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "The unique identifier of the abonnementProprietaire",
        },
      ],
      responses: {
        "200": { description: "AbonnementProprietaire deleted successfully" },
        "404": { description: "AbonnementProprietaire not found" },
      },
    },
  },

  "/abonnementProprietaire/statut/{id}": {
    patch: {
      tags: ["AbonnementProprietaire"],
      summary: "Update abonnementProprietaire statut by ID",
      description: "Change the statut of an abonnementProprietaire (ACTIF / SUSPENDU / RESILIE / EXPIRE)",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "The unique identifier of the abonnementProprietaire",
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
                  data: { $ref: "#/components/schemas/AbonnementProprietaireResponse" },
                },
              },
            },
          },
        },
        "404": { description: "AbonnementProprietaire not found" },
      },
    },
  },

  "/abonnementProprietaire/email/{email}": {
    get: {
      tags: ["AbonnementProprietaire"],
      summary: "Get abonnementProprietaire by email",
      description: "Retrieve an abonnementProprietaire by the proprietaire's email address",
      parameters: [
        {
          name: "email",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "The email address of the proprietaire",
        },
      ],
      responses: {
        "200": {
          description: "AbonnementProprietaire found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/AbonnementProprietaireResponse" },
                },
              },
            },
          },
        },
        "404": { description: "AbonnementProprietaire not found" },
      },
    },
  },
};

export { abonnementProprietaireTags, abonnementProprietaireSchema, abonnementProprietairePath };