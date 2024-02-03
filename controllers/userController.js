import userSchema from "../zodSchemas/userSchema.js";
import bcrypt from "bcrypt";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUsers(req, res) {
    const users = await prisma.users.findMany({
        select: {
            user_id: true,
            first_name: true,
            last_name: true,
            email: true,
        },
    });

    res.json(users);
}

export async function addUser(req, res) {
    const user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        avatar_id: req.body.avatar_id,
    };
    //validação dos formulários

    const safeUser = userSchema.safeParse(user);

    if (!safeUser.success) {
        const errors = safeUser.error.issues.map((issue) => issue.message);
        return res.status(400).json({ errors });
    }

    try {
        if (safeUser.success) {
            // Encripta a senha com bcrypt
            user.password = await bcrypt.hash(user.password, 10);
            // Salva no banco
            await prisma.users.create({ data: user });
            res.status(201).json("User successfully registered");
        }
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === "P2002") {
                return res.status(409).json({
                    message:
                        "Email already exist, please use another email address",
                });
            }
        }
    }
}
