import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createMany(tags) {
    try {
        return await prisma.tags.createMany({ data: tags });
    } catch (error) {
        throw new Error("Error when trying to register the tags");
    }
}
