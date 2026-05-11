import multer from "multer";
import path from "path";
import fs from "fs";

const createStorage = (folder: string) => {
  const uploadPath = path.join("uploads", folder);
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  return multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadPath),
    filename: (req, file, cb) => {
      const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${unique}${path.extname(file.originalname)}`);
    },
  });
};

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowed = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Format non supporté. Utilisez JPEG, PNG, WEBP ou PDF"));
  }
};

export const uploadAvatar = multer({
  storage: createStorage("avatars"),
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});

export const uploadGallery = multer({
  storage: createStorage("gallery"),
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const uploadProprietaire = multer({
  storage: createStorage("proprietaires"),
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});