import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/Navbar.css';
import { UserContext } from './userContext';
import {
  FaHome,
  FaHospital,
  FaUser,
  FaUserPlus,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from 'react-icons/fa';
import { IoClose, IoMenu } from 'react-icons/io5';
import { MdLogin, MdOutlineLocalHospital } from 'react-icons/md';
import { AiOutlineInfoCircle } from 'react-icons/ai';

const Navbar = () => {
  const {
    user,
    isAuthenticated = true,
    handleLogout,
  } = useContext(UserContext);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <>
      {/* Logo positioned at the top left corner */}
      <div className="fixed top-0 left-0 z-[101] m-5">
        <NavLink to="/">
          <img
            className="h-12 md:h-16"
            alt="medi-connects logo"
            src="logo.png"
          />
        </NavLink>
      </div>

      {/* Sidebar toggle button positioned at the right */}
      <div className="fixed top-5 right-5 z-[102] text-4xl">
        {isSidebarOpen ? (
          <IoClose className="cursor-pointer" onClick={toggleSidebar} /> // Close icon when sidebar is open
        ) : (
          <IoMenu className="cursor-pointer" onClick={toggleSidebar} /> // Menu icon when sidebar is closed
        )}
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 z-[100] h-full w-[75vw] sm:w-[60vw] md:w-[40vw] bg-[linear-gradient(90deg,_#667eea_0%,_#764ba2_100%)] text-white transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        {/* Sidebar content */}
        <div className="p-8 pt-20 space-y-8 text-lg font-medium">
          {/* Home link */}
          <NavLink
            className={({ isActive }) =>
              `${isActive ? 'border-b border-white ' : ''} flex items-center gap-4 text-xl`
            }
            to="/"
            onClick={toggleSidebar} // Close sidebar after clicking the link
          >
            <FaHome size={24} /> <span>Home</span>
          </NavLink>

          {/* About link */}
          <NavLink
            className={({ isActive }) =>
              `${isActive ? 'border-b border-white ' : ''} flex items-center gap-4 text-xl`
            }
            to="/about"
            onClick={toggleSidebar}
          >
            <AiOutlineInfoCircle size={24} /> <span>About</span>
          </NavLink>

          {/* Conditional rendering for authenticated users */}
          {isAuthenticated ? (
            <>
              <NavLink
                className={({ isActive }) =>
                  `${isActive ? 'border-b border-white ' : ''} flex items-center gap-4 text-xl`
                }
                to="/profile"
                onClick={toggleSidebar}
              >
                <FaUser size={24} /> <span>Profile</span>
              </NavLink>

              {/* Hospitals link for 'user' role */}
              {user && user?.role === 'user' && (
                <NavLink
                  className={({ isActive }) =>
                    `${isActive ? 'border-b border-white ' : ''} flex items-center gap-4 text-xl`
                  }
                  to="/hospitals"
                  onClick={toggleSidebar}
                >
                  <FaHospital size={24} /> <span>Hospitals</span>
                </NavLink>
              )}

              {/* OPD Panel link for 'hospital' role */}
              {user && user?.role === 'hospital' && (
                <NavLink
                  className={({ isActive }) =>
                    `${isActive ? 'border-b border-white ' : ''} flex items-center gap-4 text-xl`
                  }
                  to="/panel"
                  onClick={toggleSidebar}
                >
                  <MdOutlineLocalHospital size={24} /> <span>OPD Panel</span>
                </NavLink>
              )}
            </>
          ) : (
            <NavLink
              className={({ isActive }) =>
                `${isActive ? 'border-b border-white ' : ''} flex items-center gap-4 text-xl`
              }
              to="/registerOPD"
              onClick={toggleSidebar}
            >
              <MdOutlineLocalHospital size={24} /> <span>Instant OPD</span>
            </NavLink>
          )}

          {/* Authentication buttons */}
          {isAuthenticated ? (
            <button
              className="bg-white text-black px-5 py-2 rounded-lg font-bold w-full text-left text-lg"
              onClick={handleLogout}
            >
              Log Out
            </button>
          ) : (
            <div className="flex flex-col gap-4">
              <NavLink
                className="bg-white text-black px-5 py-2 rounded-lg font-bold flex items-center gap-4 text-lg"
                to="/login"
                onClick={toggleSidebar}
              >
                <MdLogin size={24} /> <span>Login</span>
              </NavLink>
              <NavLink
                className="bg-white text-black px-5 py-2 rounded-lg font-bold flex items-center gap-4 text-lg"
                to="/register"
                onClick={toggleSidebar}
              >
                <FaUserPlus size={24} /> <span>Register</span>
              </NavLink>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 w-full bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white text-center">
          <div className="flex justify-center gap-6 mb-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook size={30} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter size={30} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={30} />
            </a>
          </div>
          <p className="text-sm">
            &copy; 2024 MediConnect. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
