import React, { useState } from "react";

const AuthCard = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F5F3E4] p-4">
      <div
        className={`relative w-full max-w-4xl flex transition-all duration-500 ease-in-out ${
          isSignUp ? "scale-105" : "scale-100"
        }`}
      >
        {/* Sign In Card */}
        <div
          className={`w-1/2 p-10 bg-white rounded-lg shadow-lg transition-all duration-500 ease-in-out transform ${
            isSignUp ? "scale-95" : "scale-100"
          } hover:scale-105`}
        >
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
          <p className="mt-4 text-center text-[#8B5E3C] cursor-pointer" onClick={() => setIsSignUp(true)}>
            Create Account
          </p>
          <p className="mt-2 text-center text-gray-500 cursor-pointer">Forgot password?</p>
        </div>

        {/* Sign Up / Info Card */}
        <div
          className={`w-1/2 p-10 bg-[#B6825D] text-white rounded-lg shadow-lg flex flex-col items-center justify-center transition-all duration-500 ease-in-out transform ${
            isSignUp ? "scale-105" : "scale-95"
          } hover:scale-110`}
        >
          <h2 className="text-2xl font-bold">Hello, wakai !</h2>
          <p className="mt-2 text-center">Enter your details and start your learning journey with us</p>
          <button
            className="mt-4 px-4 py-2 bg-[#F5F3E4] text-[#8B5E3C] rounded-lg shadow hover:bg-opacity-90"
            onClick={() => setIsSignUp(false)}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthCard;
