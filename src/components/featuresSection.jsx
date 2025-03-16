import React from "react";

export default function FeaturesSection() {
    return (
      <section className="bg-green-600 text-white py-16 px-8">
        <div className="max-w-5xl mx-auto text-center">
          <p className="uppercase font-bold">Tagline</p>
          <h2 className="text-3xl font-semibold mt-2">
            Personalized Dashboard, Engaging Chatrooms, and Dynamic Roadmaps!
          </h2>
          <p className="mt-4 text-gray-200">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
  
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Dashboard Overview Card */}
          <div className="bg-white text-green-600 rounded-lg overflow-hidden flex">
            <div className="p-6 flex-1">
              <p className="font-bold">Tagline</p>
              <h3 className="text-xl font-semibold mt-2">DashBoard Overview Section Title Here</h3>
              <p className="mt-2 text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <a href="#" className="mt-4 inline-block text-green-600 font-semibold">Learn &rarr;</a>
            </div>
            <div className="bg-gray-200 flex items-center justify-center w-1/3">
              <span className="text-gray-400">🖼️</span>
            </div>
          </div>
  
          {/* Chatrooms Card */}
          <div className="bg-white text-green-600 rounded-lg overflow-hidden">
            <div className="p-6">
              <p className="font-bold">Tagline</p>
              <h3 className="text-xl font-semibold mt-2">Chatrooms</h3>
              <p className="mt-2 text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <a href="#" className="mt-4 inline-block text-green-600 font-semibold">Explore &rarr;</a>
            </div>
            <div className="bg-gray-200 flex items-center justify-center h-28">
              <span className="text-gray-400">🖼️</span>
            </div>
          </div>
  
          {/* Dynamic Roadmaps Card */}
          <div className="bg-white text-green-600 rounded-lg overflow-hidden">
            <div className="p-6">
              <p className="font-bold">Tagline</p>
              <h3 className="text-xl font-semibold mt-2">Dynamic Roadmaps</h3>
              <p className="mt-2 text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <a href="#" className="mt-4 inline-block text-green-600 font-semibold">Button &rarr;</a>
            </div>
            <div className="bg-gray-200 flex items-center justify-center h-28">
              <span className="text-gray-400">🖼️</span>
            </div>
          </div>
        </div>
      </section>
    );
  }
  