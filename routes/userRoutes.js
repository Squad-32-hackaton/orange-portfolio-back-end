import { Router } from "express";
import { addUser } from "../controllers/userController.js";

const router = Router();

// Criação de um usuário
router.post("/user", addUser);

export default router;
