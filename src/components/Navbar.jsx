import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useSelector } from "react-redux";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const currentUser = useSelector((state) => state?.auth?.user);
  console.log(currentUser);

  const handleClick =()=> {
    setIsOpen(false);
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 bg-orange-300 py-3 shadow-md">
      <div className="flex items-center justify-between">
        {/* Left: Logo and Brand */}
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => navigate("/")}>
          <img src={Logo} alt="FabriQIs Logo" className="h-10 w-10" />
          <div>
            <h1 className="text-white font-semibold text-xl">FabrlQs</h1>
            <p className="text-white text-sm -mt-1">Textile Automation</p>
          </div>
        </div>

        {/* Hamburger Icon (Mobile Only) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Middle: Navigation Links (Desktop Only) */}
        <div className="hidden md:flex space-x-6 text-black font-medium text-sm lg:text-base">
          {currentUser ? (
            <Link to="/textile" className="hover:text-orange-800 pt-2">
              AI Labs
            </Link>
          ) : (
            <Link to="/signin" className="hover:text-orange-800 pt-2">
              AI Labs
            </Link>
          )}
          {currentUser ? (
            <Link to="/contact" className="hover:text-orange-800 pt-2">
              Contact
            </Link>
          ) : (
            <Link to="/signin" className="hover:text-orange-800 pt-2">
              Contact
            </Link>
          )}
          {currentUser ? (
            <Link to="/account" className="hover:text-orange-800 pt-2">
              Account
            </Link>
          ) : (
            <Link to="/signin" className="hover:text-orange-800 pt-2">
              Account
            </Link>
          )}
          {currentUser ? (
            <div className="px-5 py-2 rounded-full bg-black text-white hover:opacity-90 transition">
              Hi! {currentUser.name || "User"}
            </div>
          ) : (
            <Link
              to="/signin"
              className="get-started-btn px-5 py-2 rounded-full bg-black text-white transition">
              Get Started
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isOpen && (
        <div className="md:hidden mt-3 flex flex-col space-y-3 text-white font-medium text-sm bg-orange-400 rounded-lg p-4 shadow-lg">
          <Link to="/textile" className="hover:text-orange-100" onClick={handleClick}>
            AI Labs
          </Link>

          <Link to="/contact" className="hover:text-orange-100" onClick={handleClick}>
            Contact
          </Link>

          <Link to="/account" className="hover:text-orange-100" onClick={handleClick}>
            Account
          </Link>

          <Link
            to="/signin"
            className="px-4 py-2 rounded-full bg-black text-white hover:opacity-90 transition text-center" onClick={handleClick}>
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
