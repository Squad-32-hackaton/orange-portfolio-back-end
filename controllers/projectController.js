import { z } from "zod";
import * as projectService from "../services/projectService.js";
import * as tagService from "../services/tagService.js";

export async function create(req, res) {
    const { id: user_id } = req.params;

    const projectSchema = z.object({
        title: z.string({
            required_error: "Field 'title' is required",
            invalid_type_error: "Field 'title' must be a string",
        }),
        description: z.string({
            required_error: "Field 'description' is required",
            invalid_type_error: "Field 'description' must be a string",
        }),
        link: z.string({
            required_error: "Field 'link' is required",
            invalid_type_error: "Field 'link' must be a string",
        }),
        tags: z
            .string({
                required_error: "Field 'tags' is required",
                invalid_type_error: "Field 'tags' must be a string array",
            })
            .array(),
        image_id: z.number({
            required_error: "Field 'image_id' is required",
            invalid_type_error: "Field 'image_id' must be a number",
        }),
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

    try {
        const project = await projectService.create(projectData);

        const tagsData = body.data.tags.map((tag) => ({
            name: tag,
            project_id: project.project_id,
        }));

        await tagService.createMany(tagsData);

        const projectResponse = {
            ...project,
            tags: body.data.tags,
        };

        res.status(201).json({ project: projectResponse });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
