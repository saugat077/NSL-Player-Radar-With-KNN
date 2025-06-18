import { useState } from "react";
import { Toaster } from "sonner"; 
import "./App.css";
import TopClubs from "./components/TopClubs";
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import ContentSection from "./components/ContentSection";
import Footer from "./components/Footer";
import PlayerRadar from "./components/PlayerRadar";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <main className="w-full min-h-screen bg-white">
      <Toaster position="top-center" /> {/* <-- Add this once */}
      <TopClubs />
      {/* ⬇️ give NavBar access to the auth state */}
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <HeroSection />
      <ContentSection />
      {/* Show radar only when authenticated */}
      {isLoggedIn ? <PlayerRadar /> : <p>Please log in to see player insights.</p>}
      <Footer />
    </main>
  );
}
