// src/components/Navbar.js

import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/Navbar.css'; // Ensure the path is correct
import { UserContext } from './userContext';
import {
  FaHome,
  FaHospital,
  FaClipboardList,
  FaHamburger,
} from 'react-icons/fa';
import { IoClose, IoLogInSharp, IoMenu } from 'react-icons/io5';

// function Navbar() {
//   const { user, isAuthenticated = true, handleLogout } = useContext(UserContext);
//   const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

//   // Fetch user profile on component mount

//   // Toggle mobile menu visibility
//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-logo">
//         <NavLink to="/"><img className="logo-image" src="logo.png"></img></NavLink>
//       </div>

//       {/* Hamburger menu icon for mobile */}
//       <div className="navbar-menu-icon" onClick={toggleMobileMenu}>
//         <div className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
//           <span className="bar"></span>
//           <span className="bar"></span>
//           <span className="bar"></span>
//         </div>
//       </div>

//       {/* Navigation NavLinks */}
//       <div className={`navbar-NavLinks ${isMobileMenuOpen ? 'active' : ''}`}>
//         <div className="home tab">
//           <FaHome/>
//         <NavLink to="/">Home  ikp;</NavLink>
//         </div>

//         {isAuthenticated && (
//           <>
//             <NavLink to="/about">About</NavLink>
//             <NavLink to="/profile">Profile</NavLink>

//             {/* Show these NavLinks only if the user is a regular user */}
//             {user && user.role === "user" && (
//               <>
//                 <NavLink to="/hospitals">Hospitals</NavLink>
//               </>
//             )}
//             {user && user.role === "hospital" && (
//               <>
//                 <NavLink to="/panal">OPD Panal</NavLink>
//               </>
//             )}
//           </>
//         )}

//         {/* Authentication NavLinks */}
//         {!isAuthenticated ? (
//           <>
//             <div className="tab">
//               <FaHospital/>
//             <NavLink to="/registerOPD">Instant OPD</NavLink>
//             </div>

//             <div className="tab">
//               <IoLogInSharp/>
//             <NavLink to="/login">Login</NavLink>
//             </div>

//             <div className="tab">
//               <FaClipboardList/>
//             <NavLink to="/register">Register</NavLink>
//             </div>
//           </>
//         ) : (
//           <>
//             <NavLink to="#" onClick={handleLogout}>Logout</NavLink>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

const Navbar = () => {
  const {
    user,
    isAuthenticated = true,
    handleLogout,
  } = useContext(UserContext);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Fetch user profile on component mount

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };
  return (
    <nav className="bg-slate-900 relative py-4 flex justify-between items-center w-full px-5 md:px-10 text-white">
      <NavLink to="/">
        <img className="h-10 md:h-14" alt="medi-connects logo" src="logo.png" />
      </NavLink>

      <div className=" absolute z-[101] right-3 md:right-8 *:text-3xl *:md:text-4xl">
        {isMobileMenuOpen ? (
          <IoClose className="" onClick={toggleMobileMenu} />
        ) : (
          <IoMenu className="" onClick={toggleMobileMenu} />
        )}
      </div>
      {isMobileMenuOpen && (
        <div className="bg-slate-900  md:bg-lime-600 absolute z-[100] flex text-xl md:text-3xl flex-col items-start pl-8 gap-10 md:gap-16 top-16 md:top-20 w-full left-0 py-7 md:py-20 h-fit">
          <NavLink
            className={({ isActive }) =>
              `${isActive ? 'border-b border-white ' : ''}`
            }
            to="/"
          >
            Home
          </NavLink>
          {isAuthenticated ? (
            <>
              <NavLink
                className={({ isActive }) =>
                  `${isActive ? 'border-b border-white ' : ''}`
                }
                to="/about"
              >
                About
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `${isActive ? 'border-b border-white ' : ''}`
                }
                to="/profile"
              >
                Profile
              </NavLink>
              {user && user.role === 'user' && (
                <>
                  <NavLink
                    className={({ isActive }) =>
                      `${isActive ? 'border-b border-white ' : ''}`
                    }
                    to="/hospitals"
                  >
                    Hospitals
                  </NavLink>
                </>
              )}
              {user && user.role === 'hospital' && (
                <>
                  <NavLink
                    className={({ isActive }) =>
                      `${isActive ? 'border-b border-white ' : ''}`
                    }
                    to="/panal"
                  >
                    OPD Panal
                  </NavLink>
                </>
              )}
            </>
          ) : (
            <NavLink
              className={({ isActive }) =>
                `${isActive ? 'border-b border-white ' : ''}`
              }
              to="/registerOPD"
            >
              Instant OPD
            </NavLink>
          )}
          {isAuthenticated ? (
            <button
              className={` bg-white px-5 py-1 rounded-lg text-black`}
              onClick={handleLogout}
            >
              Log Out
            </button>
          ) : (
            <div className="flex gap-5">
              <NavLink
                className={({ isActive }) =>
                  `bg-white px-5 py-1 rounded-lg text-black`
                }
                to="/login"
              >
                Login
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  ` bg-white px-5 py-1 rounded-lg text-black`
                }
                to="/register"
              >
                Register
              </NavLink>
            </div>
          )}
        </div>
      )}
      {/* <div className="flex items-center gap-32">
        <div className="flex items-center gap-10">
          <NavLink to="/">Home</NavLink>
          {isAuthenticated ? (
            <>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/profile">Profile</NavLink>
              {user && user.role === 'user' && (
                <>
                  <NavLink to="/hospitals">Hospitals</NavLink>
                </>
              )}
              {user && user.role === 'hospital' && (
                <>
                  <NavLink to="/panal">OPD Panal</NavLink>
                </>
              )}
            </>
          ) : (
            <NavLink to="/registerOPD">Instant OPD</NavLink>
          )}
        </div>
        <div className="flex gap-5">
          {isAuthenticated ? (
            <NavLink
              className="bg-white px-5 py-1 rounded-lg text-black"
              to="/register"
            >
              Log Out
            </NavLink>
          ) : (
            <>
              <NavLink
                className="bg-white px-5 py-1 rounded-lg text-black"
                to="/login"
              >
                Login
              </NavLink>
              <NavLink
                className="bg-white px-5 py-1 rounded-lg text-black"
                to="/register"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div> */}
    </nav>
  );
};

export default Navbar;
