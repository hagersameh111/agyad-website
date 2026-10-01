import { login } from "./auth.service.js";

export async function loginAdmin(req, res, next) {
  try {
    const { email, password } = req.body ?? {};
    if (!email || !password) return res.status(400).json({ success: false, message: "Email and password are required" });
    const result = await login(email, password);
    if (!result) return res.status(401).json({ success: false, message: "Invalid email or password" });
    return res.status(200).json({ success: true, message: "Login successful", ...result });
  } catch (error) { return next(error); }
}
