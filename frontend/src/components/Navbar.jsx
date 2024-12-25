import React from 'react';
import { UserData } from '../context/User';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const {logout,user} = UserData();
    
  return (
    <div className="bg-blue-500 p-4 flex justify-between items-center">
      <h1 className="text-white text-xl">RECEIPE</h1>
      <div className="flex space-x-4">
      <Link to={'/'} className={`text-white p-2 rounded-md bg-yellow-500`}>Home</Link>
      <Link to={'/saved'} className={`text-white p-2 rounded-md bg-orange-500`}>Saved</Link>
        <Link to={'/admin'} className={`text-white p-2 rounded-md bg-green-600 ${user.role == 'admin'?"block":"hidden"}`}>Admin</Link>
        <button onClick={logout}  className="text-white bg-red-600 p-2 rounded-md">Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
