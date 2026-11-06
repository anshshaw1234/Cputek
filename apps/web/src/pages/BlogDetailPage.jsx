import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { ArrowLeft, Clock3 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Header from "@/components/Header.jsx";
import Footer from "@/components/Footer.jsx";
import BlogContent from "@/components/BlogContent.jsx";
import { API_SERVER_URL } from "@/lib/apiServerClient";

const formatPublishedAt = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
};

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [remoteBlog, setRemoteBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let active = true;
    setRemoteBlog(null);
    setLoadError("");
    setIsLoading(true);
    fetch(`${API_SERVER_URL}/blogs/${encodeURIComponent(slug)}`)
      .then(async (response) => {
        if (response.status === 404) {
          if (active) setRemoteBlog(null);
          return;
        }
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Could not load this blog.");
        if (!data.blog || data.blog.slug !== slug) throw new Error("The server returned an invalid blog.");
        if (active) setRemoteBlog(data.blog);
      })
      .catch((error) => {
        if (active) setLoadError(error.message || "Could not load this blog.");
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [slug]);

  const blog = remoteBlog;
  const imageList = remoteBlog?.images?.length
    ? remoteBlog.images.map((image) => ({ src: `${API_SERVER_URL}${image.url}`, alt: image.alt || blog.title }))
    : [];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{blog ? `${blog.title} - CPUtek` : "Article not found - CPUtek"}</title>
        {blog && <meta name="description" content={blog.excerpt} />}
      </Helmet>

      <Header />
      <main className="flex-grow pt-32">
        {blog ? (
          <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary smooth-transition mb-10"
            >
              <ArrowLeft className="w-4 h-4" />
              All articles
            </Link>

            {loadError && (
              <p role="status" className="mb-6 rounded-xl border border-yellow-400/30 bg-yellow-500/10 p-4 text-yellow-100">
                The latest article content could not be refreshed. {loadError}
              </p>
            )}
            <header className="mb-12">
              <p className="text-sm uppercase tracking-[0.2em] text-primary mb-4">CPUtek Insights</p>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">{blog.title}</h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">{blog.excerpt}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{formatPublishedAt(blog.publishedAt)}</span>
                <span aria-hidden="true">·</span>
                <Clock3 className="w-4 h-4" />
                <span>{blog.readTime}</span>
              </div>
            </header>

            {!!imageList.length && (
              <div className="mb-10 space-y-4">
                <img
                  src={imageList[0].src}
                  alt={imageList[0].alt}
                  className="w-full max-h-[480px] object-cover rounded-3xl"
                />
                {imageList.length > 1 && (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {imageList.slice(1).map((image, index) => (
                      <img
                        key={`${image.src}-${index}`}
                        src={image.src}
                        alt={image.alt}
                        loading="lazy"
                        className="aspect-[4/3] w-full rounded-2xl object-cover"
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="glass-base rounded-3xl p-6 sm:p-10 md:p-12">
              <BlogContent content={remoteBlog.content} />
            </div>
          </article>
        ) : isLoading ? (
          <div className="min-h-[55vh] flex items-center justify-center px-4 text-muted-foreground">Loading article…</div>
        ) : (
          <div className="min-h-[55vh] flex items-center justify-center px-4">
            <div className="text-center glass-base p-10 md:p-12 rounded-3xl">
              <h1 className="text-3xl font-bold text-foreground mb-4">Article not found</h1>
              <p className="text-muted-foreground mb-7">{loadError || "This article may have moved."}</p>
              <Link to="/blogs" className="text-primary font-semibold hover:underline">Browse all articles</Link>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BlogDetailPage;
