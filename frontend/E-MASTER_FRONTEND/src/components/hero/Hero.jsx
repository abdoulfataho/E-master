import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGraduationCap, FaCertificate, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";
import welcome from "../../assets/welcome.png";

export const FadeUp = (delay) => {
  return {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 0.5,
        delay: delay,
        ease: "easeInOut",
      },
    },
  };
};

const Hero = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userID = localStorage.getItem('userID');
    setIsLoggedIn(!!userID);
    if (userID) {
      console.log("We have this user saved with this User ID: " + userID);
    }
  }, []);

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="hero bg-gray-100 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Section */}
        <div className="flex flex-col md:flex-row items-center mb-16">
          <motion.div className="md:w-1/2 mb-8 md:mb-0" {...FadeUp(0.2)}>
            <h1 className="text-4xl font-bold mb-4">Welcome to E-MASTER</h1>
            <p className="text-xl mb-4">Empower your future with our cutting-edge online learning platform!</p>
            <p className="text-lg mb-6">
              E-MASTER is your gateway to a world of knowledge and skills. Our platform offers:
            </p>
            <ul className="list-disc list-inside mb-6 text-lg">
              <li>Diverse range of courses taught by industry experts</li>
              <li>Flexible learning schedules to fit your lifestyle</li>
              <li>Interactive lessons and hands-on projects</li>
              <li>Personalized learning paths for your career goals</li>
            </ul>
            {!isLoggedIn && (
              <button 
                onClick={handleSignUp}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition duration-300"
              >
                Start Your Journey
              </button>
            )}
          </motion.div>
          <motion.div className="md:w-1/2 flex justify-center" {...FadeUp(0.4)}>
            <img src={welcome} alt="E-learning" className="rounded-lg shadow-lg w-4/5 h-auto" />
          </motion.div>
        </div>

        {/* Key Benefits Section */}
        <motion.div {...FadeUp(0.6)} className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose E-MASTER?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <FaGraduationCap className="text-5xl text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
              <p className="text-gray-600">Learn from industry professionals and experienced educators.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <FaCertificate className="text-5xl text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Certified Courses</h3>
              <p className="text-gray-600">Earn valuable certificates upon course completion.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <FaUsers className="text-5xl text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community Support</h3>
              <p className="text-gray-600">Engage with peers and instructors in our learning community.</p>
            </div>
          </div>
        </motion.div>

        {/* Call-to-Action Section (only shown when not logged in) */}
        {!isLoggedIn && (
          <motion.div {...FadeUp(0.8)} className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
            <p className="text-xl mb-6">Join thousands of students already learning on E-MASTER!</p>
            <button 
              onClick={handleSignUp}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition duration-300"
            >
              Sign Up Now
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Hero;
