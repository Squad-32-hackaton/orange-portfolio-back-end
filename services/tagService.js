import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createMany(tags) {
    try {
        return await prisma.tags.createMany({ data: tags });
    } catch (error) {
        return false;
    }
}
