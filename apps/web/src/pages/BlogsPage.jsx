import React, { useEffect, useState } from "react";
import { API_SERVER_URL } from "../lib/apiServerClient";
import { Link } from "react-router-dom";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);

  

  console.log("API_SERVER_URL:", API_SERVER_URL);

useEffect(() => {
  console.log("Fetching:", `${API_SERVER_URL}/blogs`);

  fetch(`${API_SERVER_URL}/blogs`)
    .then((res) => {
      console.log("Status:", res.status);
      return res.json();
    })
    .then((data) => {
      console.log("Data:", data);
      setBlogs(data.blogs || []);
    })
    .catch((err) => {
      console.error("Fetch Error:", err);
    });
}, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-28">
      <h1 className="text-4xl font-bold mb-10">Our Blogs</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog._id}
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
  <h2 className="text-xl font-bold mb-2">
    {blog.title}
  </h2>

  <p className="text-gray-600 mb-4">
    {blog.excerpt}
  </p>

  <Link
  to={`/blogs/${blog._id}`}
  className="inline-block mt-2 text-blue-600 font-semibold hover:text-blue-800"
>
  Read More →
</Link>
</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;