import validate from "../middleware/validate.middleware";
import { Router } from "express";
import { PlanAbonnementProprietaireController } from "./planAbonnementProprietaireController";
import { PlanAbonnementProprietairePaginationSchema, createPlanAbonnementProprietaireSchema, PlanAbonnementProprietaireIdSchema } from "./planAbonnementProprietaireSchema";
import { authMiddleware } from "../middleware/auth.middleware";
import { updatePlanAbonnementClientSchema } from "../planAbonnementClient/planAbonnementClientSchema";

const router: Router = Router();
const planAbonnementProprietaireController = new PlanAbonnementProprietaireController();



router.use(authMiddleware);
router.post("", validate(createPlanAbonnementProprietaireSchema, "body"), planAbonnementProprietaireController.createPlanAbonnementProprietaire);
router.get("", validate(PlanAbonnementProprietairePaginationSchema, "query"), planAbonnementProprietaireController.getPlanAbonnementProprietairePaginated);
router.patch("/type/:id", validate(PlanAbonnementProprietaireIdSchema, "params"), validate(updatePlanAbonnementClientSchema, "body"), planAbonnementProprietaireController.updateType);
router.get("/:id", validate(PlanAbonnementProprietaireIdSchema, "params"), planAbonnementProprietaireController.getPlanAbonnementProprietaireById);
router.delete("/:id", validate(PlanAbonnementProprietaireIdSchema, "params"), planAbonnementProprietaireController.deletePlanAbonnementProprietaire);
router.patch("/:id", validate(PlanAbonnementProprietaireIdSchema, "params"), validate(createPlanAbonnementProprietaireSchema, "body"), planAbonnementProprietaireController.updatePlanAbonnementProprietaire);

export default router;