import { useState } from 'react';
import './App.css'
import BottomNavigationBar from './components/BottomNavigationBar/bottomNavigationBar';
import Footer from './components/footersection'
import Navbar from './components/navbar';
import { Outlet } from "react-router-dom";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      <Outlet context={{setIsLoggedIn}}/>
      <BottomNavigationBar/>
      <Footer/>
      
    </>
  )
}

export default App
