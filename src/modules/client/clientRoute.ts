import validate from "../middleware/validate.middleware";
import { Router } from "express";
import { ClientController } from "./clientController";
import { ClientPaginationSchema, createClientSchema, ClientIdSchema, updateClientSchema } from "./clientSchema";
import { authMiddleware, isStaff } from "../middleware/auth.middleware";
import { uploadAvatar } from "config/multer";

const router: Router = Router();
const clientController = new ClientController();



// router.use(authMiddleware);
router.post("", uploadAvatar.single("photo"), validate(createClientSchema, "body"), clientController.createClient);
router.get("", validate(ClientPaginationSchema, "query"), clientController.getClientPaginated);
router.get("/:id", validate(ClientIdSchema, "params"), clientController.getClientById);
router.patch("/statut/:id",isStaff, validate(ClientIdSchema, "params"), validate(updateClientSchema, "body"), clientController.updateStatut);
router.delete("/:id",isStaff, validate(ClientIdSchema, "params"), clientController.deleteClient);
router.patch("/:id",isStaff, validate(ClientIdSchema, "params"), validate(createClientSchema, "body"), clientController.updateClient);
router.get("/email/:email", clientController.getClientByEmail);

export default router;