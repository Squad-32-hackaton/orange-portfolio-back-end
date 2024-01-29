import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { UnauthorizedError } from "../helpers/api-errors.js";

const prisma = new PrismaClient();

export async function loginUser(req, res) {
    // Req de login com email e senha
    const reqEmail = req.body.email;
    const reqPassword = req.body.password;

    // consulta no banco se o email existe
    const user = await prisma.users.findUnique({
        where: { email: reqEmail },
    });

    if (!user) {
        throw new UnauthorizedError("Email ou senha Inválidos!");
    }

    // Verifica se senha do usuário
    const verifyPass = await bcrypt.compare(reqPassword, user.password);

    if (!verifyPass) {
        throw new UnauthorizedError("Email ou senha Inválidos!");
    }

    // geração do token pra usuário com tempo de 1h
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });

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

    return res.json({ user: userLogin, token: token });
}

export async function getProfile(req, res) {
    return res.json(req.user);
}
