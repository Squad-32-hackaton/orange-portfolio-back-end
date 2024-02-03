import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { UnauthorizedError } from "../helpers/api-errors.js";
import passport from "passport";
import { uuid } from "uuidv4";
import loginSchema from "../schemas/loginSchema.js";

const prisma = new PrismaClient();

// user token generation with 24h expiration time
function generateToken(id) {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
    });
}

export async function loginUserWithEmail(req, res) {
    // login with email and password
    const login = {
        email: req.body.email,
        password: req.body.password,
    };

    // validate form
    const safeLogin = loginSchema.safeParse(login);

    if (!safeLogin.success) {
        const errors = safeLogin.error.issues.map((issue) => issue.message);
        return res.status(400).json({ errors });
    }

    // checks if the email already exists
    const user = await prisma.users.findFirst({
        where: { email: login.email },
    });

    if (!user) {
        throw new UnauthorizedError("Invalid email or password!");
    }

    // checks if the password is correct
    const verifyPassword = await bcrypt.compare(login.password, user.password);

    if (!verifyPassword) {
        throw new UnauthorizedError("Invalid email or password!");
    }

    // return token
    const token = generateToken(user.user_id);

    return res.json(token);
}

export async function loginUserWithGoogle(req, res) {
    return passport.authenticate(
        "google",
        async function (err, googleUser, _, __) {
            if (err) {
                throw new UnauthorizedError("Not allowed by user");
            }
            if (!googleUser) {
                throw new Error();
            }

            // checks if the email already exists
            const user = await prisma.users.findUnique({
                where: { email: googleUser.email },
            });

            let token;
            if (!user) {
                const newUser = await prisma.users.create({
                    data: {
                        first_name: googleUser.given_name,
                        last_name: googleUser.family_name,
                        email: googleUser.email,
                        password: await bcrypt.hash(uuid(), 10),
                    },
                });

                if (newUser) {
                    token = generateToken(newUser.user_id);
                } else {
                    throw new Error();
                }
            } else {
                token = generateToken(user.user_id);
            }

            return res.json({
                token,
            });
        },
    )(req, res, null);
}

// get user data
export async function getProfile(req, res) {
    return res.json(req.user);
}
