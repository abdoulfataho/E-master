import React from "react";
import { RiComputerLine } from "react-icons/ri";
import { CiMobile3 } from "react-icons/ci";
import { TbWorldWww } from "react-icons/tb";
import { IoMdHappy } from "react-icons/io";
import { BiSupport } from "react-icons/bi";
import { IoPulseOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const CoursesData = [
  {
    id: 1,
    title: "WEB DEVELOPMENT",
    icon: <TbWorldWww />,
    delay: 0.2,
    description: "Learn to build modern, responsive websites using HTML, CSS, and JavaScript.",
  },
  {
    id: 2,
    title: "CYBER SECURITY",
    icon: <CiMobile3 />,
    delay: 0.3,
    description: "Explore the world of cybersecurity and learn to protect digital assets from threats.",
  },
  {
    id: 3,
    title: "SOFTWARE ENGINEERING",
    icon: <RiComputerLine />,
    delay: 0.4,
    description: "Master the principles of software design, development, and maintenance.",
  },
  {
    id: 4,
    title: "FULL STACK JAVA DEVELOPMENT",
    icon: <IoMdHappy />,
    delay: 0.5,
    description: "Become proficient in both front-end and back-end development using Java technologies.",
  },
  {
    id: 5,
    title: "AMAZON WEB SERVICES",
    icon: <IoPulseOutline />,
    delay: 0.6,
    description: "Learn to leverage AWS cloud services for scalable and efficient applications.",
  },
  {
    id: 6,
    title: "DESKTOP SUPPORT",
    icon: <BiSupport />,
    delay: 0.7,
    description: "Gain skills to provide excellent technical support for desktop systems and software.",
  },
];

const SlideLeft = (delay) => {
  return {
    initial: {
      opacity: 0,
      x: 50,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        delay: delay,
        ease: "easeInOut",
      },
    },
  };
};

const Courses = () => {
  return (
    <section className="bg-white">
      <div className="container pb-14 pt-16">
        <h1 className="text-4xl font-bold text-left pb-10">
          Courses we provide
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {CoursesData.map((course) => (
            <motion.div
              key={course.id}
              variants={SlideLeft(course.delay)}
              initial="initial"
              animate="animate"
              className="bg-[#f4f4f4] rounded-2xl flex flex-col gap-4 items-center justify-center p-6 hover:bg-secondary hover:scale-105 duration-300 hover:shadow-2xl"
            >
              <div className="text-4xl mb-4"> {course.icon}</div>
              <h1 className="text-lg font-semibold text-center px-3">
                {course.title}
              </h1>
              <p className="text-sm text-center">{course.description}</p>
              <Link 
                to={`/course/${course.id}`} 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
              >
                View Course
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
