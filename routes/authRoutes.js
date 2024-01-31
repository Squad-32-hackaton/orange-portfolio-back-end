import { Router } from "express";
import passport from "passport";
const router = Router();
import session from "express-session";
import "../helpers/auth-google.js";

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

router.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
router.use(passport.initialize());
router.use(passport.session());

router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["email", "profile"] }),
);

router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        successRedirect: "/protected",
        failureRedirect: "/auth/google/failure",
    }),
);

router.get("/protected", isLoggedIn, (req, res) => {
    console.log(req.user.id);
    res.send(`Hello ${req.user.displayName}`);
});

router.get("/logout", (req, res) => {
    req.logout();
    req.session.destroy();
    res.send("Goodbye!");
});

router.get("/auth/google/failure", (req, res) => {
    res.send("Failed to authenticate..");
});
export default router;
