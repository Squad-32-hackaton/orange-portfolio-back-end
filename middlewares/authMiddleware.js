import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../helpers/api-errors.js";

const prisma = new PrismaClient();

export async function authMiddleware(req, _, next) {
    const { authorization } = req.headers;
    if (!authorization) {
        throw new UnauthorizedError("Email ou senha inválidos!");
    }
    // remove string "bearer" from the token
    const token = authorization.split(" ")[1];

    try {
        const { id: user_id } = jwt.verify(token, process.env.JWT_SECRET);

        // checks if user already exists
        const user = await prisma.users.findFirst({ where: { user_id } });

        if (!user) {
            throw new UnauthorizedError("Email ou senha inválidos!");
        }

        const { password, createdAt, updatedAt, ...loggedUser } = user;
        req.user = loggedUser;

        next();
    } catch (error) {
        throw new UnauthorizedError("Token Inválido!!");
    }
}
