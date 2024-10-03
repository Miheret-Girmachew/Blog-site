// controllers/blogController.ts
import { Blog } from '../types/blog';

const API_URL = 'http://blogapp.tryasp.net/api/blogs';

// Function to fetch all blogs
export const fetchBlogs = async (): Promise<Blog[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }
    const data: Blog[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
};

// Function to fetch a single blog by ID
export const fetchBlogById = async (id: string): Promise<Blog> => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch blog');
    }
    const data: Blog = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching blog by ID:', error);
    throw error;
  }
};
