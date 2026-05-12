import validate from "../middleware/validate.middleware";
import { Router } from "express";
import { ClientController } from "./clientController";
import { ClientPaginationSchema, createClientSchema, ClientIdSchema, updateClientSchema } from "./clientSchema";
import { authMiddleware } from "../middleware/auth.middleware";

const router: Router = Router();
const clientController = new ClientController();



// router.use(authMiddleware);
router.post("", validate(createClientSchema, "body"), clientController.createClient);
router.get("", validate(ClientPaginationSchema, "query"), clientController.getClientPaginated);
router.get("/:id", validate(ClientIdSchema, "params"), clientController.getClientById);
router.patch("/statut/:id", validate(ClientIdSchema, "params"), validate(updateClientSchema, "body"), clientController.updateStatut);
router.delete("/:id", validate(ClientIdSchema, "params"), clientController.deleteClient);
router.patch("/:id", validate(ClientIdSchema, "params"), validate(createClientSchema, "body"), clientController.updateClient);
router.get("/email/:email", clientController.getClientByEmail);

export default router;