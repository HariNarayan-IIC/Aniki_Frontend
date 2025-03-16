import { useState } from 'react'
import './App.css'
import Resources from './components/resourcessection'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
      <Resources/>
    </div>
    </>
  )
}

export default App
