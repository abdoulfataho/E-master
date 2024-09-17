// import React from "react";
// import { IoMdMenu } from "react-icons/io";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { FaUser } from 'react-icons/fa'
// const NavbarMenu = [
//   {
//     id: 1,
//     title: "Home",
//     path: "/Home",
//   },
//   {
//     id: 2,
//     title: "Courses",
//     path: "/Courses",
//   },
//   {
//     id: 3,
//     title: "About Us",
//     path: "/About", // Update the path to the correct value
//   },
//   {
//     id: 4,
//     title: "Our Team",
//     link: "/JoinUs", // Update the path to the correct value
//   },
//   {
//     id: 5,
//     title: "User Dashboard",
//     link: "#",
//   },
// ];
// const Navbar = () => {
//   return (
//     <nav className="relative z-20">
//       <motion.div
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="container py-10 flex justify-between items-center"
//       >
//         {/* Logo section */}
//         <div>
//           <h1 className="font-bold text-2xl ">E-Master</h1>
//         </div>
//         {/* Menu section */}
//         <div className="hidden lg:block">
//           <ul className="flex items-center gap-3">
//             {NavbarMenu.map((menu) => (
//               <li key={menu.id}>
//                 <Link
//                   to={menu.path}
//                   className="inline-block py-2 px-3 hover:text-secondary relative group"
//                 >
//                   <div className="w-2 h-2 bg-secondary absolute mt-4 rounded-full left-1/2 -translate-x-1/2 top-1/2 bottom-0 group-hover:block hidden"></div>
//                   {menu.title}
//                 </Link>
//               </li>
//             ))}
//             <Link to="/signin" className="primary-btn">Sign In</Link>
//           </ul>
//         </div>
//         {/* Mobile Hamburger menu section */}
//         <div className="lg:hidden">
//           <IoMdMenu className="text-4xl" />
//         </div>
//       </motion.div>
//     </nav>
//   );
// };

// export default Navbar;
import React from "react";
import { IoMdMenu } from "react-icons/io";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaUser } from 'react-icons/fa'

const NavbarMenu = [
  {
    id: 1,
    title: "Home",
    path: "/Home",
  },
  {
    id: 2,
    title: "Courses",
    path: "/Courses",
  },
  {
    id: 3,
    title: "About Us",
    path: "/About", // Update the path to the correct value
  },
  {
    id: 4,
    title: " Join Us",
    path: "/JoinUs", // Update the path to the correct value
  },
];

const Navbar = () => {
  const isUserSignedIn = false; // Replace with your logic to check if the user is signed in

  return (
    <nav className="relative z-20  bg-teal-900 text-neutral-50">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="container py-10 flex justify-between items-center"
      >
        {/* Logo section */}
        <div>
          <h1 className="font-bold text-2xl ">E-Master</h1>
        </div>
        {/* Menu section */}
        <div className="hidden lg:block">
          <ul className="flex items-center gap-3">
            {NavbarMenu.map((menu) => (
              <li key={menu.id}>
                <Link
                  to={menu.path}
                  className="inline-block py-2 px-3 hover:text-secondary relative group"
                >
                  <div className="w-2 h-2 bg-secondary absolute mt-4 rounded-full left-1/2 -translate-x-1/2 top-1/2 bottom-0 group-hover:block hidden"></div>
                  {menu.title}
                </Link>
              </li>
            ))}
            {isUserSignedIn && (
              <Link to="/dashboard" className="primary-btn">
                Dashboard
              </Link>
            )}
            <Link to="/signin" className="primary-btn">
              Sign In
            </Link>
          </ul>
        </div>
        {/* Mobile Hamburger menu section */}
        <div className="lg:hidden">
          <IoMdMenu className="text-4xl" />
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;

