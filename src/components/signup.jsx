import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const AuthCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(location.pathname === "/login");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    setIsSignIn(location.pathname === "/login")
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [location.pathname]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F5F3E4] p-4">
      <div className={`relative w-full ${isMobile ? "max-w-md" : "max-w-4xl"} flex flex-col md:flex-row transition-all duration-500 ease-in-out`}>
        {/* Single Card for Mobile */}
        {isMobile ? (
          <div className="w-full p-10 bg-white rounded-lg shadow-lg text-center">
            {!isSignIn ? (
              <>
                <h2 className="text-2xl font-bold text-[#8B5E3C]">Sign Up</h2>
                <input type="text" placeholder="Your Name" className="w-full p-2 mt-4 border rounded bg-gray-100 text-black" />
                <input type="email" placeholder="Your Email" className="w-full p-2 mt-2 border rounded bg-gray-100 text-black" />
                <input type="password" placeholder="Your Password" className="w-full p-2 mt-2 border rounded bg-gray-100 text-black" />
                <button className="w-full p-2 mt-4 bg-[#8B5E3C] text-white rounded-lg hover:bg-opacity-90">Sign Up</button>
                <p className="mt-2 text-[#8B5E3C] font-semibold">OR</p>
                <p
                  className="mt-2 text-[#8B5E3C] font-semibold cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-[#8B5E3C]">Sign In</h2>
                <input type="email" placeholder="Your email here" className="w-full p-2 mt-4 border rounded bg-gray-100" />
                <input type="password" placeholder="Your password here" className="w-full p-2 mt-2 border rounded bg-gray-100" />
                <button className="w-full p-2 mt-4 text-white bg-[#8B5E3C] rounded-lg hover:bg-opacity-80">Sign In</button>
              </>
            )}
          </div>
        ) : (
          <>
            {/* Left Card */}
            <div className={`w-1/2 p-10 bg-white rounded-lg shadow-lg transition-all duration-500 ease-in-out transform hover:scale-105`}>
              {!isSignIn ? (
                <>
                  <h2 className="text-2xl font-bold text-center text-[#8B5E3C]">Hello, wakai!</h2>
                  <p className="mt-2 text-center">Enter your details and start your learning journey with us</p><br/>
                  <p className="text-center">OR</p>
                  <button
                    className="w-full p-2 mt-4 text-white bg-[#8B5E3C] rounded-lg hover:bg-opacity-80"
                    onClick={() => navigate("/login")}
                  >
                    Sign In
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-center text-[#8B5E3C]">Sign In</h2>
                  <input type="email" placeholder="Your email here" className="w-full p-2 mt-4 border rounded bg-gray-100" />
                  <input type="password" placeholder="Your password here" className="w-full p-2 mt-2 border rounded bg-gray-100" />
                  <button className="w-full p-2 mt-4 text-white bg-[#8B5E3C] rounded-lg hover:bg-opacity-80">Sign In</button>
                </>
              )}
            </div>

            {/* Right Card */}
            <div className={`w-1/2 p-10 bg-[#B6825D] text-white rounded-lg shadow-lg flex flex-col items-center justify-center transition-all duration-500 ease-in-out transform hover:scale-110`}>
              {!isSignIn ? (
                <>
                  <h2 className="text-2xl font-bold">Sign Up</h2>
                  <input type="text" placeholder="Your Name" className="w-full p-2 mt-4 border rounded bg-gray-100 text-black" />
                  <input type="email" placeholder="Your Email" className="w-full p-2 mt-2 border rounded bg-gray-100 text-black" />
                  <input type="password" placeholder="Your Password" className="w-full p-2 mt-2 border rounded bg-gray-100 text-black" />
                  <button className="w-full p-2 mt-4 bg-[#8B5E3C] text-white rounded-lg hover:bg-opacity-90">Sign Up</button>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold">Welcome Back!</h2>
                  <p className="mt-2 text-center">Start your session from where you left it</p>
                  <p className="text-center">OR</p>
                  <button
                    className="mt-4 px-4 py-2 bg-[#F5F3E4] text-[#8B5E3C] rounded-lg shadow hover:bg-opacity-90"
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthCard;
