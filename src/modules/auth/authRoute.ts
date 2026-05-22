import { Router } from "express";
import * as authController from "./authController";
import { authMiddleware } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import { RoleEnum } from "../../enum/roleEnum";

const router: Router = Router();

// router.use(authMiddleware);


router.post("/register", authController.register);
router.post("/login", authController.login);

router.get("/me", authController.getMe);

// router.get(
//   "/admin",
//   authMiddleware,
//   authorize(RoleEnum.ADMIN),
//   (req, res) => {
//     res.json({ message: "Accès ADMIN OK" });
//   }
// );

// router.get(
//   "/staff",
//   authMiddleware,
//   authorize(RoleEnum.STAFF, RoleEnum.ADMIN),
//   (req, res) => {
//     res.json({ message: "Accès STAFF OK" });
//   }
// );

export default router;