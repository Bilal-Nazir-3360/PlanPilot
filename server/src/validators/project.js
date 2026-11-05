import { z } from "zod";

const color = z.string().trim().regex(
  /^(#[0-9a-fA-F]{3,8}|[a-zA-Z0-9_-]{1,20})$/,
  "Color must be a hex color or a short token",
);

const projectFields = {
  name: z.string().trim().min(1).max(60),
  description: z.string().trim().max(300),
  color,
};

export const createProjectSchema = z.object(projectFields).partial({
  description: true,
  color: true,
}).strip().required({ name: true });

export const updateProjectSchema = z.object(projectFields).partial().strip().refine(
  (value) => Object.keys(value).length > 0,
  { message: "At least one field is required" },
);
