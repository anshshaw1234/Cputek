import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import Blog from "../models/Blog.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();
const maxImageCount = 8;
const maxImageSize = 4 * 1024 * 1024;
const maxTotalImageSize = 10 * 1024 * 1024;
const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: maxImageSize, files: maxImageCount },
  fileFilter: (_req, file, callback) => {
    if (!allowedImageTypes.has(file.mimetype)) {
      callback(new Error("Images must be JPEG, PNG, WebP, or GIF files."));
      return;
    }
    callback(null, true);
  },
});

const receiveImages = (req, res, next) => {
  upload.array("images", maxImageCount)(req, res, (error) => {
    if (!error) {
      next();
      return;
    }

    const status = error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE"
      ? 413
      : 400;
    res.status(status).json({
      success: false,
      message: error.message || "Could not process uploaded images.",
    });
  });
};

const slugify = (value) => value
  .toLowerCase()
  .normalize("NFKD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "")
  .slice(0, 180) || "blog";

const makeUniqueSlug = async (title, excludedId) => {
  const baseSlug = slugify(title);
  let slug = baseSlug;
  let suffix = 2;
  while (await Blog.exists({ slug, ...(excludedId ? { _id: { $ne: excludedId } } : {}) })) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
  return slug;
};

const serializeBlog = (blog) => {
  const imageList = (blog.images || []).map((image) => ({
    _id: image._id,
    alt: image.alt || "",
    url: `/blogs/${blog._id}/images/${image._id}`,
  }));
  const wordCount = blog.content.trim().split(/\s+/).filter(Boolean).length;

  return {
    _id: blog._id,
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt,
    content: blog.content,
    images: imageList,
    publishedAt: blog.createdAt,
    readTime: `${Math.max(1, Math.ceil(wordCount / 200))} min read`,
    createdAt: blog.createdAt,
    updatedAt: blog.updatedAt,
  };
};

const validateBlogFields = ({ title, excerpt, content }) => (
  typeof title === "string" &&
  title.trim().length > 0 &&
  title.trim().length <= 200 &&
  typeof excerpt === "string" &&
  excerpt.trim().length > 0 &&
  typeof content === "string" &&
  content.trim().length > 0 &&
  content.length <= 100000
);

const getUploadedImageSize = (files) => files.reduce((total, file) => total + file.size, 0);

router.get("/", async (_req, res) => {
  try {
    const blogs = await Blog.find().select("-images.data").sort({ createdAt: -1 }).lean();
    return res.json({ success: true, blogs: blogs.map(serializeBlog) });
  } catch (error) {
    console.error("Blogs could not be loaded:", error.message);
    return res.status(500).json({ success: false, message: "Blogs could not be loaded." });
  }
});

router.get("/:blogId/images/:imageId", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.blogId) || !mongoose.isValidObjectId(req.params.imageId)) {
    return res.status(404).end();
  }

  try {
    const blog = await Blog.findById(req.params.blogId).select("images");
    const image = blog?.images.id(req.params.imageId);
    if (!image) return res.status(404).end();

    res.set("Content-Type", image.contentType);
    res.set("X-Content-Type-Options", "nosniff");
    res.set("Cache-Control", "public, max-age=3600");
    return res.send(image.data);
  } catch (error) {
    console.error("Blog image could not be loaded:", error.message);
    return res.status(500).json({ success: false, message: "Blog image could not be loaded." });
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug }).select("-images.data").lean();
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found." });
    return res.json({ success: true, blog: serializeBlog(blog) });
  } catch (error) {
    console.error("Blog could not be loaded:", error.message);
    return res.status(500).json({ success: false, message: "Blog could not be loaded." });
  }
});

router.post("/", authMiddleware, receiveImages, async (req, res) => {
  const { title, excerpt, content } = req.body ?? {};
  const files = req.files || [];

  if (!validateBlogFields({ title, excerpt, content })) {
    return res.status(400).json({
      success: false,
      message: "Provide a title, excerpt, and content within the allowed lengths.",
    });
  }
  if (getUploadedImageSize(files) > maxTotalImageSize) {
    return res.status(413).json({ success: false, message: "The combined image size must be 10 MB or less." });
  }

  try {
    const blog = await Blog.create({
      title: title.trim(),
      slug: await makeUniqueSlug(title),
      excerpt: excerpt.trim(),
      content,
      images: files.map((file) => ({
        data: file.buffer,
        contentType: file.mimetype,
        alt: title.trim(),
      })),
    });
    return res.status(201).json({ success: true, blog: serializeBlog(blog) });
  } catch (error) {
    console.error("Blog could not be created:", error.message);
    return res.status(500).json({ success: false, message: "Blog could not be created." });
  }
});

router.put("/:id", authMiddleware, receiveImages, async (req, res) => {
  const { title, excerpt, content, existingImageIds } = req.body ?? {};
  const files = req.files || [];
  let retainedIds;

  if (!validateBlogFields({ title, excerpt, content })) {
    return res.status(400).json({
      success: false,
      message: "Provide a title, excerpt, and content within the allowed lengths.",
    });
  }
  try {
    retainedIds = JSON.parse(existingImageIds || "[]");
  } catch {
    return res.status(400).json({ success: false, message: "The retained image list is invalid." });
  }
  if (
    !Array.isArray(retainedIds) ||
    retainedIds.some((id) => typeof id !== "string" || !mongoose.isValidObjectId(id))
  ) {
    return res.status(400).json({ success: false, message: "The retained image list is invalid." });
  }
  if (getUploadedImageSize(files) > maxTotalImageSize) {
    return res.status(413).json({ success: false, message: "The combined image size must be 10 MB or less." });
  }

  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found." });
    const retainedImages = blog.images.filter((image) => retainedIds.includes(image._id.toString()));
    const updatedImages = [
      ...retainedImages,
      ...files.map((file) => ({
        data: file.buffer,
        contentType: file.mimetype,
        alt: title.trim(),
      })),
    ];
    if (updatedImages.length > maxImageCount) {
      return res.status(400).json({
        success: false,
        message: `A blog can contain up to ${maxImageCount} images.`,
      });
    }
    if (updatedImages.reduce((total, image) => total + image.data.length, 0) > maxTotalImageSize) {
      return res.status(413).json({ success: false, message: "The combined image size must be 10 MB or less." });
    }

    blog.title = title.trim();
    blog.slug = await makeUniqueSlug(title, blog._id);
    blog.excerpt = excerpt.trim();
    blog.content = content;
    blog.images = updatedImages;
    await blog.save();
    return res.json({ success: true, blog: serializeBlog(blog) });
  } catch (error) {
    console.error("Blog could not be updated:", error.message);
    return res.status(500).json({ success: false, message: "Blog could not be updated." });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ success: false, message: "Invalid blog identifier." });
  }
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found." });
    return res.json({ success: true });
  } catch (error) {
    console.error("Blog could not be deleted:", error.message);
    return res.status(500).json({ success: false, message: "Blog could not be deleted." });
  }
});

export default router;
