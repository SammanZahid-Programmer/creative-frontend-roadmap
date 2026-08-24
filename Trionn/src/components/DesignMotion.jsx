import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./DesignMotion.css";

gsap.registerPlugin(ScrollTrigger);

export default function DesignMotion() {
  const sectionRef = useRef(null);

  const designRef = useRef(null);
  const motionRef = useRef(null);

  const orbitImagesRef = useRef([]);
  const finalGridRef = useRef(null);
  const finalImagesRef = useRef([]);

  const addOrbitImage = (el) => {
    if (el && !orbitImagesRef.current.includes(el)) {
      orbitImagesRef.current.push(el);
    }
  };

  const addFinalImage = (el) => {
    if (el && !finalImagesRef.current.includes(el)) {
      finalImagesRef.current.push(el);
    }
  };

  const images = [
    "./card-1.jpeg",

    "./card-2.jpeg",

   "./card-3.jpeg",

   "./card-4.jpeg",

    "./card-5.jpeg",

    "./card-6.jpeg",

    "./card-7.jpeg",

    "./card-8.jpeg",

    "./card-9.jpeg",
  ];

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const orbitImages = orbitImagesRef.current;
      const finalImages = finalImagesRef.current;

      /*
      =========================================================
      INITIAL STATES
      =========================================================
      */

      gsap.set(designRef.current, {
        x: "-65vw",
      });

      gsap.set(motionRef.current, {
        x: "65vw",
      });

      /*
      Every orbit image starts OUTSIDE
      bottom-left of screen.
      */

      orbitImages.forEach((image) => {
        gsap.set(image, {
          x: -window.innerWidth * 0.25,
          y: window.innerHeight * 0.65,
          rotation: -15,
          scale: 0.75,
          opacity: 0,
        });
      });

      /*
      Final 6 images hidden initially.
      */

      gsap.set(finalGridRef.current, {
        opacity: 0,
      });

      gsap.set(finalImages, {
        opacity: 0,
        scale: 0.7,
      });

      /*
      =========================================================
      MAIN TIMELINE
      =========================================================
      */

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,

          start: "top top",

          end: "+=320%",

          pin: true,

          scrub: 1,

          anticipatePin: 1,

          invalidateOnRefresh: true,
        },
      });

      /*
      =========================================================
      TITLE ENTER
      =========================================================
      */

      tl.to(
        designRef.current,
        {
          x: 0,
          duration: 1,
          ease: "none",
        },
        0
      );

      tl.to(
        motionRef.current,
        {
          x: 0,
          duration: 1,
          ease: "none",
        },
        0
      );

      /*
      =========================================================
      IMAGE ORBIT SYSTEM
      =========================================================

      Each image:
      bottom-left
          ↓
      enter screen
          ↓
      move around center
          ↓
      top-right
          ↓
      disappear

      One image starts after the previous one.
      =========================================================
      */

      const centerX = window.innerWidth * 0.5;
      const centerY = window.innerHeight * 0.52;

      const radiusX = Math.min(
        window.innerWidth * 0.38,
        650
      );

      const radiusY = Math.min(
        window.innerHeight * 0.34,
        330
      );

      orbitImages.forEach((image, index) => {
        /*
        Each image gets its own section of the orbit.
        */

        const startAngle =
          135 - index * 7;

        const midAngle =
          35 - index * 5;

        const endAngle =
          -45 - index * 4;

        const startX =
          centerX +
          Math.cos(
            (startAngle * Math.PI) / 180
          ) *
            radiusX;

        const startY =
          centerY +
          Math.sin(
            (startAngle * Math.PI) / 180
          ) *
            radiusY;

        const midX =
          centerX +
          Math.cos(
            (midAngle * Math.PI) / 180
          ) *
            radiusX;

        const midY =
          centerY +
          Math.sin(
            (midAngle * Math.PI) / 180
          ) *
            radiusY;

        const endX =
          centerX +
          Math.cos(
            (endAngle * Math.PI) / 180
          ) *
            radiusX;

        const endY =
          centerY +
          Math.sin(
            (endAngle * Math.PI) / 180
          ) *
            radiusY;

        /*
        Start time for each image.
        */

        const startTime =
          1.2 + index * 0.72;

        /*
        ENTER
        */

        tl.to(
          image,
          {
            x:
              startX -
              centerX,

            y:
              startY -
              centerY,

            opacity: 1,

            scale: 1,

            rotation:
              -10 + index * 2,

            duration: 0.7,

            ease: "none",
          },
          startTime
        );

        /*
        ORBIT
        */

        tl.to(
          image,
          {
            x:
              midX -
              centerX,

            y:
              midY -
              centerY,

            rotation:
              10 + index * 4,

            duration: 0.85,

            ease: "none",
          },
          startTime + 0.7
        );

        /*
        SECOND PART OF CIRCLE
        */

        tl.to(
          image,
          {
            x:
              endX -
              centerX,

            y:
              endY -
              centerY,

            rotation:
              25 + index * 3,

            scale: 0.9,

            duration: 0.8,

            ease: "none",
          },
          startTime + 1.55
        );

        /*
        EXIT TOP-RIGHT
        */

        tl.to(
          image,
          {
            x:
              window.innerWidth * 0.75,

            y:
              -window.innerHeight * 0.7,

            opacity: 0,

            scale: 0.65,

            rotation:
              35 + index * 5,

            duration: 0.75,

            ease: "none",
          },
          startTime + 2.35
        );
      });

      /*
      =========================================================
      HEADINGS FADE AWAY
      =========================================================
      */

      tl.to(
        designRef.current,
        {
          opacity: 0,
          x: "-20vw",
          duration: 0.8,
          ease: "none",
        },
        8.1
      );

      tl.to(
        motionRef.current,
        {
          opacity: 0,
          x: "20vw",
          duration: 0.8,
          ease: "none",
        },
        8.1
      );

      /*
      =========================================================
      FINAL 6 IMAGE GRID
      =========================================================
      */

      tl.to(
        finalGridRef.current,
        {
          opacity: 1,
          duration: 0.8,
          ease: "none",
        },
        8.8
      );

      /*
      3 TOP
      3 BOTTOM

      Top row comes from UP.
      Bottom row comes from DOWN.
      */

      finalImages.forEach((image, index) => {
        const isTop = index < 3;

        gsap.set(image, {
          opacity: 0,

          y: isTop
            ? -window.innerHeight * 0.45
            : window.innerHeight * 0.45,

          scale: 0.75,
        });

        tl.to(
          image,
          {
            opacity: 1,
            y: 0,
            scale: 1,

            duration: 0.8,

            ease: "none",
          },
          9 + index * 0.15
        );
      });

      /*
      =========================================================
      FINAL HOLD
      =========================================================
      */

      tl.to(
        finalGridRef.current,
        {
          scale: 1.02,
          duration: 1,
          ease: "none",
        },
        10.2
      );
    }, section);

    /*
    =========================================================
    REFRESH
    =========================================================
    */

    const refresh = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener(
      "load",
      refresh
    );

    const timer = setTimeout(
      refresh,
      500
    );

    return () => {
      clearTimeout(timer);

      window.removeEventListener(
        "load",
        refresh
      );

      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="design-motion-section"
    >
      {/* =====================================================
          CENTER HEADINGS
      ===================================================== */}

      <h2
        ref={designRef}
        className="design-title"
      >
        DESIGN IN
      </h2>

      <p className="design-description">
        EXPLORING IDEAS THROUGH
        <br />
        DAILY DESIGN PRACTICE.
      </p>

      <h2
        ref={motionRef}
        className="motion-title"
      >
        MOTION
      </h2>

      {/* =====================================================
          9 INDIVIDUAL ORBIT IMAGES
      ===================================================== */}

      <div className="orbit-stage">
        {images.map((image, index) => (
          <div
            key={index}
            ref={addOrbitImage}
            className="orbit-image"
          >
            <img
              src={image}
              alt={`Design ${index + 1}`}
              draggable="false"
            />
          </div>
        ))}
      </div>

      {/* =====================================================
          FINAL 6 IMAGES
      ===================================================== */}

      <div
        ref={finalGridRef}
        className="final-grid"
      >
        {images
          .slice(0, 6)
          .map((image, index) => (
            <div
              key={index}
              ref={addFinalImage}
              className="final-image"
            >
              <img
                src={image}
                alt={`Final design ${index + 1}`}
                draggable="false"
              />
            </div>
          ))}
      </div>

      {/* =====================================================
          BOTTOM INFO
      ===================================================== */}

      <div className="design-bottom-info">
        <p>
          Concepts, explorations, and interface
          <br />
          experiments shared openly as part of
          <br />
          our creative process.
        </p>
      </div>

      <a
        href="#"
        className="design-link"
        onClick={(e) =>
          e.preventDefault()
        }
      >
        VIEW ON DRIBBBLE
        <span>→</span>
      </a>
    </section>
  );
}