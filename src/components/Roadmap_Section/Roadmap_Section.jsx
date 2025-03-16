import React from "react";
import Roadmap_Card from "./Roadmap_Card";

export default function Roadmap_Section() {
    return (
        <div className="px-16 py-28 bg-Color-Scheme-1-Background inline-flex flex-col justify-start items-start gap-10">
            <h6>Roadmaps</h6>
            <h1 className="self-stretch justify-start text-Color-Scheme-1-Text text-5xl font-normal font-['Inconsolata'] leading-[57.60px]">Explore Your Path in IT Careers</h1>
            <p className="self-stretch justify-start text-Color-Scheme-1-Text text-lg font-normal font-['Arimo'] leading-relaxed">Discover comprehensive roadmaps tailored for various IT fields. Whether you're interested in Web Development or Data Science, we provide the guidance you need to succeed</p>
            <div className="flex justify-start items-start gap-16">
                <Roadmap_Card heading={"Web Development Roadmap"} text={"Start your journey to becoming a web developer."}/>
                <Roadmap_Card heading={"Data Science Roadmap"} text={"Unlock the secrets of data analysis and visualization."}/>
                <Roadmap_Card heading={"Cybersecurity Roadmap"} text={"Protect systems and networks in the digital age."}/>
            </div>
        </div>
    )
}