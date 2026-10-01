import { Router } from "express";
import auth from "../../middleware/auth.middleware.js";
import * as c from "./gallery.controller.js";
const router = Router();
router.get("/", c.list); router.get("/:id", c.get);
router.post("/", auth, c.create); router.put("/:id", auth, c.update); router.delete("/:id", auth, c.remove);
export default router;
