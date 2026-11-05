import { z } from "zod";

export const contactSchema = z
  .object({
    name: z
      .string({ required_error: "Name is required" })
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be 50 characters or fewer"),
    email: z
      .string({ required_error: "Email is required" })
      .trim()
      .toLowerCase()
      .email("Enter a valid email address"),
    subject: z
      .string({ required_error: "Subject is required" })
      .trim()
      .min(3, "Subject must be at least 3 characters")
      .max(100, "Subject must be 100 characters or fewer"),
    message: z
      .string({ required_error: "Message is required" })
      .trim()
      .min(10, "Message must be at least 10 characters")
      .max(1000, "Message must be 1000 characters or fewer"),
    website: z.string().optional(),
  })
  .strip();
