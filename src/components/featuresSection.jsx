import React from "react";

export default function FeaturesSection() {
  return (
    <section className="relative py-16 px-8 overflow-hidden bg-[#101828]">
      {/* Top-left abstract ring */}
      <div className="absolute -top-32 -left-32 z-0 pointer-events-none opacity-30">
        <svg width="380" height="280" viewBox="0 0 380 280" fill="none">
          <ellipse cx="150" cy="140" rx="120" ry="70" stroke="#fff" strokeWidth="10" fill="none" opacity="0.2"/>
          <ellipse cx="170" cy="120" rx="80" ry="40" stroke="#a78bfa" strokeWidth="6" fill="none" opacity="0.25"/>
          <ellipse cx="120" cy="180" rx="50" ry="30" stroke="#7c3aed" strokeWidth="4" fill="none" opacity="0.2"/>
        </svg>
      </div>
      {/* Bottom-right abstract ring */}
      <div className="absolute -bottom-40 -right-40 z-0 pointer-events-none opacity-30">
        <svg width="420" height="300" viewBox="0 0 420 300" fill="none">
          <ellipse cx="320" cy="200" rx="140" ry="80" stroke="#fff" strokeWidth="10" fill="none" opacity="0.18"/>
          <ellipse cx="350" cy="220" rx="90" ry="50" stroke="#a78bfa" strokeWidth="6" fill="none" opacity="0.21"/>
          <ellipse cx="280" cy="250" rx="60" ry="35" stroke="#7c3aed" strokeWidth="4" fill="none" opacity="0.16"/>
        </svg>
      </div>

      <div className="relative max-w-5xl mx-auto text-center z-10">
        <h2 className="text-3xl font-semibold mt-2 text-white">
          Personalized Dashboard, Engaging Chatrooms, and Dynamic Roadmaps!
        </h2>
        <p className="mt-4 text-gray-200">
          Unlock your learning journey with tools designed for collaboration, progress tracking, and interactive exploration.
        </p>
      </div>

      <div className="relative mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto z-10">
        {/* Dashboard Overview Card */}
        <div className="bg-white text-green-600 rounded-xl overflow-hidden flex flex-col h-full shadow-2xl transition-transform hover:scale-105">
          <div className="p-6 flex-1">
            <h3 className="text-xl font-semibold mt-2">Personalized Dashboard</h3>
            <p className="mt-2 text-gray-600">
              Get a real-time overview of your learning progress, upcoming milestones, and personalized recommendations—all in one place.
            </p>
          </div>
          <div className="bg-gray-200 flex items-center justify-center h-28">
            <a 
              href="/login" 
              className="mt-4 inline-block text-green-600 font-semibold"
            >
              Learn &rarr;
            </a>
          </div>
        </div>

        {/* Chatrooms Card */}
        <div className="bg-white text-green-600 rounded-xl overflow-hidden flex flex-col h-full shadow-2xl transition-transform hover:scale-105">
          <div className="p-6 flex-1">
            <h3 className="text-xl font-semibold mt-2">Engaging Chatrooms</h3>
            <p className="mt-2 text-gray-600">
              Collaborate and connect instantly with fellow learners. Share insights, ask questions, and grow together in vibrant chatrooms.
            </p>
          </div>
          <div className="bg-gray-200 flex items-center justify-center h-28">
            <a 
              href="/communities" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mt-4 inline-block text-green-600 font-semibold"
            >
              Explore &rarr;
            </a>
          </div>
        </div>

        {/* Dynamic Roadmaps Card */}
        <div className="bg-white text-green-600 rounded-xl overflow-hidden flex flex-col h-full shadow-2xl transition-transform hover:scale-105">
          <div className="p-6 flex-1">
            <h3 className="text-xl font-semibold mt-2">Dynamic Roadmaps</h3>
            <p className="mt-2 text-gray-600">
              Navigate your learning journey with interactive roadmaps that adapt to your pace and interests—making every step clear and actionable.
            </p>
          </div>
          <div className="bg-gray-200 flex items-center justify-center h-28">
            <a 
              href="/roadmaps" 
              className="mt-4 inline-block text-green-600 font-semibold"
            >
              Start Now &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
