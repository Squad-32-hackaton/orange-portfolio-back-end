import projectSchema from "../zodSchemas/projectSchema.js";
import { z } from "zod";
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

export async function getProjects(req, res) {
    const { id } = req.params;

    const paramsSchema = z.object({
        user_id: z
            .number({
                invalid_type_error: "Param 'user_id' must be a number",
            })
            .nullable(),
    });

    let user_id = id ? parseInt(id) : null;
    const params = paramsSchema.safeParse({ user_id });

    if (!params.success) {
        const errors = params.error.issues.map((issue) => issue.message);
        return res.status(400).json({ errors });
    }

    // If the ID was sent, then it should only show user's own projects
    const showOnlyUserProjects = !!params.data.user_id;
    user_id = params.data.user_id || req.user.user_id;

    const projects = await projectService.getProjects(
        user_id,
        showOnlyUserProjects,
    );
    return res.json({ projects });
}

export async function getProjectById(req, res) {
    const { id: project_id } = req.params;

    const paramsSchema = z.object({
        project_id: z.number({
            required_error: "Param 'project_id' is required",
            invalid_type_error: "Param 'project_id' must be a number",
        }),
    });

    const reqParams = { project_id: parseInt(project_id) };
    const params = paramsSchema.safeParse(reqParams);

    if (!params.success) {
        const errors = params.error.issues.map((issue) => issue.message);
        return res.status(400).json({ errors });
    }

    const project = await projectService.getProjectById(params.data.project_id);

    if (!project) throw new NotFoundError("Project not found");

    return res.json({ project });
}

export async function getProjectsByTag(req, res) {
    const { id } = req.params;
    const { tag } = req.query;

    const paramsScema = z.object({
        user_id: z
            .number({
                invalid_type_error: "Param 'user_id' must be a number",
            })
            .nullable(),
        tag: z.string({
            required_error: "Query string 'tag' is required",
        }),
    });

    let user_id = id ? parseInt(id) : null;
    const data = { user_id, tag };

    const params = paramsScema.safeParse(data);
    if (!params.success) {
        const errors = params.error.issues.map((issue) => issue.message);
        return res.status(400).json({ errors });
    }

    // If the ID was sent, then it should only show user's own projects
    const showOnlyUserProjects = !!params.data.user_id;
    user_id = params.data.user_id || req.user.user_id;

    const projects = await projectService.getProjectsByTag(
        user_id,
        params.data.tag,
        showOnlyUserProjects,
    );

    return res.json({ projects });
}
