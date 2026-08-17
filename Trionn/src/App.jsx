import { useEffect, useState } from "react";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MenuPanel from "./components/MenuPanel";
import SectionTwo from "./components/SectionTwo";
import SectionThree from "./components/SectionThree";
import KeyFacts from "./components/KeyFacts";
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  /* =====================================================
     LENIS SMOOTH SCROLL
  ===================================================== */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 0.9,
    });
    let animationFrame;
    function raf(time) {
      lenis.raf(time);
      animationFrame = requestAnimationFrame(raf);
    }
    animationFrame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(animationFrame);
      lenis.destroy();
    };
  }, []);
  /* =====================================================
     PREVENT BODY SCROLL WHEN MENU IS OPEN
  ===================================================== */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);
  /* =====================================================
     APP
  ===================================================== */
  return (
    <>
      <Navbar
        onMenu={() => setMenuOpen(true)}
        soundOn={soundOn}
        setSoundOn={setSoundOn}
      />
      <Hero soundOn={soundOn} />
      <SectionTwo />
      <SectionThree />
      {/* =================================================
          KEY FACTS
      ================================================= */}
      <KeyFacts />
      <MenuPanel open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
export default App;
