import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Sectionthree.css";

export default function SectionThree() {

  /* =====================================================
     REFS
  ===================================================== */

  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const plusRef = useRef(null);


  /* =====================================================
     SCROLL LINE + PLUS ROTATION
  ===================================================== */

  useEffect(() => {

    const section = sectionRef.current;
    const line = lineRef.current;
    const plus = plusRef.current;

    if (!section || !line || !plus) return;


    let animationFrame;


    const updateAnimation = () => {

      const rect =
        section.getBoundingClientRect();

      const windowHeight =
        window.innerHeight;


      /*
        Animation starts when
        SectionThree enters viewport.
      */

      const start =
        windowHeight * 0.85;


      /*
        Animation finishes when
        section has moved approximately
        70% through viewport.
      */

      const end =
        windowHeight * 0.15;


      let progress =
        (start - rect.top) /
        (start - end);


      /*
        Keep progress between 0 and 1
      */

      progress =
        Math.max(
          0,
          Math.min(1, progress)
        );


      /*
        LINE
        0% -> 100%
      */

      line.style.transform =
        `scaleX(${progress})`;


      /*
        PLUS
        One complete clockwise turn
      */

      const rotation =
        progress * 360;

      plus.style.transform =
        `translate(-50%, -50%) rotate(${rotation}deg)`;

    };


    const onScroll = () => {

      cancelAnimationFrame(
        animationFrame
      );

      animationFrame =
        requestAnimationFrame(
          updateAnimation
        );

    };


    window.addEventListener(
      "scroll",
      onScroll,
      { passive: true }
    );


    updateAnimation();


    return () => {

      window.removeEventListener(
        "scroll",
        onScroll
      );

      cancelAnimationFrame(
        animationFrame
      );

    };

  }, []);


  /* =====================================================
     MORE ABOUT US HOVER
  ===================================================== */

  useEffect(() => {

    const link =
      document.querySelector(
        ".section-three-link"
      );

    if (!link) return;

    const text =
      link.querySelector(
        ".section-three-link-text"
      );

    const arrow =
      link.querySelector(
        ".section-three-link-arrow"
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


    return () => {

      link.removeEventListener(
        "mouseenter",
        enter
      );

      link.removeEventListener(
        "mouseleave",
        leave
      );

    };

  }, []);


  /* =====================================================
     SECTION
  ===================================================== */

  return (

    <section
      ref={sectionRef}
      className="section-three"
    >

      {/* =================================================
          TOP LINE + PLUS
      ================================================= */}

      <div className="section-three-top-line">

        <div
          ref={lineRef}
          className="section-three-moving-line"
        />

        <div
          ref={plusRef}
          className="section-three-plus"
        >

          <span className="plus-horizontal" />

          <span className="plus-vertical" />

        </div>

      </div>


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div className="section-three-content">


        {/* =================================================
            LEFT TOP
        ================================================= */}

        <div className="section-three-left-top">

          <p>
            WE DESIGN FOR LONGEVITY
            <br />
            CLARITY FIRST, CRAFT ALWAYS,
            <br />
            BUILT TO SCALE.
          </p>

        </div>


        {/* =================================================
            RIGHT TOP
        ================================================= */}

        <div className="section-three-right-top">

          <p>
            Our mission is to make technology feel
            <br className="desktop-break" />
            human by designing digital products
            <br className="desktop-break" />
            that are intuitive, purposeful, and
            <br className="desktop-break" />
            meaningful to people.
          </p>

        </div>


        {/* =================================================
            MORE ABOUT US
        ================================================= */}

        <div className="section-three-about">

          <a
            href="#about"
            className="section-three-link"
          >

            <span className="section-three-link-text">
              MORE ABOUT US
            </span>

            <span className="section-three-link-arrow">
              →
            </span>

          </a>

        </div>


        {/* =================================================
            BOTTOM LEFT
        ================================================= */}

        <div className="section-three-bottom">

          <p>
            FOCUSED VISION.
            <br />
            MEASURED EXECUTION.
          </p>

        </div>

      </div>

    </section>
  );
}