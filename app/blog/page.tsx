"use client";
import React, { useEffect, useState } from 'react';
import BlogCard from '../../components/BlogCard';
import Header from '../../components/Header';
import Footer from '@/components/Footer';
import { fetchBlogs } from '../../controllers/blogController';
import { Blog } from '../../types/blog';

const BlogListPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [blogsPerPage] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>(''); // Added state for search term

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const data = await fetchBlogs();
        setBlogs(data);
      } catch (error) {
        setError('Failed to load blogs');
      } finally {
        setLoading(false);
      }
    };

    getBlogs();
  }, []);

  // Filter blogs based on the search term
  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.author?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Calculate the visible page numbers
  const getVisiblePages = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage < 4) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage > totalPages - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div>
      <Header />
      <main className="container mx-auto mt-8">
        <div className="flex justify-between items-center mb-4 px-4">
          <h1 className='text-black-600 font-montserrat text-xl font-bold ml-8'>Blogs</h1>
          <div className="flex flex-col md:flex-row md:justify-center space-y-4 md:space-y-0 md:space-x-4 w-full">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm} // Bind searchTerm state to input
              onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
              className="border border-gray-300 rounded-full px-4 py-2 w-full md:w-auto"
            />
            <a href="/new-blog" className="bg-[#264FAD] text-white px-6 py-2 rounded-full text-center">
              + New Blog
            </a>
          </div>
        </div>
        <hr className="border border-gray-200 mx-48 my-8" />

        <div className="mt-6 space-y-6 px-4">
          {loading ? (
            <div className="flex flex-col mx-48 md:flex-row border-b rounded-md gap-16 md:space-y-0 animate-pulse">
              {/* Content placeholder */}
              <div className="ml-0 md:ml-6 flex-1 space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="w-1/2 h-4 bg-gray-200 rounded-md"></div>
                    <div className="w-1/3 h-4 bg-gray-200 rounded-md"></div>
                  </div>
                </div>
                <div className="w-full h-6 bg-gray-200 rounded-md"></div>
                <div className="w-full h-4 bg-gray-200 rounded-md"></div>
                <div className="w-full h-4 bg-gray-200 rounded-md"></div>
              </div>
              {/* Image placeholder */}
              <div className="flex-1">
                <div className="w-full h-32 bg-gray-200 rounded-md"></div>
              </div>
            </div>
          ) : (
            <>
              {error && <p>{error}</p>}
              {!error && currentBlogs.length === 0 && <p>No blogs found.</p>}
              {currentBlogs.map(blog => (
                <BlogCard
                  key={blog._id}
                  id={blog._id}
                  title={blog.title}
                  author={blog.author?.name || 'Anonymous'}
                  date={new Date(blog.createdAt).toLocaleDateString()} // Use blog's created date
                  description={blog.description}
                  image={blog.image}
                  tags={blog.tags}
                  authorAvatar={blog.author?.image || null}
                />
              ))}

              {/* Pagination controls */}
              <div className="flex justify-center mt-6 pb-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 mx-1 rounded-md ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'} ${currentPage === 1 ? 'filter blur-sm' : ''}`}
                >
                  Previous
                </button>
                {getVisiblePages().map((page, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (page !== '...') handlePageChange(page as number);
                    }}
                    className={`px-4 py-2 mx-1 rounded-md ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'} ${page === '...' ? 'cursor-default' : ''}`}
                    disabled={page === '...'}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 mx-1 rounded-md ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'} ${currentPage === totalPages ? 'filter blur-sm' : ''}`}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogListPage;
