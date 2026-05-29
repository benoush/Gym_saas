import validate from "../middleware/validate.middleware";
import { Router } from "express";
import { FactureController } from "./factureController";
import { FacturePaginationSchema, createFactureSchema, FactureIdSchema } from "./factureSchema";
import { authMiddleware, isProprietaire } from "../middleware/auth.middleware";

const router: Router = Router();
const factureController = new FactureController();



// router.use(authMiddleware);
router.post("", validate(createFactureSchema, "body"), factureController.createFacture);
router.get("", validate(FacturePaginationSchema, "query"), factureController.getFacturePaginated);
router.get("/:id", validate(FactureIdSchema, "params"), factureController.getFactureById);
router.delete("/:id", validate(FactureIdSchema, "params"), factureController.deleteFacture);
router.patch("/:id", validate(FactureIdSchema, "params"), validate(createFactureSchema, "body"), factureController.updateFacture);

export default router;