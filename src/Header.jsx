import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from './images/logo.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header 
    className="fixed top-0 left-0 w-full bg-[#006D5B] text-white z-50 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" onClick={closeMenu}>
              <img src={logo} alt="Ark Family Logo" className="h-16" />
            </Link>
          </div>

          {/* Navbar for larger screens */}
          <div className="hidden md:flex flex-grow justify-end items-center">
            {/* Menu items spaced from the logo with a margin */}
            <nav className="flex items-center space-x-8 ml-20">
              <Link
                to="/"
                onClick={closeMenu}
                className={`text-lg ${
                  location.pathname === '/' ? 'text-yellow-500 font-semibold' : 'text-white hover:text-yellow-500'
                }`}
              >
                Home
              </Link>
              <Link
                to="/events-activities"
                onClick={closeMenu}
                className={`text-lg ${
                  location.pathname === '/events-activities' ? 'text-yellow-500 font-semibold' : 'text-white hover:text-yellow-500'
                }`}
              >
                Events & Activities
              </Link>
              <Link
                to="/gallery"
                onClick={closeMenu}
                className={`text-lg ${
                  location.pathname === '/gallery' ? 'text-yellow-500 font-semibold' : 'text-white hover:text-yellow-500'
                }`}
              >
                Gallery
              </Link>
              <Link
                to="/about-us"
                onClick={closeMenu}
                className={`text-lg ${
                  location.pathname === '/about-us' ? 'text-yellow-500 font-semibold' : 'text-white hover:text-yellow-500'
                }`}
              >
                About Us
              </Link>
              </nav>
          </div>

          {/* Mobile Menu Button */}
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
      </div>

      {/* Mobile menu items */}
      <nav
        className={`${
          isOpen ? 'block' : 'hidden'
        } md:hidden bg-[#006D5B] text-white px-4 py-2 transition-transform duration-300`}
      >
        <Link
          to="/"
          onClick={closeMenu}
          className={`block py-2 ${
            location.pathname === '/' ? 'text-yellow-500 font-semibold' : 'text-white hover:text-yellow-500'
          }`}
        >
          Home
        </Link>
        <Link
          to="/events-activities"
          onClick={closeMenu}
          className={`block py-2 ${
            location.pathname === '/events-activities' ? 'text-yellow-500 font-semibold' : 'text-white hover:text-yellow-500'
          }`}
        >
          Events & Activities
        </Link>
        <Link
          to="/gallery"
          onClick={closeMenu}
          className={`block py-2 ${
            location.pathname === '/gallery' ? 'text-yellow-500 font-semibold' : 'text-white hover:text-yellow-500'
          }`}
        >
          Gallery
        </Link>
        <Link
          to="/about-us"
          onClick={closeMenu}
          className={`block py-2 ${
            location.pathname === '/about-us' ? 'text-yellow-500 font-semibold' : 'text-white hover:text-yellow-500'
          }`}
        >
          About Us
        </Link>
        
        
      </nav>
    </header>
  );
};

export default Header;
