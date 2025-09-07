import React, { useEffect, useState } from "react";

const LatestUpdates = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("blogs");
    if (stored) {
      setBlogs(JSON.parse(stored));
    }
  }, []);

  if (!blogs.length)
    return (
      <p className="text-center text-gray-500 mt-10">
        No blog updates yet.
      </p>
    );

  return (
    <section className="py-12 px-4 md:px-12 bg-gradient-to-r from-blue-50 via-white to-blue-50">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800">
          Latest Updates
        </h2>

        {blogs.map((blog, index) => (
          <div
            key={blog.id}
            className={`flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden
              ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}
              ${index % 2 === 0 ? "animate-slideInLeft" : "animate-slideInRight"}`}
            style={{ animationDelay: `${index * 150}ms`, animationFillMode: "forwards" }}
          >
            {/* Blog content */}
            <div className="w-full md:w-1/2 p-6">
              <h3 className="text-2xl font-bold mb-2">{blog.title}</h3>
              <p className="text-gray-400 text-sm mb-3">{blog.date}</p>
              <p className="text-gray-700 mb-4 line-clamp-4">{blog.content}</p>

              {blog.author && (
                <div className="flex items-center gap-3 mt-4">
                  {blog.authorImage && (
                    <img
                      src={blog.authorImage}
                      alt={blog.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-semibold">{blog.author}</p>
                    <p className="text-sm text-gray-500">{blog.role}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Blog image */}
            {blog.image && (
              <div className="w-full md:w-1/2 h-64 md:h-auto">
                <img
                  src={blog.image}
                  alt="blog"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestUpdates;
