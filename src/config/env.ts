import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export interface EnvConfig {
  PORT: number;
  NODE_ENV: "development" | "production" | "test";
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_DIALECT: "postgres" | "mysql" | "sqlite" | "mariadb" | "mssql";
  DB_LOGGING: boolean;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  // Durée de vie de l'access token JWT (format jsonwebtoken, ex. "15m")
  JWT_ACCESS_EXPIRES_IN: string;
  // Durée de vie d'un refresh token, en jours
  JWT_REFRESH_EXPIRES_DAYS: number;
  // Durée de validité d'un token de réinitialisation de mot de passe, en minutes
  PASSWORD_RESET_EXPIRES_MIN: number;

  // Compte administrateur par défaut (provisionné au démarrage)
  ADMIN_EMAIL: string;
  ADMIN_PASSWORD: string;
  ADMIN_NOM: string;
  ADMIN_PRENOM: string;
  ADMIN_TEL: string;
  ADMIN_SEXE: string;

  API_PREFIX?: string;
}

const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
};

const getEnvVarNumber = (key: string, defaultValue?: number): number => {
  const value = process.env[key] || defaultValue?.toString();
  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  const numValue = Number(value);
  if (isNaN(numValue)) {
    throw new Error(`Environment variable ${key} is not a valid number`);
  }
  return numValue;
};

export const env: EnvConfig = {

  //General
  NODE_ENV: getEnvVar("NODE_ENV", "development") as
    | "development"
    | "production"
    | "test",

  //Database
  DB_HOST: getEnvVar("DB_HOST", "localhost"),
  DB_PORT: getEnvVarNumber("DB_PORT"),
  DB_USER: getEnvVar("DB_USER", "root"),
  DB_PASSWORD: getEnvVar("DB_PASSWORD", ""),
  DB_NAME: getEnvVar("DB_NAME", "test"),
  DB_DIALECT: getEnvVar("DB_DIALECT", "postgres") as
    | "postgres"
    | "mysql"
    | "sqlite"
    | "mariadb"
    | "mssql",
  DB_LOGGING: getEnvVar("DB_LOGGING", "false").toLowerCase() === "true",
  //API
  PORT: getEnvVarNumber("PORT"),
  API_PREFIX: getEnvVar("API_PREFIX", "/api"),
  JWT_SECRET: getEnvVar("JWT_SECRET"),
  JWT_EXPIRES_IN: getEnvVar("JWT_EXPIRES_IN", "7d"),
  JWT_ACCESS_EXPIRES_IN: getEnvVar("JWT_ACCESS_EXPIRES_IN", "15m"),
  JWT_REFRESH_EXPIRES_DAYS: getEnvVarNumber("JWT_REFRESH_EXPIRES_DAYS", 30),
  PASSWORD_RESET_EXPIRES_MIN: getEnvVarNumber("PASSWORD_RESET_EXPIRES_MIN", 60),

  //Admin par défaut
  ADMIN_EMAIL: getEnvVar("ADMIN_EMAIL", "admin@gymsaas.com"),
  ADMIN_PASSWORD: getEnvVar("ADMIN_PASSWORD", "ChangeMe123!"),
  ADMIN_NOM: getEnvVar("ADMIN_NOM", "Root"),
  ADMIN_PRENOM: getEnvVar("ADMIN_PRENOM", "Admin"),
  ADMIN_TEL: getEnvVar("ADMIN_TEL", "+22890000000"),
  ADMIN_SEXE: getEnvVar("ADMIN_SEXE", "Autre"),

};

export default env;