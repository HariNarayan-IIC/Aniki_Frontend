import React from "react";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="text-2xl font-bold italic">Aniki</div>
      <div className="flex space-x-6 text-black">
        <a href="#" className="hover:text-gray-600">Home Page</a>
        <a href="#" className="hover:text-gray-600">About Us</a>
        <a href="#" className="hover:text-gray-600">Contact Us</a>
        <div className="relative">
          <button 
            className="flex items-center space-x-1 hover:text-gray-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>Resources</span>
            <FaChevronDown className="text-sm" />
          </button>
          {isOpen && (
            <div className="absolute mt-2 w-40 bg-white shadow-md rounded-md">
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">Resource 1</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">Resource 2</a>
            </div>
          )}
        </div>
      </div>
      <div className="flex space-x-4">
        <button className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300">Signup</button>
        <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">Login</button>
      </div>
    </nav>
  );
}
