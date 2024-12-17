import React from 'react';
import { UserData } from '../context/User';

const Navbar = () => {
    const {logout} = UserData();

  return (
    <div className="bg-blue-500 p-4 flex justify-between items-center">
      <h1 className="text-white text-xl">RECEIPE</h1>
      <div className="flex space-x-4">
        <button className="text-white p-2 rounded-md bg-green-600">Admin</button>
        <button onClick={logout}  className="text-white bg-red-600 p-2 rounded-md">Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
