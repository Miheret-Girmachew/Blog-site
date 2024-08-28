"use client";
import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { fetchBlogById } from "../../../controllers/blogController";
import { Blog } from "../../../types/blog";
import Related from "../../../components/BlogCard"; // Import the BlogCard component

const BlogPostPage = ({ params }: { params: { id: string } }) => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedBlogsData, setRelatedBlogsData] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [relatedLoading, setRelatedLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [relatedError, setRelatedError] = useState<string | null>(null);
  const { id } = params;

  useEffect(() => {
    if (id) {
      const getBlog = async () => {
        try {
          const data = await fetchBlogById(id);
          setBlog(data);

          // Fetch related blogs if any
          if (data.relatedBlogs.length > 0) {
            setRelatedLoading(true);
            try {
              const relatedPromises = data.relatedBlogs.map((relatedId) =>
                fetchBlogById(relatedId)
              );
              const relatedData = await Promise.all(relatedPromises);
              setRelatedBlogsData(relatedData);
            } catch (err) {
              setRelatedError("Failed to load related blogs");
            } finally {
              setRelatedLoading(false);
            }
          }
        } catch (error) {
          setError("Failed to load blog");
        } finally {
          setLoading(false);
        }
      };

      getBlog();
    }
  }, [id]);

  if (loading) {
    return<div className="animate-pulse">
    <div className="w-4/5 h-96 bg-gray-200 rounded-lg mb-6 mx-auto"></div>
    <div className="flex items-center space-x-4 mb-6">
      <div className="w-12 h-12 rounded-full bg-gray-200"></div>
      <div>
        <div className="w-24 h-4 bg-gray-200 mb-2"></div>
        <div className="w-32 h-4 bg-gray-200"></div>
      </div>
    </div>
    <div className="w-4/5 h-6 bg-gray-200 rounded mb-4 mx-auto"></div>
    <div className="w-3/5 h-6 bg-gray-200 rounded mb-4 mx-auto"></div>
    <div className="w-2/5 h-6 bg-gray-200 rounded mb-8 mx-auto"></div>
  </div>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!blog) {
    return <p>Blog not found.</p>;
  }

  return (
    <div>
      <Header />
      <main className="container mx-auto mt-8 flex flex-col items-center">
        <h1 className="text-3xl font-base mb-4 font-imfell text-center">
          {blog.title}
        </h1>

        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-4/5 h-96 object-cover font-montserrat rounded-lg mb-6"
          />
        )}
        <div className="flex items-center font-montserrat space-x-4 mb-6">
          {blog.author && blog.author.image ? (
            <img
              src={blog.author.image}
              alt={blog.author.name}
              className="w-12 h-12 rounded-full"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-300" />
          )}
          <div>
            <h2 className="text-xl font-semibold text-center">
              {blog.author?.name || "Anonymous"}
            </h2>
            <p className="text-sm text-gray-600 text-center">
              {blog.author?.email || "No email provided"}
            </p>
          </div>
        </div>

        <p className="text-lg text-[#737373] mb-8 mx-64 font-montserrat text-center">{blog.description}</p>
      </main>

      {relatedBlogsData.length > 0 && (
        <section className="related-blogs container mx-auto mt-8 flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4 text-center">Related Blogs</h2>
          {relatedLoading ? (
            <p>Loading related blogs...</p>
          ) : relatedError ? (
            <p>{relatedError}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedBlogsData.map((relatedBlog) => (
                <Related
                  key={relatedBlog._id}
                  id={relatedBlog._id}
                  title={relatedBlog.title}
                  author={relatedBlog.author.name}
                  date={new Date(relatedBlog.createdAt).toLocaleDateString()}
                  description={relatedBlog.description}
                  image={relatedBlog.image}
                  tags={relatedBlog.tags}
                  authorAvatar={relatedBlog.author.image}
                />
              ))}
            </div>
          )}
        </section>
      )}

      <Footer />
    </div>
  );
};

export default BlogPostPage;
