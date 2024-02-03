import userSchema from "../schemas/userSchema.js";
import bcrypt from "bcrypt";
import { PrismaClient, Prisma } from "@prisma/client";
import showZodErrors from "../helpers/showZodErrors.js";

const prisma = new PrismaClient();

export async function addUser(req, res) {
    const user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        avatar_id: req.body.avatar_id,
    };

    // validate form
    const safeUser = userSchema.safeParse(user);

    if (!safeUser.success) {
        const errors = showZodErrors(safeUser.error);
        return res.status(400).json({ errors });
    }

    try {
        if (safeUser.success) {
            // encrypt the password
            user.password = await bcrypt.hash(user.password, 10);
            // save in database
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
