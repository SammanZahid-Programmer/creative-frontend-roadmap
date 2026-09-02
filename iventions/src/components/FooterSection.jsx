import { useEffect, useRef } from "react";
import "./FooterSection.css";

import iventionsWord from "../assets/images/iventions-logo.svg";

export default function FooterSection() {
  const sectionRef = useRef(null);
  const lightRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const light = lightRef.current;

    if (!section || !light) return;

    let targetX = 50;
    let currentX = 50;
    let animationFrame;

    const animate = () => {
      currentX += (targetX - currentX) * 0.08;

      light.style.setProperty("--light-x", `${currentX}%`);

      animationFrame = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event) => {
      const rect = section.getBoundingClientRect();

      const x = ((event.clientX - rect.left) / rect.width) * 100;

      targetX = Math.max(0, Math.min(100, x));
    };

    const handleMouseLeave = () => {
      targetX = 50;
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);

    animationFrame = requestAnimationFrame(animate);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);

      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section ref={sectionRef} className="footer-section">

      {/* =================================================
          BADGES
      ================================================= */}

      <div className="footer-badges">

        <div className="great-place-badge">
          <span>Great</span>
          <span>Place</span>
          <span>To</span>
          <span>Work.</span>

          <div className="badge-line"></div>

          <small>Certified</small>
        </div>

        <div className="cssda-badge">
          <strong>CSSDA</strong>

          <span>
            WEBSITE OF THE MONTH
          </span>

          <small>AWARDED</small>
        </div>

      </div>


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div className="footer-content">

        {/* LEFT */}

        <div className="footer-main">

          <h2 className="footer-title">
            Step into the
            <br />
            Spotlight
          </h2>

          <div className="footer-address">

            <p>
              Iventions International Events
              <br />
              Av. Diagonal 433, 4-2
              <br />
              Barcelona, Spain
              <br />
              +34 933 028 640
            </p>

            <p>
              19 Eastbourne Terrace,
              <br />
              London W2 6LG.
              <br />
              United Kingdom
              <br />
              +44 (0)7563 453 763
            </p>

          </div>

        </div>


        {/* RIGHT */}

        <div className="footer-navigation">

          <div className="footer-nav-column">

            <div className="footer-nav-label">
              EXPLORE
            </div>

            <nav>
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#events">Events</a>
              <a href="#exhibits">Exhibits</a>
              <a href="#congresses">Congresses</a>
              <a href="#sports">Sports</a>
              <a href="#work">Work</a>
              <a href="#insights">Insights</a>
              <a href="#contact">Contact</a>
            </nav>

          </div>


          <div className="footer-nav-column">

            <div className="footer-nav-label">
              CONNECT
            </div>

            <nav>
              <a href="#linkedin">LinkedIn</a>
              <a href="#instagram">Instagram</a>
            </nav>

          </div>

        </div>

      </div>


      {/* =================================================
          BOTTOM
      ================================================= */}

      <div className="footer-bottom">

        <div className="footer-legal">

          <a href="#cookies">
            COOKIE POLICY
          </a>

          <a href="#legal">
            LEGAL NOTICE &amp; TERMS OF USE
          </a>

          <a href="#privacy">
            PRIVACY POLICY
          </a>

        </div>

        <div className="footer-copyright">
          COPYRIGHT © IVENTIONS 2026
        </div>

      </div>


      {/* =================================================
          IVENTIONS WORD
      ================================================= */}

      <div className="footer-word-window">

        <img
          src={iventionsWord}
          alt="IVENTIONS"
          className="footer-word footer-word-dark"
        />

        <div
          ref={lightRef}
          className="iventions-light"
        >
          <img
            src={iventionsWord}
            alt=""
            className="footer-word footer-word-bright"
          />
        </div>

      </div>

    </section>
  );
}