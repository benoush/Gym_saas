import express , {Express,Request,Response} from "express";
import env from "config/env";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "swagger";


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
/*
app.use(`${API_PREFIX}/article`, articleroute)
app.use(`${API_PREFIX}/todo`, todoroute)
app.use(`${env.API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/user`, userRoute)
*/


/*
// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);
*/


export default app;