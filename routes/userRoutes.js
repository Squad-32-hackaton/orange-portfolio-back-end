import { Router } from "express";
import { getUsers, addUser } from "../controllers/userController.js";

const router = Router();

// buscar todos os usuários
router.get("/users", getUsers);

// Criação de um usuário
router.post("/user", addUser);

// Home
router.get("/", (_, res) => {
    res.json({ message: "API running successfully" });
});


export default router;
