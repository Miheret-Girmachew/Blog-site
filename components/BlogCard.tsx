// components/BlogCard.tsx
import React from 'react';
import Link from 'next/link';

interface BlogCardProps {
  id: string;  // Unique identifier for each blog post
  title: string;
  author: string | null;  // Author can be null
  date: string;
  description: string;
  image: string;
  tags: string[];
  authorAvatar: string | null;  // Author avatar can be null
}

const BlogCard: React.FC<BlogCardProps> = ({ id, title, author, date, description, image, tags, authorAvatar }) => {
  return (
    <Link href={`/blog/${id}`} className="block">
      <div className="flex flex-col mx-48 md:flex-row border-b rounded-md gap-16 md:space-y-0 hover:shadow-lg transition-shadow duration-300 ease-in-out">
        <div className="ml-0 md:ml-6 flex-1">
          <div className="flex items-center space-x-4 mt-2">
            {authorAvatar ? (
              <img src={authorAvatar} alt={author || 'Author'} className="w-12 h-12 rounded-full" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-300" />
            )}
            <div className="text-gray-500">
              <span className="text-black font-semibold">{author || 'Anonymous'}</span>
              <span className="text-xs"> • {date}</span>
            </div>
          </div>
          <h2 className="text-2xl mt-4 font-bold">{title}</h2>
          <p className="mt-4 text-sm font-montserrat text-[#737373]">{description}</p>
          <div className="my-6 flex flex-wrap gap-2">
            {tags.map(tag => (
              <span key={tag} className="text-sm text-[#8E8E8E] font-montserrat bg-[#f5f5f5] px-4 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <img src={image} alt={title} className=" w-48 h-32 object-cover rounded-lg shadow-md" />
      </div>
    </Link>
  );
};

export default BlogCard;
