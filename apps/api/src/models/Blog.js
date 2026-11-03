import mongoose from "mongoose";

const blogImageSchema = new mongoose.Schema(
  {
    data: {
      type: Buffer,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: "",
      maxlength: 300,
    },
  },
  { timestamps: false },
);

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    excerpt: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      maxlength: 100000,
    },
    images: {
      type: [blogImageSchema],
      default: [],
    },
  },
  { timestamps: true },
);

export default mongoose.model("Blog", blogSchema);
