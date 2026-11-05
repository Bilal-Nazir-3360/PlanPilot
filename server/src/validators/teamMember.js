import { z } from "zod";

const teamMemberFields = {
  name: z.string().trim().min(2).max(50),
  email: z.string().trim().email().max(254),
  role: z.string().trim().max(40),
};

export const createTeamMemberSchema = z.object(teamMemberFields).strip();

export const updateTeamMemberSchema = z.object(teamMemberFields).partial().strip().refine(
  (value) => Object.keys(value).length > 0,
  { message: "At least one field is required" },
);
