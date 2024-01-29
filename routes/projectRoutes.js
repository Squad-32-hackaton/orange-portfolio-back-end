import { Router } from "express";
import {
    create,
    getAllUserProjects,
} from "../controllers/projectController.js";

const router = Router();

router.post("/users/:id/projects", create);
router.get("/users/:id/projects", getAllUserProjects);

export default router;
