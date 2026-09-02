import React, { useState } from "react";
import "./QuoteContactSection.css";

import quoteContactImage from "../assets/images/quote-contact.jpeg";

export default function QuoteContactSection() {
  const [activeSpotlight, setActiveSpotlight] = useState(null);

  const handleEnter = (type) => {
    setActiveSpotlight(type);
  };

  const handleLeave = () => {
    setActiveSpotlight(null);
  };

  return (
    <section
      className={`quote-contact-section ${
        activeSpotlight
          ? `spotlight-${activeSpotlight}`
          : ""
      }`}
    >

      {/* =====================================================
          NORMAL BACKGROUND
      ===================================================== */}

      <div
        className="quote-contact-image quote-image-main"
        style={{
          backgroundImage: `url(${quoteContactImage})`,
        }}
      />


      {/* =====================================================
          QUOTE HOVER BACKGROUND
      ===================================================== */}

      <div className="quote-contact-image quote-image-quote" />


      {/* =====================================================
          CONTACT HOVER BACKGROUND
      ===================================================== */}

      <div className="quote-contact-image quote-image-contact" />


      {/* =====================================================
          DARK OVERLAY
      ===================================================== */}

      <div className="quote-contact-overlay" />


      {/* =====================================================
          QUOTE SPOTLIGHT
      ===================================================== */}

      <div className="spotlight-cone spotlight-cone-quote">

        <div className="spotlight-content">

          <div className="spotlight-small-text">
            Your
            <br />
            spotlight's
            <br />
            waiting.
          </div>


          <div className="spotlight-main-text">
            Have an event
            <br />
            in mind?
          </div>


          <div className="spotlight-description">
            Let’s get you accurate numbers,
            <br />
            strategic ideas, and a let’s co-create
            <br />
            your event–today.
          </div>


          <div className="spotlight-cta">
            GET A CUSTOM QUOTE

            <span className="spotlight-arrow">
              →
            </span>
          </div>

        </div>

      </div>


      {/* =====================================================
          CONTACT SPOTLIGHT
      ===================================================== */}

      <div className="spotlight-cone spotlight-cone-contact">

        <div className="contact-spotlight-content">

          <div className="contact-small-text">
            Let's make
            <br />
            something
            <br />
            unforgettable.
          </div>


          <div className="contact-main-text">
            Contact
          </div>


          <div className="contact-description">
            Tell us about your next event
            <br />
            and let's bring it to life.
          </div>


          <div className="contact-cta">
            START A CONVERSATION

            <span className="spotlight-arrow">
              →
            </span>
          </div>

        </div>

      </div>


      {/* =====================================================
          QUOTE TRIGGER
      ===================================================== */}

      <div
        className="quote-trigger"
        onMouseEnter={() => handleEnter("quote")}
        onMouseLeave={handleLeave}
      >

        <a
          href="#quote"
          className="quote-contact-link quote-link"
        >
          <span>Quote</span>

          <span className="quote-contact-line" />
        </a>

      </div>


      {/* =====================================================
          CONTACT TRIGGER
      ===================================================== */}

      <div
        className="contact-trigger"
        onMouseEnter={() => handleEnter("contact")}
        onMouseLeave={handleLeave}
      >

        <a
          href="#contact"
          className="quote-contact-link contact-link"
        >
          <span>Contact</span>

          <span className="quote-contact-line" />
        </a>

      </div>

    </section>
  );
}