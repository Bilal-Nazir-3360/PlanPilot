import 'dotenv/config';
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import { seedDemoUser } from "./utils/seedDemo.js";

if (process.env.NODE_ENV === "production" && process.env.ALLOW_SEED !== "true") {
  console.error("Seeding is disabled in production unless ALLOW_SEED=true.");
  process.exit(1);
}

try {
  await connectDB();
  const summary = await seedDemoUser();
  console.log(`Demo seed ${summary.userCreated ? "created" : "reused"} the demo user.`);
  console.log(`Created ${summary.projects} projects, ${summary.tasks} tasks, ${summary.teamMembers} team members, and ${summary.reviews} sample reviews.`);
  process.exitCode = 0;
} catch (error) {
  console.error(`Demo seed failed: ${error.message}`);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
