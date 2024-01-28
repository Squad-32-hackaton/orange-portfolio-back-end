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
            avatar: true,
            email: true,
            password: true,
        },
    });

    res.json(users);
}

export async function addUser(req, res) {
    const dataUser = req.body;

    dataUser.password = await bcrypt.hash(dataUser.password, 10);

    dataUser.email = dataUser.email.toLowerCase();

    const body = userSchema.safeParse(dataUser);

    try {
        if (body.success) {
            const user = await prisma.users.create({ data: body.data });

            res.status(201).json("Cadastro Feito com sucesso");
        }
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === "P2002") {
                return res.status(409).json({
                    status: "fail",
                    message:
                        "Email already exist, please use another email address",
                });
            }
        }
    }
}
