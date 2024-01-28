import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function create(data) {
    try {
        return await prisma.projects.create({ data });
    } catch (error) {
        if (
            error.message.includes(
                "Foreign key constraint failed on the field: `user_id`",
            )
        ) {
            throw new Error(`User with id ${data.user_id} not found`);
        }

        if (
            error.message.includes(
                "Foreign key constraint failed on the field: `image_id`",
            )
        ) {
            throw new Error(`Image with id ${data.image_id} not found`);
        }

        throw new Error("Error when trying to register the project");
    }
}
