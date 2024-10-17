import React, { useState, useEffect, useCallback, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { IoMenu, IoClose } from 'react-icons/io5';
import {
  FaHome,
  FaUser,
  FaHospital,
  FaUserPlus,
  FaHospitalAlt,
} from 'react-icons/fa'; // Import FaHospitalAlt
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { MdOutlineLocalHospital, MdLogin, MdDarkMode, MdLogout } from 'react-icons/md';
import { WiDaySunny } from 'react-icons/wi';
import { useRecoilState } from 'recoil';
import { mode } from '../store/atom';
import PropTypes from 'prop-types';
import { UserContext } from '../store/userContext';

const Navbar = () => {
  const {
    user,
    isAuthenticated = true,
    handleLogout,
  } = useContext(UserContext);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dark] = useRecoilState(mode);
  const [isNavbarVisible, setNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMobileMenu = (val) => {
    if (!val) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
    setMobileMenuOpen(val);
  }

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
  const navLinks =
    [
      {
        title: 'Home',
        icon: <FaHome />,
        link: '/',
        isVisible: true
      },
      {
        title: 'About',
        icon: <AiOutlineInfoCircle />,
        link: '/about',
        isVisible: true

      }, {
        title: 'Lab Test',
        icon: <MdOutlineLocalHospital />,
        link: '/labtest',
        isVisible: true

      },
      {
        title: 'Blogs',
        icon: <MdOutlineLocalHospital />,
        link: '/blog',
        isVisible: true

      }, {
        title: 'Hospitals Around',
        icon: <FaHospitalAlt />,
        link: '/hospitals-around',
        isVisible: true
      }, {
        title: 'Instant OPD',
        icon: <MdOutlineLocalHospital />,
        link: '/registerOPD',
        isVisible: !isAuthenticated
      }, {
        title: 'Profile',
        icon: <FaUser />,
        link: '/profile',
        isVisible: isAuthenticated
      }, {
        title: 'Hospitals',
        icon: <FaHospital />,
        link: '/hospitals',
        isVisible: isAuthenticated && user && user?.role === 'user'
      }, {
        title: 'OPD Panel',
        icon: <MdOutlineLocalHospital />,
        link: '/panel',
        isVisible: isAuthenticated && user && user?.role === 'hospital'
      }
    ]
  return (
    <nav
      className={`${dark === 'dark'
        ? 'bg-gradient-to-r from-gray-700 via-gray-900 to-black text-gray-100'
        : 'bg-[linear-gradient(90deg,_#a1c4fd_0%,_#c2e9fb_100%)] text-black'
        } top-0 fixed z-[100] py-4 md:py-2 flex justify-between items-center w-full px-5 lg:py-2 md:px-10 transition-transform duration-300 ease-in-out ${isNavbarVisible ? 'translate-y-0' : '-translate-y-full'
        } `}
    >
      <div onClick={() => toggleMobileMenu(false)} className={`absolute top-0 left-0 duration-500 w-full  min-h-[100dvh] ${dark === "dark" ? "bg-white/50" : "bg-black/50"} ${isMobileMenuOpen ? "opacity-100 visible " : "opacity-0 invisible "} z-[101]`} />
      <NavLink to="/">
        <img
          className="h-10 sm:pl-2 md:h-14"
          alt="medi-connects logo"
          src="../logo.png"
          onClick={() => setMobileMenuOpen(false)}
        />
      </NavLink>
      <IoMenu onClick={() => toggleMobileMenu(true)} className='text-3xl cursor-pointer lg:hidden' />


      {/* Nobile neu section */}
      <div
        className={`${dark === 'dark'
          ? 'bg-gradient-to-r from-gray-700 via-gray-900 to-black text-gray-100'
          : 'bg-[linear-gradient(90deg,_#a1c4fd_0%,_#c2e9fb_100%)] text-black'
          } lg:hidden fixed top-0 left-0 ${isMobileMenuOpen ? "translate-x-0" : "translate-x-[-110%]"} duration-500 flex flex-col justify-between  text-xl md:text-2xl  w-full max-w-80 h-screen z-[102]`}
      >
        {/* side nav bar top section */}
        <div className='flex justify-between items-center w-full px-2 py-3 border-b border-b-gray-400'>

          <NavLink to="/" className={"block"}>
            <img
              className="h-14 sm:pl-2 md:h-14"
              alt="medi-connects logo"
              src="../logo.png"
              onClick={() => setMobileMenuOpen(false)}
            />
          </NavLink>
          <div className='flex items-center gap-2'>
            <ToggleTheme />

            <IoClose onClick={() => toggleMobileMenu(false)} className={`text-4xl cursor-pointer ${dark === "dark" ? "text-gray-200 " : "text-gray-800"}`} />
          </div>
        </div>

        {/* sid nav bar mid sec */}
        <div className='flex flex-col gap-2 flex-grow'>
          {navLinks.map(({ title, icon, link, isVisible }, index) =>
            isVisible && <NavLink
              key={index}
              className={({ isActive }) =>
                `${isActive ? `bg-white ${dark === 'dark' ? " text-gray-800" : ""}` : `${dark === 'dark' ? "hover:bg-white/60 hover:text-gray-800" : "hover:bg-white/60"}`} duration-200 flex gap-2 py-3 px-4 items-baseline`
              }
              to={link}
              onClick={() => toggleMobileMenu(false)}
            >
              {icon}
              <span className="">{title}</span>
            </NavLink>
          )
          }
        </div>



        {/* sid nav bar bottom secti */}
        <div className='flex justify-between gap-2 px-3 py-2 border-t border-t-gray-400'>
          {isAuthenticated ? (
            <button
              className={`bg-white flex-grow px-3 py-2 rounded flex items-center justify-center gap-2 ${dark === "dark" ? "text-gray-800" : "text-gray-800"}`}
              onClick={handleLogout}
            ><MdLogout />
              Log Out
            </button>
          ) : (
              <>
              <NavLink
                  className={`bg-white flex-grow px-3 py-2 rounded flex items-center justify-center gap-2 ${dark === " dark" ? "text-gray-800" : "text-gray-800"}`}
                to="/login"
                  onClick={() => toggleMobileMenu(false)}
              >
                <MdLogin />
                Login
              </NavLink>
              <NavLink
                  className={`bg-white flex-grow px-3 py-2 rounded flex items-center justify-center gap-2 ${dark === " dark" ? "text-gray-800" : "text-gray-800"}`}
                to="/register"
                  onClick={() => toggleMobileMenu(false)}
              >
                <FaUserPlus />
                Register
              </NavLink>
              </>
          )}
        </div>
      </div>

      {/* Desktop view menu */}
      <div className="hidden lg:flex items-center gap-4 ">
        <div className="flex items-center gap-4">
          {navLinks.map(({ title, icon, link, isVisible }, index) =>
            isVisible && <NavLink key={index} to={link} className="flex justify-center items-center gap-2  hover:brightness-50">
              {icon}
              <span className="">{title}</span>
            </NavLink>
          )}
        </div>

        <div className="flex gap-3">
          <ToggleTheme />
          {localStorage?.getItem('token') ? (

            <button
              className={`${dark === 'dark'
                ? 'bg-gray-900 text-gray-100'
                : 'bg-white text-black'
                } flex gap-2 items-center px-5 py-1 rounded-lg font-bold hover:brightness-75`}
              onClick={handleLogout}
            >
              Log Out
            </button>
          ) : (
              <div className="flex gap-4">
              <NavLink
                  className={`${dark === 'dark'
                    ? 'bg-gray-900 text-gray-100'
                    : 'bg-white text-black'
                    } flex gap-2 items-center px-3 py-2 rounded-lg font-bold hover:brightness-75`}
                to="/login"
              >
                <MdLogin /> Login
              </NavLink>
              <NavLink
                  className={`${dark === 'dark'
                    ? 'bg-gray-900 text-gray-100'
                    : 'bg-white text-black'
                    } flex gap-2 items-center px-3 py-2 rounded-lg font-bold hover:brightness-75`}
                to="/register"
              >
                <FaUserPlus /> Register
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav >
  );
};
const ToggleTheme = () => {
  const [dark, setDark] = useRecoilState(mode);
  return <button
    onClick={() => setDark(dark === 'light' ? 'dark' : 'light')
    }
    className={`rounded-full transition-all duration-300  justify-center items-center h-9 w-9 p-0 inline-flex ${dark === 'light'
      ? 'bg-blue-200 text-blue-600 hover:bg-blue-300'
      : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
      }`}
  >
    {dark === 'light' ? <WiDaySunny /> : <MdDarkMode />}
  </button >
}
Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
  handleLogout: PropTypes.func,
};

export default Navbar;
