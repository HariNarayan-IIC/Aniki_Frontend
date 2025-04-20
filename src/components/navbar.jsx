import React from "react";
import { Link, NavLink } from "react-router";

const Navbar = ({isLoggedIn}) => {

  return (
    <>
    <nav className="bg-white shadow-md py-4 px-3 md:px-6 flex justify-between items-center">
      
      {/* Logo */}
      <div className="text-2xl font-bold italic">
        <NavLink to={"/"}>Aniki</NavLink>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-6 text-lg">
        <li className="hover:text-gray-600 cursor-pointer"><NavLink to={"/"} className={({isActive}) => isActive?"underline font-bold":""}>Home</NavLink></li>
        <li className="hover:text-gray-600 cursor-pointer"><NavLink to={"/roadmaps"} className={({isActive}) => isActive?"underline font-bold":""}>Roadmaps</NavLink></li>
        <li className="hover:text-gray-600 cursor-pointer"><NavLink to={"/communities"} className={({isActive}) => isActive?"underline font-bold":""}>Communities</NavLink></li>
        <li className="hover:text-gray-600 cursor-pointer"><NavLink to={"/resources"} className={({isActive}) => isActive?"underline font-bold":""}>Resources</NavLink></li>
      </ul>
      
      {!isLoggedIn? 
      /* Buttons */
      <div className="flex md:space-x-4 space-x-2">
        <Link to="signup"><button className="px-4 py-2 border rounded-lg hover:scale-105 transition-transform cursor-pointer">Signup</button></Link>
        <Link to={"/login"}><button className="px-4 py-2 bg-green-700 text-white rounded-lg hover:scale-105 transition-transform cursor-pointer">Login</button></Link>
      </div>
      :
      /* Buttons */
      <div className="flex md:space-x-4 space-x-2">
        <button 
        className="px-4 py-2 bg-green-700 text-white rounded-lg hover:scale-105 transition-transform cursor-pointer"
        >
          Logout
        </button>
      </div>
      }
      
      
    </nav>
    </>
  );
};

export default Navbar;
