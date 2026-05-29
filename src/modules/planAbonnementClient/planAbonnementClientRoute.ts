import validate from "../middleware/validate.middleware";
import { Router } from "express";
import { PlanAbonnementClientController } from "./planAbonnementClientController";
import { PlanAbonnementClientPaginationSchema, createPlanAbonnementClientSchema, PlanAbonnementClientIdSchema, updatePlanAbonnementClientSchema } from "./planAbonnementClientSchema";
import { authMiddleware, isProprietaire } from "../middleware/auth.middleware";

const router: Router = Router();
const planAbonnementClientController = new PlanAbonnementClientController();



// router.use(authMiddleware);
router.post("", validate(createPlanAbonnementClientSchema, "body"), planAbonnementClientController.createPlanAbonnementClient);
router.get("", validate(PlanAbonnementClientPaginationSchema, "query"), planAbonnementClientController.getPlanAbonnementClientPaginated);
router.patch("/type/:id", isProprietaire, validate(PlanAbonnementClientIdSchema, "params"), validate(updatePlanAbonnementClientSchema, "body"), planAbonnementClientController.updateType);
router.get("/:id", validate(PlanAbonnementClientIdSchema, "params"), planAbonnementClientController.getPlanAbonnementClientById);
router.delete("/:id", isProprietaire, validate(PlanAbonnementClientIdSchema, "params"), planAbonnementClientController.deletePlanAbonnementClient);
router.patch("/:id", isProprietaire, validate(PlanAbonnementClientIdSchema, "params"), validate(createPlanAbonnementClientSchema, "body"), planAbonnementClientController.updatePlanAbonnementClient);

export default router;