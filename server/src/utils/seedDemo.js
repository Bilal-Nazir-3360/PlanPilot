import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Task from "../models/Task.js";
import Project from "../models/Project.js";
import TeamMember from "../models/TeamMember.js";
import Review from "../models/Review.js";

export const DEMO_EMAIL = "demo@planpilot.app";
export const DEFAULT_DEMO_PASSWORD = "planpilot-demo";

function dateOffset(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function buildTasks() {
  return [
    { title: "Map the current onboarding flow", project: "Website refresh", status: "Done", priority: "High", due: dateOffset(-5), tag: "Research" },
    { title: "Polish onboarding screens", project: "Website refresh", status: "In progress", priority: "High", due: dateOffset(0), tag: "Design" },
    { title: "Write launch announcement", project: "Q4 Launch", status: "Todo", priority: "Medium", due: dateOffset(2), tag: "Marketing" },
    { title: "Review analytics events", project: "Website refresh", status: "Done", priority: "Low", due: dateOffset(-2), tag: "Engineering" },
    { title: "Prepare launch checklist", project: "Q4 Launch", status: "In progress", priority: "High", due: dateOffset(5), tag: "Planning" },
    { title: "Set up customer interviews", project: "Q4 Launch", status: "Todo", priority: "Medium", due: dateOffset(8), tag: "Research" },
    { title: "Draft mobile navigation", project: "Mobile app", status: "Todo", priority: "High", due: dateOffset(10), tag: "Design" },
    { title: "Test offline task states", project: "Mobile app", status: "In progress", priority: "Medium", due: dateOffset(12), tag: "Engineering" },
    { title: "Confirm app store metadata", project: "Mobile app", status: "Done", priority: "Low", due: dateOffset(-8), tag: "Marketing" },
    { title: "Plan the next release", project: "Mobile app", status: "Todo", priority: "Medium", due: "", tag: "Planning" },
    { title: "Review weekly team rhythm", project: "Internal ops", status: "Done", priority: "Medium", due: dateOffset(-1), tag: "Planning" },
    { title: "Clean up project templates", project: "Internal ops", status: "In progress", priority: "Low", due: dateOffset(1), tag: "Engineering" },
    { title: "Document support handoffs", project: "Internal ops", status: "Todo", priority: "Low", due: dateOffset(15), tag: "Planning" },
    { title: "Share the monthly progress note", project: "Internal ops", status: "Done", priority: "Medium", due: dateOffset(-12), tag: "Marketing" },
    { title: "Tag the research archive", project: "Website refresh", status: "Done", priority: "Low", due: "", tag: "Research" },
    { title: "Set the release success measures", project: "Q4 Launch", status: "Todo", priority: "High", due: dateOffset(20), tag: "Planning" },
  ].map((task, index) => ({ ...task, order: index }));
}

export async function seedDemoUser() {
  const password = process.env.DEMO_PASSWORD || DEFAULT_DEMO_PASSWORD;
  let user = await User.findOne({ email: DEMO_EMAIL });
  let userCreated = false;

  if (!user) {
    user = await User.create({
      name: "Demo User",
      email: DEMO_EMAIL,
      passwordHash: await bcrypt.hash(password, 12),
    });
    userCreated = true;
  }

  const owner = user._id;
  await Promise.all([
    Task.deleteMany({ owner }),
    Project.deleteMany({ owner }),
    TeamMember.deleteMany({ owner }),
  ]);

  const projectData = [
    { name: "Website refresh", description: "A clearer public site and onboarding path.", color: "gold" },
    { name: "Q4 Launch", description: "The launch plan, messaging, and release checklist.", color: "violet" },
    { name: "Mobile app", description: "Small-screen workflows for planning on the go.", color: "teal" },
    { name: "Internal ops", description: "The routines and templates behind steady delivery.", color: "slate" },
  ];
  const projects = await Project.insertMany(projectData.map((project) => ({ ...project, owner })));

  const statusOrders = new Map();
  const tasks = await Task.insertMany(buildTasks().map((task) => {
    const order = statusOrders.get(task.status) || 0;
    statusOrders.set(task.status, order + 1);
    return { ...task, order, owner };
  }));

  const members = await TeamMember.insertMany([
    { owner, name: "Alex Morgan", email: "alex.morgan@example.com", role: "Designer" },
    { owner, name: "Jamie Chen", email: "jamie.chen@example.com", role: "Engineer" },
    { owner, name: "Sam Rivera", email: "sam.rivera@example.com", role: "Product" },
    { owner, name: "Taylor Kim", email: "taylor.kim@example.com", role: "Marketing" },
  ]);

  let reviewsCreated = 0;
  if (!(await Review.exists({ isSample: true }))) {
    await Review.insertMany([
      { name: "Alex Morgan", role: "Designer", rating: 5, comment: "The board makes the next small step easy to see.", isSample: true },
      { name: "Jamie Chen", role: "Engineer", rating: 4, comment: "A focused workspace with just enough structure.", isSample: true },
      { name: "Sam Rivera", role: "Product", rating: 4, comment: "The weekly view keeps planning grounded in the work.", isSample: true },
    ]);
    reviewsCreated = 3;
  }

  return {
    user,
    userCreated,
    projects: projects.length,
    tasks: tasks.length,
    teamMembers: members.length,
    reviews: reviewsCreated,
  };
}
