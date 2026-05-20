import validate from "../middleware/validate.middleware";
import { Router } from "express";
import { AbonnementProprietaireController } from "./abonnementProprietaireController";
import { AbonnementProprietairePaginationSchema, createAbonnementProprietaireSchema, AbonnementProprietaireIdSchema } from "./abonnementProprietaireSchema";
import { authMiddleware } from "../middleware/auth.middleware";
import { updateAbonnementClientDataSchema } from "modules/abonnementClient/abonnementClientSchema";

const router: Router = Router();
const abonnementProprietaireController = new AbonnementProprietaireController();



router.use(authMiddleware);
router.post("", validate(createAbonnementProprietaireSchema, "body"), abonnementProprietaireController.createAbonnementProprietaire);
router.get("", validate(AbonnementProprietairePaginationSchema, "query"), abonnementProprietaireController.getAbonnementProprietairePaginated);
router.get("/:id", validate(AbonnementProprietaireIdSchema, "params"), abonnementProprietaireController.getAbonnementProprietaireById);
router.patch("/statut/:id", validate(AbonnementProprietaireIdSchema, "params"), validate(updateAbonnementClientDataSchema, "body"), abonnementProprietaireController.updateStatut);
router.delete("/:id", validate(AbonnementProprietaireIdSchema, "params"), abonnementProprietaireController.deleteAbonnementProprietaire);
router.patch("/:id", validate(AbonnementProprietaireIdSchema, "params"), validate(createAbonnementProprietaireSchema, "body"), abonnementProprietaireController.updateAbonnementProprietaire);
router.get("/email/:email", abonnementProprietaireController.getAbonnementProprietaireByEmail);

export default router;