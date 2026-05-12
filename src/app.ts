import express , {Express,Request,Response} from "express";
import env from "config/env";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "swagger";
import {notFoundHandler,errorHandler} from "modules/middleware/error.middleware"
import proprietaireRoute from "modules/proprietaire/proprietaireRoute";
import userRoute from "modules/user/userRoute";
import salleRoute from "modules/salle/salleRoute";
import staffRoute from "modules/staff/staffRoute";
import clientRoute from "modules/client/clientRoute";
import abonnementProprietaireRoute from "modules/abonnementProprietaire/abonnementProprietaireRoute";
import abonnementClientRoute from "modules/abonnementClient/abonnementClientRoute";
import planAbonnementClientRoute from "modules/planAbonnementClient/planAbonnementClientRoute";
import planAbonnementProprietaireRoute from "modules/planAbonnementProprietaire/planAbonnementProprietaireRoute";
import factureRoute from "modules/facture/factureRoute";
import paiementRoute from "modules/paiement/paiementRoute";
import notificationRoute from "modules/notification/notificationRoute";


const app: Express = express();
const API_PREFIX = env.API_PREFIX;


// Parse JSON bodies
app.use(express.json({ limit: '10mb' }));

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true, limit: '10mb' }));


//cors origin
app.use(cors());

// Swagger UI setup
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
        explorer: true,
        customCss: ".swagger-ui .topbar { display: none }",
        customSiteTitle: "Rental Management API Documentation",
    }),
);

app.get("/api-docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
});

// Health check
app.get(`${API_PREFIX}/health`, (req: Request, res: Response) => {
    res.status(200).json({
        status: "ok",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: env.NODE_ENV,
    });
});


app.use(`${API_PREFIX}/proprietaire`, proprietaireRoute)
app.use(`${API_PREFIX}/user`, userRoute)
app.use(`${API_PREFIX}/salle`, salleRoute)
app.use(`${API_PREFIX}/staff`, staffRoute)
app.use(`${API_PREFIX}/client`, clientRoute)
app.use(`${API_PREFIX}/abonnementProprietaire`, abonnementProprietaireRoute)
app.use(`${API_PREFIX}/abonnementClient`, abonnementClientRoute)
app.use(`${API_PREFIX}/planAbonnementClient`, planAbonnementClientRoute)
app.use(`${API_PREFIX}/planAbonnementProprietaire`, planAbonnementProprietaireRoute)
app.use(`${API_PREFIX}/facture`, factureRoute)
app.use(`${API_PREFIX}/paiement`, paiementRoute)
app.use(`${API_PREFIX}/notification`, notificationRoute)

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);



export default app;