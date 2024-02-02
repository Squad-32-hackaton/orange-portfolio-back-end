import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "../helpers/api-errors.js";
import formatDate from "../helpers/formatDate.js";

const prisma = new PrismaClient();

export async function create(data) {
    try {
        return await prisma.projects.create({ data });
    } catch (error) {
        if (error.message.includes("field: `user_id`")) {
            throw new NotFoundError(`User with id ${data.user_id} not found`);
        }

        if (error.message.includes("field: `image_id`")) {
            throw new NotFoundError(`Image with id ${data.image_id} not found`);
        }
    }
}

export async function getProjects(user_id, onlyUserProjects = true) {
    // Verify if should show only user's projects
    const whereQuery = onlyUserProjects
        ? { user_id }
        : { user_id: { not: user_id } };

    const projects = await prisma.projects.findMany({
        select: {
            project_id: true,
            user: {
                select: {
                    first_name: true,
                    last_name: true,
                    avatar: true,
                },
            },
            Tags: {
                select: { name: true },
            },
            image: true,
            createdAt: true,
        },
        where: whereQuery,
        orderBy: { project_id: "desc" },
    });

    return projects.map((project) => {
        return {
            project_id: project.project_id,
            user: {
                name: `${project.user.first_name} ${project.user.last_name}`,
                avatar: project.user.avatar?.filename || null,
            },
            tags: project.Tags.map((tag) => tag.name),
            image: project.image.filename,
            creationDate: formatDate(project.createdAt),
        };
    });
}

export async function getProjectById(project_id) {
    const project = await prisma.projects.findFirst({
        select: {
            project_id: true,
            user: {
                select: {
                    first_name: true,
                    last_name: true,
                    avatar: true,
                },
            },
            title: true,
            description: true,
            link: true,
            Tags: {
                select: { name: true },
            },
            image: true,
            createdAt: true,
        },
        where: { project_id },
    });

    return {
        project_id: project.project_id,
        user: {
            name: `${project.user.first_name} ${project.user.last_name}`,
            avatar: project.user.avatar?.filename || null,
        },
        title: project.title,
        description: project.description,
        link: project.link,
        tags: project.Tags.map((tag) => tag.name),
        image: project.image.filename,
        creationDate: formatDate(project.createdAt),
    };
}

export async function getProjectsByTag(user_id, tag, onlyUserProjects = true) {
    // Verify if should show only user's projects
    const filter = onlyUserProjects
        ? { user_id }
        : { user_id: { not: user_id } };

    const projects = await prisma.projects.findMany({
        select: {
            project_id: true,
            user: {
                select: {
                    first_name: true,
                    last_name: true,
                    avatar: true,
                },
            },
            Tags: {
                select: { name: true },
            },
            image: true,
            createdAt: true,
        },
        where: {
            ...filter,
            Tags: {
                some: {
                    name: {
                        contains: tag,
                    },
                },
            },
        },
        orderBy: { project_id: "desc" },
    });

    return projects.map((project) => {
        return {
            project_id: project.project_id,
            user: {
                name: `${project.user.first_name} ${project.user.last_name}`,
                avatar: project.user.avatar?.filename || null,
            },
            tags: project.Tags.map((tag) => tag.name),
            image: project.image.filename,
            creationDate: formatDate(project.createdAt),
        };
    });
}

export async function deleteProject(user_id, project_id) {
    const project = await prisma.projects.findFirst({
        select: {
            project_id: true,
        },
        where: { user_id, project_id },
    });

    if (!project) throw new NotFoundError("Project not found");
    return await prisma.projects.delete({ where: { project_id } });
}
