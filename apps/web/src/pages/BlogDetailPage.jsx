import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_SERVER_URL } from "../lib/apiServerClient";

export default function BlogDetailPage() {
  const { slug } = useParams();

  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(
        `${API_SERVER_URL}/blogs/${slug}`
      );

      setBlog(res.data.blog);
    } catch (err) {
      console.error(err);
    }
  };

  if (!blog) {
    return <h2 className="text-center mt-10">Loading...</h2>;
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">

      <img
        src={blog.image}
        alt={blog.title}
        className="w-full rounded-xl mb-8"
      />

      <h1 className="text-4xl font-bold mb-4">
        {blog.title}
      </h1>

      <p className="text-gray-500 mb-6">
        By {blog.author}
      </p>

      <div className="leading-8 text-lg whitespace-pre-wrap">
        {blog.content}
      </div>

    </div>
  );
}