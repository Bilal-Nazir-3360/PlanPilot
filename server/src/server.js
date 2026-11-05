import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 5000;

try {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
  });
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
