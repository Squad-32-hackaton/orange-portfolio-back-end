import projectSchema from "../zodSchemas/projectSchema.js";
import { NotFoundError } from "../helpers/api-errors.js";
import * as projectService from "../services/projectService.js";
import * as tagService from "../services/tagService.js";

export async function create(req, res) {
    const { id: user_id } = req.params;

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
}

export async function getAllUserProjects(req, res) {
    const { id: user_id } = req.params;

    const projects = await projectService.getAllUserProjects(parseInt(user_id));
    return res.json({ projects });
}

export async function getUserProjectById(req, res) {
    const { user_id, id: project_id } = req.params;

    const project = await projectService.getUserProjectById(
        parseInt(user_id),
        parseInt(project_id),
    );

    if (!project) throw new NotFoundError("Project not found");

    return res.json({ project });
}
