import validate from "../middleware/validate.middleware";
import { Router } from "express";
import { SalleController } from "./salleController";
import { sallePaginationSchema, createsalleSchema, salleIdSchema } from "./salleSchema";
import { authMiddleware } from "../middleware/auth.middleware";

const router: Router = Router();
const salleController = new SalleController();



router.use(authMiddleware);

router.post("", validate(createsalleSchema, "body"), salleController.createSalle);
router.get("", validate(sallePaginationSchema, "query"), salleController.getSallePaginated);
router.get("/:id", validate(salleIdSchema, "params"), salleController.getSalleById);
router.patch("/:id", validate(salleIdSchema, "params"), salleController.updateSalle);
router.delete("/:id", validate(salleIdSchema, "params"), salleController.deleteSalle);

export default router;