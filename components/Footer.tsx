// components/Footer.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';


const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-8 px-8 border-t">

<div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 mt-8">
  <div className="flex items-center space-x-4 col-span-1 md:col-span-2">
    <Image
      src="/support.svg"
      alt="Support Us"
      className="w-32 h-32"
    />
    <div className='flex flex-col'>
      <p className="text-base font-semibold font-montserrat pb-6">
        Get involved in improving tech education in Africa!
      </p>
      <Link href="/support-us" className="bg-[#264FAD] text-white w-48 px-12 py-2 font-montserrat rounded-md">
        Support Us
      </Link>
    </div>
  </div>

  <div className="col-span-1">
    <h3 className="font-semibold mb-4">Links</h3>
    <ul>
      <li>
        <Link href="/" className="font-montserrat text-sm hover:text-indigo-600">
          Home
        </Link>
      </li>
      <li>
        <Link href="/success-stories" className="font-montserrat text-sm hover:text-indigo-600">
          Success Stories
        </Link>
      </li>
      <li>
        <Link href="/about-us" className="font-montserrat text-sm hover:text-indigo-600">
          About Us
        </Link>
      </li>
      <li>
        <Link href="/get-involved" className="font-montserrat text-sm hover:text-indigo-600">
          Get Involved
        </Link>
      </li>
    </ul>
  </div>

  <div className="col-span-1">
    <h3 className="font-semibold mb-4">Teams</h3>
    <ul>
      <li>
        <Link href="/board-members" className="font-montserrat text-sm hover:text-indigo-600">
          Board Members
        </Link>
      </li>
      <li>
        <Link href="/advisors-mentors" className="font-montserrat text-sm hover:text-indigo-600">
          Advisors/Mentors
        </Link>
      </li>
      <li>
        <Link href="/executives" className="font-montserrat text-sm hover:text-indigo-600">
          Executives
        </Link>
      </li>
      <li>
        <Link href="/staffs" className="font-montserrat text-sm hover:text-indigo-600">
          Staffs
        </Link>
      </li>
    </ul>
  </div>

  <div className="col-span-1">
    <h3 className="font-semibold mb-4">Blogs</h3>
    <ul>
      <li>
        <Link href="/recent-blogs" className="font-montserrat text-sm hover:text-indigo-600">
          Recent Blogs
        </Link>
      </li>
      <li>
        <Link href="/new-blog" className="font-montserrat text-sm hover:text-indigo-600">
          New Blog
        </Link>
      </li>
    </ul>
  </div>
</div>


      
      <div className="container mx-auto flex justify-between items-center mt-8 pt-8 border-t">
        <p className="text-[#0F0F0F] text-sm">
          © 2020 Africa to Silicon Valley, Inc. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Image src="/icons/twitter.svg" alt="Twitter" className="w-4 h-4" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Image src="/icons/facebook.svg" alt="Facebook" className="w-4 h-4" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <Image src="/icons/youtube.svg" alt="Youtube" className="w-4 h-4" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <Image src="/icons/linkedin.svg" alt="LinkedIn" className="w-4 h-4" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Image src="/icons/instagram.svg" alt="Instagram" className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
