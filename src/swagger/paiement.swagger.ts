import { OpenAPIV3 } from "openapi-types";

const paiementTags: OpenAPIV3.TagObject = {
  name: "Paiement",
  description: "Operations related to Paiement",
};

const paiementSchema: OpenAPIV3.ComponentsObject["schemas"] = {
  PaiementResponse: {
    properties: {
      id: { type: "string", format: "uuid" },
      factureId: { type: "string", format: "uuid" },
      statut: {
        type: "string",
        enum: ["EN_ATTENTE", "PAYE", "ECHOUE", "REMBOURSE"],
        description: "Statut du paiement",
      },
      methode: {
        type: "string",
        enum: ["ESPECES", "CARTE", "VIREMENT", "MOBILE_MONEY"],
        description: "Méthode de paiement",
      },
      num_transaction: { type: "string" },
      createdAt: { type: "string", format: "date-time" },
      updatedAt: { type: "string", format: "date-time" },
    },
  },
};

const paiementPath: OpenAPIV3.PathsObject = {
  "/paiement": {
    post: {
      tags: ["Paiement"],
      summary: "Create a paiement",
      description: "Create a new paiement linked to a facture",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["factureId", "statut", "methode", "num_transaction"],
              properties: {
                factureId: { type: "string", format: "uuid" },
                statut: {
                  type: "string",
                  enum: ["EN_ATTENTE", "PAYE", "ECHOUE", "REMBOURSE"],
                },
                methode: {
                  type: "string",
                  enum: ["ESPECES", "CARTE", "VIREMENT", "MOBILE_MONEY"],
                },
                num_transaction: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Paiement created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/PaiementResponse" },
                },
              },
            },
          },
        },
        "400": { description: "Invalid input" },
        "404": { description: "Facture not found" },
      },
    },
    get: {
      tags: ["Paiement"],
      summary: "Get paiements with pagination",
      description: "Get all paiements",
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
          description: "Paginated Paiements",
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
                        items: { $ref: "#/components/schemas/PaiementResponse" },
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

  "/paiement/statut/{id}": {
    patch: {
      tags: ["Paiement"],
      summary: "Update paiement statut by ID",
      description: "Change the statut of a paiement",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
          description: "The unique identifier of the paiement",
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
                  enum: ["EN_ATTENTE", "PAYE", "ECHOUE", "REMBOURSE"],
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
                  data: { $ref: "#/components/schemas/PaiementResponse" },
                },
              },
            },
          },
        },
        "404": { description: "Paiement not found" },
      },
    },
  },

  "/paiement/methode/{id}": {
    patch: {
      tags: ["Paiement"],
      summary: "Update paiement methode by ID",
      description: "Change the methode of a paiement",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
          description: "The unique identifier of the paiement",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["methode"],
              properties: {
                methode: {
                  type: "string",
                  enum: ["ESPECES", "CARTE", "VIREMENT", "MOBILE_MONEY"],
                },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Methode updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/PaiementResponse" },
                },
              },
            },
          },
        },
        "404": { description: "Paiement not found" },
      },
    },
  },

  "/paiement/{id}": {
    get: {
      tags: ["Paiement"],
      summary: "Get paiement by ID",
      description: "Retrieve a paiement by its unique id",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
          description: "The unique identifier of the paiement",
        },
      ],
      responses: {
        "200": {
          description: "Paiement found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/PaiementResponse" },
                },
              },
            },
          },
        },
        "404": { description: "Paiement not found" },
      },
    },
    patch: {
      tags: ["Paiement"],
      summary: "Update paiement by ID",
      description: "Update all fields of a paiement",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
          description: "The unique identifier of the paiement",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                factureId: { type: "string", format: "uuid" },
                statut: {
                  type: "string",
                  enum: ["EN_ATTENTE", "PAYE", "ECHOUE", "REMBOURSE"],
                },
                methode: {
                  type: "string",
                  enum: ["ESPECES", "CARTE", "VIREMENT", "MOBILE_MONEY"],
                },
                num_transaction: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Paiement updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/PaiementResponse" },
                },
              },
            },
          },
        },
        "404": { description: "Paiement not found" },
      },
    },
    delete: {
      tags: ["Paiement"],
      summary: "Delete paiement by ID",
      description: "Soft delete a paiement by its unique id",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
          description: "The unique identifier of the paiement",
        },
      ],
      responses: {
        "200": { description: "Paiement deleted successfully" },
        "404": { description: "Paiement not found" },
      },
    },
  },
};

export { paiementTags, paiementSchema, paiementPath };