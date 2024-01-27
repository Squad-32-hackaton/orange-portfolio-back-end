import { Router } from "express";
import { storage } from "../multer.config.js";
import multer from "multer";

const router = Router();
const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), (req, res) => {
    return res.status(201).json({ file: req.file.filename });
});

export default router;
