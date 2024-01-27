import { z } from "zod";
import * as projectService from "../services/projectService.js";
import * as tagService from "../services/tagService.js";

export async function create(req, res) {
    const { id: user_id } = req.params;

    const projectSchema = z.object({
        title: z.string(),
        description: z.string(),
        link: z.string(),
        tags: z.string().array(),
        image_id: z.number(),
    });

    const body = projectSchema.safeParse(req.body);
    if (!body.success) {
        const errors = body.error.issues.map((issue) => issue.message);
        return res.status(400).json({ errors });
    }

    const projectData = {
        user_id: parseInt(user_id),
        ...body.data,
        tags: undefined,
    };

    const project = await projectService.create(projectData);
    if (!project)
        return res
            .status(409)
            .json({ error: "Não foi possível cadastrar o projeto" });

    const tagsData = body.data.tags.map((tag) => ({
        name: tag,
        project_id: project.project_id,
    }));

    const tags = await tagService.createMany(tagsData);
    if (!tags)
        return res
            .status(409)
            .json({ error: "Não foi possível cadastrar as tags" });

    const projectResponse = {
        ...project,
        tags: body.data.tags,
    };

    res.status(201).json({ project: projectResponse });
}
