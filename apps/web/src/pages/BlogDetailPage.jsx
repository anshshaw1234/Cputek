import React from "react";
import { Link, useParams } from "react-router-dom";
import blogs from "../data/blogs";

const BlogDetailPage = () => {
  const { id } = useParams();

  const blog = blogs.find((item) => String(item.id) === String(id));

  if (!blog) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">
            Blog Not Found
          </h1>

          <Link
            to="/blogs"
            className="text-green-700 font-semibold"
          >
            ← Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 md:px-8">
      <article className="max-w-4xl mx-auto">

        {/* Back */}
        <Link
          to="/blogs"
          className="inline-block mb-8 text-green-700 font-medium hover:underline"
        >
          ← Back to Blogs
        </Link>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
          {blog.title}
        </h1>

        {/* Date */}
        <p className="text-gray-300 mb-8">
          {blog.date}
        </p>

        {/* Image */}
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full max-h-[500px] object-cover rounded-2xl mb-10"
          />
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none text-gray-200 leading-8">
          {blog.content
            ?.split("\n")
            .filter(Boolean)
            .map((paragraph, index) => (
              <p key={index} className="mb-6">
                {paragraph}
              </p>
            ))}
        </div>

      </article>
    </div>
  );
};

export default BlogDetailPage;