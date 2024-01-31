import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "../helpers/api-errors.js";

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
            throw new NotFoundError(`User with id ${data.user_id} not found`);
        }

        if (
            error.message.includes(
                "Foreign key constraint failed on the field: `image_id`",
            )
        ) {
            throw new NotFoundError(`Image with id ${data.image_id} not found`);
        }
    }
}

export async function getAllUserProjects(user_id) {
    return await prisma.projects.findMany({
        select: {
            project_id: true,
            link: true,
            Tags: {
                select: { name: true },
            },
            image: true,
            createdAt: true,
        },
        where: { user_id },
    });
}

export async function getUserProjectById(user_id, project_id) {
    return await prisma.projects.findFirst({
        select: {
            project_id: true,
            title: true,
            description: true,
            link: true,
            Tags: {
                select: { name: true },
            },
            image: true,
            createdAt: true,
        },
        where: { user_id, project_id },
    });
}

export async function getUserProjectsByTag(user_id, tag) {
    return await prisma.projects.findMany({
        select: {
            project_id: true,
            link: true,
            Tags: {
                select: { name: true },
            },
            image: true,
            createdAt: true,
        },
        where: {
            user_id,
            Tags: {
                some: {
                    name: {
                        contains: tag,
                    },
                },
            },
        },
    });
}
