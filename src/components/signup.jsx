import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import zoroPng from "../assets/zoro.png";
import luffyPng from "../assets/luffy.png";

// Infinite typing animation for "Hello, Wakai!" and "Welcome Back!"
const TypingText = ({ text, speed = 60, eraseSpeed = 40, delay = 1200 }) => {
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timeout;
    if (typing) {
      if (displayed.length < text.length) {
        timeout = setTimeout(() => {
          setDisplayed(text.slice(0, displayed.length + 1));
        }, speed);
      } else {
        timeout = setTimeout(() => setTyping(false), delay);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(text.slice(0, displayed.length - 1));
        }, eraseSpeed);
      } else {
        timeout = setTimeout(() => setTyping(true), 400);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, text, speed, eraseSpeed, delay]);

  return (
    <span>
      {displayed}
      <span className="blinking-cursor">|</span>
    </span>
  );
};

const AuthCard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // State to toggle between Sign Up and Login
  const [isSignIn, setIsSignIn] = useState(location.pathname === "/login");
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setFade(true);
    const timeout = setTimeout(() => {
      setIsSignIn(location.pathname === "/login");
      setFade(false);
    }, 300);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  // Form state for both Sign Up and Login
  const [formData, setFormData] = useState({
    first: "",
    last: "",
    password: "",
    role: "",
    confirm: "",
    email: "",
  });

  // Dummy handlers for demonstration
  const registerUser = () => {
    alert("Sign Up: " + JSON.stringify(formData, null, 2));
  };

  const loginUser = () => {
    alert("Login: " + JSON.stringify(formData, null, 2));
  };

  const handleGoogleSignUp = () => {
    alert("Google sign up coming soon!");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const goToSignUp = () => {
    navigate("/signup");
  };

  // Card components for easier switching
  const IllustrationCard = ({
    title,
    subtitle,
    imgSrc,
    circles = true,
    isLeft = false,
    isRight = false,
  }) => (
    <div
      className={`
        relative flex flex-col items-center pt-10 pb-0 px-10
        transition-all duration-300
        w-[390px] h-[540px]
      `}
      style={{
        background: "linear-gradient(180deg, #2e9e5b 0%, #207845 100%)",
        borderTopLeftRadius: isLeft ? 32 : 0,
        borderBottomLeftRadius: isLeft ? 32 : 0,
        borderTopRightRadius: isRight ? 32 : 0,
        borderBottomRightRadius: isRight ? 32 : 0,
        boxShadow: "0 6px 32px 0 rgba(44, 195, 137, 0.10)",
      }}
    >
      {/* Bulb Icon */}
      <div className="mb-6">
        <svg width="56" height="56" fill="none" viewBox="0 0 56 56">
          <circle cx="28" cy="28" r="28" fill="none" />
          <g filter="url(#glow)">
            <path
              d="M28 13a11 11 0 0 0-5.4 20.8V41a1.5 1.5 0 0 0 1.5 1.5h9.8a1.5 1.5 0 0 0 1.5-1.5v-7.2A11 11 0 0 0 28 13Zm4.4 20.8a1.5 1.5 0 0 0-.8 1.3V39.5h-7.2v-4.4a1.5 1.5 0 0 0-.8-1.3A8.5 8.5 0 1 1 28 15.5a8.5 8.5 0 0 1 4.4 18.3Z"
              fill="#fff"
            />
          </g>
          <defs>
            <filter id="glow" x="-10" y="-10" width="76" height="76" filterUnits="userSpaceOnUse">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
        </svg>
      </div>
      {/* Animated Title */}
      <h1
        className="text-white text-[2.5rem] font-bold mb-2"
        style={{ letterSpacing: "0.5px", minHeight: "3rem" }}
      >
        <TypingText text={title} speed={75} />
      </h1>
      <div className="text-white text-base mb-8" style={{ opacity: 0.92 }}>
        {subtitle}
      </div>
      {/* Illustration */}
      <div className="flex-1 flex items-start w-full justify-center relative mt-[-30px]">
        <img
          src={imgSrc}
          alt="Character"
          className="w-[230px] h-[280px] object-contain"
          draggable={false}
          style={{ userSelect: "none" }}
        />
      </div>
      {/* Decorative Circles */}
      {circles && (
        <svg
          viewBox="0 0 390 280"
          width="390"
          height="280"
          className="absolute left-0 top-0 pointer-events-none"
          style={{ zIndex: 0 }}
        >
          <circle cx="80" cy="220" r="38" stroke="#fff" strokeOpacity="0.08" strokeWidth="2" fill="none" />
          <circle cx="320" cy="60" r="24" stroke="#fff" strokeOpacity="0.08" strokeWidth="2" fill="none" />
          <circle cx="190" cy="140" r="80" stroke="#fff" strokeOpacity="0.05" strokeWidth="2" fill="none" />
        </svg>
      )}
    </div>
  );

  const SignUpFormCard = () => (
    <div
      className={`
        flex flex-col justify-center px-10 py-10
        transition-all duration-300
        w-[390px] h-[540px]
      `}
      style={{
        background: "rgba(255,255,255,0.97)",
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: 32,
        borderBottomRightRadius: 32,
        boxShadow: "0 6px 32px 0 rgba(44, 195, 137, 0.10)",
      }}
    >
      <h2 className="text-[2.2rem] font-bold text-[#388E3C] mb-8 text-center">
        Sign Up
      </h2>
      {/* Google Signup Button */}
      <button
        onClick={handleGoogleSignUp}
        className="flex items-center justify-center gap-2 w-full mb-5 py-2 rounded-lg border border-[#388E3C] bg-white text-[#388E3C] font-semibold hover:bg-[#eafaf1] transition"
        style={{ boxShadow: "0 1px 4px 0 rgba(44,195,137,0.08)" }}
      >
        <svg width="22" height="22" viewBox="0 0 48 48" className="inline-block">
          <g>
            <path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.6 33.2 29.8 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.3 2.5l6.4-6.4C34.1 5.1 29.3 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 19.5-7.6 21-17.5.1-.7.1-1.3.1-2 0-1.3-.1-2.6-.3-3.8z"/>
            <path fill="#34A853" d="M6.3 14.7l7 5.1C15.2 16.1 19.2 13 24 13c2.7 0 5.2.9 7.3 2.5l6.4-6.4C34.1 5.1 29.3 3 24 3 16.5 3 9.8 7.4 6.3 14.7z"/>
            <path fill="#FBBC05" d="M24 45c5.8 0 10.6-1.9 14.2-5.2l-6.6-5.4C29.6 36.7 26.9 38 24 38c-5.8 0-10.7-3.9-12.5-9.3l-7.1 5.5C9.8 40.6 16.5 45 24 45z"/>
            <path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.3 3.3-4.6 7.5-11.7 7.5-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.3 2.5l6.4-6.4C34.1 5.1 29.3 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 19.5-7.6 21-17.5.1-.7.1-1.3.1-2 0-1.3-.1-2.6-.3-3.8z"/>
          </g>
        </svg>
        Sign up with Google
      </button>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="First Name"
          value={formData.first}
          onChange={e => setFormData({ ...formData, first: e.target.value })}
          className="w-1/2 p-3 rounded-lg bg-white border border-[#b0bec5] focus:outline-none focus:ring-2 focus:ring-[#56C596] text-[#212121] text-base"
          name="first"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={formData.last}
          onChange={e => setFormData({ ...formData, last: e.target.value })}
          className="w-1/2 p-3 rounded-lg bg-white border border-[#b0bec5] focus:outline-none focus:ring-2 focus:ring-[#56C596] text-[#212121] text-base"
          name="last"
        />
      </div>
      <input
        type="password"
        placeholder="Enter Password"
        value={formData.password}
        onChange={e => setFormData({ ...formData, password: e.target.value })}
        className="w-full mb-4 p-3 rounded-lg bg-white border border-[#b0bec5] focus:outline-none focus:ring-2 focus:ring-[#56C596] text-[#212121] text-base"
        name="password"
      />
      <div className="flex gap-4 mb-4">
        <select
      value={formData.role}
      onChange={e => setFormData({ ...formData, role: e.target.value })}
      className="w-1/3 p-3 rounded-lg bg-white border border-[#b0bec5] focus:outline-none focus:ring-2 focus:ring-[#56C596] text-[#212121] text-base"
      name="role"
    >
      <option value="" disabled>
        Role
      </option>
      <option value="Student">Student</option>
      <option value="Experts">Experts</option>
      <option value="Other">Other</option>
    </select>


        <input
          type="password"
          placeholder="Confirm Password"
          value={formData.confirm}
          onChange={e => setFormData({ ...formData, confirm: e.target.value })}
          className="w-2/3 p-3 rounded-lg bg-white border border-[#b0bec5] focus:outline-none focus:ring-2 focus:ring-[#56C596] text-[#212121] text-base"
          name="confirm"
        />
      </div>
      <button
        className="w-full mt-2 py-3 rounded-lg bg-[#388E3C] text-white font-semibold text-lg shadow hover:bg-[#2e7031] transition"
        onClick={registerUser}
      >
        Sign Up
      </button>
      <div className="mt-5 text-center">
        <span className="text-[#388E3C] font-medium mr-1">Already have an account?</span>
        <button
          className="text-[#207845] font-semibold underline hover:text-[#388E3C] transition"
          onClick={goToLogin}
          type="button"
        >
          Login
        </button>
      </div>
    </div>
  );

  const LoginFormCard = () => (
    <div
      className={`
        flex flex-col justify-center px-10 py-10
        transition-all duration-300
        w-[390px] h-[540px]
      `}
      style={{
        background: "rgba(255,255,255,0.97)",
        borderTopLeftRadius: 32,
        borderBottomLeftRadius: 32,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        boxShadow: "0 6px 32px 0 rgba(44, 195, 137, 0.10)",
      }}
    >
      <h2 className="text-[2.2rem] font-bold text-[#388E3C] mb-8 text-center">
        Login
      </h2>
      {/* Google Signup Button */}
      <button
        onClick={handleGoogleSignUp}
        className="flex items-center justify-center gap-2 w-full mb-5 py-2 rounded-lg border border-[#388E3C] bg-white text-[#388E3C] font-semibold hover:bg-[#eafaf1] transition"
        style={{ boxShadow: "0 1px 4px 0 rgba(44,195,137,0.08)" }}
      >
        <svg width="22" height="22" viewBox="0 0 48 48" className="inline-block">
          <g>
            <path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.6 33.2 29.8 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.3 2.5l6.4-6.4C34.1 5.1 29.3 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 19.5-7.6 21-17.5.1-.7.1-1.3.1-2 0-1.3-.1-2.6-.3-3.8z"/>
            <path fill="#34A853" d="M6.3 14.7l7 5.1C15.2 16.1 19.2 13 24 13c2.7 0 5.2.9 7.3 2.5l6.4-6.4C34.1 5.1 29.3 3 24 3 16.5 3 9.8 7.4 6.3 14.7z"/>
            <path fill="#FBBC05" d="M24 45c5.8 0 10.6-1.9 14.2-5.2l-6.6-5.4C29.6 36.7 26.9 38 24 38c-5.8 0-10.7-3.9-12.5-9.3l-7.1 5.5C9.8 40.6 16.5 45 24 45z"/>
            <path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.3 3.3-4.6 7.5-11.7 7.5-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.3 2.5l6.4-6.4C34.1 5.1 29.3 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 19.5-7.6 21-17.5.1-.7.1-1.3.1-2 0-1.3-.1-2.6-.3-3.8z"/>
          </g>
        </svg>
        Sign in with Google
      </button>
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={e => setFormData({ ...formData, email: e.target.value })}
        className="w-full mb-4 p-3 rounded-lg bg-white border border-[#b0bec5] focus:outline-none focus:ring-2 focus:ring-[#56C596] text-[#212121] text-base"
        name="email"
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={e => setFormData({ ...formData, password: e.target.value })}
        className="w-full mb-4 p-3 rounded-lg bg-white border border-[#b0bec5] focus:outline-none focus:ring-2 focus:ring-[#56C596] text-[#212121] text-base"
        name="password"
      />
      <button
        className="w-full mt-2 py-3 rounded-lg bg-[#388E3C] text-white font-semibold text-lg shadow hover:bg-[#2e7031] transition"
        onClick={loginUser}
      >
        Login
      </button>
      <div className="mt-5 text-center">
        <span className="text-[#388E3C] font-medium mr-1">Don't have an account?</span>
        <button
          className="text-[#207845] font-semibold underline hover:text-[#388E3C] transition"
          onClick={goToSignUp}
          type="button"
        >
          Sign Up
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eafaf1]">
      <div className="flex rounded-[32px] shadow-2xl overflow-hidden z-10">
        <div
          className={`transition-opacity duration-300 ${fade ? "opacity-0" : "opacity-100"}`}
          style={{ display: "flex" }}
        >
          {/* Switch card positions based on isSignIn */}
          {isSignIn ? (
            <>
              <LoginFormCard />
              <IllustrationCard
                title="Welcome Back"
                subtitle="Start your voyage from where you left"
                imgSrc={luffyPng}
                isRight={true}
              />
            </>
          ) : (
            <>
              <IllustrationCard
                title="Hello, Wakai!"
                subtitle="Start your session from where yu left it"
                imgSrc={zoroPng}
                isLeft={true}
              />
              <SignUpFormCard />
            </>
          )}
        </div>
      </div>
      {/* Blinking cursor CSS and placeholder size */}
      <style>{`
        .blinking-cursor {
          font-weight: 100;
          font-size: 1em;
          color: #fff;
          animation: blink 1s infinite;
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        input::placeholder {
          font-size: 0.92rem;
          color: #b3c8b8;
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default AuthCard;
