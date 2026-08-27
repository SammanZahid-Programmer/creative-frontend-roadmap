import Navbar from "../components/Navbar.jsx";
import HeroShape from "../components/HeroShape.jsx";
import HeroContent from "../components/HeroContent.jsx";

import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero-section">
      <HeroShape />

      <Navbar />

      <HeroContent />
    </section>
  );
}