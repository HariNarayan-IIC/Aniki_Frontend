import React from "react";
import { useState } from "react";
import { MdMenu, MdClose, MdHome, MdRoute, MdForum, MdBook} from "react-icons/md";
import { Link } from "react-router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div className="flex gap-4">
      {/* Logo */}
      <div className="text-2xl font-bold italic">Aniki</div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-6 text-lg">
        <li className="hover:text-gray-600 cursor-pointer">Home Page</li>
        <li className="hover:text-gray-600 cursor-pointer">Roadmaps</li>
        <li className="hover:text-gray-600 cursor-pointer">Communities</li>
        <li className="hover:text-gray-600 cursor-pointer">Resources</li>
      </ul>
      </div>

      {/* Buttons */}
      <div className="hidden md:flex space-x-4">
        <Link to="signup"><button className="px-4 py-2 border rounded-lg hover:scale-105 transition-transform cursor-pointer">Signup</button></Link>
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:scale-105 transition-transform cursor-pointer">Login</button>
      </div>

      {/* Mobile Menu Toggle Button */}
      <div className="md:hidden text-2xl cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <MdClose /> : <MdMenu />}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md py-4 flex flex-col items-center md:hidden">
          <ul className="space-y-4 text-lg">
            <li className="hover:text-gray-600 cursor-pointer"><MdHome/></li>
            <li className="hover:text-gray-600 cursor-pointer"><MdRoute/></li>
            <li className="hover:text-gray-600 cursor-pointer"><MdForum/></li>
            <li className="hover:text-gray-600 cursor-pointer"><MdBook/></li>
          </ul>
          <div className="mt-4 space-y-2">
            <Link to="signup"><button className="px-4 py-2 border rounded-lg w-full hover:scale-105 transition-transform cursor-pointer">Signup</button></Link>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg w-full hover:scale-105 transition-transform cursor-pointer">Login</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
