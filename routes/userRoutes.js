import { Router } from "express";
import { getUsers, addUser } from "../controllers/userController.js";
import {
    getProfile,
    loginUserWithEmail,
} from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/users", getUsers);

// Criação de um usuário
router.post("/user", addUser);

// Home
router.get("/", (_, res) => {
    res.json({ message: "API running successfully" });
});

// Rota de login
router.post("/login", loginUserWithEmail);

//profile
router.get("/login/profile", authMiddleware, getProfile);

export default router;
