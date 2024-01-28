import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function create(filename) {
    try {
        return await prisma.images.create({ data: { filename } });
    } catch (error) {
        return false;
    }
}
