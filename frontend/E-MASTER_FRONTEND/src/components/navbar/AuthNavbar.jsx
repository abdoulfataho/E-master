import React from "react";
import { Link } from "react-router-dom";

const AuthNavbar = () => {
  return (
    <nav className="bg-teal-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">E-MASTER</Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white hover:text-gray-300 transition duration-300">Home</Link>
          </li>
          <li>
            <Link to="/login" className="text-white hover:text-gray-300 transition duration-300">Login</Link>
          </li>
          <li>
            <Link to="/signup" className="text-white hover:text-gray-300 transition duration-300">Sign Up</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AuthNavbar;
