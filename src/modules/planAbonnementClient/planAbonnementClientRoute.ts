import validate from "../middleware/validate.middleware";
import { Router } from "express";
import { PlanAbonnementClientController } from "./planAbonnementClientController";
import { PlanAbonnementClientPaginationSchema, createPlanAbonnementClientSchema, PlanAbonnementClientIdSchema, updatePlanAbonnementClientSchema } from "./planAbonnementClientSchema";
import { authMiddleware } from "../middleware/auth.middleware";

const router: Router = Router();
const planAbonnementClientController = new PlanAbonnementClientController();



// router.use(authMiddleware);
router.post("", validate(createPlanAbonnementClientSchema, "body"), planAbonnementClientController.createPlanAbonnementClient);
router.get("", validate(PlanAbonnementClientPaginationSchema, "query"), planAbonnementClientController.getPlanAbonnementClientPaginated);
router.patch("/type/:id", validate(PlanAbonnementClientIdSchema, "params"), validate(updatePlanAbonnementClientSchema, "body"), planAbonnementClientController.updateType);
router.get("/:id", validate(PlanAbonnementClientIdSchema, "params"), planAbonnementClientController.getPlanAbonnementClientById);
router.delete("/:id", validate(PlanAbonnementClientIdSchema, "params"), planAbonnementClientController.deletePlanAbonnementClient);
router.patch("/:id", validate(PlanAbonnementClientIdSchema, "params"), validate(createPlanAbonnementClientSchema, "body"), planAbonnementClientController.updatePlanAbonnementClient);

export default router;