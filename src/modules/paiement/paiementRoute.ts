import validate from "../middleware/validate.middleware";
import { Router } from "express";
import { PaiementController } from "./paiementController";
import { PaiementPaginationSchema, createPaiementSchema, PaiementIdSchema, updatePaiementStatutSchema, updatePaiementMethodeSchema } from "./paiementSchema";
import { authMiddleware } from "../middleware/auth.middleware";

const router: Router = Router();
const paiementController = new PaiementController();



// router.use(authMiddleware);
router.post("", validate(createPaiementSchema, "body"), paiementController.createPaiement);
router.get("", validate(PaiementPaginationSchema, "query"), paiementController.getPaiementPaginated);
router.patch("/statut/:id", validate(PaiementIdSchema, "params"), validate(updatePaiementStatutSchema, "body"), paiementController.updateStatut);
router.patch("/methode/:id", validate(PaiementIdSchema, "params"), validate(updatePaiementMethodeSchema, "body"), paiementController.updateMethode);
router.get("/:id", validate(PaiementIdSchema, "params"), paiementController.getPaiementById);
router.delete("/:id", validate(PaiementIdSchema, "params"), paiementController.deletePaiement);
router.patch("/:id", validate(PaiementIdSchema, "params"), validate(createPaiementSchema, "body"), paiementController.updatePaiement);

export default router;