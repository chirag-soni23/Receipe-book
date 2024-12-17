import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserData } from '../context/User';

const Login = () => {
  const { loginUser, btnLoading } = UserData();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(email, password, navigate);
  };

  return (
    <div className="h-screen bg-[url('https://images.unsplash.com/photo-1726241966203-46bdf38fd44c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGRhcmslMjBmb29kJTIwcGhvdG9ncmFwaHl8ZW58MHx8MHx8fDA%3D')] bg-no-repeat bg-cover bg-center w-screen flex items-center justify-center transition-all duration-500">
      <div className="bg-black bg-opacity-80 shadow-lg p-8 shadow-green-600 rounded-lg w-full max-w-md">
        <h1 className="text-center text-white text-3xl font-extrabold mb-6">LOGIN</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Email Field */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-white text-sm mb-1">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder="Enter your email"
              className="p-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-white text-sm mb-1">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="Enter your password"
              className="p-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            />
          </div>

          {/* Submit Button */}
          <button
            disabled={btnLoading}
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-semibold transition-all duration-300 focus:outline-none"
          >
            {btnLoading ? "Please Wait..." : "Login"}
          </button>
        </form>

        {/* Switch to Register */}
        <p className="text-green-200 text-center mt-6 font-semibold">
          Not a member?{" "}
          <Link to="/register" className="text-white font-bold underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
