import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "./auth.model.js";

export async function login(email, password) {
  const admin = await Admin.findOne({ email: String(email).trim().toLowerCase() });
  if (!admin || !(await bcrypt.compare(password, admin.password))) return null;
  const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });
  return { token, admin: { id: admin._id, name: admin.name, email: admin.email } };
}

export async function createAdmin({ name, email, password }) {
  const hashedPassword = await bcrypt.hash(password, 12);
  return Admin.create({ name, email, password: hashedPassword });
}
