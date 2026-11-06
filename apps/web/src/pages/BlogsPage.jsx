import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { ArrowRight, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header.jsx";
import Footer from "@/components/Footer.jsx";
import ScrollRevealAnimation from "@/components/ScrollRevealAnimation.jsx";
import { API_SERVER_URL } from "@/lib/apiServerClient";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let active = true;
    fetch(`${API_SERVER_URL}/blogs`)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Could not load published blogs.");
        if (!Array.isArray(data.blogs)) throw new Error("The server returned an invalid blog list.");
        if (active) {
          setBlogs(data.blogs);
          setLoadError("");
        }
      })
      .catch((error) => {
        if (active) setLoadError(error.message || "Could not load published blogs.");
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Insights & Guides - CPUtek</title>
        <meta
          name="description"
          content="Explore practical guides on interactive e-learning, corporate training, and choosing an e-learning development partner."
        />
      </Helmet>

      <Header />
      <main className="flex-grow pt-32">
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollRevealAnimation>
              <div className="text-center max-w-3xl mx-auto mb-14">
                <p className="text-sm uppercase tracking-[0.2em] text-primary mb-4">CPUtek Insights</p>
                <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
                  Ideas for <span className="text-gradient-primary">better learning</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Practical perspectives on digital training, learning technology, and building
                  effective e-learning programs.
                </p>
              </div>
            </ScrollRevealAnimation>

            {loadError && (
              <p role="status" className="mb-6 rounded-xl border border-yellow-400/30 bg-yellow-500/10 p-4 text-center text-yellow-100">
                New articles could not be loaded right now. {loadError}
              </p>
            )}
            {isLoading ? (
              <p className="py-12 text-center text-muted-foreground">Loading published articles…</p>
            ) : blogs.length === 0 && !loadError ? (
              <p className="py-12 text-center text-muted-foreground">No articles have been published yet.</p>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
              {blogs.map((blog, index) => {
                const cover = blog.images?.[0]?.url ? `${API_SERVER_URL}${blog.images[0].url}` : "";
                return (
                  <ScrollRevealAnimation key={blog.slug} delay={index * 0.08}>
                    <article className="glass-card h-full p-7 md:p-8 rounded-3xl flex flex-col">
                      {cover && (
                        <div className="relative mb-6">
                          <img
                            src={cover}
                            alt={blog.images?.[0]?.alt || ""}
                            loading="lazy"
                            className="w-full aspect-[16/9] object-cover rounded-2xl"
                          />
                          {blog.images?.length > 1 && (
                            <span className="absolute bottom-3 right-3 rounded-lg bg-black/70 px-3 py-1 text-xs text-white">
                              +{blog.images.length - 1} photos
                            </span>
                          )}
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
                        <span>{blog.publishedAt}</span>
                        <span aria-hidden="true">·</span>
                        <Clock3 className="w-4 h-4" />
                        <span>{blog.readTime}</span>
                      </div>
                      <h2 className="text-2xl font-bold text-foreground mb-4 leading-snug">{blog.title}</h2>
                      <p className="text-muted-foreground leading-relaxed mb-8 flex-grow">{blog.excerpt}</p>
                      <Link
                        to={`/blogs/${blog.slug}`}
                        className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 smooth-transition"
                      >
                        Read the guide <ArrowRight className="w-4 h-4" />
                      </Link>
                    </article>
                  </ScrollRevealAnimation>
                );
              })}
            </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogsPage;
