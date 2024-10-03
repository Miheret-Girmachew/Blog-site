"use client"
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const [name, setName] = useState('');
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
      const response = await fetch('http://blogapp.tryasp.net/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Sign-up successful');
        router.push('/login'); // Redirect to login page after successful sign-up
      } else {
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left Side (Welcome Section) */}
      <div className="md:w-1/2 flex flex-col justify-center items-center bg-gray-50">
        <div className="p-8 md:p-16 text-center">
          <Image
            src="/man.svg" // Replace with your image in the "public" folder
            alt="Illustration"
            width={300}
            height={300}
            className="mx-auto"
          />
          <h1 className="text-4xl font-bold mt-6">Welcome to A2SV</h1>
          <p className="text-lg mt-4 text-gray-600">
            Register for free to receive blogs and learn more about A2SV
          </p>
        </div>
      </div>

      {/* Right Side (Sign-up Form) */}
      <div className="md:w-1/2 flex justify-center items-center bg-[#264FAD]">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign up</h2>
          <p className="text-center text-gray-600 mb-6">
            Hey, Enter your details to sign up
          </p>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            {/* Full Name Field */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Email Field */}
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

            {/* Password Field */}
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#264FAD] text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 ease-in-out"
              disabled={loading}
            >
              {loading ? 'Signing up...' : 'Sign up'}
            </button>
          </form>

          {/* Error message */}
          {error && (
            <p className="text-red-500 text-center mt-4">
              {error}
            </p>
          )}

          {/* Link to Login */}
          <p className="mt-6 text-center text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
