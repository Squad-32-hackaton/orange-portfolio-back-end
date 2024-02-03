import * as projectSchema from "../schemas/projectSchema.js";
import { NotFoundError } from "../helpers/api-errors.js";
import * as projectService from "../services/projectService.js";
import * as tagService from "../services/tagService.js";
import showZodErrors from "../helpers/showZodErrors.js";

export async function create(req, res) {
    const { id: user_id } = req.params;

    const body = projectSchema.createAndUpdate.safeParse(req.body);
    if (!body.success) {
        const errors = showZodErrors(body.error);
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

    res.status(201).json({ message: "project created successfully" });
}

export async function getProjects(req, res) {
    const { id } = req.params;

    let user_id = id ? parseInt(id) : null;
    const params = projectSchema.getAll.safeParse({ user_id });

    if (!params.success) {
        const errors = showZodErrors(params.error);
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

    const reqParams = { project_id: parseInt(project_id) };
    const params = projectSchema.getById.safeParse(reqParams);

    if (!params.success) {
        const errors = showZodErrors(params.error);
        return res.status(400).json({ errors });
    }

    const project = await projectService.getProjectById(params.data.project_id);

    if (!project) throw new NotFoundError("Project not found");

    return res.json({ project });
}

export async function getProjectsByTag(req, res) {
    const { id } = req.params;
    const { tag } = req.query;

    let user_id = id ? parseInt(id) : null;
    const data = { user_id, tag };

    const params = projectSchema.getByTag.safeParse(data);
    if (!params.success) {
        const errors = showZodErrors(params.error);
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

export async function deleteProject(req, res) {
    const { user_id, id: project_id } = req.params;

    const data = {
        user_id: parseInt(user_id),
        project_id: parseInt(project_id),
    };

    const params = projectSchema.getByUserIdAndId.safeParse(data);
    if (!params.success) {
        const errors = showZodErrors(params.error);
        return res.status(400).json({ errors });
    }

    await projectService.deleteProject(
        params.data.user_id,
        params.data.project_id,
    );

    return res.json({ message: "project deleted successfully" });
}

export async function updateProject(req, res) {
    const { user_id, id: project_id } = req.params;

    const data = {
        user_id: parseInt(user_id),
        project_id: parseInt(project_id),
    };

    const params = projectSchema.getByUserIdAndId.safeParse(data);
    const body = projectSchema.createAndUpdate.safeParse(req.body);
    if (!params.success) {
        const errors = showZodErrors(params.error);
        return res.status(400).json({ errors });
    }

    if (!body.success) {
        const errors = showZodErrors(body.error);
        return res.status(400).json({ errors });
    }

    const projectData = {
        user_id: params.data.user_id,
        ...body.data,
        tags: undefined,
    };

    const project = await projectService.updateProject(
        params.data.user_id,
        params.data.project_id,
        projectData,
    );

    const tagsData = body.data.tags.map((tag) => ({
        name: tag,
        project_id: project.project_id,
    }));

    // reset project tags
    await tagService.deleteAll(project.project_id);
    await tagService.createMany(tagsData);

    res.status(200).json({ message: "project updated successfully" });
}
