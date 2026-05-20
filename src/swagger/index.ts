import env from "../config/env";
import { OpenAPIV3 } from "openapi-types";
import { proprietairePath, proprietaireSchema, proprietaireTags } from "./proprietaire.swagger";
import { userPath, userSchema, userTags } from "./user.swagger";
import { sallePath, salleSchema, salleTags } from "./salle.swagger";
import { staffPath, staffSchema, staffTags } from "./staff.swagger";
import { clientPath, clientSchema, clientTags } from "./client.swagger";
import { abonnementClientPath, abonnementClientSchema, abonnementClientTags } from "./abonnementClient.swagger";
import { abonnementProprietairePath, abonnementProprietaireSchema, abonnementProprietaireTags } from "./abonnementProprietaire.swagger";
import { planAbonnementClientPath, planAbonnementClientSchema, planAbonnementClientTags } from "./planAbonnementClient.swagger";
import { planAbonnementProprietairePath, planAbonnementProprietaireSchema, planAbonnementProprietaireTags } from "./planAbonnementProprietaire.swagger";
import { facturePath, factureSchema, factureTags } from "./facture.swagger";
import { paiementPath, paiementSchema, paiementTags } from "./paiement.swagger";
import { notificationPath, notificationSchema, notificationTags } from "./notification.swagger";
import { authPath, authSchema, authTags } from "./auth.swagger";

export const tags: OpenAPIV3.TagObject[] = [
    userTags,
    proprietaireTags,
    salleTags,
    staffTags,
    clientTags,
    abonnementClientTags,
    abonnementProprietaireTags,
    planAbonnementClientTags,
    planAbonnementProprietaireTags,
    factureTags,
    paiementTags,
    notificationTags,
    authTags
];

export const paths: OpenAPIV3.PathsObject = {
    // Health endpoint
    '/health': {
        get: {
            tags: ['Health'],
            summary: 'Health check',
            description: 'Check if the API is running and healthy',
            security: [],
            responses: {
                '200': {
                    description: 'API is healthy',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean', example: true },
                                    message: { type: 'string', example: 'API is healthy' },
                                    timestamp: { type: 'string', format: 'date-time' },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    // Module paths
    ...userPath,
    ...proprietairePath,
    ...sallePath,
    ...staffPath,
    ...clientPath,
    ...abonnementClientPath,
    ...abonnementProprietairePath,
    ...planAbonnementClientPath,
    ...planAbonnementProprietairePath,
    ...facturePath,
    ...paiementPath,
    ...notificationPath,
    ...authPath

};

export const schemas: OpenAPIV3.ComponentsObject['schemas'] = {
    ...userSchema,
    ...proprietaireSchema,
    ...salleSchema,
    ...staffSchema,
    ...clientSchema,
    ...abonnementClientSchema,
    ...abonnementProprietaireSchema,
    ...planAbonnementClientSchema,
    ...planAbonnementProprietaireSchema,
    ...factureSchema,
    ...paiementSchema,
    ...notificationSchema,
    ...authSchema

};


export const swaggerSpec: OpenAPIV3.Document = {
    openapi: '3.0.0',
    info: {
        title: 'Rental Management API',
        version: '1.0.0'
        ,
        contact: {
            name: 'TAD IT Consulting',
            email: 'support@tad-it.consulting',
        },
        license: {
            name: 'MIT',
            url: 'https://opensource.org/licenses/MIT',
        },
    },
    servers: [
        {
            url: `http://localhost:${env.PORT}${env.API_PREFIX}`,
            description: 'Development server',
        },

    ],
    tags,
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
        schemas,
        // responses,
    },
    security: [
    ],
    paths,
};

export default swaggerSpec;
