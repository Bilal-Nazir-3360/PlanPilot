import { z } from "zod";

const reviewFields = {
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be 50 characters or fewer"),
  role: z
    .string()
    .trim()
    .max(60, "Role must be 60 characters or fewer")
    .optional(),
  rating: z
    .number({ required_error: "Rating is required" })
    .int("Rating must be a whole number")
    .min(1, "Choose a rating from 1 to 5")
    .max(5, "Choose a rating from 1 to 5"),
  comment: z
    .string({ required_error: "Review is required" })
    .trim()
    .min(10, "Review must be at least 10 characters")
    .max(500, "Review must be 500 characters or fewer"),
  website: z.string().optional(),
};

export const createReviewSchema = z.object(reviewFields).strip();

export const updateReviewSchema = z
  .object(reviewFields)
  .partial()
  .strip()
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one field is required",
  });
