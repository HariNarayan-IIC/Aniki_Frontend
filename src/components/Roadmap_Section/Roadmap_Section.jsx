import React from "react";
import Roadmap_Card from "./Roadmap_Card";

// export default function Roadmap_Section() {
//     return (
//         <div className="px-16 py-28 bg-Color-Scheme-1-Background inline-flex flex-col justify-start items-start gap-10">
//             <h6>Roadmaps</h6>
//             <h1 className="self-stretch justify-start text-Color-Scheme-1-Text text-5xl font-normal font-['Inconsolata'] leading-[57.60px]">Explore Your Path in IT Careers</h1>
//             <p className="self-stretch justify-start text-Color-Scheme-1-Text text-lg font-normal font-['Arimo'] leading-relaxed">Discover comprehensive roadmaps tailored for various IT fields. Whether you're interested in Web Development or Data Science, we provide the guidance you need to succeed</p>
//             <div className="flex justify-start items-start gap-16">
//                 <Roadmap_Card heading={"Web Development Roadmap"} text={"Start your journey to becoming a web developer."}/>
//                 <Roadmap_Card heading={"Data Science Roadmap"} text={"Unlock the secrets of data analysis and visualization."}/>
//                 <Roadmap_Card heading={"Cybersecurity Roadmap"} text={"Protect systems and networks in the digital age."}/>
//             </div>
//         </div>
//     )
// }

import { useState } from "react";

export default function RoadmapSection() {
  const [selected, setSelected] = useState(null);

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
        />
        <RoadmapCard 
          title="Data Science Roadmap" 
          description="Unlock the secrets of data analysis and visualization." 
          selected={selected === 'Data Science'}
          onClick={() => setSelected('Data Science')}
        />
        <RoadmapCard 
          title="Cybersecurity Roadmap" 
          description="Protect systems and networks in the digital age." 
          selected={selected === 'Cybersecurity'}
          onClick={() => setSelected('Cybersecurity')}
        />
      </div>

      <div className="mt-8 flex space-x-4 max-w-5xl mx-auto">
        <button className="bg-gray-200 text-black py-2 px-4 rounded-lg hover:bg-gray-300 hover:scale-105 transition transform cursor-pointer">Learn</button>
        <button className="text-black font-semibold hover:text-gray-700 hover:scale-105 transition transform cursor-pointer">Join &rarr;</button>
      </div>
    </section>
  );
}

function RoadmapCard({ title, description, selected, onClick }) {
  return (
    <div 
      className={`text-center p-4 rounded-lg transition cursor-pointer ${selected ? 'bg-blue-100' : 'bg-gray-100 hover:bg-gray-200'}`}
      onClick={onClick}
    >
      <div className="bg-gray-300 h-40 flex items-center justify-center rounded-lg">
        <span className="text-gray-500">🖼️</span>
      </div>
      <h3 className="text-xl font-semibold mt-4">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
}



