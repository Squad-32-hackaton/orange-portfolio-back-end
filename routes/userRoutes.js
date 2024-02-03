import { Router } from "express";
import { addUser } from "../controllers/userController.js";

const router = Router();

// create a new user
router.post("/user", addUser);

export default router;
