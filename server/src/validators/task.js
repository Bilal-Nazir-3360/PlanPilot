import mongoose from "mongoose";
import { z } from "zod";

const statuses = ["Todo", "In progress", "Done"];
const priorities = ["Low", "Medium", "High"];

const due = z.string().refine((value) => {
  if (value === "") return true;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}, "Due date must be YYYY-MM-DD");

const taskFields = {
  title: z.string().trim().min(1).max(120),
  description: z.string().trim().max(500),
  status: z.enum(statuses),
  priority: z.enum(priorities),
  due,
  project: z.string().trim().max(60).optional(),
  tag: z.string().trim().max(40).optional(),
  order: z.number().finite(),
};

export const createTaskSchema = z.object(taskFields).partial({
  description: true,
  status: true,
  priority: true,
  due: true,
  project: true,
  tag: true,
  order: true,
}).strip();

export const updateTaskSchema = z.object(taskFields).partial().strip().refine(
  (value) => Object.keys(value).length > 0,
  { message: "At least one field is required" },
);

const reorderItemSchema = z.object({
  id: z.string().refine((value) => mongoose.isValidObjectId(value), {
    message: "Invalid task id",
  }),
  status: z.enum(statuses),
  order: z.number().finite(),
}).strip();

export const reorderTaskSchema = z.array(reorderItemSchema).max(500);
