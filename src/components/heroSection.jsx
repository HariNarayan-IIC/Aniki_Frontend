import React, { useState } from "react";
import { motion } from "framer-motion";
import zoroImg from "../assets/zoro.png";
import luffyImg from "../assets/luffy.png";

const HeroSection = () => {
  const [hoverZoro, setHoverZoro] = useState(false);
  const [hoverLuffy, setHoverLuffy] = useState(false);

  return (
    <div className="relative w-full h-[calc(100vh-200px)] bg-gradient-to-br from-green-700 via-green-600 to-green-500 text-white px-6 md:px-20 flex flex-col md:flex-row justify-center items-center overflow-hidden">

      {/* Top-Left Animated Concentric Rings */}
      <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] rounded-full border-4 border-white opacity-20 animate-pulse-slow" />
      <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full border-2 border-white opacity-10 animate-pulse-slow" />

      {/* Bottom-Right Animated Concentric Rings */}
      <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] rounded-full border-4 border-white opacity-20 animate-pulse-slow" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full border-2 border-white opacity-10 animate-pulse-slow" />

      {/* Left Character */}
      <div
        className="relative flex flex-col items-center"
        onMouseEnter={() => setHoverZoro(true)}
        onMouseLeave={() => setHoverZoro(false)}
      >
        {/* 💡 Bulb Emoji */}
        {hoverZoro && (
          <motion.div
            className="absolute -top-18 text-6xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              💡
            </motion.span>
          </motion.div>
        )}

        <motion.img
          src={zoroImg}
          alt="Character Left"
          className="w-60 md:w-100 mb-10 md:mb-0 z-10"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          whileHover={{ scale: 1.05, rotate: -2 }}
        />
      </div>

      {/* Center Text */}
      <div className="max-w-2xl text-center md:text-left z-10">
        <motion.h1
          className="text-3xl md:text-5xl font-bold mb-6 leading-tight font-[Poppins]"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, duration: 0.8 }}
        >
          Empower Your IT <br /> Learning Journey <br /> with Aniki
        </motion.h1>
        <motion.p
          className="text-md md:text-lg text-white/90 leading-relaxed font-[Poppins]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          Aniki is your go-to platform for structured roadmaps and essential study resources
          in the IT field. Join our vibrant community to enhance your skills and connect with
          fellow learners.
        </motion.p>
      </div>

      {/* Right Character */}
      <div
        className="relative flex flex-col items-center"
        onMouseEnter={() => setHoverLuffy(true)}
        onMouseLeave={() => setHoverLuffy(false)}
      >
        {/* 💡 Bulb Emoji */}
        {hoverLuffy && (
          <motion.div
            className="absolute -top-12 text-5xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              💡
            </motion.span>
          </motion.div>
        )}

        <motion.img
          src={luffyImg}
          alt="Character Right"
          className="w-40 md:w-60 mt-8 md:mt-0 z-10"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          whileHover={{ scale: 1.05, rotate: 2 }}
        />
      </div>
    </div>
  );
};

export default HeroSection;
