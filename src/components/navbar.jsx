import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { isAuthenticated, loading, logoutUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  if (loading) return null;

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-md py-3 px-10 md:px-20 flex justify-between items-center font-[poppins] transition-all duration-300">
        {/* Logo and Menu */}
        <div className="flex items-center space-x-10">
          <div className="text-2xl font-bold italic">
            <NavLink to="/">Aniki</NavLink>
          </div>

          {/* Menu Items */}
          <ul className="hidden md:flex space-x-8 text-lg font-medium text-gray-800">
            {!isAuthenticated ? (
              <li>
                <NavLink to="/" className={({ isActive }) => isActive ? "font-semibold" : ""}>Home</NavLink>
              </li>
            ) : (
              <li>
                <NavLink to="/dashboard" className={({ isActive }) => isActive ? "font-semibold" : ""}>Dashboard</NavLink>
              </li>
            )}
            <li><NavLink to="/roadmaps">Roadmaps</NavLink></li>
            <li><NavLink to="/communities">Communities</NavLink></li>
            <li><NavLink to="/resources">Resources</NavLink></li>
          </ul>
        </div>

        {/* Buttons or Logout */}
        <div className="hidden md:flex space-x-4">
          {!isAuthenticated ? (
            <>
              <Link to="/signup">
                <button className="px-4 py-2 border border-gray-400 rounded-xl text-sm transition-all hover:border-green-700">
                  Sign-Up
                </button>
              </Link>
              <Link to="/login">
                <button className="px-4 py-2 bg-green-700 text-white rounded-xl text-sm transition-all hover:bg-green-800 border border-green-800">
                  Login
                </button>
              </Link>
            </>
          ) : (
            <button
              className="px-4 py-2 bg-green-700 text-white rounded-xl text-sm transition-all hover:bg-green-800 border border-green-800"
              onClick={logoutUser}
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg absolute top-16 left-0 w-full py-4 px-6 space-y-4 z-40 shadow-lg">
          <ul className="space-y-2 text-lg font-medium text-gray-800">
            {!isAuthenticated ? (
              <li><NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink></li>
            ) : (
              <li><NavLink to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</NavLink></li>
            )}
            <li><NavLink to="/roadmaps" onClick={() => setMenuOpen(false)}>Roadmaps</NavLink></li>
            <li><NavLink to="/communities" onClick={() => setMenuOpen(false)}>Communities</NavLink></li>
            <li><NavLink to="/resources" onClick={() => setMenuOpen(false)}>Resources</NavLink></li>
          </ul>

          {!isAuthenticated ? (
            <div className="flex space-x-4 pt-2">
              <Link to="/signup">
                <button className="w-full px-4 py-2 border border-gray-400 rounded-xl text-sm transition-all hover:border-green-700">
                  Signup
                </button>
              </Link>
              <Link to="/login">
                <button className="w-full px-4 py-2 bg-green-700 text-white rounded-xl text-sm transition-all hover:bg-green-800 border border-green-800">
                  Login
                </button>
              </Link>
            </div>
          ) : (
            <button
              className="w-full px-4 py-2 bg-green-700 text-white rounded-xl text-sm transition-all hover:bg-green-800 border border-green-800"
              onClick={() => {
                logoutUser();
                setMenuOpen(false);
              }}
            >
              Logout
            </button>
          )}
        </div>
      )}

      {/* Spacer to offset fixed navbar */}
      <div className="h-12 md:h-15"></div>
    </>
  );
};

export default Navbar;
