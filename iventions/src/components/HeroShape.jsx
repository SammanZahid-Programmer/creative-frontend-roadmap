import { useEffect, useRef } from "react";
import gsap from "gsap";

import "./HeroShape.css";

export default function HeroShape() {
  const motionRef = useRef(null);

  useEffect(() => {
    const hero = document.querySelector(".hero-section");
    const motion = motionRef.current;

    if (!hero || !motion) return;

    // Sirf horizontal smooth movement
    const xTo = gsap.quickTo(motion, "x", {
      duration: 1.8,
      ease: "power3.out",
    });

    // Bohat subtle tilt
    const rotationTo = gsap.quickTo(motion, "rotation", {
      duration: 1.8,
      ease: "power3.out",
    });

    const handlePointerMove = (event) => {
      const rect = hero.getBoundingClientRect();

      // -0.5 = left edge
      //  0 = center
      // +0.5 = right edge
      const x =
        (event.clientX - rect.left) / rect.width - 0.5;

      // Sirf thora sa left/right movement
      xTo(x * 18);

      // Bohat halka tilt
      rotationTo(x * 0.7);
    };

    const handlePointerLeave = () => {
      // Mouse section se bahar jaye
      // to original position par smoothly wapas
      xTo(0);
      rotationTo(0);
    };

    hero.addEventListener("pointermove", handlePointerMove);
    hero.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      hero.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      hero.removeEventListener(
        "pointerleave",
        handlePointerLeave
      );
    };
  }, []);

  return (
    <div className="hero-visual">
      <svg
        className="hero-main-svg"
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* =====================================
            FIXED BASE IVENTIONS TEXT
            Ye kabhi move nahi hoga
        ====================================== */}

        <text
          className="hero-big-title-base"
          x="5"
          y="575"
          textLength="990"
          lengthAdjust="spacingAndGlyphs"
        >
          IVENTIONS
        </text>

        {/* =====================================
            MOVING PURPLE SHAPE
            + PURPLE TITLE OVERLAY

            Dono same group mein hain,
            isliye dono exactly saath move karenge.
        ====================================== */}

        <g
          className="hero-motion-group"
          ref={motionRef}
        >
          <defs>
            <clipPath id="iventions-moving-clip">
              <path
                d="
                  M 0 180
                  L 465 240

                  C 500 245,
                    515 225,
                    535 175

                  L 600 0
                  L 860 0

                  L 570 285

                  C 545 310,
                    545 335,
                    558 385

                  L 610 600
                  L 0 600

                  Z
                "
              />
            </clipPath>
          </defs>

          {/* Purple background shape */}

          <path
            className="hero-purple-shape"
            d="
              M 0 180
              L 465 240

              C 500 245,
                515 225,
                535 175

              L 600 0
              L 860 0

              L 570 285

              C 545 310,
                545 335,
                558 385

              L 610 600
              L 0 600

              Z
            "
          />

          {/* Purple color only where shape overlaps title */}

          <g clipPath="url(#iventions-moving-clip)">
            <text
              className="hero-big-title-purple"
              x="5"
              y="575"
              textLength="990"
              lengthAdjust="spacingAndGlyphs"
            >
              IVENTIONS
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}