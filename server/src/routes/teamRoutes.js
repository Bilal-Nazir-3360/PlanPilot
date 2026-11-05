import { Router } from "express";
import {
  createTeamMember,
  deleteTeamMember,
  getTeamMember,
  listTeamMembers,
  updateTeamMember,
} from "../controllers/teamController.js";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  createTeamMemberSchema,
  updateTeamMemberSchema,
} from "../validators/teamMember.js";

const router = Router();

router.use(requireAuth);
router.get("/", asyncHandler(listTeamMembers));
router.post("/", validate(createTeamMemberSchema), asyncHandler(createTeamMember));
router.get("/:id", asyncHandler(getTeamMember));
router.patch("/:id", validate(updateTeamMemberSchema), asyncHandler(updateTeamMember));
router.delete("/:id", asyncHandler(deleteTeamMember));

export default router;
