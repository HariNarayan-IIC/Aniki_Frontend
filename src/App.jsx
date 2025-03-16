import { useState } from 'react'
import './App.css'
import Resources from './components/resourcessection'
import PromotionSection from "./components/promotionsection";
import CommunitySection from "./components/communitysection";
import Footer from './components/footersection'
import Roadmap_Section from './components/Roadmap_Section/Roadmap_Section'
import FeaturesSection from './components/featuresSection';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Roadmap_Section/>
    <FeaturesSection/>
    <div>
      <PromotionSection /> {/* Use the component */}
    </div>
    <div>
      <CommunitySection /> {/* Use the component */}
    </div>
    <div>
      <Resources/>
    </div>
    <div>
      <Footer/>
    </div>
    </>
    
  )
}

export default App
