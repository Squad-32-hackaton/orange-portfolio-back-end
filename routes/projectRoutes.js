import { Router } from "express";
import {
    create,
    getProjects,
    getProjectById,
    getProjectsByTag,
} from "../controllers/projectController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/users/:id/projects", authMiddleware, create);
router.get("/users/:id/projects", authMiddleware, getProjects);
router.get("/users/:id/searchProjects", authMiddleware, getProjectsByTag);
router.get("/projects", authMiddleware, getProjects);
router.get("/projects/:id", authMiddleware, getProjectById);
router.get("/searchProjects", authMiddleware, getProjectsByTag);

export default router;
