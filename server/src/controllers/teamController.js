import mongoose from "mongoose";
import TeamMember from "../models/TeamMember.js";

function getTeamMemberId(id, res) {
  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid team member id" });
    return null;
  }
  return id;
}

function isDuplicate(error) {
  return error?.code === 11000;
}

async function findDuplicate(owner, email, excludeId) {
  const query = { owner, email: email.toLowerCase() };
  if (excludeId) query._id = { $ne: excludeId };
  return TeamMember.findOne(query).collation({ locale: "en", strength: 2 });
}

export async function listTeamMembers(req, res) {
  const teamMembers = await TeamMember.find({ owner: req.user.id }).sort({ name: 1 });
  return res.json({ teamMembers });
}

export async function getTeamMember(req, res) {
  const id = getTeamMemberId(req.params.id, res);
  if (!id) return;
  const teamMember = await TeamMember.findOne({ _id: id, owner: req.user.id });
  if (!teamMember) return res.status(404).json({ message: "Team member not found" });
  return res.json({ teamMember });
}

export async function createTeamMember(req, res) {
  if (await findDuplicate(req.user.id, req.body.email)) {
    return res.status(409).json({ message: "A team member with this email already exists" });
  }
  try {
    const teamMember = await TeamMember.create({ ...req.body, owner: req.user.id });
    return res.status(201).json({ teamMember });
  } catch (error) {
    if (isDuplicate(error)) {
      return res.status(409).json({ message: "A team member with this email already exists" });
    }
    throw error;
  }
}

export async function updateTeamMember(req, res) {
  const id = getTeamMemberId(req.params.id, res);
  if (!id) return;
  const teamMember = await TeamMember.findOne({ _id: id, owner: req.user.id });
  if (!teamMember) return res.status(404).json({ message: "Team member not found" });
  if (req.body.email && await findDuplicate(req.user.id, req.body.email, id)) {
    return res.status(409).json({ message: "A team member with this email already exists" });
  }
  Object.assign(teamMember, req.body);
  try {
    await teamMember.save();
  } catch (error) {
    if (isDuplicate(error)) {
      return res.status(409).json({ message: "A team member with this email already exists" });
    }
    throw error;
  }
  return res.json({ teamMember });
}

export async function deleteTeamMember(req, res) {
  const id = getTeamMemberId(req.params.id, res);
  if (!id) return;
  const teamMember = await TeamMember.findOneAndDelete({ _id: id, owner: req.user.id });
  if (!teamMember) return res.status(404).json({ message: "Team member not found" });
  return res.json({ message: "Team member deleted" });
}
