"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://blogapp.tryasp.net/api/UserAccount/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), 
      });

      const data = await response.json();

      if (response.ok) {
        
        alert('Login successful');
        router.push('/blog');  
      } else {
        
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
     
      <div className="md:w-1/2 flex flex-col justify-center items-center bg-gray-50">
        <div className="p-8 md:p-16 text-center">
          <Image
            src="/man.svg" 
            alt="Illustration"
            width={300}
            height={300}
            className="mx-auto"
          />
          <h1 className="text-4xl font-bold mt-6">Welcome Back</h1>
          <p className="text-lg mt-4 text-gray-600">
            Login to receive blogs and learn more about A2SV
          </p>
        </div>
      </div>

     
      <div className="md:w-1/2 flex justify-center items-center bg-[#264FAD]">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <p className="text-center text-gray-600 mb-6">
            Hey, Enter your details to sign in to your account
          </p>
          <form onSubmit={handleSubmit}>
           
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

          
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            
            <button
              type="submit"
              className={`w-full bg-[#264FAD] text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>

            
            {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Do not have an account?{' '}
            <Link href="/signup" className="text-blue-600 hover:underline">
               Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
