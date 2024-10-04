// Import necessary modules and components from React and other libraries
import React, { useContext, useState } from 'react'; // useContext to access user context, useState to manage mobile menu state
import { NavLink } from 'react-router-dom'; // NavLink for navigation between routes
import '../../styles/Navbar.css'; // Import custom CSS styles for Navbar
import { UserContext } from './userContext'; // Import the user context for authentication data
import { FaHome, FaHospital, FaUser, FaUserPlus } from 'react-icons/fa'; // FontAwesome icons for UI
import { IoClose, IoHome, IoMenu } from 'react-icons/io5'; // Ionic icons for UI
import { MdLogin, MdOutlineLocalHospital } from 'react-icons/md'; // Material Design icons for UI
import { AiOutlineInfoCircle } from 'react-icons/ai'; // Ant Design icon for UI

// Navbar component definition
const Navbar = () => {
  // Destructure user, isAuthenticated, and handleLogout from the UserContext
  const {
    user,
    isAuthenticated = true, // Assume user is authenticated by default
    handleLogout,
  } = useContext(UserContext);

  // Local state to handle the visibility of the mobile menu
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Function to toggle the mobile menu open/close state
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev); // Inverts the current state of the mobile menu
  };

  return (
    // Main Navbar element with responsive classes for layout and styling
    <nav className="bg-[#333333] top-0 fixed z-[100] py-4 flex justify-between items-center w-full px-5 lg:py-2 md:px-10 text-white">
      {/* Logo and link to home page */}
      <NavLink to="/">
        <img className="h-10 md:h-14" alt="medi-connects logo" src="logo.png" />
      </NavLink>

      {/* Mobile menu button (hamburger or close icon) */}
      <div className="lg:hidden block absolute z-[101] right-3 md:right-8 *:text-3xl *:md:text-4xl">
        {isMobileMenuOpen ? (
          <IoClose className="" onClick={toggleMobileMenu} /> // Close icon when the mobile menu is open
        ) : (
          <IoMenu className="" onClick={toggleMobileMenu} /> // Hamburger icon when the mobile menu is closed
        )}
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="bg-[#333333] lg:hidden absolute z-[100] flex text-xl md:text-3xl flex-col items-start pl-8 gap-10 md:gap-16 top-16 md:top-[84px] w-full left-0 py-7 md:py-20 h-fit">
          {/* Home link for mobile view */}
          <NavLink
            className={({ isActive }) =>
              `${isActive ? 'border-b border-white ' : ''} flex gap-2 items-baseline`
            }
            to="/"
            onClick={() => setMobileMenuOpen(false)} // Close the menu after clicking the link
          >
            <IoHome /> <p>Home</p>
          </NavLink>

          {/* Conditional rendering for authenticated users */}
          {isAuthenticated ? (
            <>
              <NavLink
                className={({ isActive }) =>
                  `${isActive ? 'border-b border-white ' : ''} flex gap-2 items-baseline`
                }
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
              >
                <AiOutlineInfoCircle /> <p>About</p>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `${isActive ? 'border-b border-white ' : ''} flex gap-2 items-baseline`
                }
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaUser /> <p>Profile</p>
              </NavLink>

              {/* Show Hospitals link only for 'user' role */}
              {user && user?.role === 'user' && (
                <>
                  <NavLink
                    className={({ isActive }) =>
                      `${isActive ? 'border-b border-white ' : ''} flex gap-2 items-baseline`
                    }
                    to="/hospitals"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaHospital /> <p>Hospitals</p>
                  </NavLink>
                </>
              )}

              {/* Show OPD Panel link only for 'hospital' role */}
              {user && user?.role === 'hospital' && (
                <>
                  <NavLink
                    className={({ isActive }) =>
                      `${isActive ? 'border-b border-white ' : ''} flex gap-2 items-baseline`
                    }
                    to="/panal"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <MdOutlineLocalHospital />
                    <p>OPD Panel</p>
                  </NavLink>
                </>
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
              Instant OPD
            </NavLink>
          )}

          {/* Logout button for authenticated users */}
          {isAuthenticated ? (
            <button
              className={` bg-white px-5 py-1 rounded-lg text-black`}
              onClick={handleLogout} // Handle logout
            >
              Log Out
            </button>
          ) : (
            <div className="flex gap-5">
              {/* Login and Register links for non-authenticated users */}
              <NavLink
                className={() =>
                  ` bg-white items-center flex gap-2 px-5 text-lg py-1 rounded-lg text-black`
                }
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
              >
                <MdLogin /> Login
              </NavLink>
              <NavLink
                className={() =>
                  ` bg-white items-center flex gap-2 px-5 text-lg py-1 rounded-lg text-black`
                }
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaUserPlus /> <p> Register</p>
              </NavLink>
            </div>
          )}
        </div>
      )}

      {/* Desktop Navigation Links */}
      <div className="hidden lg:flex items-center gap-32">
        <div className="flex items-center gap-10">
          <NavLink to="/" className={`flex justify-center items-center gap-2`}>
            <FaHome />
            <p>Home</p>
          </NavLink>

          {/* Show links for authenticated users */}
          {isAuthenticated ? (
            <>
              <NavLink
                to="/about"
                className={`flex justify-center items-center gap-2`}
              >
                <AiOutlineInfoCircle /> <p>About</p>
              </NavLink>
              <NavLink to="/profile" className={`flex items-baseline gap-2`}>
                <FaUser /> <p>Profile</p>
              </NavLink>

              {/* Show Hospitals link for 'user' role */}
              {user && user?.role === 'user' && (
                <>
                  <NavLink
                    to="/hospitals"
                    className={`flex items-baseline gap-2`}
                  >
                    <FaHospital /> <p>Hospitals</p>
                  </NavLink>
                </>
              )}

              {/* Show OPD Panel link for 'hospital' role */}
              {user && user?.role === 'hospital' && (
                <>
                  <NavLink to="/panal" className={`flex items-baseline gap-2`}>
                    <MdOutlineLocalHospital /> <p>OPD Panel</p>
                  </NavLink>
                </>
              )}
            </>
          ) : (
            <NavLink to="/registerOPD" className={`flex items-center gap-2`}>
              <MdOutlineLocalHospital /> <p>Instant OPD</p>
            </NavLink>
          )}
        </div>

        <div className="flex gap-5">
          {/* Logout button for authenticated users */}
          {isAuthenticated ? (
            <button
              className="bg-white px-5 py-1 rounded-lg text-black"
              onClick={handleLogout}
            >
              Log Out
            </button>
          ) : (
            <>
              {/* Login and Register links for non-authenticated users */}
              <NavLink
                className="bg-white flex gap-2 items-center px-5 py-1 rounded-lg text-black"
                to="/login"
              >
                <MdLogin /> Login
              </NavLink>
              <NavLink
                className="bg-white flex gap-2 items-center px-5 py-1 rounded-lg text-black"
                to="/register"
              >
                <FaUserPlus /> <p> Register</p>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
