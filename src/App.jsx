import './App.css'
import Footer from './components/footersection'
import Navbar from './components/navbar';
import { Outlet } from "react-router-dom";


function App() {
  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default App
