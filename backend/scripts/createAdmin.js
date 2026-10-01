import "dotenv/config";
import connectDB from "../src/config/db.js";
import Admin from "../src/modules/auth/auth.model.js";
import { createAdmin } from "../src/modules/auth/auth.service.js";

try {
  await connectDB();
  if (await Admin.exists({})) {
    console.log("An admin already exists; no changes were made.");
    process.exitCode = 0;
  } else {
    const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
    if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD || ADMIN_PASSWORD.length < 6) {
      throw new Error("Set ADMIN_NAME, ADMIN_EMAIL, and an ADMIN_PASSWORD of at least 6 characters in .env.");
    }
    const admin = await createAdmin({ name: ADMIN_NAME, email: ADMIN_EMAIL, password: ADMIN_PASSWORD });
    console.log(`Admin created: ${admin.email}`);
  }
} catch (error) {
  console.error("Admin creation failed:", error.message);
  process.exitCode = 1;
} finally {
  const mongoose = (await import("mongoose")).default;
  await mongoose.disconnect();
}
