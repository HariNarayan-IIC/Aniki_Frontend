import { useState } from 'react'
import './App.css'
import Footer from './components/footersection'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Footer/>
    </div>
  )
}

export default App
