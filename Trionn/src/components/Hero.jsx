import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import HeroScene from "./HeroScene";

const words = ["intention.", "impact.", "purpose."];

export default function Hero({ soundOn }) {
  const wordRef = useRef(null);
  const audioRef = useRef(null);
  const panelRef = useRef(null);

  const [panelOpen, setPanelOpen] = useState(false);
  const [toast, setToast] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    service: "",
    goals: "",
    budget: "",
  });

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
      index = (index + 1) % words.length;

      timeline
        .to(element, {
          opacity: 0,
          y: 12,
          filter: "blur(12px)",
          duration: 0.45,
          ease: "power2.in",
        })
        .call(() => {
          element.textContent = words[index];
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

    const interval = setInterval(changeWord, 3100);

    return () => {
      clearInterval(interval);
      timeline.kill();
    };
  }, []);

  /* =====================================================
     CTA HOVER
  ===================================================== */

  useEffect(() => {
    const links = document.querySelectorAll(".magnetic-link");

    const cleanups = [];

    links.forEach((link) => {
      const text = link.querySelector(".link-text");
      const arrow = link.querySelector(".link-arrow");

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

      link.addEventListener("mouseenter", enter);
      link.addEventListener("mouseleave", leave);

      cleanups.push(() => {
        link.removeEventListener("mouseenter", enter);
        link.removeEventListener("mouseleave", leave);
      });
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  /* =====================================================
     AUDIO
  ===================================================== */

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.loop = true;

    if (soundOn) {
      gsap.to(audio, {
        volume: 0.35,
        duration: 0.8,
        ease: "power2.out",
      });

      const playAudio = async () => {
        try {
          await audio.play();
        } catch (error) {
          console.log("Audio waiting for user interaction.");
        }
      };

      playAudio();
    } else {
      gsap.to(audio, {
        volume: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [soundOn]);

  /* =====================================================
     CLEAN AUDIO
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
     LOCK LANDING PAGE SCROLL

     Panel open:
     - background scroll lock
     - Lenis page scroll prevent
  ===================================================== */

  useEffect(() => {
    if (!panelOpen) {
      return;
    }

    const body = document.body;
    const html = document.documentElement;

    const previousBodyOverflow = body.style.overflow;
    const previousHtmlOverflow = html.style.overflow;

    body.classList.add("contact-panel-active");

    body.style.overflow = "hidden";
    html.style.overflow = "hidden";

    return () => {
      body.classList.remove("contact-panel-active");

      body.style.overflow = previousBodyOverflow;
      html.style.overflow = previousHtmlOverflow;
    };
  }, [panelOpen]);

  /* =====================================================
     ESC CLOSE
  ===================================================== */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setPanelOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  /* =====================================================
     STOP LENIS FROM TAKING PANEL SCROLL

     Native panel scrolling will continue.
     Event landing page tak nahi jayega.
  ===================================================== */

  const handlePanelWheel = (event) => {
    event.stopPropagation();
  };

  const handlePanelTouchMove = (event) => {
    event.stopPropagation();
  };

  const handlePanelPointerMove = (event) => {
    event.stopPropagation();
  };

  /* =====================================================
     OPEN PANEL
  ===================================================== */

  const openPanel = () => {
    setPanelOpen(true);

    requestAnimationFrame(() => {
      if (panelRef.current) {
        panelRef.current.scrollTop = 0;
      }
    });
  };

  /* =====================================================
     CLOSE PANEL
  ===================================================== */

  const closePanel = () => {
    setPanelOpen(false);
  };

  /* =====================================================
     HANDLE FORM INPUT
  ===================================================== */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* =====================================================
     FORM SUBMIT
  ===================================================== */

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = formData.fullName.trim();
    const email = formData.email.trim();
    const goals = formData.goals.trim();

    if (!name) {
      alert("Please enter your full name.");
      return;
    }

    if (!email) {
      alert("Please enter your email address.");
      return;
    }

    if (!formData.service) {
      alert("Please select a service.");
      return;
    }

    if (!goals) {
      alert("Please tell us about your project.");
      return;
    }

    if (!formData.budget) {
      alert("Please select your estimated budget.");
      return;
    }

    /*
      FORM DATA

      Abhi console mein ja raha hai.
      Yahan baad mein API / EmailJS connect
      kiya ja sakta hai.
    */

    console.log("Inquiry submitted:", formData);

    /* RESET FORM */

    setFormData({
      fullName: "",
      email: "",
      company: "",
      service: "",
      goals: "",
      budget: "",
    });

    /* SHOW TOAST */

    setToast(true);

    /* HIDE TOAST */

    setTimeout(() => {
      setToast(false);
    }, 4000);
  };

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
          mean <span ref={wordRef}>intention.</span>
        </h1>

        {/* =================================================
            CTA
        ================================================= */}

        <div className="hero-links">
          <button
            type="button"
            className="magnetic-link"
            onClick={openPanel}
          >
            <span className="link-text">
              DISCUSS YOUR PROJECT
            </span>

            <span className="link-arrow">
              →
            </span>
          </button>

          <button
            type="button"
            className="magnetic-link"
            onClick={openPanel}
          >
            <span className="link-text">
              BOOK A 30-MINUTE CALL
            </span>

            <span className="link-arrow">
              →
            </span>
          </button>
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
          Websites, AI products, brands, and systems built for clarity,
          scale and impact.
        </p>
      </div>

      {/* =================================================
          BOTTOM CENTER
      ================================================= */}

      <div className="hero-bottom-text">
        <span>HOLD TO</span>

         <img
    src="/blast-icon.svg"
    alt="Blast"
    className="blast-icon"
  />

        <span>BLAST</span>

        <br />

        <span>
          DARE ⚡ TO TOUCH THE LINES.
        </span>
      </div>

      {/* =================================================
          SCROLL
      ================================================= */}

      <div className="scroll-indicator">
        <span>↓</span>
      </div>

      {/* =================================================
          OVERLAY
      ================================================= */}

      <div
        className={`contact-overlay ${
          panelOpen ? "is-open" : ""
        }`}
        onClick={closePanel}
      />

      {/* =================================================
          SIDE CONTACT PANEL
      ================================================= */}

      <aside
        ref={panelRef}
        className={`contact-side-panel ${
          panelOpen ? "is-open" : ""
        }`}
        data-lenis-prevent
        data-lenis-prevent-wheel
        data-lenis-prevent-touch
        onWheelCapture={handlePanelWheel}
        onTouchMoveCapture={handlePanelTouchMove}
        onPointerMoveCapture={handlePanelPointerMove}
      >
        {/* =================================================
            CLOSE
        ================================================= */}

        <button
          type="button"
          className="contact-close"
          onClick={closePanel}
          aria-label="Close contact form"
        >
          ×
        </button>

        {/* =================================================
            HEADING
        ================================================= */}

        <h2>
          Let's build something great.
        </h2>

        <p className="contact-intro">
          Tell us about your project, we usually
          <br />
          reply within one business day.
        </p>

        {/* =================================================
            FORM
        ================================================= */}

        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >
          {/* FULL NAME */}

          <div className="form-field">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              minLength={2}
              maxLength={50}
              required
            />

            {/* <span className="field-counter">
              {formData.fullName.length}/50
            </span> */}
          </div>

          {/* EMAIL */}

          <div className="form-field">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              maxLength={100}
              required
            />

            <span className="field-counter">
              {/* {formData.email.length}/100 */}
            </span>
          </div>

          {/* COMPANY */}

          <div className="form-field">
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company / Website name"
              maxLength={100}
            />

            <span className="field-counter">
              {/* {formData.company.length}/100 */}
            </span>
          </div>

          {/* SERVICE */}

          <div className="contact-select-wrap">
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select a service
              </option>

              <option value="Web Design">
                Web Design
              </option>

              <option value="Development">
                Development
              </option>

              <option value="Branding">
                Branding
              </option>

              <option value="AI Solutions">
                AI Solutions
              </option>

              <option value="Other">
                Other
              </option>
            </select>

            <span className="select-arrow">
              ↓
            </span>
          </div>

          {/* PROJECT GOALS */}

          <div className="form-field form-textarea-field">
            <textarea
              name="goals"
              value={formData.goals}
              onChange={handleChange}
              placeholder="Share a little about your goals, timeline, and requirements..."
              minLength={10}
              maxLength={500}
              required
            />

            <span className="field-counter textarea-counter">
              {/* {formData.goals.length}/500 */}
            </span>
          </div>

          {/* BUDGET */}

          <div className="contact-select-wrap">
            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select your estimated budget
              </option>

              <option value="$1,000 - $5,000">
                $1,000 - $5,000
              </option>

              <option value="$5,000 - $10,000">
                $5,000 - $10,000
              </option>

              <option value="$10,000 - $25,000">
                $10,000 - $25,000
              </option>

              <option value="$25,000+">
                $25,000+
              </option>
            </select>

            <span className="select-arrow">
              ↓
            </span>
          </div>

          {/* SEND */}

          <button
            type="submit"
            className="send-inquiry"
          >
            <span>
              SEND INQUIRY
            </span>

            <span>
              →
            </span>
          </button>
        </form>

        {/* =================================================
            OR
        ================================================= */}

        <div className="contact-or">
          <span />

          <strong>
            OR
          </strong>

          <span />
        </div>

        {/* =================================================
            BOOK CALL
        ================================================= */}

        <button
          type="button"
          className="contact-call-button"
        >
          <span className="calendar-icon">
            ♧
          </span>

          <span>
            BOOK A 30-MINUTE CALL
          </span>
        </button>

        {/* =================================================
            EMAIL
        ================================================= */}

        <p className="contact-email">
          Prefer email? hello@trionn.com
        </p>
      </aside>

      {/* =================================================
          SUCCESS TOAST
      ================================================= */}

      <div
        className={`contact-toast ${
          toast ? "show" : ""
        }`}
      >
        <span className="toast-check">
          ✓
        </span>

        <div>
          <strong>
            Inquiry sent successfully!
          </strong>

          <p>
            We'll get back to you soon.
          </p>
        </div>
      </div>
    </main>
  );
}