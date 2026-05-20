import validate from "../middleware/validate.middleware";
import { Router } from "express";
import { ProprietaireController } from "./proprietaireController";
import { proprietairePaginationSchema, createProprietaireSchema, proprietaireIdSchema } from "./proprietaireSchema";
import { authMiddleware } from "../middleware/auth.middleware";
import { uploadProprietaire } from "../../config/multer";

const router: Router = Router();
const proprietaireController = new ProprietaireController();

const uploadFields = uploadProprietaire.fields([
  { name: "photo", maxCount: 1 },
  { name: "recto_carte_identite", maxCount: 1 },
  { name: "verso_carte_identite", maxCount: 1 },
  { name: "doc_justificatif", maxCount: 1 },
]);

router.use(authMiddleware);

router.post("", uploadFields, proprietaireController.createProprietaire);
router.get("", validate(proprietairePaginationSchema, "query"), proprietaireController.getProprietairePaginated);
router.get("/email/:email", proprietaireController.getProprietaireByEmail);
router.get("/:id", validate(proprietaireIdSchema, "params"), proprietaireController.getProprietaireById);
router.patch("/:id", uploadFields, proprietaireController.updateProprietaire);
router.delete("/:id", validate(proprietaireIdSchema, "params"), proprietaireController.deleteProprietaire);

export default router;