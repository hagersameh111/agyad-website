import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";
import serviceRoutes from "./modules/services/service.routes.js";
import galleryRoutes from "./modules/gallery/gallery.routes.js";
import projectRoutes from "./modules/projects/project.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => res.status(200).json({
  success: true,
  message: "Bab Ajyad API is running",
}));

app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/projects", projectRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  if (err.name === "ValidationError") return res.status(400).json({ success: false, message: "Validation failed" });
  if (err.name === "CastError") return res.status(400).json({ success: false, message: "Invalid ID" });
  if (err.code === 11000) return res.status(409).json({ success: false, message: "A record with that value already exists" });
  return res.status(500).json({ success: false, message: "Internal server error" });
});

export default app;
