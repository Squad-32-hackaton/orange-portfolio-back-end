import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createMany(tags) {
    return await prisma.tags.createMany({ data: tags });
}

export async function deleteAll(project_id) {
    return await prisma.tags.deleteMany({ where: { project_id } });
}
