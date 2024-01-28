import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient, Prisma } from "@prisma/client";
import { UnauthorizedError } from "../helpers/api-errors.js";

const prisma = new PrismaClient();

export async function loginUser(req, res) {
    // Desestrutura o corpo da requisição
    const { email, password } = req.body;

    // consulta no banco se o email existe
    const user = await prisma.users.findUnique({ where: { email } });

    if (!user) {
        throw new UnauthorizedError("Email ou senha Inválidos!");
    }

    // Verifica se senha do usuário
    const verifyPass = await bcrypt.compare(password, user.password);

    if (!verifyPass) {
        throw new UnauthorizedError("Email ou senha Inválidos!");
    }

    // geração do token pra usuário com tempo de 1h
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });

    const { password: _, createdAt, updatedAt, avatar, ...userLogin } = user;

    return res.json({ user: userLogin, token: token });
}

export async function getProfile(req, res) {
    return res.json(req.user);
}
