import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { motion } from "framer-motion";
import blog2 from "../../assets/blog2.jpeg";
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
  return (
    <div className="hero bg-gray-100 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div className="md:w-1/2 mb-8 md:mb-0" {...FadeUp(0.2)}>
            <h1 className="text-4xl font-bold mb-4">Welcome to E-MASTER</h1>
            <p className="text-xl mb-6">Start your learning journey today!</p>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-full flex items-center">
              Get Started
              <IoIosArrowRoundForward className="ml-2 text-2xl" />
            </button>
          </motion.div>
          <motion.div className="md:w-1/2" {...FadeUp(0.4)}>
            <img src={welcome} alt="E-learning" className="rounded-lg shadow-lg" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
