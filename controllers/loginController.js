import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { UnauthorizedError } from "../helpers/api-errors.js";
import passport from "passport";
import { uuid } from "uuidv4";
import loginSchema from "../zodSchemas/loginSchema.js";

const prisma = new PrismaClient();

// geração do token pra usuário com tempo de 1h
function geraToken(id) {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
}

export async function loginUserWithEmail(req, res) {
    // Requisição para login com email e senha
    const reqEmail = req.body.email;
    const reqPassword = req.body.password;

    const safeLogin = loginSchema.safeParse({
        email: reqEmail,
        password: reqPassword,
    });
    if (!safeLogin) {
        throw new UnauthorizedError("Invalid email or password!");
    }
    // consulta no banco se o email existeSim
    const user = await prisma.users.findFirst({
        where: { email: reqEmail },
    });

    if (!user) {
        throw new UnauthorizedError("Invalid email or password!");
    }

    // Verifica se senha do usuário é igual ao do banco
    const verifyPass = await bcrypt.compare(reqPassword, user.password);

    if (!verifyPass) {
        throw new UnauthorizedError("Invalid email or password!");
    }

    // retorna o email e token
    const {
        password,
        email,
        createdAt,
        updatedAt,
        avatar,
        first_name,
        last_name,
        ...userLogin
    } = user;

    const token = geraToken(user.user_id);

    return res.json(userLogin, token);
}

export async function loginUserWithGoogle(req, res) {
    return passport.authenticate(
        "google",
        async function (err, googleUser, info, status) {
            if (err) {
                throw new UnauthorizedError("Not allowed by user");
            }
            if (!googleUser) {
                throw new Error();
            }

            // consulta no banco se o email existe
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
                    token = geraToken(newUser.user_id);
                } else {
                    throw new Error();
                }
            } else {
                token = geraToken(user.user_id);
            }

            return res.json({
                user: {
                    email: googleUser.email,
                },
                token,
            });
        },
    )(req, res, null);
}

export async function getProfile(req, res) {
    //tratar erro
    return res.json(req.user.id);
}
