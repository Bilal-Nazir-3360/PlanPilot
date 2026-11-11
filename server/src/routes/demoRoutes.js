import expressRateLimit from "express-rate-limit";
import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { DEMO_EMAIL, seedDemoUser } from "../utils/seedDemo.js";

const router = Router();
const resetRateLimit = expressRateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Too many demo resets, please try again later" },
});

router.post(
  "/reset",
  resetRateLimit,
  requireAuth,
  asyncHandler(async (req, res) => {
    if (req.user.email !== DEMO_EMAIL) {
      return res.status(403).json({ message: "Demo reset is only available to the demo user" });
    }
    const summary = await seedDemoUser();
    return res.json({ message: "Demo workspace reset", summary: { projects: summary.projects, tasks: summary.tasks, teamMembers: summary.teamMembers, reviews: summary.reviews } });
  }),
);

export default router;
