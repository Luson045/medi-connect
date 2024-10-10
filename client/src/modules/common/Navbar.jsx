import React, { useState, useEffect } from 'react';
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
import { mode } from '../../store/atom';

const Navbar = ({ isAuthenticated, user, handleLogout }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dark, setDark] = useRecoilState(mode);
  const [isNavbarVisible, setNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  const handleToggleMode = () => {
    setDark(dark === 'light' ? 'dark' : 'light');
  };

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) {
        setNavbarVisible(false);
      } else {
        setNavbarVisible(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <nav
      className={`${
        dark === 'dark'
          ? 'bg-gradient-to-r from-gray-700 via-gray-900 to-black text-gray-100'
          : 'bg-[linear-gradient(90deg,_#a1c4fd_0%,_#c2e9fb_100%)] text-black'
      } top-0 fixed z-[100] py-2 flex justify-between items-center w-full px-5 lg:py-2 md:px-10 transition-transform duration-300 ease-in-out ${
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
          } lg:hidden absolute z-[100] flex text-xl md:text-2xl flex-col items-start pl-8 md:pl-12 gap-3 md:gap-5 top-16 md:top-[72px] w-full left-0 py-5 md:py-6 h-fit`}
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

          <NavLink
            className={({ isActive }) =>
              `${isActive ? 'border-b border-white ' : ''} flex gap-2 items-baseline`
            }
            to="/labtest"
            onClick={() => setMobileMenuOpen(false)}
          >
            <MdOutlineLocalHospital />{' '}
            <p className="hover:brightness-50 hover:font-semibold">Lab Tests</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `${isActive ? 'border-b border-white ' : ''} flex gap-2 items-baseline`
            }
            to="/blog"
            onClick={() => setMobileMenuOpen(false)}
          >
            <MdOutlineLocalHospital />{' '}
            <p className="hover:brightness-50 hover:font-semibold">Blogs</p>
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

          {isAuthenticated ? (
            <>
              <NavLink
                className={({ isActive }) =>
                  `${isActive ? 'border-b border-white ' : ''} flex gap-2 items-baseline`
                }
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaUser />
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
                  <FaHospital />
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
                  to="/panel"
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
            <div className="flex gap-2 flex-col xs:flex-row w-full xs:w-auto pr-4 xs:pr-0">
              <NavLink
                className="bg-white flex gap-2 w-full xs:w-auto px-5 py-1 rounded-lg text-black font-bold hover:brightness-75"
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
              >
                <MdLogin />
                Login
              </NavLink>
              <NavLink
                className="bg-white flex gap-2 w-full xs:w-auto px-5 py-1 rounded-lg text-black font-bold hover:brightness-75"
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaUserPlus />
                Sign Up
              </NavLink>
            </div>
          )}
        </div>
      )}

      <div className="hidden lg:flex gap-7 text-lg">
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
        <NavLink
          className={({ isActive }) =>
            `${isActive ? 'border-b border-white ' : ''} flex gap-2 items-baseline`
          }
          to="/"
        >
          <FaHome />
          <p className="hover:brightness-50 hover:font-semibold">Home</p>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `${isActive ? 'border-b border-white ' : ''} flex gap-2 items-baseline`
          }
          to="/about"
        >
          <AiOutlineInfoCircle />
          <p className="hover:brightness-50 hover:font-semibold">About</p>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `${isActive ? 'border-b border-white ' : ''} flex gap-2 items-baseline`
          }
          to="/labtest"
        >
          <MdOutlineLocalHospital />
          <p className="hover:brightness-50 hover:font-semibold">Lab Tests</p>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `${isActive ? 'border-b border-white ' : ''} flex gap-2 items-baseline`
          }
          to="/blog"
        >
          <MdOutlineLocalHospital />
          <p className="hover:brightness-50 hover:font-semibold">Blogs</p>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `${isActive ? 'border-b border-white ' : ''} flex gap-2 items-baseline`
          }
          to="/hospitals-around"
        >
          <FaHospitalAlt />
          <p className="hover:brightness-50 hover:font-semibold">
            Hospitals Around
          </p>
        </NavLink>

        {isAuthenticated ? (
          <>
            <NavLink
              className={({ isActive }) =>
                `${isActive ? 'border-b border-white ' : ''} flex gap-2 items-baseline`
              }
              to="/profile"
            >
              <FaUser />
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
              >
                <FaHospital />
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
                to="/panel"
              >
                <MdOutlineLocalHospital />
                <p className="hover:brightness-50 hover:font-semibold">
                  OPD Panel
                </p>
              </NavLink>
            )}
          </>
        ) : (
          <div className="flex gap-2 flex-col xs:flex-row w-full xs:w-auto pr-4 xs:pr-0">
            <NavLink
              className="bg-white flex gap-2 w-full xs:w-auto px-5 py-1 rounded-lg text-black font-bold hover:brightness-75"
              to="/login"
            >
              <MdLogin />
              Login
            </NavLink>
            <NavLink
              className="bg-white flex gap-2 w-full xs:w-auto px-5 py-1 rounded-lg text-black font-bold hover:brightness-75"
              to="/register"
            >
              <FaUserPlus />
              Sign Up
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
