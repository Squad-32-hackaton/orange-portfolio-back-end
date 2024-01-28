import { Router } from "express";
import { storage } from "../multer.config.js";
import multer from "multer";
import * as imageController from "../controllers/imageController.js";

const router = Router();
const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), imageController.create);

export default router;
