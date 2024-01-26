import User from "../models/userModel.js";
import { z } from "zod";

import { PrismaClient } from "@prisma/client";

const PRISMA = new PrismaClient();

export async function getUsers(req, res) {
    let users = await PRISMA.users.findMany();

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
    let body = userSchema.safeParse(req.body);
    console.log(body);
    if (body.success) {
        let user = await PRISMA.users.create({ data: body.data });

        res.status(201).json(user);
    } else {
        // melhorar saída do erro
        res.status(400).json({ Erro: "Dados Inválidos!" });
    }
}
