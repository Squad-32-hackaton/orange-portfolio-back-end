import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../helpers/api-errors.js";

const prisma = new PrismaClient();

export async function authMiddleware(req, _, next) {
    const { authorization } = req.headers;
    if (!authorization) {
        throw new UnauthorizedError("Invalid email or password!");
    }
    // retira a string "baren" token da string
    const token = authorization.split(" ")[1];

    try {
        const { id: user_id } = jwt.verify(token, process.env.JWT_SECRET);

        // consulta no banco se o email existe
        const user = await prisma.users.findFirst({ where: { user_id } });

        if (!user) {
            throw new UnauthorizedError("Invalid email or password!");
        }

        const { password, createdAt, updatedAt, ...loggedUser } = user;
        req.user = loggedUser;

        next();
    } catch (error) {
        throw new UnauthorizedError("Invalid token!");
    }
}
