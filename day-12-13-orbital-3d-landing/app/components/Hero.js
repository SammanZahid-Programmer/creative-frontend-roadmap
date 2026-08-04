"use client";
import HeroScene from "./HeroScene";
export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="hero-eyebrow">ORBITAL / 2026</p>
        <h1>
          EXPLORE
          <br />
          BEYOND
          <br />
          LIMITS.
        </h1>
        <p className="hero-description">
          Discover the next generation of space exploration through advanced
          orbital technology and intelligent spacecraft.
        </p>
        <div className="hero-actions">
          <button>EXPLORE MODELS</button>
          <button>OUR MISSION</button>
        </div>
      </div>
      <div className="hero-3d">
        <HeroScene />
      </div>
    </section>
  );
}
