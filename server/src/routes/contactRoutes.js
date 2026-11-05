import expressRateLimit from "express-rate-limit";
import { Router } from "express";
import { createContactMessage } from "../controllers/contactController.js";
import { validate } from "../middleware/validate.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { contactSchema } from "../validators/contact.js";

const router = Router();
const contactRateLimit = expressRateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Too many messages, please try again later" },
});

router.post(
  "/",
  contactRateLimit,
  validate(contactSchema),
  asyncHandler(createContactMessage),
);

export default router;
