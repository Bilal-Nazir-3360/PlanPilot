import mongoose from "mongoose";
import Project from "../models/Project.js";
import Task from "../models/Task.js";

function getProjectId(id, res) {
  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid project id" });
    return null;
  }
  return id;
}

function isDuplicate(error) {
  return error?.code === 11000;
}

async function findDuplicate(owner, name, excludeId) {
  const query = { owner, name };
  if (excludeId) query._id = { $ne: excludeId };
  return Project.findOne(query).collation({ locale: "en", strength: 2 });
}

export async function listProjects(req, res) {
  const [projects, tasks] = await Promise.all([
    Project.find({ owner: req.user.id }).sort({ name: 1 }),
    Task.find({ owner: req.user.id }).select("project status").lean(),
  ]);
  const progress = new Map();
  for (const task of tasks) {
    if (!task.project) continue;
    const current = progress.get(task.project) || { totalTasks: 0, doneTasks: 0 };
    current.totalTasks += 1;
    if (task.status === "Done") current.doneTasks += 1;
    progress.set(task.project, current);
  }

  return res.json({
    projects: projects.map((project) => {
      const counts = progress.get(project.name) || { totalTasks: 0, doneTasks: 0 };
      return {
        ...project.toJSON(),
        ...counts,
        percent: counts.totalTasks
          ? Math.round((counts.doneTasks / counts.totalTasks) * 100)
          : 0,
      };
    }),
  });
}

export async function getProject(req, res) {
  const id = getProjectId(req.params.id, res);
  if (!id) return;
  const project = await Project.findOne({ _id: id, owner: req.user.id });
  if (!project) return res.status(404).json({ message: "Project not found" });
  return res.json({ project });
}

export async function createProject(req, res) {
  if (await findDuplicate(req.user.id, req.body.name)) {
    return res.status(409).json({ message: "A project with this name already exists" });
  }
  try {
    const project = await Project.create({ ...req.body, owner: req.user.id });
    return res.status(201).json({ project });
  } catch (error) {
    if (isDuplicate(error)) {
      return res.status(409).json({ message: "A project with this name already exists" });
    }
    throw error;
  }
}

export async function updateProject(req, res) {
  const id = getProjectId(req.params.id, res);
  if (!id) return;
  const project = await Project.findOne({ _id: id, owner: req.user.id });
  if (!project) return res.status(404).json({ message: "Project not found" });

  if (req.body.name && await findDuplicate(req.user.id, req.body.name, id)) {
    return res.status(409).json({ message: "A project with this name already exists" });
  }
  const oldName = project.name;
  Object.assign(project, req.body);
  try {
    await project.save();
  } catch (error) {
    if (isDuplicate(error)) {
      return res.status(409).json({ message: "A project with this name already exists" });
    }
    throw error;
  }
  if (project.name !== oldName) {
    await Task.updateMany(
      { owner: req.user.id, project: oldName },
      { $set: { project: project.name } },
    );
  }
  return res.json({ project });
}

export async function deleteProject(req, res) {
  const id = getProjectId(req.params.id, res);
  if (!id) return;
  const project = await Project.findOneAndDelete({ _id: id, owner: req.user.id });
  if (!project) return res.status(404).json({ message: "Project not found" });
  await Task.updateMany(
    { owner: req.user.id, project: project.name },
    { $unset: { project: 1 } },
  );
  return res.json({ message: "Project deleted" });
}
