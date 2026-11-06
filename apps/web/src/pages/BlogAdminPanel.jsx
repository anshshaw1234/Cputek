import { useCallback, useEffect, useState } from "react";
import { Bold, LogOut, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { API_SERVER_URL } from "../lib/apiServerClient";

const emptyForm = { title: "", excerpt: "", content: "" };
const findMatches = (content, query) => {
  const matches = [];
  if (!query) return matches;
  const normalizedContent = content.toLowerCase();
  const normalizedQuery = query.toLowerCase();
  let position = 0;
  while ((position = normalizedContent.indexOf(normalizedQuery, position)) !== -1) {
    matches.push({ start: position, end: position + normalizedQuery.length });
    position += normalizedQuery.length;
  }
  return matches;
};

export default function BlogAdminPanel({ onContacts, onLogout }) {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState("");
  const [existingImages, setExistingImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [contentSearch, setContentSearch] = useState("");
  const [contentSearchIndex, setContentSearchIndex] = useState(0);
  const contentMatches = findMatches(form.content, contentSearch.trim());

  const loadBlogs = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await fetch(`${API_SERVER_URL}/blogs`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      if (response.status === 401) {
        onLogout();
        return;
      }
      if (!response.ok) throw new Error(data.message || "Could not load blogs.");
      setBlogs(data.blogs);
    } catch (error) {
      setErrorMessage(error.message || "Could not load blogs.");
    } finally {
      setIsLoading(false);
    }
  }, [onLogout]);

  useEffect(() => {
    loadBlogs();
  }, [loadBlogs]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId("");
    setExistingImages([]);
    setSelectedFiles([]);
    setContentSearch("");
    setContentSearchIndex(0);
  };

  const startEditing = (blog) => {
    setForm({ title: blog.title, excerpt: blog.excerpt, content: blog.content });
    setEditingId(blog._id);
    setExistingImages(blog.images);
    setSelectedFiles([]);
    setContentSearch("");
    setContentSearchIndex(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const moveToContentMatch = (direction) => {
    if (!contentMatches.length) return;
    const nextIndex = (
      contentSearchIndex +
      direction +
      contentMatches.length
    ) % contentMatches.length;
    setContentSearchIndex(nextIndex);
    const match = contentMatches[nextIndex];
    document.getElementById("blog-content")?.setSelectionRange(match.start, match.end);
  };

  const addBoldFormatting = () => {
    const textarea = document.getElementById("blog-content");
    if (!textarea) return;
    const { selectionStart, selectionEnd, value } = textarea;
    const selected = value.slice(selectionStart, selectionEnd) || "bold text";
    const updated = `${value.slice(0, selectionStart)}**${selected}**${value.slice(selectionEnd)}`;
    setForm((current) => ({ ...current, content: updated }));
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(selectionStart + 2, selectionStart + 2 + selected.length);
    });
  };

  const submitBlog = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("excerpt", form.excerpt);
      formData.append("content", form.content);
      formData.append("existingImageIds", JSON.stringify(existingImages.map((image) => image._id)));
      selectedFiles.forEach((file) => formData.append("images", file));

      const response = await fetch(
        `${API_SERVER_URL}/blogs${editingId ? `/${editingId}` : ""}`,
        {
          method: editingId ? "PUT" : "POST",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          body: formData,
        },
      );
      const data = await response.json();
      if (response.status === 401) {
        onLogout();
        return;
      }
      if (!response.ok) throw new Error(data.message || "Could not save blog.");

      toast.success(editingId ? "Blog updated." : "Blog published.");
      resetForm();
      await loadBlogs();
    } catch (error) {
      toast.error(error.message || "Could not save blog.");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteBlog = async (blog) => {
    if (!window.confirm(`Delete "${blog.title}"? This cannot be undone.`)) return;
    try {
      const response = await fetch(`${API_SERVER_URL}/blogs/${blog._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      if (response.status === 401) {
        onLogout();
        return;
      }
      if (!response.ok) throw new Error(data.message || "Could not delete blog.");
      setBlogs((current) => current.filter((item) => item._id !== blog._id));
      if (editingId === blog._id) resetForm();
      toast.success("Blog deleted.");
    } catch (error) {
      toast.error(error.message || "Could not delete blog.");
    }
  };

  return (
    <main className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.2em] text-primary">CPUtek Admin</p>
            <h1 className="text-4xl font-bold text-foreground">Blog management</h1>
            <p className="mt-2 text-muted-foreground">Create, edit, and publish articles to the website.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={onContacts} className="glass-button rounded-xl px-4 py-3 text-foreground hover:text-primary">
              Contact submissions
            </button>
            <button type="button" onClick={onLogout} className="glass-button inline-flex items-center gap-2 rounded-xl px-4 py-3 text-foreground hover:text-primary">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </header>

        {errorMessage && <p role="alert" className="mb-5 rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-red-200">{errorMessage}</p>}

        <form onSubmit={submitBlog} className="glass-base mb-10 space-y-5 rounded-3xl p-5 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-foreground">{editingId ? "Edit blog" : "Write a blog"}</h2>
            {editingId && <button type="button" onClick={resetForm} className="text-sm text-muted-foreground hover:text-foreground">Cancel edit</button>}
          </div>
          <label className="block space-y-2 text-sm text-muted-foreground">
            Title
            <input
              required maxLength={200} value={form.title}
              onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
              className="w-full rounded-xl glass-button px-4 py-3 text-foreground"
            />
          </label>
          <label className="block space-y-2 text-sm text-muted-foreground">
            Short description
            <textarea
              required rows={2} value={form.excerpt}
              onChange={(event) => setForm((current) => ({ ...current, excerpt: event.target.value }))}
              className="w-full rounded-xl glass-button px-4 py-3 text-foreground"
            />
          </label>
          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <label htmlFor="blog-content" className="text-sm text-muted-foreground">Article content</label>
              <div className="flex flex-wrap items-center justify-end gap-2">
                <input
                  type="search"
                  aria-label="Search article content"
                  placeholder="Search content"
                  value={contentSearch}
                  onChange={(event) => {
                    const query = event.target.value;
                    const matches = findMatches(form.content, query.trim());
                    setContentSearch(query);
                    setContentSearchIndex(0);
                    if (matches[0]) {
                      document.getElementById("blog-content")?.setSelectionRange(matches[0].start, matches[0].end);
                    }
                  }}
                  className="w-40 rounded-lg glass-button px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
                />
                <span aria-live="polite" className="min-w-12 text-center text-xs text-muted-foreground">
                  {contentMatches.length ? `${contentSearchIndex + 1}/${contentMatches.length}` : "0 matches"}
                </span>
                <button
                  type="button" onClick={() => moveToContentMatch(-1)} disabled={!contentMatches.length}
                  className="glass-button rounded-lg px-2 py-2 text-sm text-foreground hover:text-primary disabled:opacity-40"
                  aria-label="Previous content match"
                >↑</button>
                <button
                  type="button" onClick={() => moveToContentMatch(1)} disabled={!contentMatches.length}
                  className="glass-button rounded-lg px-2 py-2 text-sm text-foreground hover:text-primary disabled:opacity-40"
                  aria-label="Next content match"
                >↓</button>
                <button
                  type="button" onClick={addBoldFormatting}
                  className="glass-button inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground hover:text-primary"
                  aria-label="Bold selected text"
                >
                  <Bold className="h-4 w-4" /> Bold
                </button>
              </div>
            </div>
            <textarea
              id="blog-content" required maxLength={100000} rows={12} value={form.content}
              onChange={(event) => {
                setForm((current) => ({ ...current, content: event.target.value }));
                setContentSearchIndex(0);
              }}
              placeholder={"Write your article here. Select text and use Bold, or type **bold text**.\n\nStart a heading with ## for a section heading."}
              className="w-full rounded-xl glass-button px-4 py-3 text-foreground"
            />
            <p className="mt-2 text-xs text-muted-foreground">Separate paragraphs with a blank line. Use ## / ### for headings and - for list items.</p>
          </div>
          <div>
            <label htmlFor="blog-images" className="mb-2 block text-sm text-muted-foreground">
              Images (up to 8 total, 4 MB each; total 10 MB)
            </label>
            <input
              id="blog-images" type="file" accept="image/jpeg,image/png,image/webp,image/gif" multiple
              onChange={(event) => {
                const files = Array.from(event.target.files || []);
                const remainingSlots = 8 - existingImages.length;
                if (files.length > remainingSlots) {
                  toast.error(`You can add up to ${remainingSlots} more image(s).`);
                }
                setSelectedFiles(files.slice(0, remainingSlots));
              }}
              className="block w-full text-sm text-muted-foreground file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:font-semibold file:text-primary-foreground"
            />
            {!!selectedFiles.length && <p className="mt-2 text-sm text-muted-foreground">{existingImages.length + selectedFiles.length} of 8 image(s) selected</p>}
            {!!existingImages.length && (
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {existingImages.map((image) => (
                  <div key={image._id} className="relative">
                    <img src={`${API_SERVER_URL}${image.url}`} alt={image.alt} className="aspect-video w-full rounded-lg object-cover" />
                    <button
                      type="button" onClick={() => setExistingImages((current) => current.filter((item) => item._id !== image._id))}
                      className="absolute right-2 top-2 rounded bg-black/70 px-2 py-1 text-xs text-white"
                    >Remove</button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            type="submit" disabled={isSaving}
            className="rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground disabled:opacity-50"
          >
            {isSaving ? "Saving…" : editingId ? "Save changes" : "Publish blog"}
          </button>
        </form>

        <section className="glass-base rounded-3xl p-5 sm:p-8">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-foreground">Published blogs</h2>
            <button type="button" onClick={loadBlogs} disabled={isLoading} className="glass-button rounded-xl px-4 py-2 text-foreground disabled:opacity-50">Refresh</button>
          </div>
          {isLoading ? <p className="py-8 text-center text-muted-foreground">Loading blogs…</p> : blogs.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">No admin blogs published yet.</p>
          ) : (
            <div className="divide-y divide-white/10">
              {blogs.map((blog) => (
                <article key={blog._id} className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-center gap-4">
                    {blog.images[0] && <img src={`${API_SERVER_URL}${blog.images[0].url}`} alt="" className="h-16 w-24 rounded-lg object-cover" />}
                    <div className="min-w-0">
                      <h3 className="truncate font-semibold text-foreground">{blog.title}</h3>
                      <p className="mt-1 truncate text-sm text-muted-foreground">{blog.excerpt}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{blog.images.length} image(s) · {blog.slug}</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button type="button" onClick={() => startEditing(blog)} className="glass-button inline-flex items-center gap-2 rounded-lg px-3 py-2 text-foreground hover:text-primary">
                      <Pencil className="h-4 w-4" /> Edit
                    </button>
                    <button type="button" onClick={() => deleteBlog(blog)} className="inline-flex items-center gap-2 rounded-lg border border-red-400/20 px-3 py-2 text-red-300 hover:bg-red-500/10">
                      <Trash2 className="h-4 w-4" /> Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
