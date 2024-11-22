import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';

const Login = () => {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Trigger animation only once
    });
  }, []);

  return (
    <div
      
      className="bg-gray-900 w-[100vw] h-[100vh] flex flex-col justify-center items-center text-white"
    >
      {/* Icon Section */}
      <div className="mb-6">
        <MovieCreationIcon
          data-aos="fade-right" style={{ color: '#ff5252', height: '70px', width: '70px' }}
        />
      </div>

      {/* Form Container */}
      <div data-aos="flip-right" className="w-80 bg-gray-800 shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-semibold mb-6">Login</h1>

        {/* Form */}
        <form className="w-full flex flex-col gap-2">
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="bg-transparent border-b-2 border-gray-600 w-full text-sm py-2 px-1 focus:outline-none focus:border-red-500"
            />
          </div>
          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="bg-transparent border-b-2 border-gray-600  w-full text-sm py-2 px-1 focus:outline-none focus:border-red-500"
            />
          </div>
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white py-2 gap-4 rounded-lg text-sm font-medium transition-all"
          >
            Login to your account
          </button>
        </form>

        {/* Additional Links */}
        <p className="text-sm text-gray-400 mt-4 text-center">
          Don't have an account?{' '}
          <a href="sign-up" className="text-red-500 hover:underline cursor-pointer">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
