import { useLayoutEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./SelectedWork.css";

gsap.registerPlugin(ScrollTrigger);

export default function SelectedWork() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const plusRef = useRef(null);

  const projects = [
    {
      image: "/myworker-ai.jpeg",
      title: "MyWorker AI",
      description: (
        <>
          AI platform simplifying hiring,
          <br className="swx5-desktop-break" />
          management, and workforce scaling.
        </>
      ),
    },

    {
      image: "/myworker-ai.jpeg",
      title: "Second Project",
      description: (
        <>
          Intelligent platform simplifying
          <br className="swx5-desktop-break" />
          modern workforce management.
        </>
      ),
    },

    {
      image: "/mytask-ai.jpeg",
      title: "Loftloom",
      description: (
        <>
          Seamless real estate platform for
          <br className="swx5-desktop-break" />
          effortless property discovery.
        </>
      ),
    },
  ];

  /* =========================================================
     HORIZONTAL SCROLL
  ========================================================= */

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const plus = plusRef.current;

    if (!section || !track || !plus) return;

    const ctx = gsap.context(() => {
      let horizontalDistance = 0;

      /* =====================================================
         INITIAL HOLD
      ===================================================== */

      const getHoldDistance = () => {
        return window.innerHeight * 1.05;
      };

      /* =====================================================
         CALCULATE DIMENSIONS
      ===================================================== */

      const calculateDimensions = () => {
        horizontalDistance = Math.max(0, track.scrollWidth - window.innerWidth);

        const holdDistance = getHoldDistance();

        section.style.height = `${
          window.innerHeight + holdDistance + horizontalDistance
        }px`;
      };

      calculateDimensions();

      /* =====================================================
         INITIAL STATE
      ===================================================== */

      gsap.set(track, {
        x: 0,
      });

      gsap.set(plus, {
        rotation: 0,
      });

      /* =====================================================
         SCROLL TRIGGER
      ===================================================== */

      const scrollTrigger = ScrollTrigger.create({
        trigger: section,

        start: "top top",

        end: () => {
          return `+=${section.offsetHeight - window.innerHeight}`;
        },

        scrub: 1,

        invalidateOnRefresh: true,

        /* =================================================
             SCROLL UPDATE
          ================================================= */

        onUpdate: (self) => {
          const totalScroll = Math.max(
            1,
            section.offsetHeight - window.innerHeight,
          );

          const currentScroll = self.progress * totalScroll;

          const holdDistance = getHoldDistance();

          /* ===============================================
               PHASE 1
               SELECTED WORK STAYS COMPLETELY STILL
            =============================================== */

          if (currentScroll <= holdDistance) {
            gsap.set(track, {
              x: 0,
            });

            gsap.set(plus, {
              rotation: 0,
            });

            return;
          }

          /* ===============================================
               PHASE 2
               HORIZONTAL MOVEMENT
            =============================================== */

          const horizontalScroll = currentScroll - holdDistance;

          const horizontalProgress = Math.min(
            1,
            horizontalScroll / Math.max(1, horizontalDistance),
          );

          /* ===============================================
               MOVE ENTIRE TRACK
            =============================================== */

          gsap.set(track, {
            x: -horizontalDistance * horizontalProgress,
          });

          /* ===============================================
               ROTATE PLUS
            =============================================== */

          gsap.set(plus, {
            rotation: 360 * horizontalProgress,
          });
        },

        /* =================================================
             GOING BACK UP
          ================================================= */

        onLeaveBack: () => {
          gsap.set(track, {
            x: 0,
          });

          gsap.set(plus, {
            rotation: 0,
          });
        },
      });

      /* =====================================================
         RESIZE
      ===================================================== */

      const handleResize = () => {
        gsap.set(track, {
          x: 0,
        });

        gsap.set(plus, {
          rotation: 0,
        });

        calculateDimensions();

        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);

      /* =====================================================
         INITIAL REFRESH
      ===================================================== */

      requestAnimationFrame(() => {
        calculateDimensions();

        ScrollTrigger.refresh();

        gsap.set(track, {
          x: 0,
        });

        gsap.set(plus, {
          rotation: 0,
        });
      });

      return () => {
        window.removeEventListener("resize", handleResize);

        scrollTrigger.kill();
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  /* =========================================================
     LINK HOVER
  ========================================================= */

  const handleEnter = (e) => {
    const link = e.currentTarget;

    const text = link.querySelector(".swx5-link-text");

    const arrow = link.querySelector(".swx5-link-arrow");

    if (!text || !arrow) return;

    gsap.to(text, {
      x: 16,
      duration: 0.4,
      ease: "power3.out",
    });

    gsap.to(arrow, {
      x: -16,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleLeave = (e) => {
    const link = e.currentTarget;

    const text = link.querySelector(".swx5-link-text");

    const arrow = link.querySelector(".swx5-link-arrow");

    if (!text || !arrow) return;

    gsap.to(text, {
      x: 0,
      duration: 0.4,
      ease: "power3.out",
    });

    gsap.to(arrow, {
      x: 0,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  return (
    <section ref={sectionRef} className="swx5-section" data-sound-section>
      {/* ===================================================
          PLUS
      =================================================== */}

      <div ref={plusRef} className="swx5-plus">
        +
      </div>

      {/* ===================================================
          HORIZONTAL TRACK
      =================================================== */}

      <div ref={trackRef} className="swx5-track">
        {/* =================================================
            FIRST SELECTED WORK PANEL
        ================================================= */}

        <div
          className="
            swx5-panel
            swx5-intro
          "
        >
          <div className="swx5-intro-content">
            <h2>
              Selected work
              <br />
              &amp; explorations
            </h2>

            <a
              href="#projects"
              className="swx5-view-link"
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
            >
              <span className="swx5-link-text">VIEW ALL PROJECTS</span>

              <span className="swx5-link-arrow">→</span>
            </a>
          </div>

          <div className="swx5-panel-line" />
        </div>

        {/* =================================================
            PROJECTS
        ================================================= */}

        {projects.map((project, index) => (
          <div
            key={index}
            className="
                swx5-panel
                swx5-project
              "
          >
            <div className="swx5-project-content">
              {/* IMAGE */}

              <div className="swx5-image">
                <img src={project.image} alt={project.title} />
              </div>

              {/* INFO */}

              <div className="swx5-info">
                <div className="swx5-copy">
                  <h3>{project.title}</h3>

                  <p>{project.description}</p>
                </div>

                <a
                  href="#project"
                  className="swx5-project-link"
                  onMouseEnter={handleEnter}
                  onMouseLeave={handleLeave}
                >
                  <span className="swx5-link-text">EXPLORE PROJECT</span>

                  <span className="swx5-link-arrow">→</span>
                </a>
              </div>
            </div>

            <div className="swx5-panel-line" />
          </div>
        ))}

        {/* =================================================
            LAST SELECTED WORK PANEL
            YE HORIZONTAL SCROLL KA PART HAI
        ================================================= */}

        <div
          className="
            swx5-panel
            swx5-intro
            swx5-ending
          "
        >
          <div className="swx5-intro-content">
            <h2>
              Discover our complete collection of digital
              <br />
              experiences,brands & platforms.
            </h2>

            <a
              href="#projects"
              className="swx5-view-link"
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
            >
              <span className="swx5-link-text">VIEW ALL PROJECTS</span>

              <span className="swx5-link-arrow">→</span>
            </a>
          </div>

          <div className="swx5-panel-line" />
        </div>
      </div>
    </section>
  );
}
