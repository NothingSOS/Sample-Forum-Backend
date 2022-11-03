import express from "express";

import forumRoutes from "./routes/forum.route";
import authRoutes from "./routes/auth.route";

export const router = express.Router();

router.use("/forum", forumRoutes);
router.use("/auth", authRoutes);
