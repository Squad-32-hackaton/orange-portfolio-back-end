import User from "../models/userModel.js";
import { z } from "zod";
import bcrypt from "bcrypt";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUsers(req, res) {
    const users = await prisma.users.findMany();

    res.json(users);
}

export async function addUser(req, res) {
    //validação dos dados com ZOD
    const userSchema = z.object({
        first_name: z.string(),
        last_name: z.string(),
        email: z.string(),
        password: z.string(),
        avatar: z.string(),
    });
    const dataUser = req.body;

    dataUser.password = await bcrypt.hash(dataUser.password, 10);

    const body = userSchema.safeParse(dataUser);

    if (body.success) {
        const user = await prisma.users.create({ data: body.data });

        res.status(201).json(user);
    } else {
        // melhorar saída do erro
        res.status(400).json({ Erro: "Dados Inválidos!" });
    }
}
