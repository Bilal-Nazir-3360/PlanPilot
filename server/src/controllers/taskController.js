import mongoose from "mongoose";
import Task from "../models/Task.js";

function getTaskId(id, res) {
  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid task id" });
    return null;
  }
  return id;
}

export async function listTasks(req, res) {
  const tasks = await Task.find({ owner: req.user.id }).sort({
    status: 1,
    order: 1,
  });
  return res.json({ tasks });
}

export async function createTask(req, res) {
  const lastTask = await Task.findOne({
    owner: req.user.id,
    status: req.body.status || "Todo",
  }).sort({ order: -1 });
  const task = await Task.create({
    ...req.body,
    owner: req.user.id,
    order: (lastTask?.order ?? -1) + 1,
  });
  return res.status(201).json({ task });
}

export async function reorderTasks(req, res) {
  const ids = req.body.map((item) => item.id);
  const tasks = await Task.find({
    owner: req.user.id,
    _id: { $in: ids },
  }).select("_id");

  if (tasks.length !== new Set(ids).size) {
    return res.status(404).json({ message: "Task not found" });
  }

  await Task.bulkWrite(
    req.body.map(({ id, status, order }) => ({
      updateOne: {
        filter: { _id: id, owner: req.user.id },
        update: { $set: { status, order } },
      },
    })),
  );

  return res.json({ message: "Tasks reordered" });
}

export async function updateTask(req, res) {
  const id = getTaskId(req.params.id, res);
  if (!id) return;

  const task = await Task.findOneAndUpdate(
    { _id: id, owner: req.user.id },
    { $set: req.body },
    { new: true, runValidators: true },
  );
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  return res.json({ task });
}

export async function deleteTask(req, res) {
  const id = getTaskId(req.params.id, res);
  if (!id) return;

  const task = await Task.findOneAndDelete({ _id: id, owner: req.user.id });
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  return res.json({ message: "Task deleted" });
}
