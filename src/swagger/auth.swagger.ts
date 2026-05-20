import { OpenAPIV3 } from "openapi-types";

export const authTags: OpenAPIV3.TagObject = {
  name: "Auth",
  description: "Authentification — register, login et accès par rôle",
};

export const authSchema: OpenAPIV3.ComponentsObject["schemas"] = {
  RegisterRequest: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: { type: "string", format: "email", example: "user@example.com" },
      password: { type: "string", minLength: 6, example: "123456" },
      role: {
        type: "string",
        enum: ["ADMIN", "CLIENT", "PROPRIETAIRE", "STAFF"],
        default: "CLIENT",
        example: "CLIENT",
      },
    },
  },

  LoginRequest: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: { type: "string", format: "email", example: "user@example.com" },
      password: { type: "string", example: "123456" },
    },
  },

  AuthResponse: {
    type: "object",
    properties: {
      success: { type: "boolean", example: true },
      data: {
        type: "object",
        properties: {
          token: { type: "string", example: "eyJhbGci..." },
        },
      },
    },
  },

  UserResponse: {
    type: "object",
    properties: {
      success: { type: "boolean", example: true },
      data: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          nom: { type: "string" },
          prenom: { type: "string" },
          email: { type: "string", format: "email" },
          tel: { type: "string" },
          sexe: { type: "string" },
          role: {
            type: "string",
            enum: ["ADMIN", "CLIENT", "PROPRIETAIRE", "STAFF"],
          },
          photo: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
    },
  },
};

export const authPath: OpenAPIV3.PathsObject = {
  // "/auth/register": {
  //   post: {
  //     tags: ["Auth"],
  //     summary: "Créer un compte",
  //     security: [],
  //     requestBody: {
  //       required: true,
  //       content: {
  //         "application/json": {
  //           schema: { $ref: "#/components/schemas/RegisterRequest" },
  //         },
  //       },
  //     },
  //     responses: {
  //       "201": {
  //         description: "Compte créé avec succès",
  //         content: {
  //           "application/json": {
  //             schema: { $ref: "#/components/schemas/UserResponse" },
  //           },
  //         },
  //       },
  //       "400": { description: "Données invalides ou email déjà utilisé" },
  //     },
  //   },
  // },

  "/auth/login": {
    post: {
      tags: ["Auth"],
      summary: "Se connecter",
      security: [],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/LoginRequest" },
          },
        },
      },
      responses: {
        "200": {
          description: "Connexion réussie — retourne un token JWT",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AuthResponse" },
            },
          },
        },
        "401": { description: "Identifiants invalides" },
      },
    },
  },

  "/auth/me": {
    get: {
      tags: ["Auth"],
      summary: "Profil du user connecté",
      security: [{ bearerAuth: [] }],
      responses: {
        "200": {
          description: "Profil retourné",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UserResponse" },
            },
          },
        },
        "401": { description: "Token manquant ou invalide" },
        "404": { description: "Utilisateur introuvable" },
      },
    },
  },

  // "/auth/admin": {
  //   get: {
  //     tags: ["Auth"],
  //     summary: "Route réservée aux ADMIN",
  //     security: [{ bearerAuth: [] }],
  //     responses: {
  //       "200": {
  //         description: "Accès ADMIN OK",
  //         content: {
  //           "application/json": {
  //             schema: {
  //               type: "object",
  //               properties: {
  //                 message: { type: "string", example: "Accès ADMIN OK" },
  //               },
  //             },
  //           },
  //         },
  //       },
  //       "401": { description: "Token manquant ou invalide" },
  //       "403": { description: "Accès refusé — rôle insuffisant" },
  //     },
  //   },
  // },

  // "/auth/staff": {
  //   get: {
  //     tags: ["Auth"],
  //     summary: "Route réservée aux STAFF et ADMIN",
  //     security: [{ bearerAuth: [] }],
  //     responses: {
  //       "200": {
  //         description: "Accès STAFF OK",
  //         content: {
  //           "application/json": {
  //             schema: {
  //               type: "object",
  //               properties: {
  //                 message: { type: "string", example: "Accès STAFF OK" },
  //               },
  //             },
  //           },
  //         },
  //       },
  //       "401": { description: "Token manquant ou invalide" },
  //       "403": { description: "Accès refusé — rôle insuffisant" },
  //     },
  //   },
  // },
};