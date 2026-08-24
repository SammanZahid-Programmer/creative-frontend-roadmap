import {
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./ServicesReveal.css";

import bgVideo from "/services-bg.mp4";
import bgSound from "/services-sound.mp3";

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   ROCK IMAGES
========================================================= */

const rockImages = Array.from(
  { length: 65 },
  (_, index) => {
    const number = String(index + 1).padStart(2, "0");

    return `/services/rock-${number}_no_bg.png`;
  }
);

/* =========================================================
   SERVICE CARDS
========================================================= */

const serviceCards = [
  {
    side: "left",
    title: "Web\nDevelopment",
    text:
      "Custom web development delivered with a product-focused, design-conscious approach.",
    image: "/services/web-development.svg",
  },

  {
    side: "right",
    title: "Branding",
    text:
      "Impactful branding positions startups for success through credibility, clarity, and lasting loyalty.",
    image: "/services/branding.svg",
  },

  {
    side: "left",
    title: "Product\nDesign",
    text:
      "Thoughtful product design that captures attention, deepens engagement, and builds lasting loyalty.",
    image: "/services/product-design.svg",
  },

  {
    side: "right",
    title: "WordPress\nDevelopment",
    text:
      "WordPress development focused on performance, clarity, and experiences that convert visitors into loyal users.",
    image: "/services/wordpress.svg",
  },

  {
    side: "left",
    title: "AI\nSolutions",
    text:
      "Intelligent digital solutions designed to create useful, scalable, and meaningful experiences.",
    image: "/services/ai.svg",
  },

  {
    side: "right",
    title: "Digital\nStrategy",
    text:
      "Clear strategy that connects ideas, technology, and design into one focused direction.",
    image: "/services/strategy.svg",
  },
];

export default function ServicesReveal({
  soundOn,
}) {
  const sectionRef = useRef(null);

  const videoRef = useRef(null);
  const audioRef = useRef(null);

  const whiteLayerRef = useRef(null);
  const darkLayerRef = useRef(null);

  const firstContentRef = useRef(null);
  const secondContentRef = useRef(null);

  const labelRef = useRef(null);

  const firstBottomRef = useRef(null);
  const secondBottomRef = useRef(null);

  const rockRefs = useRef([]);
  const cardRefs = useRef([]);

  const audioStartedRef = useRef(false);

  /* =========================================================
     SOUND CONTROL
  ========================================================= */

  useEffect(() => {
    const audio = audioRef.current;
    const section = sectionRef.current;

    if (!audio || !section) return;

    const rect =
      section.getBoundingClientRect();

    const isVisible =
      rect.top < window.innerHeight &&
      rect.bottom > 0;

    if (soundOn && isVisible) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [soundOn]);

  /* =========================================================
     MAIN GSAP
  ========================================================= */

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const video = videoRef.current;
      const audio = audioRef.current;

      const rocks =
        rockRefs.current.filter(Boolean);

      const cards =
        cardRefs.current.filter(Boolean);

      /* =====================================================
         INITIAL STATES
      ===================================================== */

      gsap.set(
        whiteLayerRef.current,
        {
          opacity: 1,
        }
      );

      gsap.set(
        darkLayerRef.current,
        {
          opacity: 0,
        }
      );

      gsap.set(
        videoRef.current,
        {
          opacity: 0,
        }
      );

      gsap.set(
        firstContentRef.current,
        {
          opacity: 1,
          y: 0,
        }
      );

      gsap.set(
        secondContentRef.current,
        {
          opacity: 0,
          y: 30,
          scale: 1,
        }
      );

      gsap.set(
        firstBottomRef.current,
        {
          opacity: 1,
          y: 0,
        }
      );

      gsap.set(
        secondBottomRef.current,
        {
          opacity: 0,
          y: 20,
        }
      );

      gsap.set(
        rocks,
        {
          autoAlpha: 0,
          yPercent: -125,
          scale: 1,
          rotation: 0,
        }
      );

      /* =====================================================
         CARD INITIAL STATES

         DESKTOP:
         LEFT  → BELOW SCREEN
         RIGHT → ABOVE SCREEN

         MOBILE:
         SAME ANIMATION VALUES.
         CSS ONLY CHANGES THEIR POSITION/SIZE.
      ===================================================== */

      cards.forEach((card, index) => {
        const cardData =
          serviceCards[index];

        gsap.set(card, {
          autoAlpha: 0,

          xPercent:
            cardData.side === "left"
              ? -130
              : 130,

          yPercent:
            cardData.side === "left"
              ? 130
              : -130,

          scale: 0.88,

          rotation:
            cardData.side === "left"
              ? -3
              : 3,
        });
      });

      /* =====================================================
         VIDEO
      ===================================================== */

      if (video) {
        video.muted = true;
        video.loop = true;
        video.playsInline = true;

        video.play().catch(() => {});
      }

      /* =====================================================
         AUDIO
      ===================================================== */

      const startAudio = () => {
        if (!audio || !soundOn) return;

        audio.loop = true;
        audio.volume = 0.55;

        audio
          .play()
          .then(() => {
            audioStartedRef.current = true;
          })
          .catch(() => {
            audioStartedRef.current = false;
          });
      };

      const stopAudio = () => {
        if (!audio) return;

        audio.pause();
        audio.currentTime = 0;

        audioStartedRef.current = false;
      };

      /* =====================================================
         SCROLL LENGTH
      ===================================================== */

      const pixelsPerRock = 55;

      const transitionSpace = 1500;

      const cardScrollSpace = 3400;

      const totalScroll =
        transitionSpace +
        rocks.length * pixelsPerRock +
        cardScrollSpace;

      /* =====================================================
         MASTER TIMELINE
      ===================================================== */

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,

          start: "top top",

          end: () =>
            `+=${totalScroll}`,

          pin: true,

          pinSpacing: true,

          scrub: 1.15,

          anticipatePin: 1,

          invalidateOnRefresh: true,

          onEnter: () => {
            if (video) {
              video
                .play()
                .catch(() => {});
            }

            startAudio();
          },

          onEnterBack: () => {
            if (video) {
              video
                .play()
                .catch(() => {});
            }

            startAudio();
          },

          onLeave: () => {
            stopAudio();

            if (video) {
              video.pause();
            }
          },

          onLeaveBack: () => {
            stopAudio();

            if (video) {
              video.pause();
            }
          },
        },
      });

      /* =====================================================
         PHASE 1
         WHITE → VIDEO
      ===================================================== */

      masterTl.to(
        whiteLayerRef.current,
        {
          opacity: 0,
          duration: 1.15,
          ease: "power2.inOut",
        },
        0
      );

      masterTl.to(
        darkLayerRef.current,
        {
          opacity: 1,
          duration: 1.2,
          ease: "power2.inOut",
        },
        0
      );

      masterTl.to(
        videoRef.current,
        {
          opacity: 1,
          duration: 1.25,
          ease: "power2.inOut",
        },
        0.05
      );

      /* =====================================================
         LABEL COLOR
      ===================================================== */

      masterTl.to(
        labelRef.current,
        {
          color: "#ffffff",
          duration: 0.7,
          ease: "power1.out",
        },
        0.35
      );

      /* =====================================================
         FIRST CONTENT OUT
      ===================================================== */

      masterTl.to(
        firstContentRef.current,
        {
          opacity: 0,
          y: -35,
          duration: 0.9,
          ease: "power2.inOut",
        },
        0.1
      );

      masterTl.to(
        firstBottomRef.current,
        {
          opacity: 0,
          y: -20,
          duration: 0.8,
          ease: "power2.inOut",
        },
        0.15
      );

      /* =====================================================
         SECOND CONTENT IN
      ===================================================== */

      masterTl.to(
        secondContentRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        },
        0.65
      );

      masterTl.to(
        secondBottomRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
        },
        0.8
      );

      /* =====================================================
         ROCK SEQUENCE
         COMPLETELY UNCHANGED
      ===================================================== */

      const rockStart = 1.2;

      const rockStep = 0.055;

      const firstRock = rocks[0];

      if (firstRock) {
        masterTl.fromTo(
          firstRock,
          {
            autoAlpha: 0,
            yPercent: -125,
            scale: 1.015,
          },
          {
            autoAlpha: 1,
            yPercent: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          rockStart
        );
      }

      rocks.forEach((rock, index) => {
        if (index === 0) return;

        const previousRock =
          rocks[index - 1];

        const position =
          rockStart +
          index * rockStep;

        masterTl.set(
          rock,
          {
            autoAlpha: 1,
            yPercent: 0,
            scale: 1,
            rotation: 0,
          },
          position
        );

        masterTl.to(
          previousRock,
          {
            autoAlpha: 0,
            duration: 0.045,
            ease: "none",
          },
          position + 0.01
        );

        masterTl.to(
          rock,
          {
            yPercent: 0.9,
            duration:
              rockStep + 0.02,
            ease: "none",
          },
          position
        );
      });

      /* =====================================================
         LAST ROCK HOLD
      ===================================================== */

      const lastRock =
        rocks[rocks.length - 1];

      const lastRockPosition =
        rockStart +
        (rocks.length - 1) *
          rockStep;

      if (lastRock) {
        masterTl.to(
          lastRock,
          {
            autoAlpha: 1,
            yPercent: 8,
            scale: 1,
            duration: 0.8,
            ease: "none",
          },
          lastRockPosition
        );
      }

      /* =====================================================
         CENTER HEADING DISAPPEARS
      ===================================================== */

      const cardSequenceStart =
        lastRockPosition + 0.65;

      masterTl.to(
        secondContentRef.current,
        {
          autoAlpha: 0,
          y: -55,
          scale: 0.96,
          duration: 0.9,
          ease: "power2.inOut",
        },
        cardSequenceStart
      );

      masterTl.to(
        secondBottomRef.current,
        {
          autoAlpha: 0,
          y: 25,
          duration: 0.7,
          ease: "power2.inOut",
        },
        cardSequenceStart + 0.1
      );

      masterTl.to(
        labelRef.current,
        {
          opacity: 0.5,
          duration: 0.7,
        },
        cardSequenceStart + 0.1
      );

      /* =====================================================
         CARD ANIMATION
         SAME AS YOUR ORIGINAL
      ===================================================== */

      const pairs = [
        [0, 1],
        [2, 3],
        [4, 5],
      ];

      const pairDuration = 2.3;

      pairs.forEach(
        (pair, pairIndex) => {
          const pairStart =
            cardSequenceStart +
            1.05 +
            pairIndex * pairDuration;

          const leftCard =
            cards[pair[0]];

          const rightCard =
            cards[pair[1]];

          /* =================================================
             LEFT CARD

             BOTTOM → CENTER → TOP
          ================================================= */

          if (leftCard) {
            masterTl.to(
              leftCard,
              {
                autoAlpha: 1,
                xPercent: 0,
                yPercent: 0,
                scale: 1,
                rotation: 0,
                duration: 0.8,
                ease: "power3.out",
              },
              pairStart
            );

            masterTl.to(
              leftCard,
              {
                xPercent: -125,
                yPercent: -125,
                scale: 0.82,
                rotation: -2,
                duration: 1.05,
                ease: "power2.inOut",
              },
              pairStart + 0.8
            );

            masterTl.to(
              leftCard,
              {
                autoAlpha: 0,
                duration: 0.3,
                ease: "none",
              },
              pairStart + 1.7
            );
          }

          /* =================================================
             RIGHT CARD

             TOP → CENTER → BOTTOM
          ================================================= */

          if (rightCard) {
            masterTl.to(
              rightCard,
              {
                autoAlpha: 1,
                xPercent: 0,
                yPercent: 0,
                scale: 1,
                rotation: 0,
                duration: 0.8,
                ease: "power3.out",
              },
              pairStart
            );

            masterTl.to(
              rightCard,
              {
                xPercent: 125,
                yPercent: 125,
                scale: 0.82,
                rotation: 2,
                duration: 1.05,
                ease: "power2.inOut",
              },
              pairStart + 0.8
            );

            masterTl.to(
              rightCard,
              {
                autoAlpha: 0,
                duration: 0.3,
                ease: "none",
              },
              pairStart + 1.7
            );
          }
        }
      );

      /* =====================================================
         FINAL ROCK STAYS
      ===================================================== */

      const finalEnd =
        cardSequenceStart +
        pairs.length * pairDuration +
        0.5;

      if (lastRock) {
        masterTl.to(
          lastRock,
          {
            yPercent: 9,
            duration: 0.5,
            ease: "none",
          },
          finalEnd - 0.5
        );
      }

      /* =====================================================
         AUDIO FALLBACK
      ===================================================== */

      const tryAudio = () => {
        if (!soundOn) return;

        const rect =
          section.getBoundingClientRect();

        const isInside =
          rect.top <
            window.innerHeight &&
          rect.bottom > 0;

        if (
          isInside &&
          !audioStartedRef.current
        ) {
          startAudio();
        }
      };

      window.addEventListener(
        "pointerdown",
        tryAudio
      );

      window.addEventListener(
        "wheel",
        tryAudio,
        {
          passive: true,
        }
      );

      window.addEventListener(
        "touchstart",
        tryAudio,
        {
          passive: true,
        }
      );

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

      return () => {
        window.removeEventListener(
          "pointerdown",
          tryAudio
        );

        window.removeEventListener(
          "wheel",
          tryAudio
        );

        window.removeEventListener(
          "touchstart",
          tryAudio
        );

        stopAudio();

        if (video) {
          video.pause();
        }
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, [soundOn]);

  return (
    <section
      ref={sectionRef}
      className="srvx7-section"
    >
      {/* VIDEO */}

      <video
        ref={videoRef}
        className="srvx7-video"
        src={bgVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* DARK OVERLAY */}

      <div
        ref={darkLayerRef}
        className="srvx7-dark-layer"
      />

      {/* WHITE INITIAL LAYER */}

      <div
        ref={whiteLayerRef}
        className="srvx7-white-layer"
      />

      {/* AUDIO */}

      <audio
        ref={audioRef}
        src={bgSound}
        loop
        preload="auto"
      />

      {/* TOP LABEL */}

      <div
        ref={labelRef}
        className="srvx7-label"
      >
        OUR SERVICES
      </div>

      {/* ROCK LAYER */}

      <div className="srvx7-rock-layer">
        {rockImages.map(
          (image, index) => (
            <img
              key={`${image}-${index}`}
              ref={(element) => {
                rockRefs.current[index] =
                  element;
              }}
              className="srvx7-rock"
              src={image}
              alt=""
              draggable="false"
            />
          )
        )}
      </div>

      {/* SERVICE CARDS */}

      <div className="srvx7-cards-layer">
        {serviceCards.map(
          (card, index) => (
            <article
              key={`${card.title}-${index}`}
              ref={(element) => {
                cardRefs.current[index] =
                  element;
              }}
              className={`
                srvx7-service-card
                srvx7-service-card-${card.side}
              `}
            >
              <div className="srvx7-card-image">
                <img
                  src={card.image}
                  alt=""
                  draggable="false"
                />
              </div>

              <div className="srvx7-card-content">
                <h3>
                  {card.title
                    .split("\n")
                    .map(
                      (
                        line,
                        lineIndex
                      ) => (
                        <span
                          key={lineIndex}
                        >
                          {line}
                        </span>
                      )
                    )}
                </h3>

                <p>
                  {card.text}
                </p>
              </div>
            </article>
          )
        )}
      </div>

      {/* FIRST CONTENT */}

      <div
        ref={firstContentRef}
        className="
          srvx7-content
          srvx7-content-first
        "
      >
        <h2>
          <span>AI.</span>
          <span>DESIGN</span>
          <span>DEVELOPMENT</span>
          <span>BRANDING</span>
        </h2>
      </div>

      {/* SECOND CONTENT */}

      <div
        ref={secondContentRef}
        className="
          srvx7-content
          srvx7-content-second
        "
      >
        <h2>
          <span>AI.</span>
          <span>DESIGN</span>
          <span>DEVELOPMENT</span>
          <span>BRANDING</span>
        </h2>
      </div>

      {/* FIRST BOTTOM */}

      <div
        ref={firstBottomRef}
        className="
          srvx7-bottom
          srvx7-bottom-first
        "
      >
        <div className="srvx7-bottom-center">
          <span className="srvx7-star">
            ✦
          </span>

          <span>
            DESIGN WITH INTENT.
            BUILT TO WORK.
          </span>
        </div>

        <a
          href="#services"
          className="srvx7-services-link"
        >
          <span>
            VIEW SERVICES
          </span>

          <span>→</span>
        </a>
      </div>

      {/* SECOND BOTTOM */}

      <div
        ref={secondBottomRef}
        className="
          srvx7-bottom
          srvx7-bottom-second
        "
      >
        <div className="srvx7-bottom-center">
          <span className="srvx7-star">
            ✦
          </span>

          <span>
            DIFFERENT DISCIPLINES.
            ONE DIRECTION.
          </span>
        </div>

        <a
          href="#services"
          className="srvx7-services-link"
        >
          <span>
            VIEW SERVICES
          </span>

          <span>→</span>
        </a>
      </div>
    </section>
  );
}