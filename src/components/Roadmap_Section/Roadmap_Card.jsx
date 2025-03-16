import React from "react";

export default function Roadmap_Card({imageURL= "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png", heading, text}) {
    return (
        <div>
            <img className="self-stretch h-60 rounded-[32px]" src={imageURL}></img>
            <h3 className="self-stretch justify-start text-Color-Scheme-1-Text text-3xl font-normal font-['Inconsolata'] leading-10">{heading}</h3>
            <p className="self-stretch justify-start text-Color-Scheme-1-Text text-base font-normal font-['Arimo'] leading-normal">{text}</p>
        </div>
    )
}