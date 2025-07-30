import React, { useState } from "react";

const AdminBlogPanel = ({ onAddBlog }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBlog = {
      id: Date.now(),
      title,
      content,
      image,
      date: new Date().toLocaleDateString(),
    };
    onAddBlog(newBlog);
    setTitle("");
    setContent("");
    setImage("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Blog Title"
        className="w-full border px-3 py-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Blog Content"
        className="w-full border px-3 py-2 rounded"
        rows="4"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Image URL (optional)"
        className="w-full border px-3 py-2 rounded"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Post Blog
      </button>
    </form>
  );
};

export default AdminBlogPanel;
