import React, { useEffect, useState } from "react";

const LatestUpdates = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("blogs");
    if (stored) {
      setBlogs(JSON.parse(stored));
    }
  }, []);

  if (!blogs.length) return <p className="text-center text-gray-500">No blog updates yet.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {blogs.map((blog) => (
        <div key={blog.id} className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
          {blog.image && <img src={blog.image} alt="blog" className="w-full h-48 object-cover rounded mb-3" />}
          <h3 className="text-xl font-bold">{blog.title}</h3>
          <p className="text-gray-500 text-sm mb-2">{blog.date}</p>
          <p className="text-gray-700">{blog.content}</p>
        </div>
      ))}
    </div>
  );
};

export default LatestUpdates;
