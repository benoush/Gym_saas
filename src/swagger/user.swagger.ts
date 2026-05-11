import { OpenAPIV3 } from "openapi-types";

const userTags: OpenAPIV3.TagObject = {
  name: "User",
  description: "Operations related to User",
};

const userSchema: OpenAPIV3.ComponentsObject["schemas"] = {
  UserResponse: {
    type: "object",
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
};

const userPath: OpenAPIV3.PathsObject = {
  "/user": {
    post: {
      tags: ["User"],
      summary: "Create a user",
      description: "Create a new user",
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
                "role",
              ],
              properties: {
                photo: { type: "string", format: "binary" },

                nom: { type: "string" },
                prenom: { type: "string" },
                email: { type: "string", format: "email" },
                tel: { type: "string" },
                sexe: { type: "string" },
                password: { type: "string" },
                role: {
                  type: "string",
                  enum: ["PROPRIETAIRE", "CLIENT", "STAFF"],
                },
              },
            },
          },
        },
      },
      responses: {
        "201": {
          description: "User created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/UserResponse" },
                },
              },
            },
          },
        },
        "400": { description: "Invalid input" },
      },
    },

    get: {
      tags: ["User"],
      summary: "Get users with pagination",
      description: "Retrieve all users",
      parameters: [
        {
          name: "page",
          in: "query",
          schema: { type: "integer", default: 1 },
        },
        {
          name: "limit",
          in: "query",
          schema: { type: "integer", default: 10 },
        },
      ],
      responses: {
        "200": {
          description: "Paginated users",
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
                        items: { $ref: "#/components/schemas/UserResponse" },
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

  "/user/{id}": {
    get: {
      tags: ["User"],
      summary: "Get user by ID",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
        },
      ],
      responses: {
        "200": {
          description: "User found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/UserResponse" },
                },
              },
            },
          },
        },
        "404": { description: "User not found" },
      },
    },

    patch: {
      tags: ["User"],
      summary: "Update user",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                photo: { type: "string", format: "binary" },

                nom: { type: "string" },
                prenom: { type: "string" },
                email: { type: "string", format: "email" },
                tel: { type: "string" },
                sexe: { type: "string" },
                password: { type: "string" },
                role: {
                  type: "string",
                  enum: ["PROPRIETAIRE", "CLIENT", "STAFF"],
                },
              },
            },
          },
        },
      },
      responses: {
        "200": { description: "User updated successfully" },
        "404": { description: "User not found" },
      },
    },

    delete: {
      tags: ["User"],
      summary: "Delete user",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
        },
      ],
      responses: {
        "200": { description: "User deleted successfully" },
        "404": { description: "User not found" },
      },
    },
  },

  "/user/email/{email}": {
    get: {
      tags: ["User"],
      summary: "Get user by email",
      parameters: [
        {
          name: "email",
          in: "path",
          required: true,
          schema: { type: "string", format: "email" },
        },
      ],
      responses: {
        "200": {
          description: "User found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  data: { $ref: "#/components/schemas/UserResponse" },
                },
              },
            },
          },
        },
        "404": { description: "User not found" },
      },
    },
  },
};

export { userTags, userSchema, userPath };