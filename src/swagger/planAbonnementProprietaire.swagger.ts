import { OpenAPIV3 } from "openapi-types";

const planAbonnementProprietaireTags: OpenAPIV3.TagObject = {
  name: "PlanAbonnementProprietaire",
  description: "Operations related to PlanAbonnementProprietaire",
};

const planAbonnementProprietaireSchema: OpenAPIV3.ComponentsObject["schemas"] = {
  PlanAbonnementProprietaireResponse: {
    properties: {
      id: { type: "string", format: "uuid" },
      type: {
        type: "string",
        enum: ["BASIC", "PRO", "PREMIUM"],
        description: "Type du plan abonnement proprietaire",
      },
      prix: { type: "number", format: "float", minimum: 0 },
      description: { type: "string" },
      createdAt: { type: "string", format: "date-time" },
      updatedAt: { type: "string", format: "date-time" },
    },
  },
};

const planAbonnementProprietairePath: OpenAPIV3.PathsObject = {
  "/planAbonnementProprietaire": {
    post: {
      tags: ["PlanAbonnementProprietaire"],
      summary: "Create a planAbonnementProprietaire",
      description: "Create a new plan abonnement for a proprietaire",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["type", "prix", "description"],
              properties: {
                type: {
                  type: "string",
                  enum: ["BASIC", "PRO", "PREMIUM"],
                },
                prix: { type: "number", minimum: 0 },
                description: { type: "string", maxLength: 255 },
              },
            },
          },
        },
      },
      responses: {
        "201": {
          description: "PlanAbonnementProprietaire created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/PlanAbonnementProprietaireResponse" },
                },
              },
            },
          },
        },
        "400": { description: "Invalid input" },
      },
    },
    get: {
      tags: ["PlanAbonnementProprietaire"],
      summary: "Get planAbonnementProprietaires with pagination",
      description: "Get all planAbonnementProprietaires",
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
          description: "Paginated PlanAbonnementProprietaires",
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
                        items: { $ref: "#/components/schemas/PlanAbonnementProprietaireResponse" },
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

  "/planAbonnementProprietaire/type/{id}": {
    patch: {
      tags: ["PlanAbonnementProprietaire"],
      summary: "Update planAbonnementProprietaire type by ID",
      description: "Change the type of a planAbonnementProprietaire",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "The unique identifier of the planAbonnementProprietaire",
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
                  enum: ["HEBDOMADAIRE", "TRIMESTRIEL", "SEMESTRIEL", "ANNUEL"],
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
                  data: { $ref: "#/components/schemas/PlanAbonnementProprietaireResponse" },
                },
              },
            },
          },
        },
        "404": { description: "PlanAbonnementProprietaire not found" },
      },
    },
  },

  "/planAbonnementProprietaire/{id}": {
    get: {
      tags: ["PlanAbonnementProprietaire"],
      summary: "Get planAbonnementProprietaire by ID",
      description: "Retrieve a planAbonnementProprietaire by its unique id",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "The unique identifier of the planAbonnementProprietaire",
        },
      ],
      responses: {
        "200": {
          description: "PlanAbonnementProprietaire found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/PlanAbonnementProprietaireResponse" },
                },
              },
            },
          },
        },
        "404": { description: "PlanAbonnementProprietaire not found" },
      },
    },
    patch: {
      tags: ["PlanAbonnementProprietaire"],
      summary: "Update planAbonnementProprietaire by ID",
      description: "Update type, prix or description of a planAbonnementProprietaire",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "The unique identifier of the planAbonnementProprietaire",
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
                prix: { type: "number", minimum: 0 },
                description: { type: "string", maxLength: 255 },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "PlanAbonnementProprietaire updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/PlanAbonnementProprietaireResponse" },
                },
              },
            },
          },
        },
        "404": { description: "PlanAbonnementProprietaire not found" },
      },
    },
    delete: {
      tags: ["PlanAbonnementProprietaire"],
      summary: "Delete planAbonnementProprietaire by ID",
      description: "Soft delete a planAbonnementProprietaire by its unique id",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "The unique identifier of the planAbonnementProprietaire",
        },
      ],
      responses: {
        "200": { description: "PlanAbonnementProprietaire deleted successfully" },
        "404": { description: "PlanAbonnementProprietaire not found" },
      },
    },
  },
};

export { planAbonnementProprietaireTags, planAbonnementProprietaireSchema, planAbonnementProprietairePath };