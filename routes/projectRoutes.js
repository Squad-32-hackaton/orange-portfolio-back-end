import { Router } from "express";
import {
    create,
    getProjects,
    getUserProjectById,
    getUserProjectsByTag,
} from "../controllers/projectController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/users/:id/projects", authMiddleware, create);
router.get("/users/:id/projects", authMiddleware, getProjects);
router.get("/users/:user_id/projects/:id", authMiddleware, getUserProjectById);
router.get("/users/:id/searchProjects", authMiddleware, getUserProjectsByTag);
router.get("/projects", authMiddleware, getProjects);

export default router;
