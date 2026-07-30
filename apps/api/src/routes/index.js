import { Router } from "express";
import healthCheck from "./health-check.js";
import contactRoutes from "./contact.js";
import blogRoutes from "./blog.js";
import authRoutes from "./auth.js";

export default function routes() {
    const router = Router();

    router.get("/health", healthCheck);

    router.use("/contact", contactRoutes);
    router.use("/blogs", blogRoutes);
    router.use("/auth", authRoutes);

    return router;
}