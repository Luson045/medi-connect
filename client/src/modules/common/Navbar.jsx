import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/Navbar.css';
import { UserContext } from './userContext';
import { FaHome, FaHospital, FaUser, FaUserPlus } from 'react-icons/fa';
import { IoClose, IoHome, IoMenu } from 'react-icons/io5';
import { MdLogin, MdOutlineLocalHospital } from 'react-icons/md';
import { AiOutlineInfoCircle } from 'react-icons/ai';

const Navbar = () => {
  const {
    user,
    isAuthenticated = true,
    handleLogout,
  } = useContext(UserContext);

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isNavbarVisible, setNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setNavbarVisible(false);
      } else {
        setNavbarVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`bg-[linear-gradient(90deg,_#a1c4fd_0%,_#c2e9fb_100%)] top-0 fixed z-[100] py-4 md:py-2 flex justify-between items-center w-full px-5 lg:py-2 md:px-10 text-black transition-transform duration-300 ease-in-out ${
        isNavbarVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <NavLink to="/">
        <img
          className="h-10 sm:pl-2 md:h-14"
          alt="medi-connects logo"
          src="logo.png"
          onClick={() => setMobileMenuOpen(false)}
        />
      </NavLink>

      <div className="lg:hidden block absolute z-[101] right-3 md:right-8 *:text-3xl *:md:text-4xl">
        {isMobileMenuOpen ? (
          <IoClose onClick={toggleMobileMenu} />
        ) : (
          <IoMenu onClick={toggleMobileMenu} />
        )}
      </div>

      {isMobileMenuOpen && (
        <div className="bg-[linear-gradient(90deg,_#a1c4fd_0%,_#c2e9fb_100%)] lg:hidden absolute z-[100] flex text-xl md:text-2xl flex-col items-start pl-8 md:pl-12 gap-5 md:gap-7 top-16 md:top-[72px] w-full left-0 py-7 md:py-9 h-fit">
          <NavLink
            className={({ isActive }) =>
              `${isActive ? 'border-b border-white ' : ''} flex gap-2 items-baseline`
            }
            to="/"
            onClick={() => setMobileMenuOpen(false)}
          >
            <IoHome />{' '}
            <p className="hover:brightness-50 hover:font-semibold">Home</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${isActive ? 'border-b border-white ' : ''} flex gap-2 items-baseline`
            }
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
          >
            <AiOutlineInfoCircle />{' '}
            <p className="hover:brightness-50 hover:font-semibold">About</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${isActive ? 'border-b border-white ' : ''} flex gap-2 items-baseline`
            }
            to="/services"
            onClick={() => setMobileMenuOpen(false)}
          >
            <MdOutlineLocalHospital />{' '}
            <p className="hover:brightness-50 hover:font-semibold">Services</p>
          </NavLink>

          {isAuthenticated ? (
            <>
              <NavLink
                className={({ isActive }) =>
                  `${isActive ? 'border-b border-white ' : ''} flex gap-2 items-baseline`
                }
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaUser />{' '}
                <p className="hover:brightness-50 hover:font-semibold">
                  Profile
                </p>
              </NavLink>
              {user && user?.role === 'user' && (
                <NavLink
                  className={({ isActive }) =>
                    `${isActive ? 'border-b border-white ' : ''} flex gap-2 items-baseline`
                  }
                  to="/hospitals"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaHospital />{' '}
                  <p className="hover:brightness-50 hover:font-semibold">
                    Hospitals
                  </p>
                </NavLink>
              )}
              {user && user?.role === 'hospital' && (
                <NavLink
                  className={({ isActive }) =>
                    `${isActive ? 'border-b border-white ' : ''} flex gap-2 items-baseline`
                  }
                  to="/panal"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <MdOutlineLocalHospital />
                  <p className="hover:brightness-50 hover:font-semibold">
                    OPD Panel
                  </p>
                </NavLink>
              )}
            </>
          ) : (
            <NavLink
              className={({ isActive }) =>
                `${isActive ? 'border-b border-white ' : ''} flex items-center gap-2`
              }
              to="/registerOPD"
              onClick={() => setMobileMenuOpen(false)}
            >
              <MdOutlineLocalHospital />
              <p className="hover:brightness-50 hover:font-semibold">
                Instant OPD
              </p>
            </NavLink>
          )}

          {isAuthenticated ? (
            <button
              className="bg-white px-5 py-1 rounded-lg text-black font-bold hover:brightness-75 "
              onClick={handleLogout}
            >
              Log Out
            </button>
          ) : (
            <div className="flex gap-2 flex-col xs:flex-row w-full xs:w-auto pr-4 xs:pr-0">
              <NavLink
                className="bg-white flex gap-2 w-full xs:w-auto items-center px-3 xs:px-4 py-1 rounded-lg text-black font-bold hover:brightness-75 login-btn"
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
              >
                <MdLogin /> Login
              </NavLink>
              <NavLink
                className="bg-white flex gap-2 w-full xs:w-auto items-center px-3 py-1 rounded-lg text-black font-bold hover:brightness-75 register-btn"
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaUserPlus /> Register
              </NavLink>
            </div>
          )}
        </div>
      )}

      <div className="hidden lg:flex items-center gap-10">
        <div className="flex items-center gap-4 text-lg font-medium">
          <NavLink to="/" className="flex justify-center items-center gap-2">
            <FaHome />{' '}
            <p className="font-bold text-lg hover:brightness-50">Home</p>
          </NavLink>
          <NavLink
            to="/about"
            className="flex justify-center items-center gap-2"
          >
            <AiOutlineInfoCircle />{' '}
            <p className="font-bold text-lg hover:brightness-50">About</p>
          </NavLink>
          <NavLink
            to="/services"
            className="flex justify-center items-center gap-2"
          >
            <MdOutlineLocalHospital />{' '}
            <p className="font-bold text-lg hover:brightness-50">Services</p>
          </NavLink>

          {isAuthenticated ? (
            <>
              <NavLink to="/profile" className="flex items-baseline gap-2">
                <FaUser />{' '}
                <p className="font-bold text-lg hover:brightness-50">Profile</p>
              </NavLink>
              {user && user?.role === 'user' && (
                <NavLink to="/hospitals" className="flex items-baseline gap-2">
                  <FaHospital />{' '}
                  <p className="font-bold text-lg hover:brightness-50">
                    Hospitals
                  </p>
                </NavLink>
              )}
              {user && user?.role === 'hospital' && (
                <NavLink to="/panal" className="flex items-baseline gap-2">
                  <MdOutlineLocalHospital />{' '}
                  <p className="font-bold text-lg hover:brightness-50">
                    OPD Panel
                  </p>
                </NavLink>
              )}
            </>
          ) : (
            <NavLink to="/registerOPD" className="flex items-center gap-2">
              <MdOutlineLocalHospital />{' '}
              <p className="font-bold text-lg hover:brightness-50">
                Instant OPD
              </p>
            </NavLink>
          )}
        </div>

        <div className="flex gap-3">
          {isAuthenticated ? (
            <button
              className="bg-white flex gap-2 items-center px-5 py-1 rounded-lg text-black font-bold hover:brightness-75"
              onClick={handleLogout}
            >
              Log Out
            </button>
          ) : (
            <div className="flex gap-5">
              <NavLink
                className="bg-white flex gap-2 items-center px-5 py-1 rounded-lg text-black font-bold hover:brightness-75"
                to="/login"
              >
                <MdLogin /> Login
              </NavLink>
              <NavLink
                className="bg-white flex gap-2 items-center px-5 py-1 rounded-lg text-black font-bold hover:brightness-75"
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

export default Navbar;
