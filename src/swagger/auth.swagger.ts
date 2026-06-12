import { OpenAPIV3 } from "openapi-types";

export const authTags: OpenAPIV3.TagObject = {
  name: "Auth",
  description:
    "Authentification — inscription (PROPRIETAIRE), connexion, refresh/rotation des tokens, déconnexion, gestion et réinitialisation du mot de passe, profil.",
};

export const authSchema: OpenAPIV3.ComponentsObject["schemas"] = {
  // ─── Projection publique d'un utilisateur (jamais le mot de passe) ─────────
  PublicUser: {
    type: "object",
    properties: {
      id: { type: "string", format: "uuid" },
      email: { type: "string", format: "email" },
      nom: { type: "string", example: "Doe" },
      prenom: { type: "string", example: "John" },
      tel: { type: "string", example: "+22890000001" },
      sexe: { type: "string", enum: ["Homme", "Femme", "Autre"] },
      photo: { type: "string", nullable: true, example: null },
      role: {
        type: "string",
        enum: ["ADMIN", "CLIENT", "PROPRIETAIRE", "STAFF"],
        example: "PROPRIETAIRE",
      },
      createdAt: { type: "string", format: "date-time" },
    },
  },

  // ─── Requêtes ──────────────────────────────────────────────────────────────
  RegisterRequest: {
    type: "object",
    required: ["nom", "prenom", "sexe", "tel", "email", "password"],
    description:
      "Inscription publique. Le compte créé a TOUJOURS le rôle PROPRIETAIRE (le rôle n'est jamais accepté depuis le body).",
    properties: {
      nom: { type: "string", minLength: 2, maxLength: 100, example: "Doe" },
      prenom: { type: "string", minLength: 2, maxLength: 100, example: "John" },
      sexe: { type: "string", enum: ["Homme", "Femme", "Autre"], example: "Homme" },
      tel: { type: "string", minLength: 10, maxLength: 15, example: "+22890000001" },
      email: { type: "string", format: "email", example: "john.doe@gymsaas.com" },
      password: { type: "string", minLength: 6, example: "Secret123!" },
    },
  },

  LoginRequest: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: { type: "string", format: "email", example: "john.doe@gymsaas.com" },
      password: { type: "string", example: "Secret123!" },
    },
  },

  RefreshRequest: {
    type: "object",
    required: ["refreshToken"],
    properties: {
      refreshToken: { type: "string", example: "a1b2c3...", description: "Refresh token opaque obtenu au login/register." },
    },
  },

  LogoutRequest: {
    type: "object",
    required: ["refreshToken"],
    properties: {
      refreshToken: { type: "string", example: "a1b2c3..." },
    },
  },

  ChangePasswordRequest: {
    type: "object",
    required: ["oldPassword", "newPassword"],
    properties: {
      oldPassword: { type: "string", example: "Secret123!" },
      newPassword: { type: "string", minLength: 6, example: "NouveauMdp123!" },
    },
  },

  ForgotPasswordRequest: {
    type: "object",
    required: ["email"],
    properties: {
      email: { type: "string", format: "email", example: "john.doe@gymsaas.com" },
    },
  },

  ResetPasswordRequest: {
    type: "object",
    required: ["token", "newPassword"],
    properties: {
      token: { type: "string", description: "Token de réinitialisation reçu (par email en prod, retourné par /forgot-password en dev).", example: "f47ac10b..." },
      newPassword: { type: "string", minLength: 6, example: "NouveauMdp123!" },
    },
  },

  UpdateProfileRequest: {
    type: "object",
    description: "Au moins un champ doit être fourni. L'email, le rôle et le mot de passe ne sont PAS modifiables ici.",
    properties: {
      nom: { type: "string", minLength: 2, maxLength: 100, example: "Martin" },
      prenom: { type: "string", minLength: 2, maxLength: 100, example: "Jean" },
      sexe: { type: "string", enum: ["Homme", "Femme", "Autre"] },
      tel: { type: "string", minLength: 10, maxLength: 15, example: "+22899999999" },
      photo: { type: "string", format: "binary", description: "Fichier image (JPEG/PNG/WEBP, max 2 Mo)." },
    },
  },

  // ─── Réponses ──────────────────────────────────────────────────────────────
  AuthTokensResponse: {
    type: "object",
    properties: {
      success: { type: "boolean", example: true },
      data: {
        type: "object",
        properties: {
          accessToken: { type: "string", example: "eyJhbGci...", description: "JWT court (HS256)." },
          refreshToken: { type: "string", example: "a1b2c3...", description: "Token opaque pour /auth/refresh." },
          user: { $ref: "#/components/schemas/PublicUser" },
        },
      },
    },
  },

  UserResponse: {
    type: "object",
    properties: {
      success: { type: "boolean", example: true },
      data: { $ref: "#/components/schemas/PublicUser" },
    },
  },

  MessageResponse: {
    type: "object",
    properties: {
      success: { type: "boolean", example: true },
      message: { type: "string", example: "Opération réussie" },
    },
  },

  ForgotPasswordResponse: {
    type: "object",
    properties: {
      success: { type: "boolean", example: true },
      message: {
        type: "string",
        example: "Si un compte existe pour cet email, un lien de réinitialisation a été envoyé",
      },
      data: {
        type: "object",
        properties: {
          resetToken: {
            type: "string",
            description: "Présent UNIQUEMENT hors production (faute d'infra email). À envoyer par email en production.",
            example: "f47ac10b...",
          },
        },
      },
    },
  },
};

export const authPath: OpenAPIV3.PathsObject = {
  "/auth/register": {
    post: {
      tags: ["Auth"],
      summary: "Créer un compte (PROPRIETAIRE)",
      description:
        "Inscription publique. Le compte est toujours créé avec le rôle PROPRIETAIRE. Retourne un access token, un refresh token et le profil.",
      security: [],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/RegisterRequest" },
          },
        },
      },
      responses: {
        "201": {
          description: "Compte créé — tokens + profil",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AuthTokensResponse" },
            },
          },
        },
        "400": { description: "Données invalides ou email déjà utilisé" },
      },
    },
  },

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
          description: "Connexion réussie — access + refresh tokens et profil",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AuthTokensResponse" },
            },
          },
        },
        "400": { description: "Données invalides" },
        "401": { description: "Identifiants invalides" },
      },
    },
  },

  "/auth/refresh": {
    post: {
      tags: ["Auth"],
      summary: "Renouveler les tokens (rotation)",
      description:
        "Révoque le refresh token fourni et en émet un nouveau couple. Le rejeu d'un token révoqué/expiré révoque toutes les sessions de l'utilisateur.",
      security: [],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/RefreshRequest" },
          },
        },
      },
      responses: {
        "200": {
          description: "Nouveau couple access + refresh",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AuthTokensResponse" },
            },
          },
        },
        "400": { description: "Données invalides" },
        "401": { description: "Refresh token invalide ou expiré" },
      },
    },
  },

  "/auth/logout": {
    post: {
      tags: ["Auth"],
      summary: "Se déconnecter (révoque un refresh token)",
      description: "Révoque le refresh token fourni. Idempotent.",
      security: [],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/LogoutRequest" },
          },
        },
      },
      responses: {
        "200": {
          description: "Déconnexion réussie",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MessageResponse" },
            },
          },
        },
        "400": { description: "Données invalides" },
      },
    },
  },

  "/auth/logout-all": {
    post: {
      tags: ["Auth"],
      summary: "Fermer toutes les sessions",
      description: "Révoque tous les refresh tokens actifs de l'utilisateur connecté.",
      security: [{ bearerAuth: [] }],
      responses: {
        "200": {
          description: "Toutes les sessions ont été fermées",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MessageResponse" },
            },
          },
        },
        "401": { description: "Token manquant ou invalide" },
      },
    },
  },

  "/auth/forgot-password": {
    post: {
      tags: ["Auth"],
      summary: "Demander une réinitialisation de mot de passe",
      description:
        "Réponse générique (anti-énumération de comptes). En développement, le token de réinitialisation est retourné dans `data.resetToken`.",
      security: [],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ForgotPasswordRequest" },
          },
        },
      },
      responses: {
        "200": {
          description: "Demande prise en compte",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ForgotPasswordResponse" },
            },
          },
        },
        "400": { description: "Données invalides" },
      },
    },
  },

  "/auth/reset-password": {
    post: {
      tags: ["Auth"],
      summary: "Réinitialiser le mot de passe via un token",
      description:
        "Valide le token (existence + expiration), met à jour le mot de passe et révoque toutes les sessions.",
      security: [],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ResetPasswordRequest" },
          },
        },
      },
      responses: {
        "200": {
          description: "Mot de passe réinitialisé",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MessageResponse" },
            },
          },
        },
        "400": { description: "Token invalide ou expiré / données invalides" },
      },
    },
  },

  "/auth/change-password": {
    post: {
      tags: ["Auth"],
      summary: "Changer son mot de passe",
      description:
        "Vérifie l'ancien mot de passe, le remplace et révoque toutes les sessions (re-login requis ailleurs).",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ChangePasswordRequest" },
          },
        },
      },
      responses: {
        "200": {
          description: "Mot de passe modifié",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MessageResponse" },
            },
          },
        },
        "400": { description: "Ancien mot de passe incorrect / données invalides" },
        "401": { description: "Token manquant ou invalide" },
      },
    },
  },

  "/auth/me": {
    get: {
      tags: ["Auth"],
      summary: "Profil de l'utilisateur connecté",
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
    patch: {
      tags: ["Auth"],
      summary: "Mettre à jour son profil",
      description:
        "Champs autorisés uniquement : nom, prénom, sexe, téléphone, photo. L'email, le rôle et le mot de passe ne sont pas modifiables ici.",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: { $ref: "#/components/schemas/UpdateProfileRequest" },
          },
        },
      },
      responses: {
        "200": {
          description: "Profil mis à jour",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UserResponse" },
            },
          },
        },
        "400": { description: "Données invalides" },
        "401": { description: "Token manquant ou invalide" },
      },
    },
  },
};
