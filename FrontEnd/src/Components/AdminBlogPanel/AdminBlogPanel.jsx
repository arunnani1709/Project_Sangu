import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminBlogPanel = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [selectedBlogId, setSelectedBlogId] = useState(null); // NEW: to track which blog is viewed

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem("blogs") || "[]");
    setBlogs(storedBlogs);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBlog = {
      id: Date.now(),
      title,
      content,
      image: imagePreview,
      date: new Date().toLocaleDateString(),
    };

    const updatedBlogs = [newBlog, ...blogs];
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    setBlogs(updatedBlogs);

    toast.success("Blog posted successfully!");

    setTitle("");
    setContent("");
    setImagePreview("");
  };

  const handleDelete = (id) => {
    const updatedBlogs = blogs.filter((blog) => blog.id !== id);
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    setBlogs(updatedBlogs);
    toast.info("Blog deleted");

    // Deselect blog if deleted
    if (selectedBlogId === id) {
      setSelectedBlogId(null);
    }
  };

  return (
    <div className="w-full px-4 md:px-10 py-6 pb-36 sm:pb-24 max-w-3xl mx-auto">
      <div className="bg-white shadow-md rounded-xl p-6 border border-green-100">
        <h2 className="text-2xl font-semibold text-green-700 mb-6 text-center">
          Post a New Blog
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Blog Title
            </label>
            <input
              type="text"
              placeholder="Enter blog title"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-green-300 focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Blog Content
            </label>
            <textarea
              placeholder="Write your blog content here..."
              className="w-full border border-gray-300 px-4 py-2 rounded-md resize-none focus:ring-2 focus:ring-green-300 focus:outline-none"
              rows="6"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Image (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-700"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-3 rounded-md w-full max-h-60 object-cover"
              />
            )}
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-green-600 text-white font-medium px-6 py-2 rounded-md hover:bg-green-700 transition"
            >
              Post Blog
            </button>
          </div>
        </form>

        <h3 className="text-xl font-semibold mb-3">Uploaded Blogs</h3>

        {blogs.length === 0 ? (
          <p className="text-gray-500">No blogs uploaded yet.</p>
        ) : (
          <ul className="space-y-3">
            {blogs.map(({ id, title }) => (
              <li
                key={id}
                className="flex justify-between items-center border rounded px-3 py-2"
              >
                <span className="font-medium text-green-700">{title}</span>
                <div className="space-x-2">
                  <button
                    onClick={() =>
                      setSelectedBlogId(selectedBlogId === id ? null : id)
                    }
                    className="text-blue-600 hover:underline"
                  >
                    {selectedBlogId === id ? "Hide" : "View"}
                  </button>
                  <button
                    onClick={() => handleDelete(id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"
                    aria-label={`Delete blog titled ${title}`}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Show selected blog content below the list */}
        {selectedBlogId && (
          <div className="mt-6 p-4 border rounded-md bg-gray-50 shadow">
            {(() => {
              const blog = blogs.find((b) => b.id === selectedBlogId);
              if (!blog) return null;

              return (
                <>
                  <h4 className="text-xl font-semibold text-green-800 mb-2">
                    {blog.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Posted on: {blog.date}
                  </p>
                  {blog.image && (
                    <img
                      src={blog.image}
                      alt="Blog"
                      className="w-full max-h-80 object-cover rounded my-4"
                    />
                  )}
                  <p className="text-gray-800 whitespace-pre-line">
                    {blog.content}
                  </p>
                </>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBlogPanel;
