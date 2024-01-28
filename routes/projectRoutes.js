import { Router } from "express";
import { create } from "../controllers/projectController.js";

const router = Router();

router.post("/users/:id/projects", create);

export default router;
