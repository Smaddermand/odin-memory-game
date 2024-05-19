import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ImageSection from './components/ImageSection.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>Pokemon Image Game</h1>
        <ImageSection/>
      </div>
    </>
  )
}

export default App
