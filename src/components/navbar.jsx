import React from "react";
import { useState } from "react";
import { MdMenu, MdClose, MdHome, MdRoute, MdForum, MdBook} from "react-icons/md";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    <nav className="bg-white shadow-md py-4 px-3 md:px-6 flex justify-between items-center">
      <div className="flex gap-4">
      {/* Logo */}
      <div className="text-2xl font-bold italic">
        <NavLink to={"/"}>Aniki</NavLink>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-6 text-lg">
        <li className="hover:text-gray-600 cursor-pointer"><NavLink to={"/"} className={({isActive}) => isActive?"underline":""}>Home Page</NavLink></li>
        <li className="hover:text-gray-600 cursor-pointer"><NavLink to={"/roadmaps"}>Roadmaps</NavLink></li>
        <li className="hover:text-gray-600 cursor-pointer"><NavLink to={"/communities"}>Communities</NavLink></li>
        <li className="hover:text-gray-600 cursor-pointer"><NavLink to={"/resources"}>Resources</NavLink></li>
      </ul>
      </div>

      {/* Buttons */}
      <div className="flex md:space-x-4 space-x-2">
        <Link to="signup"><button className="px-4 py-2 border rounded-lg hover:scale-105 transition-transform cursor-pointer">Signup</button></Link>
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:scale-105 transition-transform cursor-pointer">Login</button>
      </div>

      {/* Mobile Menu Toggle Button */}
      {/* <div className="md:hidden text-2xl cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <MdClose /> : <MdMenu />}
      </div> */}

      
    </nav>

    {/* Mobile Menu */}
    {/* <div className="fix left-0 bottom-0 w-full bg-white shadow-md py-4 flex items-center md:hidden">
      <ul className="space-y-4 text-lg flex justify-evenly w-full">
        <li className="hover:text-gray-600 cursor-pointer"><MdHome/></li>
        <li className="hover:text-gray-600 cursor-pointer"><MdRoute/></li>
        <li className="hover:text-gray-600 cursor-pointer"><MdForum/></li>
        <li className="hover:text-gray-600 cursor-pointer"><MdBook/></li>
      </ul>
      
    </div> */}
    </>
  );
};

export default Navbar;
