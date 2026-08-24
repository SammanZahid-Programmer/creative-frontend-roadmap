import { useEffect, useRef } from "react";
import "./ContactFooter.css";

/* =========================================================
   CONTACT FOOTER
========================================================= */

function ContactFooter() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const handleMouseMove = (event) => {
      const rect = section.getBoundingClientRect();

      const x =
        ((event.clientX - rect.left) / rect.width - 0.5) * 2;

      const y =
        ((event.clientY - rect.top) / rect.height - 0.5) * 2;

      section.style.setProperty(
        "--mouse-x",
        `${x * 14}px`
      );

      section.style.setProperty(
        "--mouse-y",
        `${y * 10}px`
      );
    };

    const handleMouseLeave = () => {
      section.style.setProperty(
        "--mouse-x",
        "0px"
      );

      section.style.setProperty(
        "--mouse-y",
        "0px"
      );
    };

    section.addEventListener(
      "mousemove",
      handleMouseMove
    );

    section.addEventListener(
      "mouseleave",
      handleMouseLeave
    );

    return () => {
      section.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      section.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="trionn-contact"
    >
      {/* =================================================
          BASE BACKGROUND
      ================================================= */}

      <div className="trionn-contact-bg" />

      {/* =================================================
          BACKGROUND SMOKE
      ================================================= */}

      <div className="trionn-smoke-scene">
        <div className="trionn-smoke-cloud smoke-cloud-1" />
        <div className="trionn-smoke-cloud smoke-cloud-2" />
        <div className="trionn-smoke-cloud smoke-cloud-3" />
        <div className="trionn-smoke-cloud smoke-cloud-4" />
      </div>

      {/* =================================================
          RISING SMOKE STREAMS

          Ye neeche se uth kar upar ki taraf
          aur sides se nikalti hui smoke create karegi.
      ================================================= */}

      <div className="trionn-rising-smoke">
        <div className="smoke-rise rise-1" />
        <div className="smoke-rise rise-2" />
        <div className="smoke-rise rise-3" />
        <div className="smoke-rise rise-4" />
        <div className="smoke-rise rise-5" />
        <div className="smoke-rise rise-6" />
        <div className="smoke-rise rise-7" />
        <div className="smoke-rise rise-8" />
      </div>

      {/* =================================================
          TOP BAR
      ================================================= */}

      <div className="trionn-contact-top">
        <span>
          LET&apos;S BUILD WORK THAT INSPIRES.
        </span>

        <span>
          IST → 16:33
        </span>
      </div>

      {/* =================================================
          HEADING
      ================================================= */}

      <h2 className="trionn-contact-heading">
        Ready to build
        <br />
        something bold?
      </h2>

      {/* =================================================
          CTA
      ================================================= */}

      <div className="trionn-contact-actions">
        <a
          href="#contact"
          className="trionn-contact-link"
        >
          <span>
            DISCUSS YOUR PROJECT
          </span>

          <span className="trionn-arrow">
            →
          </span>
        </a>

        <a
          href="#call"
          className="trionn-contact-link"
        >
          <span>
            BOOK A 30-MINUTE CALL
          </span>

          <span className="trionn-arrow">
            →
          </span>
        </a>
      </div>

      {/* =================================================
          COPYRIGHT
      ================================================= */}

      <div className="trionn-contact-copy">
        ©TRIONN® 2026
      </div>

      {/* =================================================
          SOUND
      ================================================= */}

      <div className="trionn-contact-sound">
        SOUND ON <span>♬</span> HOVER THE LINES.
      </div>

      {/* =================================================
          BUSINESS
      ================================================= */}

      <div className="trionn-business">
        <div className="trionn-small-title">
          BUSINESS ENQUIRY
        </div>

        <div className="trionn-info-row">
          <span>E.</span>

          <a href="mailto:hello@trionn.com">
            hello@trionn.com
          </a>
        </div>

        <div className="trionn-info-row">
          <span>P.</span>

          <a href="tel:+919824182099">
            +919824182099
          </a>
        </div>
      </div>

      {/* =================================================
          SOCIAL
      ================================================= */}

      <div className="trionn-social">
        <div className="trionn-small-title">
          SOCIAL
        </div>

        <div className="trionn-social-grid">
          <a href="#linkedin">
            Linkedin
          </a>

          <a href="#facebook">
            Facebook
          </a>

          <a href="#dribbble">
            Dribbble
          </a>

          <a href="#instagram">
            Instagram
          </a>
        </div>
      </div>

      {/* =================================================
          TRIONN WORD IMAGE
      ================================================= */}

      <div className="trionn-word-wrap">
        <img
          src="/trionn-word.svg"
          alt="TRIONN"
          className="trionn-word-image"
        />
      </div>

      {/* =================================================
          FRONT SMOKE

          Ye TRIONN ke upar se halki smoke pass karegi
          taake smoke image ke andar/bahar se
          nikalti hui lage.
      ================================================= */}

      <div className="trionn-front-smoke">
        <div className="front-smoke front-1" />
        <div className="front-smoke front-2" />
        <div className="front-smoke front-3" />
        <div className="front-smoke front-4" />
      </div>

      <div className="trionn-vignette" />
    </section>
  );
}

export default ContactFooter;