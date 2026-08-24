import { useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MenuPanel from "./components/MenuPanel";
import SectionTwo from "./components/SectionTwo";
import SectionThree from "./components/SectionThree";
import KeyFacts from "./components/KeyFacts";
import SelectedWork from "./components/SelectedWork";
import ServicesReveal from "./components/ServicesReveal";
import Stories from "./components/Stories";
import DesignMotion from "./components/DesignMotion";
import ContactFooter from "./components/ContactFooter";


gsap.registerPlugin(ScrollTrigger);

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  /*
  =========================================================
  NAVBAR THEME

  dark  = dark background -> WHITE navbar
  light = light background -> BLACK navbar
  =========================================================
  */

  const [navTheme, setNavTheme] = useState("dark");

  useEffect(() => {
    let ticking = false;

    /*
    =========================================================
    GET RGB FROM CSS COLOR
    =========================================================
    */

    const getLuminance = (color) => {
      if (!color) return null;

      const rgb = color.match(/\d+(?:\.\d+)?/g);

      if (!rgb || rgb.length < 3) {
        return null;
      }

      const r = Number(rgb[0]);
      const g = Number(rgb[1]);
      const b = Number(rgb[2]);

      /*
        Relative perceived brightness

        Lower value  = dark
        Higher value = light
      */

      return (
        0.299 * r +
        0.587 * g +
        0.114 * b
      );
    };

    /*
    =========================================================
    FIND BACKGROUND COLOR
    =========================================================
    */

    const getBackgroundLuminance = (element) => {
      let current = element;

      while (
        current &&
        current !== document.documentElement
      ) {
        const style = window.getComputedStyle(current);

        const backgroundColor =
          style.backgroundColor;

        if (
          backgroundColor &&
          backgroundColor !== "transparent" &&
          backgroundColor !== "rgba(0, 0, 0, 0)"
        ) {
          const luminance =
            getLuminance(backgroundColor);

          if (luminance !== null) {
            return luminance;
          }
        }

        current = current.parentElement;
      }

      /*
        Fallback to body
      */

      const bodyStyle =
        window.getComputedStyle(document.body);

      return getLuminance(
        bodyStyle.backgroundColor
      );
    };

    /*
    =========================================================
    DETECT NAVBAR THEME
    =========================================================
    */

    const detectNavbarTheme = () => {
      ticking = false;

      const navbarHeight = 100;

      /*
        Check multiple points below navbar.
        This makes the detection more reliable.
      */

      const points = [
        window.innerWidth * 0.15,
        window.innerWidth * 0.35,
        window.innerWidth * 0.5,
        window.innerWidth * 0.65,
        window.innerWidth * 0.85,
      ];

      let darkCount = 0;
      let lightCount = 0;

      points.forEach((x) => {
        const elements =
          document.elementsFromPoint(
            x,
            navbarHeight + 10
          );

        for (const element of elements) {
          /*
            Ignore navbar itself
          */

          if (
            element.closest(".navbar") ||
            element.classList.contains("navbar")
          ) {
            continue;
          }

          const luminance =
            getBackgroundLuminance(element);

          if (luminance === null) {
            continue;
          }

          /*
            Dark background
          */

          if (luminance < 145) {
            darkCount++;
          }

          /*
            Light background
          */

          else {
            lightCount++;
          }

          /*
            First useful background is enough
          */

          break;
        }
      });

      /*
      =======================================================
      FINAL DECISION
      =======================================================
      */

      if (darkCount > lightCount) {
        setNavTheme("dark");
      } else if (lightCount > darkCount) {
        setNavTheme("light");
      }
    };

    /*
    =========================================================
    INITIAL CHECK
    =========================================================
    */

    const initialCheck = () => {
      detectNavbarTheme();

      /*
        Run again after browser paints sections.
      */

      requestAnimationFrame(() => {
        detectNavbarTheme();
      });

      setTimeout(() => {
        detectNavbarTheme();
      }, 300);

      setTimeout(() => {
        detectNavbarTheme();
      }, 800);
    };

    initialCheck();

    /*
    =========================================================
    SCROLL
    =========================================================
    */

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(
          detectNavbarTheme
        );

        ticking = true;
      }
    };

    /*
    =========================================================
    RESIZE
    =========================================================
    */

    const onResize = () => {
      detectNavbarTheme();
    };

    window.addEventListener(
      "scroll",
      onScroll,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "resize",
      onResize
    );

    /*
    =========================================================
    LENIS / GSAP MOVEMENT
    =========================================================
    */

    const interval = setInterval(
      detectNavbarTheme,
      250
    );

    /*
    =========================================================
    CLEANUP
    =========================================================
    */

    return () => {
      window.removeEventListener(
        "scroll",
        onScroll
      );

      window.removeEventListener(
        "resize",
        onResize
      );

      clearInterval(interval);
    };
  }, []);

  /*
  =========================================================
  LENIS
  =========================================================
  */

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 0.9,
      autoRaf: false,
    });

    const raf = (time) => {
      lenis.raf(time * 1000);
    };

    const onScroll = () => {
      ScrollTrigger.update();
    };

    lenis.on(
      "scroll",
      onScroll
    );

    gsap.ticker.add(raf);

    gsap.ticker.lagSmoothing(0);

    const refresh = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener(
      "load",
      refresh
    );

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      window.removeEventListener(
        "load",
        refresh
      );

      lenis.off(
        "scroll",
        onScroll
      );

      gsap.ticker.remove(raf);

      lenis.destroy();
    };
  }, []);

  /*
  =========================================================
  MENU BODY LOCK
  =========================================================
  */

  useEffect(() => {
    document.body.style.overflow =
      menuOpen
        ? "hidden"
        : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /*
  =========================================================
  GLOBAL SOUND STATE
  =========================================================
  */

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent(
        "trionn-sound-toggle",
        {
          detail: {
            enabled: soundOn,
          },
        }
      )
    );
  }, [soundOn]);

  /*
  =========================================================
  APP
  =========================================================
  */

  return (
    <>
      <Navbar
        onMenu={() =>
          setMenuOpen(true)
        }
        soundOn={soundOn}
        setSoundOn={setSoundOn}
        theme={navTheme}
      />

      <Hero
        soundOn={soundOn}
      />

      <SectionTwo />

      <SectionThree />

      <KeyFacts />

      <SelectedWork />

      <ServicesReveal
        soundOn={soundOn}
      />

      <Stories />
      <DesignMotion />
      <ContactFooter />
      <MenuPanel
        open={menuOpen}
        onClose={() =>
          setMenuOpen(false)
        }
      />
    </>
  );
}

export default App;