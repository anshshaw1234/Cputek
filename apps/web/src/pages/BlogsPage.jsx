import React from "react";
import { Link } from "react-router-dom";
import blogs from "../data/blogs";

const BlogsPage = () => {
  return (
    <div className="py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-4">
          Our Blogs
        </h1>

        <p className="text-center text-gray-600 mb-10">
          Discover useful information about natural foods, oils and healthy
          living.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-56 object-cover"
                />
              )}

              <div className="p-6">

                <p className="text-sm text-gray-500 mb-2">
                  {blog.date}
                </p>

                <h2 className="text-xl font-semibold mb-3">
                  {blog.title}
                </h2>

                <p className="text-gray-600 mb-5 line-clamp-3">
                  {blog.excerpt}
                </p>

                <Link
                  to={`/blogs/${blog.id}`}
                  className="inline-block text-green-700 font-semibold hover:underline"
                >
                  Read More →
                </Link>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default BlogsPage;