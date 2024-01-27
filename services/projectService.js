import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function create(data) {
    try {
        return await prisma.projects.create({ data });
    } catch (error) {
        return false;
    }
}
