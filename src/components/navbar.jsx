import React from "react";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      {/* Logo */}
      <div className="text-2xl font-bold italic">Aniki</div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-6 text-lg">
        <li className="hover:text-gray-600 cursor-pointer">Home Page</li>
        <li className="hover:text-gray-600 cursor-pointer">About Us</li>
        <li className="hover:text-gray-600 cursor-pointer">Contact Us</li>
        <li className="hover:text-gray-600 cursor-pointer">Resources</li>
      </ul>

      {/* Buttons */}
      <div className="hidden md:flex space-x-4">
        <button className="px-4 py-2 border rounded-lg hover:scale-105 transition-transform cursor-pointer">Signup</button>
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:scale-105 transition-transform cursor-pointer">Login</button>
      </div>

      {/* Mobile Menu Toggle Button */}
      <div className="md:hidden text-2xl cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md py-4 flex flex-col items-center md:hidden">
          <ul className="space-y-4 text-lg">
            <li className="hover:text-gray-600 cursor-pointer">Home Page</li>
            <li className="hover:text-gray-600 cursor-pointer">About Us</li>
            <li className="hover:text-gray-600 cursor-pointer">Contact Us</li>
            <li className="hover:text-gray-600 cursor-pointer">Resources</li>
          </ul>
          <div className="mt-4 space-y-2">
            <button className="px-4 py-2 border rounded-lg w-full hover:scale-105 transition-transform cursor-pointer">Signup</button>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg w-full hover:scale-105 transition-transform cursor-pointer">Login</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
