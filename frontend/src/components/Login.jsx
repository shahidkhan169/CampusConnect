import React from 'react';
import image from '../assets/login.jpg';

function Login() {
  return (
    <div className="h-screen w-screen flex overflow-hidden bg-white">
      {/* Left Side: Hero Image with Overlay */}
      <div
        className="hidden md:flex md:w-1/2 relative items-center justify-center"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 opacity-70"></div>
        <div className="relative z-10 px-12 max-w-lg">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight text-white">
            Welcome Back to <br />
            <span className="text-yellow-300 ">Campus Connect</span>
          </h1>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 px-6 sm:px-10 py-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo / Brand */}
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-800">
              <span className="text-blue-600">C</span>ampus
              <span className="text-indigo-600"> C</span>onnect
            </h1>
            <p className="text-gray-500 text-sm mt-1">Sign in to your academic hub</p>
          </div>

          {/* Form */}
          <form className="space-y-6 mt-6">
            {/* Email Field */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
                placeholder="you@example.edu"
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <a href="#forgot" className="text-xs text-blue-600 hover:text-blue-800">
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
                placeholder="••••••••"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg shadow hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
            >
              Log In
            </button>
          </form>

          {/* Footer Note */}
          <p className="mt-8 text-xs text-center text-gray-400">
            Secure login • Your data stays private
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;