import { Router } from "express";
import passport from "passport";
import "../helpers/auth-google.js";
import { loginUserWithGoogle } from "../controllers/authController.js";

const router = Router();

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
export default router;
