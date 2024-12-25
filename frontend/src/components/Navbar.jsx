import React, { useState } from 'react';
import { UserData } from '../context/User';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { logout, user } = UserData();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-blue-500 p-4 flex justify-between items-center">
      <h1 className="text-white font-extrabold tracking-tighter text-xl">RECEIPE</h1>
      <div className="flex items-center">
        <button
          onClick={toggleMenu}
          className="text-white lg:hidden p-2"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Modal for Menu */}
      {isMenuOpen && (
        <div className="fixed  inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-10 rounded-lg w-64 relative">
            <button
              onClick={closeMenu}
              className="absolute top-2 right-2 text-black"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="flex flex-col space-y-4">
              <Link
                to={'/'}
                className="text-white font-bold p-2 rounded-md bg-yellow-500 w-full text-center"
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link
                to={'/saved'}
                className="text-white font-bold p-2 rounded-md bg-orange-500 w-full text-center"
                onClick={closeMenu}
              >
                Saved
              </Link>
              <Link
                to={'/admin'}
                className={`text-white font-bold p-2 rounded-md bg-green-600 w-full text-center ${user.role === 'admin' ? 'block' : 'hidden'}`}
                onClick={closeMenu}
              >
                Admin
              </Link>
              <button
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="text-white font-bold bg-red-600 p-2 rounded-md w-full text-center"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="lg:flex space-x-4 hidden">
        <Link to={'/'} className="text-white p-2 rounded-md bg-yellow-500">
          Home
        </Link>
        <Link to={'/saved'} className="text-white p-2 rounded-md bg-orange-500">
          Saved
        </Link>
        <Link
          to={'/admin'}
          className={`text-white p-2 rounded-md bg-green-600 ${user.role === 'admin' ? 'block' : 'hidden'}`}
        >
          Admin
        </Link>
        <button onClick={logout} className="text-white bg-red-600 p-2 rounded-md">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
