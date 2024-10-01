import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TbWorldWww } from "react-icons/tb";
import { CiMobile3 } from "react-icons/ci";
import { RiComputerLine } from "react-icons/ri";
import { IoMdHappy } from "react-icons/io";
import { BiSupport } from "react-icons/bi";
import { IoPulseOutline } from "react-icons/io5";

const iconMap = {
  TbWorldWww: <TbWorldWww />,
  CiMobile3: <CiMobile3 />,
  RiComputerLine: <RiComputerLine />,
  IoMdHappy: <IoMdHappy />,
  BiSupport: <BiSupport />,
  IoPulseOutline: <IoPulseOutline />,
};

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
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:7071/api/courses/allCourses')
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  return (
    <section className="bg-white">
      <div className="container pb-14 pt-16">
        <h1 className="text-4xl font-bold text-left pb-10">
          Courses we provide
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <motion.div
              key={course.id}
              variants={SlideLeft(0.2)} // Using a fixed delay as we don't have a delay property in the backend model
              initial="initial"
              animate="animate"
              className="bg-[#f4f4f4] rounded-2xl flex flex-col gap-4 items-center justify-center p-6 hover:bg-secondary hover:scale-105 duration-300 hover:shadow-2xl"
            >
              <div className="text-4xl mb-4">{iconMap['TbWorldWww']}</div> {/* Using a default icon as we don't have an icon property in the backend model */}
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
