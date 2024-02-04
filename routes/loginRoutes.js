import { Router } from "express";
import passport from "passport";
import "../helpers/auth-google.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
    loginUserWithEmail,
    loginUserWithGoogle,
    getProfile,
} from "../controllers/loginController.js";
const cors = require("cors");
const router = Router();

// login route
router.post("/login", loginUserWithEmail);

cors(corsOptions);
let corsOptions = {
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
};

// Google authentication route
router.use(passport.initialize());
router.get(
    cors(corsOptions),
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

// get user data
router.get("/login/profile", authMiddleware, getProfile);

export default router;
