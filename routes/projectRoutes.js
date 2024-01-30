import { Router } from "express";
import {
    create,
    getAllUserProjects,
} from "../controllers/projectController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/users/:id/projects", authMiddleware, create);
router.get("/users/:id/projects", authMiddleware, getAllUserProjects);

export default router;
