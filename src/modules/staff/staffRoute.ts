import validate from "../middleware/validate.middleware";
import { Router } from "express";
import { StaffController } from "./staffController";
import { StaffPaginationSchema, createStaffSchema, StaffIdSchema } from "./staffSchema";
import { authMiddleware } from "../middleware/auth.middleware";
import { uploadAvatar } from "config/multer";

const router: Router = Router();
const staffController = new StaffController();



router.use(authMiddleware);
router.post("", uploadAvatar.single("photo"), validate(createStaffSchema, "body"), staffController.createStaff);
router.get("", validate(StaffPaginationSchema, "query"), staffController.getStaffPaginated);
router.get("/:id", validate(StaffIdSchema, "params"), staffController.getStaffById);
router.delete("/:id", validate(StaffIdSchema, "params"), staffController.deleteStaff);
router.patch("/:id", validate(StaffIdSchema, "params"), validate(createStaffSchema, "body"), staffController.updateStaff);
router.get("/email/:email", staffController.getStaffByEmail);

export default router;