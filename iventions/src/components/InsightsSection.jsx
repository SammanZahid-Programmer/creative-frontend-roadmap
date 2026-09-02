import React, { useState } from "react";
import "./InsightsSection.css";

const insights = [
  {
    date: "05.03.26",
    title:
      "Iventions London hub: bringing precision, proximity and expertise to global brands",
    color: "#d9d4ff",
    author: "Written by Iventions Team",
    paragraphs: [
      "Our London hub brings precision, proximity and expertise closer to global brands.",
      "Working locally allows us to understand the needs of international clients while creating experiences that feel relevant, considered and memorable.",
      "From strategy through to delivery, our teams work together to create environments that connect brands with people in meaningful ways.",
    ],
  },

  {
    date: "06.09.26",
    title:
      "CPHI trade show: what experienced exhibitors understand that Pharma brands often miss",
    color: "#5f8ff0",
    author:
      "Written by David Atkinson, Exhibits Account Director at Iventions",
    paragraphs: [
      "I’ve attended CPHI Trade Show for many years, and one thing I’ve noticed is how much the exhibition continues to evolve. Every year, exhibitors place greater importance on the look and feel of their stands, while visitors expect more than a simple product showcase.",
      "The brands that leave a lasting impression aren’t necessarily the ones with the biggest spaces. They’re the ones that create environments people want to spend time in.",
      "In an industry built on trust, quality and long-term relationships, standing out requires much more than visibility alone.",
    ],
  },

  {
    date: "10.09.25",
    title:
      "Do you need an international event agency, a local partner, or both?",
    color: "#c9f2f4",
    author: "Written by Iventions Team",
    paragraphs: [
      "Choosing the right event partner can make a significant difference when your brand operates across multiple markets.",
      "An international agency can bring consistency, strategic thinking and global expertise, while a local partner can provide valuable knowledge of the market, culture and audience.",
      "For many brands, the strongest approach is a combination of both — global thinking supported by local expertise.",
    ],
  },
];

export default function InsightsSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const openInsight = (index) => {
    setActiveIndex(index);
  };

  const closeInsight = () => {
    setActiveIndex(null);
  };

  const handleMobileToggle = (index) => {
    if (window.innerWidth <= 767) {
      setActiveIndex((current) =>
        current === index ? null : index
      );
    }
  };

  return (
    <section
      className={`insights-section ${
        activeIndex !== null ? "insights-active" : ""
      }`}
    >
      {/* =====================================================
          BACKGROUND DIMMER
      ===================================================== */}

      <div
        className={`insights-dimmer ${
          activeIndex !== null ? "visible" : ""
        }`}
      />

      {/* =====================================================
          LEFT TITLE
      ===================================================== */}

      <div className="insights-title">
        <h2>
          Inside
          <br />
          Iventions
        </h2>
      </div>

      {/* =====================================================
          INTRO
      ===================================================== */}

      <div className="insights-intro">
        <p>
          Get insider tips, bold ideas, and future-forward trends,
          <br className="desktop-break" />
          straight from the frontlines of unforgettable events.
        </p>

        <button className="insights-button">
          EXPLORE OUR INSIGHTS
        </button>
      </div>

      {/* =====================================================
          ARTICLES
      ===================================================== */}

      <div className="insights-grid">
        {insights.map((item, index) => {
          const isActive = activeIndex === index;

          return (
            <article
              key={index}
              className={`insight-card insight-card-${index + 1} ${
                isActive ? "is-active" : ""
              }`}
            >
              {/* =================================================
                  HOVER TARGET
                  Circle
              ================================================= */}

              <div
                className="insight-dot"
                style={{
                  backgroundColor: item.color,
                }}
                onMouseEnter={() => openInsight(index)}
                onClick={() => handleMobileToggle(index)}
              />

              {/* =================================================
                  CONTENT
              ================================================= */}

              <div className="insight-content">
                <div className="insight-date">
                  {item.date}
                </div>

                <h3
                  onMouseEnter={() => openInsight(index)}
                  onClick={() => handleMobileToggle(index)}
                >
                  {item.title}
                </h3>
              </div>

              {/* =================================================
                  POPUP
              ================================================= */}

              {isActive && (
                <div
                  className="insight-popup-wrapper"
                  onMouseEnter={() => openInsight(index)}
                  onMouseLeave={closeInsight}
                >
                  <div
                    className="insight-popup"
                    style={{
                      "--popup-color": item.color,
                    }}
                  >
                    <div className="popup-inner">
                      {/* DATE */}

                      <div className="popup-date popup-sequence popup-1">
                        {item.date}
                      </div>

                      {/* TITLE */}

                      <h4 className="popup-title popup-sequence popup-2">
                        {item.title}
                      </h4>

                      {/* BODY */}

                      <div className="popup-body">
                        <p className="popup-author popup-sequence popup-3">
                          {item.author}
                        </p>

                        {item.paragraphs.map(
                          (paragraph, paragraphIndex) => (
                            <p
                              key={paragraphIndex}
                              className={`popup-sequence popup-${
                                paragraphIndex + 4
                              }`}
                            >
                              {paragraph}
                            </p>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}