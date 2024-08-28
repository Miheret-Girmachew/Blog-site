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

const Related: React.FC<BlogCardProps> = ({ id, title, author, date, description, image, tags, authorAvatar }) => {
  return (
    <div className='border shadow-sm'>
    <img src={image} alt={title} className=" w-48 h-32 object-cover rounded-lg shadow-md" />
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

          <div className="my-6 flex flex-wrap gap-2">
            {tags.map(tag => (
              <span key={tag} className="text-sm text-[#8E8E8E] font-montserrat bg-[#f5f5f5] px-4 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          
        </div>
      
  
  );
};

export default Related;
