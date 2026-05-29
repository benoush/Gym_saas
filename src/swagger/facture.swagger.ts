import { OpenAPIV3 } from "openapi-types";

const factureTags: OpenAPIV3.TagObject = {
  name: "Facture",
  description: "Operations related to Facture",
};

const factureSchema: OpenAPIV3.ComponentsObject["schemas"] = {
  FactureResponse: {
    properties: {
      id: { type: "string", format: "uuid" },
      typeFacture: {
        type: "string",
        enum: ["CLIENT", "PROPRIETAIRE"],
      },
      montant: { type: "string" },
      salleId: { type: "string", format: "uuid" },
      clientId: { type: "string", format: "uuid", nullable: true },
      AbonnementClientId: { type: "string", format: "uuid", nullable: true },
      proprietaireId: { type: "string", format: "uuid", nullable: true },
      AbonnementProprietaireId: { type: "string", format: "uuid", nullable: true },
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
      description: "Facture CLIENT : fournir clientId + AbonnementClientId. Facture PROPRIETAIRE : fournir proprietaireId + AbonnementProprietaireId",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["typeFacture", "montant", "salleId"],
              example: {
                typeFacture: "CLIENT",
                montant: "10000",
                salleId: "550e8400-e29b-41d4-a716-446655440000",
                clientId: "550e8400-e29b-41d4-a716-446655440001",
                AbonnementClientId: "550e8400-e29b-41d4-a716-446655440002",
              },
              properties: {
                typeFacture: {
                  type: "string",
                  enum: ["CLIENT", "PROPRIETAIRE"],
                },
                montant: { type: "string" },
                salleId: { type: "string", format: "uuid" },
                clientId: { type: "string", format: "uuid", description: "Requis si typeFacture = CLIENT" },
                AbonnementClientId: { type: "string", format: "uuid", description: "Requis si typeFacture = CLIENT" },
                proprietaireId: { type: "string", format: "uuid", description: "Requis si typeFacture = PROPRIETAIRE" },
                AbonnementProprietaireId: { type: "string", format: "uuid", description: "Requis si typeFacture = PROPRIETAIRE" },
              },
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Facture créée avec succès",
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
        "400": { description: "Champs manquants selon typeFacture" },
        "404": { description: "Ressource introuvable" },
        "422": { description: "Données invalides" },
      },
    },
    get: {
      tags: ["Facture"],
      summary: "Get factures with pagination",
      parameters: [
        { name: "page", in: "query", schema: { type: "integer", default: 1 } },
        { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
        { name: "typeFacture", in: "query", schema: { type: "string", enum: ["CLIENT", "PROPRIETAIRE"] } },
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
                      rows: { type: "array", items: { $ref: "#/components/schemas/FactureResponse" } },
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
      parameters: [{ name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } }],
      responses: {
        "200": {
          description: "Facture found",
          content: { "application/json": { schema: { type: "object", properties: { success: { type: "boolean" }, data: { $ref: "#/components/schemas/FactureResponse" } } } } },
        },
        "404": { description: "Facture not found" },
      },
    },
    patch: {
      tags: ["Facture"],
      summary: "Update facture by ID",
      parameters: [{ name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: { montant: { type: "string" } },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Facture updated",
          content: { "application/json": { schema: { type: "object", properties: { success: { type: "boolean" }, data: { $ref: "#/components/schemas/FactureResponse" } } } } },
        },
        "404": { description: "Facture not found" },
      },
    },
    delete: {
      tags: ["Facture"],
      summary: "Delete facture by ID",
      parameters: [{ name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } }],
      responses: {
        "200": { description: "Facture deleted successfully" },
        "404": { description: "Facture not found" },
      },
    },
  },
};

export { factureTags, factureSchema, facturePath };