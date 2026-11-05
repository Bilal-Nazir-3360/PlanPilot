import expressRateLimit from "express-rate-limit";
import { Router } from "express";
import {
  createReview,
  deleteReview,
  listReviews,
  updateReview,
} from "../controllers/reviewController.js";
import { optionalAuth, requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  createReviewSchema,
  updateReviewSchema,
} from "../validators/review.js";

const router = Router();
const reviewRateLimit = expressRateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Too many reviews, please try again later" },
});

router.get("/", asyncHandler(listReviews));
router.post(
  "/",
  reviewRateLimit,
  optionalAuth,
  validate(createReviewSchema),
  asyncHandler(createReview),
);
router.patch(
  "/:id",
  requireAuth,
  validate(updateReviewSchema),
  asyncHandler(updateReview),
);
router.delete("/:id", requireAuth, asyncHandler(deleteReview));

export default router;
