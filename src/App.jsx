import './App.css'
import BottomNavigationBar from './components/BottomNavigationBar/bottomNavigationBar';
import Footer from './components/footersection'
import Navbar from './components/navbar';
import { Outlet } from "react-router-dom";


function App() {
  return (
    <>
      <Navbar/>
      <Outlet/>
      <BottomNavigationBar/>
      <Footer/>
      
    </>
  )
}

export default App
