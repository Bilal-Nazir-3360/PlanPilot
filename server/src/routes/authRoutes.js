import expressRateLimit from "express-rate-limit";
import { Router } from "express";
import {
  login,
  logout,
  me,
  signup,
} from "../controllers/authController.js";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { loginSchema, signupSchema } from "../validators/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();
const authRateLimit = expressRateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Too many authentication attempts, please try again later" },
});

router.post("/signup", authRateLimit, validate(signupSchema), asyncHandler(signup));
router.post("/login", authRateLimit, validate(loginSchema), asyncHandler(login));
router.post("/logout", logout);
router.get("/me", requireAuth, me);

export default router;
