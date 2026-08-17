import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./sectionTwo.css";

gsap.registerPlugin(ScrollTrigger);

const statement =
  "Trionn is an independent digital studio crafting meaningful brand experiences through strategy, design, and technology.";

export default function SectionTwo() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;

    if (!section || !text) {
      return;
    }

    const ctx = gsap.context(() => {
      /* =====================================================
         TEXT LETTERS
      ===================================================== */

      const letters =
        text.querySelectorAll(".about-letter");

      if (!letters.length) return;


      /* =====================================================
         INITIAL STATE
      ===================================================== */

      gsap.set(letters, {
        opacity: 0.08,
        y: 28,
        filter: "blur(7px)",
      });


      /* =====================================================
         LETTER BY LETTER SCROLL REVEAL
      ===================================================== */

      gsap.to(letters, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",

        ease: "none",

        stagger: {
          each: 0.025,
        },

        scrollTrigger: {
          trigger: section,

          /*
            Animation starts when
            SectionTwo enters viewport.
          */
          start: "top 72%",

          /*
            Animation finishes as
            section moves upward.
          */
          end: "top -15%",

          /*
            Smooth scroll-linked animation.
          */
          scrub: 1.2,
        },
      });
    }, section);


    /* =====================================================
       REFRESH SCROLLTRIGGER
    ===================================================== */

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);


    /* =====================================================
       CLEANUP
    ===================================================== */

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };

  }, []);


  /* =========================================================
     JSX
  ========================================================= */

  return (
    <section
      ref={sectionRef}
      className="about-section"
      id="about"
    >

      {/* =================================================
          ABOUT INTRO
      ================================================= */}

      <div className="about-intro">

        {/* =================================================
            LABEL
        ================================================= */}

        <div className="about-label">
          ABOUT
        </div>


        {/* =================================================
            BIG STATEMENT
        ================================================= */}

        <div
          ref={textRef}
          className="about-statement"
          aria-label={statement}
        >

          {statement.split("").map(
            (character, index) => (
              <span
                key={`${character}-${index}`}
                className={
                  character === " "
                    ? "about-letter about-space"
                    : "about-letter"
                }
                aria-hidden="true"
              >
                {character === " "
                  ? "\u00A0"
                  : character}
              </span>
            )
          )}

        </div>

      </div>

    </section>
  );
}