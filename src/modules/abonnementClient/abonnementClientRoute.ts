import validate from "../middleware/validate.middleware";
import { Router } from "express";
import { AbonnementClientController } from "./abonnementClientController";
import { AbonnementClientPaginationSchema, createAbonnementClientSchema, AbonnementClientIdSchema, updateAbonnementClientDataSchema, updateAbonnementClientSchema } from "./abonnementClientSchema";
import { authMiddleware, isStaff } from "../middleware/auth.middleware";

const router: Router = Router();
const abonnementClientController = new AbonnementClientController();

// router.use(authMiddleware);


// router.use(authMiddleware);
router.post("", validate(createAbonnementClientSchema, "body"), abonnementClientController.createAbonnementClient);
router.get("", validate(AbonnementClientPaginationSchema, "query"), abonnementClientController.getAbonnementClientPaginated);
router.get("/:id", validate(AbonnementClientIdSchema, "params"), abonnementClientController.getAbonnementClientById);
router.patch("/statut/:id",  validate(AbonnementClientIdSchema, "params"), validate(updateAbonnementClientSchema, "body"), abonnementClientController.updateStatut);
router.delete("/:id",  validate(AbonnementClientIdSchema, "params"), abonnementClientController.deleteAbonnementClient);
router.patch("/:id",  validate(AbonnementClientIdSchema, "params"), validate(updateAbonnementClientDataSchema, "body"), abonnementClientController.updateAbonnementClient);

export default router;