import React from "react";

const HeroSection = () => {
  return (
    <section className="relative w-full h-[calc(100vh-144px)] md:h-[calc(100vh-64px)] flex items-center justify-center text-white" style={{height: "calc(100vh-144px)"}}>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/HeroSectionBackground.jpg')" }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50" />

      {/* Text Content */}
      <div className="relative z-10 max-w-2xl px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold mb-4 animate-fade-in">
          Empower Your IT Learning Journey with Aniki
        </h1>
        <p className="text-lg md:text-xl text-gray-300 animate-fade-in delay-200">
          Aniki is your go-to platform for structured roadmaps and essential
          study resources in the IT field. Join our vibrant community to enhance
          your skills and connect with fellow learners.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
