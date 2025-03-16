import { useState } from 'react'
import './App.css'
import PromotionSection from "./components/promotionsection";
import CommunitySection from "./components/communitysection";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <PromotionSection /> {/* Use the component */}
    </div>
    <div>
      <CommunitySection /> {/* Use the component */}
    </div>
    </>
  )
}

export default App
