import { OpenAPIV3 } from "openapi-types";

const proprietaireTags: OpenAPIV3.TagObject = {
  name: "Proprietaire",
  description: "Operations related to Proprietaire",
};

const proprietaireSchema: OpenAPIV3.ComponentsObject["schemas"] = {
  ProprietaireResponse: {
    properties: {
      id: { type: "string", format: "uuid" },
      userId: { type: "string", format: "uuid" },
      recto_carte_identite: { type: "string" },
      verso_carte_identite: { type: "string" },
      doc_justificatif: { type: "string" },
      createdAt: { type: "string", format: "date-time" },
      updatedAt: { type: "string", format: "date-time" },
    },
  },
};

const proprietairePath: OpenAPIV3.PathsObject = {
  "/proprietaire": {
    post: {
      tags: ["Proprietaire"],
      summary: "Create a proprietaire",
      description: "Create a new proprietaire",
      security: [{ bearerAuth: [] }],
     
      //   required: true,
      //   content: {
      //     "multipart/form-data": {
      //       schema: {
      //         type: "object",
      //         required: ["userId", "recto_carte_identite", "verso_carte_identite", "doc_justificatif"],
      //         properties: {
      //           userId: { type: "string", format: "uuid" },
      //           recto_carte_identite: { type: "string", format: "binary" },
      //           verso_carte_identite: { type: "string", format: "binary" },
      //           doc_justificatif: { type: "string", format: "binary" },
      //         },
      //       },
      //     },
      //   },
      // },
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
                "recto_carte_identite",
                "verso_carte_identite",
                "doc_justificatif"
              ],
              properties: {
                photo: { type: "string", format: "binary" },
                nom: { type: "string" },
                prenom: { type: "string" },
                email: { type: "string", format: "email" },
                tel: { type: "string" },
                sexe: { type: "string" },
                password: { type: "string" },
                recto_carte_identite: { type: "string", format: "binary" },
                verso_carte_identite: { type: "string", format: "binary" },
                doc_justificatif: { type: "string", format: "binary" },              
              },
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Proprietaire created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/ProprietaireResponse" },
                },
              },
            },
          },
        },
        "400": { description: "Invalid input" },
      },
    },
    get: {
      tags: ["Proprietaire"],
      summary: "Get proprietaires with pagination",
      description: "Get all proprietaires",
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
          description: "Paginated Proprietaire",
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
                        items: { $ref: "#/components/schemas/ProprietaireResponse" },
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

  "/proprietaire/{id}": {
    get: {
      tags: ["Proprietaire"],
      summary: "Get proprietaire by ID",
      description: "Retrieve a proprietaire by their unique id",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
          description: "The unique identifier of the proprietaire",
        },
      ],
      responses: {
        "200": {
          description: "Proprietaire found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/ProprietaireResponse" },
                },
              },
            },
          },
        },
        "404": { description: "Proprietaire not found" },
      },
    },
    patch: {
      tags: ["Proprietaire"],
      summary: "Update proprietaire by ID",
      description: "Update the information of the proprietaire by their unique id",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
          description: "The unique identifier of the proprietaire",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                recto_carte_identite: { type: "string", format: "binary" },
                verso_carte_identite: { type: "string", format: "binary" },
                doc_justificatif: { type: "string", format: "binary" },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Proprietaire updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/ProprietaireResponse" },
                },
              },
            },
          },
        },
        "404": { description: "Proprietaire not found" },
      },
    },
    delete: {
      tags: ["Proprietaire"],
      summary: "Delete proprietaire by ID",
      description: "Delete a proprietaire by their unique id",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
          description: "The unique identifier of the proprietaire",
        },
      ],
      responses: {
        "200": { description: "Proprietaire deleted successfully" },
        "404": { description: "Proprietaire not found" },
      },
    },
  },

  "/proprietaire/email/{email}": {
    get: {
      tags: ["Proprietaire"],
      summary: "Get proprietaire by EMAIL",
      description: "Retrieve a proprietaire by their mail address",
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
          description: "Proprietaire found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/ProprietaireResponse" },
                },
              },
            },
          },
        },
        "404": { description: "Proprietaire not found" },
      },
    },
  },
};

export { proprietaireTags, proprietaireSchema, proprietairePath };