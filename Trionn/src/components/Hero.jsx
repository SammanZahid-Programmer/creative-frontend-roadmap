import { useEffect, useRef } from "react";
import gsap from "gsap";
import HeroScene from "./HeroScene";

const words = [
  "intention.",
  "impact.",
  "purpose.",
];

export default function Hero({ soundOn }) {
  const wordRef = useRef(null);

  // Audio reference
  const audioRef = useRef(null);


  /* =====================================================
     WORD ANIMATION
  ===================================================== */

  useEffect(() => {
    const element = wordRef.current;

    if (!element) return;

    let index = 0;

    const timeline = gsap.timeline({
      repeat: -1,
    });

    function changeWord() {
      index =
        (index + 1) % words.length;

      timeline
        .to(element, {
          opacity: 0,
          y: 12,
          filter: "blur(12px)",
          duration: 0.45,
          ease: "power2.in",
        })

        .call(() => {
          element.textContent =
            words[index];
        })

        .fromTo(
          element,
          {
            opacity: 0,
            y: -10,
            filter: "blur(12px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.55,
            ease: "power3.out",
          }
        )

        .to(
          {},
          {
            duration: 2.1,
          }
        );
    }

    timeline.to(
      {},
      {
        duration: 2,
      }
    );

    const interval = setInterval(
      changeWord,
      3100
    );

    return () => {
      clearInterval(interval);
      timeline.kill();
    };
  }, []);


  /* =====================================================
     CTA HOVER
  ===================================================== */

  useEffect(() => {
    const links =
      document.querySelectorAll(
        ".magnetic-link"
      );

    const cleanups = [];

    links.forEach((link) => {
      const text =
        link.querySelector(
          ".link-text"
        );

      const arrow =
        link.querySelector(
          ".link-arrow"
        );

      if (!text || !arrow) return;

      const enter = () => {
        gsap.to(text, {
          x: 20,
          duration: 0.45,
          ease: "power3.out",
        });

        gsap.to(arrow, {
          x: -20,
          duration: 0.45,
          ease: "power3.out",
        });
      };

      const leave = () => {
        gsap.to(text, {
          x: 0,
          duration: 0.45,
          ease: "power3.out",
        });

        gsap.to(arrow, {
          x: 0,
          duration: 0.45,
          ease: "power3.out",
        });
      };

      link.addEventListener(
        "mouseenter",
        enter
      );

      link.addEventListener(
        "mouseleave",
        leave
      );

      cleanups.push(() => {
        link.removeEventListener(
          "mouseenter",
          enter
        );

        link.removeEventListener(
          "mouseleave",
          leave
        );
      });
    });

    return () => {
      cleanups.forEach(
        (cleanup) => cleanup()
      );
    };
  }, []);


  /* =====================================================
     AUDIO
     
     ON  -> plays continuously
     OFF -> volume becomes 0
     
     The audio itself DOES NOT stop.
  ===================================================== */

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.loop = true;

    if (soundOn) {
      /*
        Smoothly increase volume
        instead of suddenly becoming loud.
      */

      gsap.to(audio, {
        volume: 0.35,
        duration: 0.8,
        ease: "power2.out",
      });

      /*
        Browser allows play after
        user interaction with button.
      */

      const playAudio = async () => {
        try {
          await audio.play();
        } catch (error) {
          console.log(
            "Audio waiting for user interaction."
          );
        }
      };

      playAudio();

    } else {

      /*
        Do NOT pause.
        Only mute.
      */

      gsap.to(audio, {
        volume: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }

  }, [soundOn]);


  /* =====================================================
     CLEAN AUDIO ON COMPONENT UNMOUNT
  ===================================================== */

  useEffect(() => {
    const audio = audioRef.current;

    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);


  /* =====================================================
     HERO
  ===================================================== */

  return (
    <main className="hero">

      {/* =================================================
          AUDIO
      ================================================= */}

      <audio
        ref={audioRef}
        src="/sounds/Cinamatic-sound.mp3"
        loop
        preload="auto"
      />


      {/* =================================================
          3D SCENE
      ================================================= */}

      <HeroScene />


      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="hero-content">

        <h1>
          Designed to
          <br />
          mean{" "}

          <span ref={wordRef}>
            intention.
          </span>

        </h1>


        {/* =================================================
            CTA
        ================================================= */}

        <div className="hero-links">

          <a
            href="#contact"
            className="magnetic-link"
          >

            <span className="link-text">
              DISCUSS YOUR PROJECT
            </span>

            <span className="link-arrow">
              →
            </span>

          </a>


          <a
            href="#contact"
            className="magnetic-link"
          >

            <span className="link-text">
              BOOK A 30-MINUTE CALL
            </span>

            <span className="link-arrow">
              →
            </span>

          </a>

        </div>

      </div>


      {/* =================================================
          RIGHT INFO
      ================================================= */}

      <div className="hero-info">

        <div className="established">

          <div className="globe">

            <img
              src="/globe.svg"
              alt="Globe"
            />

          </div>


          <div className="established-copy">

            <strong>
              14+ YEARS SHAPING
            </strong>

            <strong>
              DIGITAL DIRECTION.
            </strong>

          </div>

        </div>


        <p>
          Websites, AI products,
          brands, and systems built
          for clarity, scale and
          impact.
        </p>

      </div>


      {/* =================================================
          BOTTOM CENTER
      ================================================= */}

      <div className="hero-bottom-text">

        <span>
          HOLD TO
        </span>

        <strong>
          💥
        </strong>

        <span>
          BLAST
        </span>

        <br />

        <span>
          DARE ⚡ TO TOUCH THE LINES.
        </span>

      </div>


      {/* =================================================
          SCROLL
      ================================================= */}

      <div className="scroll-indicator">

        <span>
          ↓
        </span>

      </div>

    </main>
  );
}