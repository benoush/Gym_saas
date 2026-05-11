import { OpenAPIV3 } from "openapi-types";

const salleTags: OpenAPIV3.TagObject = {
  name: "Salle",
  description: "Operations related to Salle",
};

const salleSchema: OpenAPIV3.ComponentsObject["schemas"] = {
  SalleResponse: {
    properties: {
      id: { type: "string", format: "uuid" },
      proprietaireId: { type: "string", format: "uuid" },
      nom: { type: "string" },
      contact: { type: "string" },
      adresse: { type: "string" },
      horaire: { type: "string" },
      createdAt: { type: "string", format: "date-time" },
      updatedAt: { type: "string", format: "date-time" },
    },
  },
};

const sallePath: OpenAPIV3.PathsObject = {
  "/salle": {
    post: {
      tags: ["Salle"],
      summary: "Create a salle",
      description: "Create a new salle",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["proprietaireId", "nom", "contact", "adresse", "horaire"],
              properties: {
                proprietaireId: { type: "string", format: "uuid" },
                nom: { type: "string", maxLength: 100 },
                contact: { type: "string", maxLength: 100 },
                adresse: { type: "string", maxLength: 200 },
                horaire: { type: "string", maxLength: 100 },
              },
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Salle created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/SalleResponse" },
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
      tags: ["Salle"],
      summary: "Get salles with pagination",
      description: "Get all salles",
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
          description: "Paginated Salle",
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
                        items: { $ref: "#/components/schemas/SalleResponse" },
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

  "/salle/{id}": {
    get: {
      tags: ["Salle"],
      summary: "Get salle by ID",
      description: "Retrieve a salle by its unique id",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
          description: "The unique identifier of the salle",
        },
      ],
      responses: {
        "200": {
          description: "Salle found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/SalleResponse" },
                },
              },
            },
          },
        },
        "404": { description: "Salle not found" },
      },
    },
    patch: {
      tags: ["Salle"],
      summary: "Update salle by ID",
      description: "Update the information of a salle by its unique id",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
          description: "The unique identifier of the salle",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                proprietaireId: { type: "string", format: "uuid" },
                nom: { type: "string", maxLength: 100 },
                contact: { type: "string", maxLength: 100 },
                adresse: { type: "string", maxLength: 200 },
                horaire: { type: "string", maxLength: 100 },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Salle updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/SalleResponse" },
                },
              },
            },
          },
        },
        "404": { description: "Salle not found" },
      },
    },
    delete: {
      tags: ["Salle"],
      summary: "Delete salle by ID",
      description: "Delete a salle by its unique id",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
          description: "The unique identifier of the salle",
        },
      ],
      responses: {
        "200": { description: "Salle deleted successfully" },
        "404": { description: "Salle not found" },
      },
    },
  },
};

export { salleTags, salleSchema, sallePath };