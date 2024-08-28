import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import logo from './images/logo.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  return (
    <header className="fixed top-0 left-0 w-full bg-[#006D5B] text-white z-50 shadow-lg">
      <div className="container mx-auto px-4 py-3">

        {/* Bottom section with logo and text */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/"> {/* Link for the logo to Home */}
              <img src={logo} alt="Ark Family Logo" className="h-16" />
            </Link>
            <div className="hidden md:flex items-center ml-4">
              <p className="text-base md:text-lg">
                Empowering Africa's socio-economic growth through mentorship, collaboration, and sustainable innovation
              </p>
            </div>
          </div>

          {/* Toggle button for mobile menu */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {/* Optional collapsible tagline for small screens */}
        <div className="md:hidden mt-2">
          
            <p className="text-xs mt-2">
              Empowering Africa's socio-economic growth through mentorship, collaboration, and sustainable innovation
            </p>
          
        </div>
      </div>

      {/* Navigation links */}
      <nav
        className={`${
          isOpen ? 'block' : 'hidden'
        } md:flex md:justify-between bg-[#FFD700] text-black px-4 py-2 transform md:transform-none transition-transform duration-300`}
      >
        <Link
          to="/"
          className="block py-2 md:py-0 md:inline-block md:ml-48"
        >
          Home
        </Link>
        <Link
          to="/about-us"
          className="block py-2 md:py-0 md:inline-block"
        >
          About Us
        </Link>
        <Link
          to="/departments"
          className="block py-2 md:py-0 md:inline-block"
        >
          Departments
        </Link>
        <Link
          to="/events-activities"
          className="block py-2 md:py-0 md:inline-block"
        >
          Events & Activities
        </Link>
        <Link
          to="/media"
          className="block py-2 md:py-0 md:inline-block md:mr-32"
        >
          Media
        </Link>
      </nav>
    </header>
  );
};

export default Header;
