import http from 'http';
import app from './app';
import env from 'config/env';
import {testConnection,syncDatabase} from "database/sequelize";
import { ensureDefaultAdmin } from "database/bootstrapAdmin";
import { startCronJobs } from "./cron/cronjobs";


let server: http.Server;

const startServer = async () => {
    const dbConnect = await testConnection();
    if (!dbConnect) {
        console.error("Failed to connect to the database. Server will not start.");
        process.exit(1);
    }

    await syncDatabase(false, true); // Set force to false and alter to true for safer schema updates

    // Provisionne le compte admin par défaut piloté par les variables d'environnement.
    try {
        await ensureDefaultAdmin();
    } catch (error) {
        console.error("Échec du provisionnement de l'admin par défaut :", error);
        process.exit(1);
    }

    try {
        server = http.createServer(app);
        const PORT = env.PORT || 3000;
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error creating server:", error);
        process.exit(1);
    }
};

startServer();

startCronJobs();

export default server;