import React from "react";
import HeroSection from "../components/heroSection";
import RoadmapSection from "../components/Roadmap_Section/Roadmap_Section";
import FeaturesSection from "../components/featuresSection";
import PromotionSection from "../components/promotionsection";
import CommunitySection from "../components/communitysection";
import LearningResources from "../components/resourcessection";


export default function LandingPage(){
    return (
        <>
            <HeroSection/>
            <RoadmapSection/>
            <FeaturesSection/>
            <div>
            <PromotionSection /> {/* Use the component */}
            </div>
            <div>
            <CommunitySection /> {/* Use the component */}
            </div>
            <div>
            <LearningResources/>
            </div>
        </>
    )
}