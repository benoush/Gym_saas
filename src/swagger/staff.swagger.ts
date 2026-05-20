import { OpenAPIV3 } from "openapi-types";

const staffTags: OpenAPIV3.TagObject = {
  name: "Staff",
  description: "Operations related to Staff",
};

const staffSchema: OpenAPIV3.ComponentsObject["schemas"] = {
  StaffResponse: {
    properties: {
      id: { type: "string" },
      userId: { type: "string", format: "uuid" },
      salleId: { type: "string", format: "uuid" },
      createdAt: { type: "string", format: "date-time" },
      updatedAt: { type: "string", format: "date-time" },
    },
  },
};

const staffPath: OpenAPIV3.PathsObject = {
  "/staff": {
    post: {
      tags: ["Staff"],
      summary: "Create a staff",
      description: "Create a new staff member",
      // requestBody: {
      //   required: true,
      //   content: {
      //     "application/json": {
      //       schema: {
      //         type: "object",
      //         required: ["userId", "salleId"],
      //         properties: {
      //           userId: { type: "string", format: "uuid" },
      //           salleId: { type: "string", format: "uuid" },
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
                "salleId"
              ],
              properties: {
                photo: { type: "string", format: "binary" },
                salleId: { type: "string", format: "uuid" },

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
          description: "Staff created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/StaffResponse" },
                },
              },
            },
          },
        },
        "400": { description: "Invalid input" },
        "404": { description: "User or Salle not found" },
      },
    },
    get: {
      tags: ["Staff"],
      summary: "Get staff with pagination",
      description: "Get all staff members",
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
          description: "Paginated Staff",
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
                        items: { $ref: "#/components/schemas/StaffResponse" },
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

  "/staff/{id}": {
    get: {
      tags: ["Staff"],
      summary: "Get staff by ID",
      description: "Retrieve a staff member by their unique id",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "The unique identifier of the staff member",
        },
      ],
      responses: {
        "200": {
          description: "Staff found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/StaffResponse" },
                },
              },
            },
          },
        },
        "404": { description: "Staff not found" },
      },
    },
    patch: {
      tags: ["Staff"],
      summary: "Update staff by ID",
      description: "Update the information of a staff member by their unique id",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "The unique identifier of the staff member",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                userId: { type: "string", format: "uuid" },
                salleId: { type: "string", format: "uuid" },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Staff updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/StaffResponse" },
                },
              },
            },
          },
        },
        "404": { description: "Staff not found" },
      },
    },
    delete: {
      tags: ["Staff"],
      summary: "Delete staff by ID",
      description: "Delete a staff member by their unique id",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "The unique identifier of the staff member",
        },
      ],
      responses: {
        "200": { description: "Staff deleted successfully" },
        "404": { description: "Staff not found" },
      },
    },
  },

  "/staff/email/{email}": {
    get: {
      tags: ["Staff"],
      summary: "Get staff by email",
      description: "Retrieve a staff member by their email address",
      parameters: [
        {
          name: "email",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "The email address of the staff member",
        },
      ],
      responses: {
        "200": {
          description: "Staff found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/StaffResponse" },
                },
              },
            },
          },
        },
        "404": { description: "Staff not found" },
      },
    },
  },
};

export { staffTags, staffSchema, staffPath };