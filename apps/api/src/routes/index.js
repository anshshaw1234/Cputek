import { Router } from "express";
import healthCheck from "./health-check.js";
import contactRoutes from "./contact.js";
import authRoutes from "./auth.js";
import blogRoutes from "./blogs.js";

export default function routes() {
    const router = Router();

    router.get("/health", healthCheck);

    router.use("/contact", contactRoutes);
    router.use("/auth", authRoutes);
    router.use("/blogs", blogRoutes);

    return router;
}