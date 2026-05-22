import validate from "../middleware/validate.middleware";
import { Router } from "express";
import { PlanAbonnementProprietaireController } from "./planAbonnementProprietaireController";
import { PlanAbonnementProprietairePaginationSchema, createPlanAbonnementProprietaireSchema, PlanAbonnementProprietaireIdSchema } from "./planAbonnementProprietaireSchema";
import { authMiddleware, isAdmin } from "../middleware/auth.middleware";
import { updatePlanAbonnementClientSchema } from "../planAbonnementClient/planAbonnementClientSchema";
import is from "zod/v4/locales/is.js";

const router: Router = Router();
const planAbonnementProprietaireController = new PlanAbonnementProprietaireController();



router.use(authMiddleware);
router.post("",isAdmin, validate(createPlanAbonnementProprietaireSchema, "body"), planAbonnementProprietaireController.createPlanAbonnementProprietaire);
router.get("", validate(PlanAbonnementProprietairePaginationSchema, "query"), planAbonnementProprietaireController.getPlanAbonnementProprietairePaginated);
router.patch("/type/:id", isAdmin, validate(PlanAbonnementProprietaireIdSchema, "params"), validate(updatePlanAbonnementClientSchema, "body"), planAbonnementProprietaireController.updateType);
router.get("/:id", validate(PlanAbonnementProprietaireIdSchema, "params"), planAbonnementProprietaireController.getPlanAbonnementProprietaireById);
router.delete("/:id", isAdmin, validate(PlanAbonnementProprietaireIdSchema, "params"), planAbonnementProprietaireController.deletePlanAbonnementProprietaire);
router.patch("/:id", isAdmin, validate(PlanAbonnementProprietaireIdSchema, "params"), validate(createPlanAbonnementProprietaireSchema, "body"), planAbonnementProprietaireController.updatePlanAbonnementProprietaire);

export default router;