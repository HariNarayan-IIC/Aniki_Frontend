import './App.css'
import BottomNavigationBar from './components/bottomNavigationBar';
import Footer from './components/footersection'
import Navbar from './components/navbar';
import { Outlet } from "react-router-dom";


function App() {
  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
      <BottomNavigationBar/>
    </>
  )
}

export default App
