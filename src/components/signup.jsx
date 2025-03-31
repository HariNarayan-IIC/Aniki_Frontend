import React, { useState } from "react";

const AuthCard = () => {
  const [isSignIn, setIsSignIn] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F5F3E4] p-4">
      <div className="relative w-full max-w-4xl flex transition-all duration-500 ease-in-out">
        {/* Left Card */}
        <div
          className={`w-1/2 p-10 bg-white rounded-lg shadow-lg transition-all duration-500 ease-in-out transform hover:scale-105`}
        >
          {!isSignIn ? (
            <>
              <h2 className="text-2xl font-bold text-center text-[#8B5E3C]">Hello Wakai</h2>
              <p className="mt-2 text-center">Start your journey</p>
              <button
                className="w-full p-2 mt-4 text-white bg-[#8B5E3C] rounded-lg hover:bg-opacity-80"
                onClick={() => setIsSignIn(true)}
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-center text-[#8B5E3C]">Sign In</h2>
              <div className="flex justify-center my-4 space-x-2">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="w-3 h-3 bg-gray-300 rounded-full"></div>
                ))}
              </div>
              <input
                type="email"
                placeholder="Your email here"
                className="w-full p-2 mt-4 border rounded bg-gray-100"
              />
              <input
                type="password"
                placeholder="Your password here"
                className="w-full p-2 mt-2 border rounded bg-gray-100"
              />
              <button className="w-full p-2 mt-4 text-white bg-[#8B5E3C] rounded-lg hover:bg-opacity-80">
                Sign In
              </button>
            </>
          )}
        </div>

        {/* Right Card */}
        <div
          className={`w-1/2 p-10 bg-[#B6825D] text-white rounded-lg shadow-lg flex flex-col items-center justify-center transition-all duration-500 ease-in-out transform hover:scale-110`}
        >
          {!isSignIn ? (
            <>
              <h2 className="text-2xl font-bold">Sign Up</h2>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-2 mt-4 border rounded bg-gray-100 text-black"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-2 mt-2 border rounded bg-gray-100 text-black"
              />
              <input
                type="password"
                placeholder="Your Password"
                className="w-full p-2 mt-2 border rounded bg-gray-100 text-black"
              />
              <button className="w-full p-2 mt-4 bg-[#F5F3E4] text-[#8B5E3C] rounded-lg hover:bg-opacity-90">
                Sign Up
              </button>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold">Welcome Back</h2>
              <p className="mt-2 text-center">Continue where you left off OR</p>
              <button
                className="mt-4 px-4 py-2 bg-[#F5F3E4] text-[#8B5E3C] rounded-lg shadow hover:bg-opacity-90"
                onClick={() => setIsSignIn(false)}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthCard;
