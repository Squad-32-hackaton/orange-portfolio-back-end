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

router.use(passport.initialize());

router.get(
    "/auth/google",
    passport.authenticate("google", {
        scope: ["email", "profile"],
        session: false,
    }),
);

router.get("/google/callback", loginUserWithGoogle);

router.get("/google/failure", (req, res) => {
    res.send("Failed to authenticate..");
});

//profile
router.get("/login/profile", authMiddleware, getProfile);

export default router;
