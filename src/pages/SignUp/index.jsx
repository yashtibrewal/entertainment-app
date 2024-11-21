import React, { useState } from 'react'
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import registerUser from './api';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const navigate = useNavigate();

  const signup = async (event) => {
    event.preventDefault();
    const result = await registerUser(name, email, password);

    if (result.isSuccess) {
      navigate("/login");
    } else {
      // TODO: Toast the message
      console.log(result.message);
    }
  }

  return (
    <div
      className="bg-gray-900 w-screen h-screen flex flex-col justify-center items-center text-white"
    >
      {/* Icon Section */}
      <div className="mb-6">
        <MovieCreationIcon
          style={{ color: '#ff5252', height: '70px', width: '70px' }}
        />
      </div>

      {/* Form Container */}
      <div className="w-80 bg-gray-800 shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-semibold mb-6">SignUp</h1>

        {/* Form */}
        <div className="w-full flex flex-col gap-2">
          <div className="relative">
            <input
              type="name"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Name"
              className="bg-transparent border-b-2 border-gray-600 w-full text-sm py-2 px-1 focus:outline-none focus:border-red-500"
            />
          </div>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
              className="bg-transparent border-b-2 border-gray-600 w-full text-sm py-2 px-1 focus:outline-none focus:border-red-500"
            />
          </div>
          <div className="relative">
            <input
              type="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              className="bg-transparent border-b-2 border-gray-600  w-full text-sm py-2 px-1 focus:outline-none focus:border-red-500"
            />
          </div>
          <div className="relative">
            <input
              type="password"
              name="repeatPassword"
              value={repeatPassword}
              onChange={(event) => setRepeatPassword(event.target.value)}
              placeholder="Repeat password"
              className="bg-transparent border-b-2 border-gray-600  w-full text-sm py-2 px-1 focus:outline-none focus:border-red-500"
            />
          </div>
          <button
            type="submit"
            onClick={(event) => signup(event)}
            className="bg-red-500 hover:bg-red-600 text-white mt-2 py-2 gap-4 rounded-lg text-sm font-medium transition-all"
          >
            Create an account
          </button>
        </div>
        {/* Additional Links */}
        <p className="text-sm text-gray-400 mt-4 text-center">
          Already have an account?{' '}
          <a href="/login" className="text-red-500 hover:underline cursor-pointer">Login</a>
        </p>
      </div>
    </div>
  )
};

export default SignUp

