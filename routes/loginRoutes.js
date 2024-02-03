import { Router } from "express";
import passport from "passport";
import "../helpers/auth-google.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
    loginUserWithEmail,
    loginUserWithGoogle,
    getProfile,
} from "../controllers/loginController.js";

const router = Router();

// Rota de login
router.post("/login", loginUserWithEmail);

//rotas para autenticação via Google
router.use(passport.initialize());
router.get(
    "/auth/google",
    passport.authenticate("google", {
        scope: ["email", "profile"],
        session: false,
    }),
);

router.get("/auth/google/callback", loginUserWithGoogle);

router.get("/auth/google/failure", (_, res) => {
    res.send("Failed to authenticate..");
});

//rota de retorno do token para o front
router.get("/login/profile", authMiddleware, getProfile);

export default router;
