import { Router } from "express";
import {
  createTask,
  deleteTask,
  listTasks,
  reorderTasks,
  updateTask,
} from "../controllers/taskController.js";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import {
  createTaskSchema,
  reorderTaskSchema,
  updateTaskSchema,
} from "../validators/task.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.use(requireAuth);
router.get("/", asyncHandler(listTasks));
router.post("/", validate(createTaskSchema), asyncHandler(createTask));
router.patch("/reorder", validate(reorderTaskSchema), asyncHandler(reorderTasks));
router.patch("/:id", validate(updateTaskSchema), asyncHandler(updateTask));
router.delete("/:id", asyncHandler(deleteTask));

export default router;
