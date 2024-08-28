import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <header className="bg-white px-8 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center justify-between w-full">
          <div className="flex-shrink-0">
            <Image
              src="/a2sv_logo.svg"
              alt="A2SV Logo"
              width={100}
              height={50}
            />
          </div>

          <nav className="flex-grow flex justify-center space-x-8 font-montserrat">
            <Link href="/" className="text-gray-600 hover:text-indigo-600 font-montserrat">Home</Link>
            <Link href="/teams" className="text-gray-600 hover:text-indigo-600 font-montserrat">Teams</Link>
            <Link href="/success-stories" className="text-gray-600 hover:text-indigo-600 font-montserrat">Success Stories</Link>
            <Link href="/about-us" className="text-gray-600 hover:text-indigo-600 font-montserrat">About Us</Link>
            <Link href="/blogs" className="text-gray-600 hover:text-indigo-600 font-montserrat">Blogs</Link>
            <Link href="/get-involved" className="text-gray-600 hover:text-indigo-600 font-montserrat">Get Involved</Link>
          </nav>

          <div className="flex-shrink-0 space-x-6">
            <Link href="/login" className="text-gray-700 font-montserrat hover:text-indigo-600">Login</Link>
            <Link href="/donate" className="bg-[#264FAD] text-white px-7 font-montserrat py-2 rounded-md">Donate</Link>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;
