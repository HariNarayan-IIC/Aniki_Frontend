import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import WebDevImg from '../../assets/3426526.jpg';
import DataScienceImg from "../../assets/3169210.jpg";
import CybersecurityImg from "../../assets/2942057.jpg";

export default function RoadmapSection() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  return (
    <section className="bg-white text-black py-16 px-8">
      <div className="max-w-5xl mx-auto">
        <p className="uppercase font-bold">Roadmaps</p>
        <h2 className="text-3xl font-semibold mt-2">Explore Your Path in IT Careers</h2>
        <p className="mt-4 text-gray-700">
          Discover comprehensive roadmaps tailored for various IT fields. Whether
          you're interested in Web Development or Data Science, we provide the
          guidance you need to succeed.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <RoadmapCard 
          title="Web Development Roadmap" 
          description="Start your journey to becoming a web developer." 
          selected={selected === 'Web Development'}
          onClick={() => setSelected('Web Development')}
          image={WebDevImg}
        />
        <RoadmapCard 
          title="Data Science Roadmap" 
          description="Unlock the secrets of data analysis and visualization." 
          selected={selected === 'Data Science'}
          onClick={() => setSelected('Data Science')}
          image={DataScienceImg}
        />
        <RoadmapCard 
          title="Cybersecurity Roadmap" 
          description="Protect systems and networks in the digital age." 
          selected={selected === 'Cybersecurity'}
          onClick={() => setSelected('Cybersecurity')}
          image={CybersecurityImg}
        />
      </div>

      <div className="mt-8 flex space-x-4 max-w-5xl mx-auto">
        <button 
          className="text-black font-semibold hover:text-gray-700 hover:scale-105 transition transform cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Join &rarr;
        </button>
      </div>
    </section>
  );
}

function RoadmapCard({ title, description, selected, onClick, image }) {
  return (
    <div 
      className={`text-center p-4 rounded-lg transition cursor-pointer ${selected ? 'bg-blue-100' : 'bg-gray-100 hover:bg-gray-200'}`}
      onClick={onClick}
    >
      <div className="bg-gray-300 h-40 flex items-center justify-center rounded-lg overflow-hidden">
        <img src={image} alt={title} className="h-full w-full object-cover" />
      </div>
      <h3 className="text-xl font-semibold mt-4">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
}
