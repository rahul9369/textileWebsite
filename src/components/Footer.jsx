import React from "react";
import { FaPhoneAlt, FaGlobe } from "react-icons/fa";
import Logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-[#1e1e23] text-gray-300 px-6 py-10 text-sm md:text-base">
      <div className="max-w-6xl mx-auto text-center">
        {/* Logo and Tagline */}
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-2">
            <img src={Logo} alt="FabriQs Logo" className="w-8 h-8 rounded" />
            <div className="text-left">
              <h3 className="font-bold text-white text-lg">FabriQs</h3>
              <p className="text-xs text-gray-400">Textile Automation</p>
            </div>
          </div>
          <p className="max-w-xl text-sm text-gray-400">
            FabriQs is a modern, all-in-one app designed for the textile
            industry. Built to simplify everyday operations, it brings together
            everything you need in one seamless platform.
          </p>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-6 bg-[#2a2a30] px-2 py-2 md:py-4 rounded-md w-full md:w-[50%] mx-auto text-white text-sm sm:text-base">
          <div className="flex flex-row gap-4 w-full justify-center">
            <div className="flex items-center space-x-2 whitespace-nowrap">
              <FaPhoneAlt className="text-orange-400" />
              <span>+91 9318164924</span>
            </div>
            <div className="flex items-center space-x-2 whitespace-nowrap">
              <FaGlobe className="text-orange-400" />
              <span className="break-all">claw.lawyers@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-10 text-gray-500 text-xs">
          <p className="text-white">
            © 2025 Claw Legaltech. All rights reserved.
          </p>
          <p className="mt-2  md:mt-0">
            Designed and Developed by <br />
            <span className="font-bold text-lg text-white">Claw Legaltech</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
