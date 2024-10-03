import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext.jsx';

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('userID');
    navigate('/');
  };

  return (
    <nav className="bg-cyan-700 p-4">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">E-MASTER</Link>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="lg:hidden text-white focus:outline-none"
        >
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path fillRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/>
            ) : (
              <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>
            )}
          </svg>
        </button>
        <ul className={`${isMenuOpen ? 'block' : 'hidden'} lg:flex lg:items-center w-full lg:w-auto mt-4 lg:mt-0 space-y-2 lg:space-y-0 lg:space-x-4`}>
          <li><Link to="/" className="block lg:inline-block text-white hover:text-gray-300 transition duration-300">Home</Link></li>
          <li><Link to="/courses" className="block lg:inline-block text-white hover:text-gray-300 transition duration-300">Courses</Link></li>
          <li><Link to="/about" className="block lg:inline-block text-white hover:text-gray-300 transition duration-300">About</Link></li>
          <li><Link to="/subscribe" className="block lg:inline-block text-white hover:text-gray-300 transition duration-300">Subscribe</Link></li>
          <li><Link to="/community" className="block lg:inline-block text-white hover:text-gray-300 transition duration-300">Our Community</Link></li>
          <li><Link to="/dashboard" className="block lg:inline-block text-white hover:text-gray-300 transition duration-300">Dashboard</Link></li>
          <li><button onClick={handleLogout} className="w-full lg:w-auto bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition duration-300">Logout</button></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

