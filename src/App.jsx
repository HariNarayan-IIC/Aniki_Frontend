import { useState } from 'react'
import './App.css'
import Resources from './components/resourcessection'
import PromotionSection from "./components/promotionsection";
import CommunitySection from "./components/communitysection";
import Footer from './components/footersection'
import Roadmap_Section from './components/Roadmap_Section/Roadmap_Section'
import Navbar from './components/navbar';
import HeroSection from './components/heroSection';
import FeaturesSection from './components/featuresSection';
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from "react-router-dom";
import signup from "./SignupPage";
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    
    </>
    
  )
}

export default App
