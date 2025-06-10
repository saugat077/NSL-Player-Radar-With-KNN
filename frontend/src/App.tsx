import { useState } from 'react'
import './App.css'
import TopClubs from './components/TopClubs'
import NavBar from './components/NavBar'
import HeroSection from './components/HeroSection'
import ContentSection from './components/ContentSection'
import Footer from './components/Footer'
import PlayerRadar from './components/PlayerRadar'
import PlayerSearch from './components/PlayerSearch'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="w-full min-h-screen bg-white">
      <TopClubs />
      <NavBar />
      <HeroSection />
      <ContentSection />
      {/* <PlayerSearch /> */}
      <PlayerRadar />
      <Footer />
    </main>
  )
}

export default App
