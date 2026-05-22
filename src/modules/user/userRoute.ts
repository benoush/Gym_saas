import validate from "../middleware/validate.middleware";
import { Router } from "express";
import { UserController } from "./userController";
import { userPaginationSchema, createUserSchema, idUserSchema, emailUserSchema } from "./userSchema";
import { uploadAvatar } from "../../config/multer";
import { isAdmin } from "modules/middleware/auth.middleware";

const router: Router = Router();

const userController = new UserController();



router.post(
  "",isAdmin,
  uploadAvatar.single("photo"), 
  validate(createUserSchema, "body"),
  userController.createuser
);
router.get('', validate(userPaginationSchema, "query"), userController.getuserPaginated);

router.patch(
  "/:id",isAdmin,
  uploadAvatar.single("photo"),
  validate(idUserSchema, "params"),
  validate(createUserSchema, "body"),
  userController.updateuser
);
router.get('/:id', validate(idUserSchema, "params"), userController.getuserById);

router.delete('/:id', isAdmin, validate(idUserSchema, "params"), userController.deleteuser);

router.get('/email/:email',validate( emailUserSchema , "params"), userController.getuserByEmail);


export default router;