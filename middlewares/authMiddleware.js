import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../helpers/api-errors.js";

const prisma = new PrismaClient();

export async function authMiddleware(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
        throw new UnauthorizedError("Invalid email or password!");
    }
    // retira a string "baren" token da string
    const token = authorization.split(" ")[1];

    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    // consulta no banco se o email existe
    const user = await prisma.users.findFirst({ where: { id } });

    if (!user) {
        throw new UnauthorizedError("Invalid email or password!");
    }

    // verifica se o usuário está logado
    const { password_, createdAt, updatedAt, avatar, ...loggedUser } = user;
    req.user = loggedUser;

    next();
}
