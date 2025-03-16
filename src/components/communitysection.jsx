import React, { useState, useEffect, useRef } from "react";
import bgImage from "../assets/commbg.jpg"; // Replace with your actual image

const CommunitySection = () => {
  const fullText = "Discover Your IT Learning Path";
  const typingSpeed = 70; // Speed in milliseconds
  const [text, setText] = useState(fullText); // Initially set to full text
  const [hasTyped, setHasTyped] = useState(false);
  const [showCursor, setShowCursor] = useState(false); // Track cursor visibility
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTyped) {
          startTypingEffect();
          setHasTyped(true);
        }
      },
      { threshold: 0.6 } // 60% of the section must be visible
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasTyped]);

  const startTypingEffect = () => {
    setText(""); // Reset text before typing starts
    setShowCursor(true); // Show cursor while typing
    let index = 0;

    const typeEffect = () => {
      if (index < fullText.length) {
        setText(fullText.slice(0, index + 1));
        index++;
        setTimeout(typeEffect, typingSpeed);
      } else {
        setTimeout(() => setShowCursor(false), 300); // Hide cursor after typing
      }
    };

    typeEffect();
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.1)), url(${bgImage})`,
        backgroundPosition: "center 20%", // Adjusted background position
      }}
    >
      <div className="relative text-center px-6 max-w-3xl">
        {/* Typewriter Effect with Cursor Handling */}
        <h1 className="text-2xl md:text-4xl font-semibold text-white drop-shadow-lg">
          {text}
          {showCursor && <span className="animate-blink">|</span>}
        </h1>

        <p className="text-white mt-3 text-sm md:text-lg drop-shadow-md">
          Join our community to explore tailored roadmaps and engage in vibrant chatrooms with fellow learners.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <button className="px-6 py-2 bg-white text-black font-semibold rounded-lg shadow-md transition-transform duration-300 hover:bg-gray-200 hover:scale-105">
            Explore
          </button>
          <button className="px-6 py-2 bg-transparent text-white font-semibold rounded-lg border border-white shadow-md transition-transform duration-300 hover:bg-white hover:text-black hover:scale-105">
            Join
          </button>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;