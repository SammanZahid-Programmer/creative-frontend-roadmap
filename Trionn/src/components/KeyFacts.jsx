import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./KeyFacts.css";
gsap.registerPlugin(ScrollTrigger);
export default function KeyFacts() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const leftCardRef = useRef(null);
  const centerCardRef = useRef(null);
  const rightCardRef = useRef(null);
  const leftVideoRef = useRef(null);
  const rightVideoRef = useRef(null);
  const awardImages = [
    "/award-1.svg",
    "/award-2.svg",
    "/award-3.svg",
    "/award-4.svg",
  ];
  /* =========================================================
     KEY FACTS SCROLL ANIMATION
  ========================================================= */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const heading = headingRef.current;
    const left = leftCardRef.current;
    const center = centerCardRef.current;
    const right = rightCardRef.current;
    if (!heading || !left || !center || !right) return;
    const ctx = gsap.context(() => {
      /* =====================================================
         INITIAL STATE
      ===================================================== */
      gsap.set(heading, {
        y: 0,
        opacity: 1,
      });
      gsap.set(left, {
        yPercent: 110,
        rotate: -1.5,
        scale: 0.97,
      });
      gsap.set(center, {
        yPercent: 120,
        rotate: 1.2,
        scale: 0.965,
      });
      gsap.set(right, {
        yPercent: 130,
        rotate: -1.2,
        scale: 0.96,
      });
      /* =====================================================
         MAIN PINNED TIMELINE
      ===================================================== */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=3300",
          pin: true,
          scrub: 1.15,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      /* =====================================================
         1. HEADING MOVES UP
      ===================================================== */
      tl.to(heading, {
        y: -180,
        opacity: 0,
        duration: 0.9,
        ease: "power2.inOut",
      });
      /* =====================================================
         2. LEFT CARD ENTERS
      ===================================================== */
      tl.to(left, {
        yPercent: 0,
        rotate: 0,
        scale: 1,
        duration: 1.15,
        ease: "power3.out",
      });
      
      tl.to(left, {
        yPercent: -5,
        rotate: -0.5,
        scale: 0.985,
        duration: 0.45,
        ease: "power2.inOut",
      });
      /* =====================================================
         3. CENTER CARD ENTERS
      ===================================================== */
      tl.to(
        center,
        {
          yPercent: 0,
          rotate: 0,
          scale: 1,
          duration: 1.15,
          ease: "power3.out",
        },
        "<0.10",
      );
      
      tl.to(center, {
        yPercent: -5,
        rotate: 0.5,
        scale: 0.985,
        duration: 0.45,
        ease: "power2.inOut",
      });
      /* =====================================================
         4. RIGHT CARD ENTERS
      ===================================================== */
      tl.to(
        right,
        {
          yPercent: 0,
          rotate: 0,
          scale: 1,
          duration: 1.15,
          ease: "power3.out",
        },
        "<0.10",
      );
      /* =====================================================
         5. FINAL SETTLE
      ===================================================== */
      tl.to([left, center, right], {
        yPercent: 0,
        rotate: 0,
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      });
      
      tl.to(
        {},
        {
          duration: 0.35,
        },
      );
    }, section);
    return () => {
      ctx.revert();
    };
  }, []);
  /* =========================================================
     LEFT BACKGROUND VIDEO
  ========================================================= */
  useEffect(() => {
    const video = leftVideoRef.current;
    if (!video) return;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.play().catch(() => {});
    return () => {
      video.pause();
    };
  }, []);
  /* =========================================================
     LEFT CARD IMAGE ROTATION
  ========================================================= */
  useEffect(() => {
    const images = document.querySelectorAll(".keyfacts-award-image");
    if (!images.length) return;
    let current = 0;
    images.forEach((image, index) => {
      image.classList.toggle("is-active", index === 0);
    });
    const interval = setInterval(() => {
      images[current].classList.remove("is-active");
      current = (current + 1) % images.length;
      images[current].classList.add("is-active");
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  /* =========================================================
     RIGHT VIDEO
  ========================================================= */
  useEffect(() => {
    const card = rightCardRef.current;
    const video = rightVideoRef.current;
    if (!card || !video) return;
    video.muted = true;
    video.loop = false;
    video.playsInline = true;
    let hasPlayed = false;
    const playFromStart = () => {
      try {
        video.currentTime = 0;
      } catch {}
      video.play().catch(() => {});
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!hasPlayed) {
              hasPlayed = true;
              playFromStart();
            }
          } else {
            hasPlayed = false;
            video.pause();
          }
        });
      },
      {
        threshold: 0.45,
      },
    );
    observer.observe(card);
    const hoverPlay = () => {
      playFromStart();
    };
    card.addEventListener("mouseenter", hoverPlay);
    return () => {
      observer.disconnect();
      card.removeEventListener("mouseenter", hoverPlay);
      video.pause();
    };
  }, []);
  /* =========================================================
     NAVBAR COLOR
     NORMAL:
     - Logo/Text = WHITE
     - Let's Talk = BLACK text / WHITE background
     KEY FACTS:
     - Logo/Text = BLACK
     - Let's Talk = WHITE text / BLACK background
  ========================================================= */
  useEffect(() => {
    const section = sectionRef.current;
    const navbar = document.querySelector(".navbar");
    if (!section || !navbar) return;
    const updateNavbarColor = () => {
      const sectionRect = section.getBoundingClientRect();
      /*
        KeyFacts section active jab uska
        koi bhi part viewport ke andar ho.
      */
      const isKeyFactsActive =
        sectionRect.top < window.innerHeight && sectionRect.bottom > 0;
      navbar.classList.remove("keyfacts-navbar-dark", "keyfacts-navbar-light");
      if (isKeyFactsActive) {
        navbar.classList.add("keyfacts-navbar-dark");
      } else {
        navbar.classList.add("keyfacts-navbar-light");
      }
    };
    let frame = null;
    const handleScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        updateNavbarColor();
        frame = null;
      });
    };
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    window.addEventListener("resize", updateNavbarColor);
    updateNavbarColor();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateNavbarColor);
      if (frame) {
        cancelAnimationFrame(frame);
      }
      navbar.classList.remove("keyfacts-navbar-dark", "keyfacts-navbar-light");
    };
  }, []);
  /* =========================================================
     BLUE X-RAY MASK EFFECT
  ========================================================= */
  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    const video = rightVideoRef.current;
    const card = rightCardRef.current;
    if (!navbar || !video || !card) return;
    const xray = card.querySelector(".keyfacts-xray");
    if (!xray) return;
    const scanMask = () => {
      const videoRect = video.getBoundingClientRect();
      const maskLeft = videoRect.left + videoRect.width * 0.29;
      const maskRight = videoRect.left + videoRect.width * 0.71;
      const maskTop = videoRect.top + videoRect.height * 0.02;
      const maskBottom = videoRect.top + videoRect.height * 0.54;
      const elements = navbar.querySelectorAll(
        ".brand-symbol, .brand-name, .sound-button, .talk-button, .menu-button",
      );
      let active = false;
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const insideMask =
          centerX >= maskLeft &&
          centerX <= maskRight &&
          centerY >= maskTop &&
          centerY <= maskBottom;
        if (insideMask) {
          active = true;
          const x = ((centerX - maskLeft) / (maskRight - maskLeft)) * 100;
          const y = ((centerY - maskTop) / (maskBottom - maskTop)) * 100;
          xray.style.left = `${x}%`;
          xray.style.top = `${y}%`;
        }
      });
      xray.classList.toggle("is-active", active);
    };
    let frame = null;
    const handleScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        scanMask();
        frame = null;
      });
    };
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    window.addEventListener("resize", scanMask);
    scanMask();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", scanMask);
      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, []);
  /* =========================================================
     RENDER
  ========================================================= */
  return (
    <>
      {/* =====================================================
          KEY FACTS
      ===================================================== */}
      <section ref={sectionRef} className="keyfacts-section">
        {/* ===================================================
            KEY FACTS HEADING
        =================================================== */}
        <div ref={headingRef} className="keyfacts-heading">
          <h1>Key facts</h1>
          <p>A snapshot of our experience and impact.</p>
        </div>
        {/* ===================================================
            CARDS
        =================================================== */}
        <div className="keyfacts-stage">
          <div className="keyfacts-cards">
            {/* =================================================
                LEFT CARD
            ================================================= */}
            <article
              ref={leftCardRef}
              className="
                keyfacts-card
                keyfacts-card-left
              "
            >
              <video
                ref={leftVideoRef}
                className="keyfacts-left-video"
                src="/left-card-video.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
              <div className="keyfacts-overlay" />
              <div className="keyfacts-card-title">FEATURED &amp; AWARDS</div>
              <div className="keyfacts-award-images">
                {awardImages.map((image, index) => (
                  <img
                    key={image}
                    src={image}
                    alt=""
                    className={`
                        keyfacts-award-image
                        ${index === 0 ? "is-active" : ""}
                      `}
                  />
                ))}
              </div>
              <div className="keyfacts-bottom">
                <p>
                  Featured on top design
                  <br />
                  platforms worldwide.
                </p>
                <div className="keyfacts-number">
                  50<span>+</span>
                </div>
              </div>
            </article>
            {/* =================================================
                CENTER CARD
            ================================================= */}
            <article
              ref={centerCardRef}
              className="
                keyfacts-card
                keyfacts-card-center
              "
            >
              <div className="keyfacts-card-title">PROJECTS COMPLETED</div>
              <div className="keyfacts-circle">
                <span>
                  1.5K<span>+</span>
                </span>
              </div>
              <p className="keyfacts-center-copy">
                90% of our clients seek our
                <br />
                services for a second project.
              </p>
            </article>
            {/* =================================================
                RIGHT CARD
            ================================================= */}
            <article
              ref={rightCardRef}
              className="
                keyfacts-card
                keyfacts-card-right
              "
            >
              <div className="keyfacts-card-title">OUR TEAM MEMBERS</div>
              <div className="keyfacts-right-video">
                <video
                  ref={rightVideoRef}
                  src="/team-video.mp4"
                  muted
                  playsInline
                  preload="auto"
                />
                <div className="keyfacts-xray">
                  <div className="keyfacts-xray-ring" />
                  <div className="keyfacts-xray-line" />
                  <div className="keyfacts-xray-glow" />
                </div>
              </div>
              <div className="keyfacts-bottom">
                <p>
                  Different skills.
                  <br />
                  One standard.
                </p>
                <div className="keyfacts-number">
                  20<span>+</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
      {/* =====================================================
          BUSINESS PARTNERS
      ===================================================== */}
      <section className="business-partners-section">
        <div className="business-partners-inner">
          <div className="business-partners-title">OUR BUSINESS PARTNERS</div>
          <div className="business-partners-row">
            <div className="partner-credible">credible</div>
            <div className="partner-yellowtail">Yellowtail</div>
            <div className="partner-luxury">
              <span className="luxury-symbol">ϕ</span>
              <span>
                LUXURY
                <br />
                PRESENCE
              </span>
            </div>
            <div className="partner-technis">technis</div>
            <div className="partner-ockto">
              <span className="ockto-symbol">⬡</span>
              OCKTO
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
