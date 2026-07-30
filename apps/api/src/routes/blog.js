import express from "express";
console.log("✅ BLOG ROUTES LOADED");
import Blog from "../models/Blog.js";
import upload from "../middleware/upload.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import authMiddleware from "../middleware/auth.js";
const router = express.Router();

router.get("/:slug", async (req, res) => {
  console.log("Slug received:", req.params.slug);

  const blog = await Blog.findOne({
    slug: req.params.slug,
  });

  console.log(blog);

  if (!blog) {
    return res.status(404).json({
      success: false,
      message: "Blog not found",
    });
  }

  res.json({
    success: true,
    blog,
  });
});

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Blog router is working",
  });
});

router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
  try {
    const {
      title,
      slug,
      excerpt,
      content,
      author,
      status,
    } = req.body;

    let imageUrl = "";

    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "blogs",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

      imageUrl = uploadResult.secure_url;
    }

    const blog = await Blog.create({
      title,
      slug: (slug || title)
  .trim()
  .toLowerCase()
  .replace(/\s+/g, "-")
  .replace(/[^a-z0-9-]/g, ""),
      excerpt,
      content,
      author,
      status,
      image: imageUrl,
    });

    res.status(201).json({
      success: true,
      blog,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get All Blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


// Get Single Blog by Slug
router.get("/:slug", async (req, res) => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      blog,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      updatedBlog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Delete Blog
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedBlog =
      await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      deletedBlog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


router.patch("/:id/status", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json({
      success: true,
      updatedBlog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;