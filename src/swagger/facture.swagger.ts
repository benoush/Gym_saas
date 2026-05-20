import { OpenAPIV3 } from "openapi-types";

const factureTags: OpenAPIV3.TagObject = {
  name: "Facture",
  description: "Operations related to Facture",
};

const factureSchema: OpenAPIV3.ComponentsObject["schemas"] = {
  FactureResponse: {
    properties: {
      id: { type: "string", format: "uuid" },
      clientId: { type: "string", format: "uuid" },
      proprietaireId: { type: "string", format: "uuid" },
      AbonnementClientId: { type: "string", format: "uuid" },
      AbonnementProprietaireId: { type: "string", format: "uuid" },
      salleId: { type: "string", format: "uuid" },
      montant: { type: "number", format: "float", minimum: 0 },
      createdAt: { type: "string", format: "date-time" },
      updatedAt: { type: "string", format: "date-time" },
    },
  },
};

const facturePath: OpenAPIV3.PathsObject = {
  "/facture": {
    post: {
      tags: ["Facture"],
      summary: "Create a facture",
      description: "Create a new facture",  
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: [
                "clientId",
                "proprietaireId",
                "AbonnementClientId",
                "AbonnementProprietaireId",
                "salleId",
                "montant",
              ],
              properties: {
                clientId: { type: "string", format: "uuid" },
                proprietaireId: { type: "string", format: "uuid" },
                AbonnementClientId: { type: "string", format: "uuid" },
                AbonnementProprietaireId: { type: "string", format: "uuid" },
                salleId: { type: "string", format: "uuid" },
                montant: { type: "number", format: "float", minimum: 0 },
              },
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Facture created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/FactureResponse" },
                },
              },
            },
          },
        },
        "400": { description: "Invalid input" },
        "404": { description: "Client, Proprietaire or Salle not found" },
      },
    },
    get: {
      tags: ["Facture"],
      summary: "Get factures with pagination",
      description: "Get all factures",
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
          description: "Paginated Factures",
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
                        items: { $ref: "#/components/schemas/FactureResponse" },
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

  "/facture/{id}": {
    get: {
      tags: ["Facture"],
      summary: "Get facture by ID",
      description: "Retrieve a facture by its unique id",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
          description: "The unique identifier of the facture",
        },
      ],
      responses: {
        "200": {
          description: "Facture found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/FactureResponse" },
                },
              },
            },
          },
        },
        "404": { description: "Facture not found" },
      },
    },
    patch: {
      tags: ["Facture"],
      summary: "Update facture by ID",
      description: "Update the information of a facture by its unique id",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
          description: "The unique identifier of the facture",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                clientId: { type: "string", format: "uuid" },
                proprietaireId: { type: "string", format: "uuid" },
                AbonnementClientId: { type: "string", format: "uuid" },
                AbonnementProprietaireId: { type: "string", format: "uuid" },
                salleId: { type: "string", format: "uuid" },
                montant: { type: "number", format: "float", minimum: 0 },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Facture updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/FactureResponse" },
                },
              },
            },
          },
        },
        "404": { description: "Facture not found" },
      },
    },
    delete: {
      tags: ["Facture"],
      summary: "Delete facture by ID",
      description: "Soft delete a facture by its unique id",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
          description: "The unique identifier of the facture",
        },
      ],
      responses: {
        "200": { description: "Facture deleted successfully" },
        "404": { description: "Facture not found" },
      },
    },
  },
};

export { factureTags, factureSchema, facturePath };