import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import spotlightImage from "../assets/images/spotlight-image.webp";

import project02 from "../assets/images/project-02.jpeg";
import project03 from "../assets/images/project-03.jpeg";
import project04 from "../assets/images/project-04.webp";
import project05 from "../assets/images/project-05.jpeg";
import project06 from "../assets/images/project-06.jpeg";

import "./SpotlightSection.css";

gsap.registerPlugin(ScrollTrigger);

const SLIDE_DURATION = 7000;

const slides = [
  {
    image: spotlightImage,
    title:
      "UEFA Champions League Final 2026: Budapest. Nine spaces. One night to remember.",
    category: "Sports",
    location: "Budapest",
    description:
      "10,498 VIP guests, 9 distinct hospitality spaces. One city, one concept, one night that delivered it all.",
  },

  {
    image: project02,
    title:
      "A global experience designed to bring people, ideas and moments together.",
    category: "Events",
    location: "Amsterdam",
    description:
      "One concept, multiple spaces and a memorable experience designed around every guest.",
  },

  {
    image: project03,
    title:
      "Creating spaces that turn every moment into something unforgettable.",
    category: "Experiences",
    location: "Paris",
    description:
      "A complete environment built around creativity, connection and moments people remember.",
  },

  {
    image: project04,
    title:
      "From the first idea to the final moment, every detail matters.",
    category: "Design",
    location: "London",
    description:
      "An immersive experience where storytelling, design and physical space came together.",
  },

  {
    image: project05,
    title:
      "One audience. One connected journey. One experience beyond expectations.",
    category: "Hospitality",
    location: "Barcelona",
    description:
      "A carefully designed event experience connecting people, atmosphere and unforgettable moments.",
  },

  {
    image: project06,
    title:
      "We create moments that audiences don't just see, but truly feel.",
    category: "Live Events",
    location: "Munich",
    description:
      "A powerful combination of creativity, technology and live experiences built to leave an impact.",
  },
];

export default function SpotlightSection() {
  const sectionRef = useRef(null);
  const coverRef = useRef(null);
  const sliderRef = useRef(null);
  const slideRef = useRef(null);
  const progressRef = useRef(null);
  const cursorRef = useRef(null);

  const currentRef = useRef(0);
  const timerRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const sliderStartedRef = useRef(false);

  const [current, setCurrent] = useState(0);
  const [cursorText, setCursorText] = useState("NEXT");

  /*
  ============================================================
  CLEAR AUTO SLIDE
  ============================================================
  */

  const clearAutoSlide = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (progressRef.current) {
      gsap.killTweensOf(progressRef.current);
    }
  }, []);

  /*
  ============================================================
  SLIDER CONTENT ENTER
  ============================================================
  */

  const animateSliderContentIn = useCallback(() => {
    const slide = slideRef.current;

    if (!slide) return;

    const items = slide.querySelectorAll(".project-animate");

    gsap.fromTo(
      items,
      {
        y: 45,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.07,
        ease: "power4.out",
      }
    );
  }, []);

  /*
  ============================================================
  CHANGE SLIDE
  ============================================================
  */

  const changeSlide = useCallback(
    (nextIndex, direction = "next") => {
      if (
        isAnimatingRef.current ||
        !sliderStartedRef.current
      ) {
        return;
      }

      isAnimatingRef.current = true;

      clearAutoSlide();

      const oldSlide = slideRef.current;

      /*
      ----------------------------------------------------------
      OLD CONTENT OUT
      ----------------------------------------------------------
      */

      if (oldSlide) {
        const oldContent =
          oldSlide.querySelectorAll(".project-animate");

        gsap.to(oldContent, {
          y: direction === "next" ? -30 : 30,
          opacity: 0,
          duration: 0.28,
          stagger: 0.025,
          ease: "power2.in",
        });
      }

      /*
      ----------------------------------------------------------
      NEW INDEX
      ----------------------------------------------------------
      */

      const normalizedIndex =
        (nextIndex + slides.length) % slides.length;

      currentRef.current = normalizedIndex;
      setCurrent(normalizedIndex);

      /*
      ----------------------------------------------------------
      WAIT FOR REACT TO RENDER NEW IMAGE
      ----------------------------------------------------------
      */

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const newSlide = slideRef.current;

          if (!newSlide) {
            isAnimatingRef.current = false;
            return;
          }

          const newContent =
            newSlide.querySelectorAll(".project-animate");

          /*
          ======================================================
          INITIAL STATE
          ======================================================
          */

          if (direction === "next") {
            /*
              LEFT CENTER POINT

                    |
                    |
                    ●
                    |
                    |
            */

            gsap.set(newSlide, {
              clipPath:
                "polygon(0% 50%, 0% 50%, 0% 50%, 0% 50%)",
            });
          } else {
            /*
              RIGHT CENTER POINT

                    |
                    |
                    ●
                    |
                    |
            */

            gsap.set(newSlide, {
              clipPath:
                "polygon(100% 50%, 100% 50%, 100% 50%, 100% 50%)",
            });
          }

          /*
          Hide text initially.
          */

          gsap.set(newContent, {
            y: 45,
            opacity: 0,
          });

          /*
          ======================================================
          MAIN TIMELINE
          ======================================================
          */

          const tl = gsap.timeline({
            onComplete: () => {
              isAnimatingRef.current = false;
              startProgress();
            },
          });

          /*
          ======================================================
          NEXT
          ======================================================
          */

          if (direction === "next") {
            /*
            ----------------------------------------------------
            STEP 1
            LEFT CENTER → RIGHT TOP + RIGHT BOTTOM

            Cone starts slowly.

                       TOP
                         ●
                        /
                       /
                      ●
                       \
                        \
                         ●
                       BOTTOM

            ----------------------------------------------------
            */

            tl.to(newSlide, {
              clipPath:
                "polygon(0% 50%, 100% 0%, 100% 100%, 0% 50%)",

              duration: 1.05,

              ease: "power2.out",
            });

            /*
            ----------------------------------------------------
            STEP 2
            RIGHT TOP + RIGHT BOTTOM
            STAY FIXED

            Now the opening travels from RIGHT → LEFT.

            This is the BOOK OPENING part.
            ----------------------------------------------------
            */

            tl.to(newSlide, {
              clipPath:
                "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",

              duration: 1.45,

              ease: "power3.inOut",
            });
          }

          /*
          ======================================================
          PREVIOUS
          ======================================================
          */

          else {
            /*
            ----------------------------------------------------
            STEP 1
            RIGHT CENTER → LEFT TOP + LEFT BOTTOM
            ----------------------------------------------------
            */

            tl.to(newSlide, {
              clipPath:
                "polygon(100% 50%, 0% 0%, 0% 100%, 100% 50%)",

              duration: 1.05,

              ease: "power2.out",
            });

            /*
            ----------------------------------------------------
            STEP 2
            LEFT TOP + LEFT BOTTOM STAY FIXED

            Opening travels LEFT → RIGHT.
            ----------------------------------------------------
            */

            tl.to(newSlide, {
              clipPath:
                "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",

              duration: 1.45,

              ease: "power3.inOut",
            });
          }

          /*
          ======================================================
          TEXT ENTER
          ======================================================
          */

          tl.to(
            newContent,
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              stagger: 0.06,
              ease: "power4.out",
            },
            "-=0.65"
          );
        });
      });
    },
    [clearAutoSlide]
  );

  /*
  ============================================================
  PROGRESS BAR
  ============================================================
  */

  const startProgress = useCallback(() => {
    if (!progressRef.current) return;

    clearAutoSlide();

    gsap.set(progressRef.current, {
      scaleX: 0,
    });

    gsap.to(progressRef.current, {
      scaleX: 1,
      duration: SLIDE_DURATION / 1000,
      ease: "none",

      onComplete: () => {
        if (!sliderStartedRef.current) return;

        const nextIndex =
          (currentRef.current + 1) % slides.length;

        changeSlide(nextIndex, "next");
      },
    });
  }, [clearAutoSlide, changeSlide]);

  /*
  ============================================================
  SCROLLTRIGGER
  ============================================================
  */

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const cover = coverRef.current;
    const slider = sliderRef.current;

    if (!section || !cover || !slider) return;

    const ctx = gsap.context(() => {
      /*
      Initially hide slider.
      */

      gsap.set(slider, {
        opacity: 0,
        pointerEvents: "none",
      });

      /*
      Main scroll timeline.
      */

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=2400",

          pin: true,
          scrub: 1.1,

          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      /*
      ----------------------------------------------------------
      HOLD
      ----------------------------------------------------------
      */

      tl.to(
        {},
        {
          duration: 0.8,
        }
      );

      /*
      ----------------------------------------------------------
      LIME COVER UP
      ----------------------------------------------------------
      */

      tl.to(cover, {
        yPercent: -100,
        duration: 1.5,
        ease: "power3.inOut",
      });

      /*
      ----------------------------------------------------------
      SHOW SLIDER
      ----------------------------------------------------------
      */

      tl.to(
        slider,
        {
          opacity: 1,
          duration: 0.45,
          ease: "power2.out",

          onStart: () => {
            sliderStartedRef.current = true;

            slider.style.pointerEvents = "auto";

            animateSliderContentIn();

            startProgress();
          },
        },
        "-=0.35"
      );

      /*
      ----------------------------------------------------------
      FINAL HOLD
      ----------------------------------------------------------
      */

      tl.to(
        {},
        {
          duration: 1.2,
        }
      );
    }, section);

    return () => {
      clearAutoSlide();

      ctx.revert();

      sliderStartedRef.current = false;
      isAnimatingRef.current = false;
    };
  }, [
    animateSliderContentIn,
    clearAutoSlide,
    startProgress,
  ]);

  /*
  ============================================================
  CLEANUP
  ============================================================
  */

  useEffect(() => {
    return () => {
      clearAutoSlide();
    };
  }, [clearAutoSlide]);

  /*
  ============================================================
  CUSTOM CURSOR
  ============================================================
  */

  const handlePointerMove = (event) => {
    if (!sliderStartedRef.current) return;

    const slider = sliderRef.current;
    const cursor = cursorRef.current;

    if (!slider || !cursor) return;

    const rect = slider.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const isLeft = x < rect.width / 2;

    setCursorText(
      isLeft ? "PREVIOUS" : "NEXT"
    );

    gsap.to(cursor, {
      x,
      y,
      duration: 0.22,
      ease: "power3.out",
    });
  };

  /*
  ============================================================
  CURSOR ENTER
  ============================================================
  */

  const handlePointerEnter = () => {
    if (!sliderStartedRef.current) return;

    gsap.to(cursorRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.25,
      ease: "power3.out",
    });
  };

  /*
  ============================================================
  CURSOR LEAVE
  ============================================================
  */

  const handlePointerLeave = () => {
    gsap.to(cursorRef.current, {
      opacity: 0,
      scale: 0.7,
      duration: 0.25,
      ease: "power3.out",
    });
  };

  /*
  ============================================================
  SLIDER CLICK
  ============================================================
  */

  const handleSliderClick = (event) => {
    if (!sliderStartedRef.current) return;

    const slider = sliderRef.current;

    if (!slider) return;

    const rect = slider.getBoundingClientRect();

    const x = event.clientX - rect.left;

    /*
    LEFT = PREVIOUS
    RIGHT = NEXT
    */

    if (x < rect.width / 2) {
      changeSlide(
        currentRef.current - 1,
        "previous"
      );
    } else {
      changeSlide(
        currentRef.current + 1,
        "next"
      );
    }
  };

  /*
  ============================================================
  CURRENT SLIDE
  ============================================================
  */

  const currentSlide = slides[current];

  /*
  ============================================================
  JSX
  ============================================================
  */

  return (
    <section
      className="spotlight-section"
      ref={sectionRef}
    >
      {/* =====================================================
          PROJECT SLIDER
      ====================================================== */}

      <div
        className="projects-slider-layer"
        ref={sliderRef}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={handleSliderClick}
      >
        {/* ===================================================
            CUSTOM CURSOR
        ==================================================== */}

        <div
          className="project-custom-cursor"
          ref={cursorRef}
        >
          <span>{cursorText}</span>
        </div>

        {/* ===================================================
            CURRENT SLIDE
        ==================================================== */}

        <div
          className="project-slide"
          ref={slideRef}
        >
          {/* BACKGROUND IMAGE */}

          <img
            src={currentSlide.image}
            alt={currentSlide.title}
            className="project-background-image"
          />

          {/* DARK OVERLAY */}

          <div className="project-dark-overlay" />

          {/* =================================================
              CENTER PROGRESS LINE
          ================================================== */}

          <div className="project-center-line">
            <div
              className="project-progress-line"
              ref={progressRef}
            />
          </div>

          {/* =================================================
              LEFT HIGHLIGHT
          ================================================== */}

          <div className="project-highlight project-animate">
            <span>Highlight</span>
            <span>projects</span>
          </div>

          {/* =================================================
              MAIN TITLE
          ================================================== */}

          <div className="project-title-wrap">
            <h2 className="project-title project-animate">
              {currentSlide.title}
            </h2>
          </div>

          {/* =================================================
              CATEGORY
          ================================================== */}

          <div className="project-category project-animate">
            {currentSlide.category}
          </div>

          {/* =================================================
              LOCATION
          ================================================== */}

          <div className="project-location project-animate">
            {currentSlide.location}
          </div>

          {/* =================================================
              DESCRIPTION
          ================================================== */}

          <p className="project-description project-animate">
            {currentSlide.description}
          </p>

          {/* =================================================
              VIEW BUTTON
          ================================================== */}

          <button
            className="project-view-button project-animate"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            VIEW OUR WORK
          </button>
        </div>
      </div>

      {/* =====================================================
          LIME COVER
      ====================================================== */}

      <div
        className="spotlight-cover"
        ref={coverRef}
      >
        <div className="spotlight-content">
          <h2
            className="spotlight-title"
            style={{
              "--text-image": `url(${spotlightImage})`,
            }}
          >
            <span>Designed to be</span>
            <span>remembered.</span>
            <span>We build experiences</span>
            <span>that audiences feel,</span>
            <span>not just attend.</span>
          </h2>
        </div>
      </div>
    </section>
  );
}