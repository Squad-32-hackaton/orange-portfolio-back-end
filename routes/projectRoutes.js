import { Router } from "express";
import {
    create,
    getAllUserProjects,
    getUserProjectById,
    getUserProjectsByTag,
} from "../controllers/projectController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/users/:id/projects", authMiddleware, create);
router.get("/users/:id/projects", authMiddleware, getAllUserProjects);
router.get("/users/:user_id/projects/:id", authMiddleware, getUserProjectById);
router.get("/users/:id/searchProjects", authMiddleware, getUserProjectsByTag);

export default router;
