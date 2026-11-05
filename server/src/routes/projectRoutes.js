import { Router } from "express";
import {
  createProject,
  deleteProject,
  getProject,
  listProjects,
  updateProject,
} from "../controllers/projectController.js";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createProjectSchema, updateProjectSchema } from "../validators/project.js";

const router = Router();

router.use(requireAuth);
router.get("/", asyncHandler(listProjects));
router.post("/", validate(createProjectSchema), asyncHandler(createProject));
router.get("/:id", asyncHandler(getProject));
router.patch("/:id", validate(updateProjectSchema), asyncHandler(updateProject));
router.delete("/:id", asyncHandler(deleteProject));

export default router;
