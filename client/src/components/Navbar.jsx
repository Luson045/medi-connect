import React, { useState, useEffect, useCallback, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { IoMenu, IoClose } from 'react-icons/io5';
import {
  FaHome,
  FaUser,
  FaHospital,
  FaUserPlus,
  FaHospitalAlt,
} from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { MdOutlineLocalHospital, MdLogin, MdDarkMode } from 'react-icons/md';
import { WiDaySunny } from 'react-icons/wi';
import { useRecoilState } from 'recoil';
import { mode } from '../store/atom';
import { UserContext } from '../store/userContext';
import PropTypes from 'prop-types';
import { FiUser } from 'react-icons/fi'; // New icon for user placeholder

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dark, setDark] = useRecoilState(mode);
  const [isNavbarVisible, setNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Access isAuthenticated, user, and handleLogout from UserContext
  const { isAuthenticated, user, handleLogout } = useContext(UserContext);

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  const handleToggleMode = () => {
    setDark(dark === 'light' ? 'dark' : 'light');
  };

  // Scroll event listener
  const controlNavbar = useCallback(() => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) {
        // If scrolled down
        setNavbarVisible(false);
      } else {
        // If scrolled up
        setNavbarVisible(true);
      }
      setLastScrollY(window.scrollY);
    }
  }, [lastScrollY]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      // Cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY, controlNavbar]);

  return (
    <nav
      className={`${
        dark === 'dark'
          ? 'bg-gradient-to-r from-gray-700 via-gray-900 to-black text-gray-100'
          : 'bg-[linear-gradient(90deg,_#a1c4fd_0%,_#c2e9fb_100%)] text-black'
      } top-0 fixed z-[100] py-4 md:py-2 flex justify-between items-center w-full px-5 lg:py-2 md:px-10 transition-transform duration-300 ease-in-out ${
        isNavbarVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <NavLink to="/">
        <img
          className="h-10 sm:pl-2 md:h-14"
          alt="medi-connects logo"
          src="../logo.png"
          onClick={() => setMobileMenuOpen(false)}
        />
      </NavLink>

      <div className="lg:hidden block absolute z-[101] right-3 md:right-8 text-3xl md:text-4xl">
        {isMobileMenuOpen ? (
          <IoClose onClick={toggleMobileMenu} />
        ) : (
          <IoMenu onClick={toggleMobileMenu} />
        )}
      </div>

      {isMobileMenuOpen && (
        <div
          className={`${
            dark === 'dark'
              ? 'bg-gradient-to-r from-gray-700 via-gray-900 to-black text-gray-100'
              : 'bg-[linear-gradient(90deg,_#a1c4fd_0%,_#c2e9fb_100%)] text-black'
          } lg:hidden absolute z-[100] flex text-xl md:text-2xl flex-col items-start pl-8 md:pl-12 gap-5 md:gap-7 top-16 md:top-[72px] w-full left-0 py-7 md:py-9 h-fit`}
        >
          <button
            onClick={handleToggleMode}
            className={`p-2 rounded-full transition-all duration-300 ${
              dark === 'light'
                ? 'bg-blue-200 text-blue-600 hover:bg-blue-300'
                : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
            }`}
          >
            {dark === 'light' ? <WiDaySunny /> : <MdDarkMode />}
          </button>

          {/* Navbar Links */}
          <NavLink
            className={({ isActive }) =>
              `${isActive ? 'border-b border-white ' : ''} flex gap-2 items-baseline`
            }
            to="/"
            onClick={() => setMobileMenuOpen(false)}
          >
            <FaHome />
            <p className="hover:brightness-50 hover:font-semibold">Home</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `${isActive ? 'border-b border-white ' : ''} flex gap-2 items-baseline`
            }
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
          >
            <AiOutlineInfoCircle />
            <p className="hover:brightness-50 hover:font-semibold">About</p>
          </NavLink>

          {/* Conditional Links */}
          {!isAuthenticated && (
            <NavLink
              className={({ isActive }) =>
                `${isActive ? 'border-b border-white ' : ''} flex gap-2 items-baseline`
              }
              to="/hospitals"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaHospital />
              <p className="hover:brightness-50 hover:font-semibold">Hospitals</p>
            </NavLink>
          )}

          {/* Show Lab Tests and Hospitals Around for regular user */}
          {isAuthenticated && user?.role === 'user' && (
            <>
              <NavLink
                className={({ isActive }) =>
                  `${isActive ? 'border-b border-white ' : ''} flex gap-2 items-baseline`
                }
                to="/labtest"
                onClick={() => setMobileMenuOpen(false)}
              >
                <MdOutlineLocalHospital />
                <p className="hover:brightness-50 hover:font-semibold">Lab Tests</p>
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  `${isActive ? 'border-b border-white ' : ''} flex gap-2 items-baseline`
                }
                to="/hospitals-around"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaHospitalAlt />
                <p className="hover:brightness-50 hover:font-semibold">
                  Hospitals Around
                </p>
              </NavLink>
            </>
          )}

          {/* Show only Hospitals Around for hospital */}
          {isAuthenticated && user?.role === 'hospital' && (
            <NavLink
              className={({ isActive }) =>
                `${isActive ? 'border-b border-white ' : ''} flex gap-2 items-baseline`
              }
              to="/hospitals-around"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaHospitalAlt />
              <p className="hover:brightness-50 hover:font-semibold">
                Hospitals Around
              </p>
            </NavLink>
          )}

          {isAuthenticated ? (
            <>
              {/* Profile Avatar with Name */}
              <div className="flex items-center gap-2">
                {/* Check if the user has an avatar, else use a placeholder */}
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full object-cover border border-gray-300"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center border border-gray-300">
                    <FiUser className="text-xl" />
                  </div>
                )}
                <span className="font-bold">
                  {user?.name || user?.hospitalName}
                </span>
              </div>

              <button
                className="bg-white px-5 py-1 rounded-lg text-black font-bold hover:brightness-75"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </>
          ) : (
            <div className="flex gap-2 flex-col xs:flex-row w-full xs:w-auto pr-4 xs:pr-0">
              <NavLink
                className="bg-white flex gap-2 w-full xs:w-auto items-center px-3 xs:px-4 py-1 rounded-lg text-black font-bold hover:brightness-75 login-btn"
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
              >
                <MdLogin />
                Login
              </NavLink>
              <NavLink
                className="bg-white flex gap-2 w-full xs:w-auto items-center px-3 xs:px-4 py-1 rounded-lg text-black font-bold hover:brightness-75"
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaUserPlus />
                Register
              </NavLink>
            </div>
          )}
        </div>
      )}

      <div className="hidden lg:flex items-center gap-10">
        <div className="flex items-center gap-4 text-lg font-medium">
          <button
            onClick={handleToggleMode}
            className={`p-2 rounded-full transition-all duration-300 ${
              dark === 'light'
                ? 'bg-blue-200 text-blue-600 hover:bg-blue-300'
                : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
            }`}
          >
            {dark === 'light' ? <WiDaySunny /> : <MdDarkMode />}
          </button>
          <NavLink to="/" className="flex justify-center items-center gap-2">
            <FaHome />
            <p className="font-bold text-lg hover:brightness-50">Home</p>
          </NavLink>

          <NavLink
            to="/about"
            className="flex justify-center items-center gap-2"
          >
            <AiOutlineInfoCircle />
            <p className="font-bold text-lg hover:brightness-50">About</p>
          </NavLink>

          {/* Conditional Links */}
          {!isAuthenticated && (
            <NavLink to="/hospitals" className="flex items-baseline gap-2">
              <FaHospital />
              <p className="font-bold text-lg hover:brightness-50">Hospitals</p>
            </NavLink>
          )}

          {/* Show Lab Tests and Hospitals Around for regular user */}
          {isAuthenticated && user?.role === 'user' && (
            <>
              <NavLink to="/labtest" className="flex items-baseline gap-2">
                <MdOutlineLocalHospital />
                <p className="font-bold text-lg hover:brightness-50">Lab Test</p>
              </NavLink>

              <NavLink to="/hospitals-around" className="flex items-baseline gap-2">
                <FaHospitalAlt />
                <p className="font-bold text-lg hover:brightness-50">
                  Hospitals Around
                </p>
              </NavLink>
            </>
          )}

          {/* Show only Hospitals Around for hospital */}
          {isAuthenticated && user?.role === 'hospital' && (
            <NavLink to="/hospitals-around" className="flex items-baseline gap-2">
              <FaHospitalAlt />
              <p className="font-bold text-lg hover:brightness-50">
                Hospitals Around
              </p>
            </NavLink>
          )}

          {isAuthenticated ? (
            <>
              {/* Profile Avatar with Name */}
              <div className="flex items-center gap-2">
                {/* Check if the user has an avatar, else use a placeholder */}
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full object-cover border border-gray-300"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center border border-gray-300">
                    <FiUser className="text-xl" />
                  </div>
                )}
                <span className="font-bold">
                  {user?.name || user?.hospitalName}
                </span>
              </div>

              <button
                className={`${
                  dark === 'dark'
                    ? 'bg-gray-900 text-gray-100'
                    : 'bg-white text-black'
                } flex gap-2 items-center px-5 py-1 rounded-lg font-bold hover:brightness-75`}
                onClick={handleLogout}
              >
                Log Out
              </button>
            </>
          ) : (
            <div className="flex gap-5">
              <NavLink
                className={`${
                  dark === 'dark'
                    ? 'bg-gray-900 text-gray-100'
                    : 'bg-white text-black'
                } flex gap-2 items-center px-5 py-1 rounded-lg font-bold hover:brightness-75`}
                to="/login"
              >
                <MdLogin /> Login
              </NavLink>
              <NavLink
                className={`${
                  dark === 'dark'
                    ? 'bg-gray-900 text-gray-100'
                    : 'bg-white text-black'
                } flex gap-2 items-center px-5 py-1 rounded-lg font-bold hover:brightness-75`}
                to="/register"
              >
                <FaUserPlus /> Register
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  user: PropTypes.object,
};

export default Navbar;
