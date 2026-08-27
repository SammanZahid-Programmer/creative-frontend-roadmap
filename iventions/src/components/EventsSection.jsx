import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./EventsSection.css";

gsap.registerPlugin(ScrollTrigger);


/* =========================================================
   DATA
========================================================= */

const eventsData = [
  {
    number: "01",
    title: "Events",

    heading: (
      <>
        Global Events, Brand
        <br />
        Activations, Experience
        <br />
        Content
      </>
    ),

    description:
      "From corporate summits to viral moments, we create experiences that fuel alignment and connection between audiences and business goals.",

    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=85",

    background: "#f3ffd2",

    tilt: -2.8,
  },

  {
    number: "02",
    title: "Exhibits",

    heading: (
      <>
        Global Events, Brand
        <br />
        Activations, Experience
        <br />
        Content
      </>
    ),

    description:
      "From corporate summits to viral moments, we create experiences that fuel alignment and connection between audiences and business goals.",

    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85",

    background: "#cceff3",

    tilt: 2.8,
  },

  {
    number: "03",
    title: "Sports",

    heading: (
      <>
        Global Events, Brand
        <br />
        Activations, Experience
        <br />
        Content
      </>
    ),

    description:
      "From corporate summits to viral moments, we create experiences that fuel alignment and connection between audiences and business goals.",

    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=85",

    background: "#ffe1d1",

    tilt: -2.8,
  },
];


/* =========================================================
   CTA
========================================================= */

function EventsCTA() {
  return (
    <div className="events-cta">

      {/* TEXT */}

      <div className="events-cta-text-wrap">

        <span className="events-cta-text events-cta-current">
          See what we create
        </span>

        <span className="events-cta-text events-cta-next">
          See what we create
        </span>

      </div>


      {/* ARROW */}

      <div className="events-cta-arrow">
        <span>→</span>
      </div>

    </div>
  );
}


/* =========================================================
   COMPONENT
========================================================= */

export default function EventsSection() {

  const sectionRef = useRef(null);


  useLayoutEffect(() => {

    const section = sectionRef.current;

    if (!section) return;


    const ctx = gsap.context(() => {

      const cards =
        gsap.utils.toArray(".events-card");

      const blocks =
        gsap.utils.toArray(".events-block");


      /* =====================================================
         INITIAL CARD STATES
      ===================================================== */

      cards.forEach((card, index) => {

        gsap.set(card, {

          yPercent:
            index === 0
              ? 0
              : 100,

          scale: 1,

          rotation: 0,

          borderRadius: "0px",

          transformOrigin:
            "50% 50%",

          zIndex:
            index + 1,

        });

      });


      /* =====================================================
         INITIAL CONTENT STATES
      ===================================================== */

      blocks.forEach((block, index) => {

        const heading =
          block.querySelector(
            ".events-heading"
          );

        const description =
          block.querySelector(
            ".events-description"
          );

        const number =
          block.querySelector(
            ".events-number"
          );

        const image =
          block.querySelector(
            ".events-image"
          );

        const cta =
          block.querySelector(
            ".events-cta"
          );


        /* -----------------------------------------------
           HEADING
        ------------------------------------------------ */

        gsap.set(heading, {

          y:
            index === 0
              ? 0
              : 75,

          opacity:
            index === 0
              ? 1
              : 0,

        });


        /* -----------------------------------------------
           DESCRIPTION
        ------------------------------------------------ */

        gsap.set(description, {

          y:
            index === 0
              ? 0
              : 30,

          opacity:
            index === 0
              ? 1
              : 0,

        });


        /* -----------------------------------------------
           NUMBER
        ------------------------------------------------ */

        gsap.set(number, {

          y:
            index === 0
              ? 0
              : 30,

          opacity:
            index === 0
              ? 1
              : 0,

        });


        /* -----------------------------------------------
           IMAGE
        ------------------------------------------------ */

        gsap.set(image, {

          scale: 1,

          opacity:
            index === 0
              ? 1
              : 0,

          y:
            index === 0
              ? 0
              : 30,

          transformOrigin:
            "center center",

        });


        /* -----------------------------------------------
           CTA
        ------------------------------------------------ */

        gsap.set(cta, {

          y:
            index === 0
              ? 0
              : 25,

          opacity:
            index === 0
              ? 1
              : 0,

        });

      });


      /* =====================================================
         FIRST IMAGE POP
      ===================================================== */

      const firstImage =
        blocks[0].querySelector(
          ".events-image"
        );


      gsap.timeline({

        scrollTrigger: {

          trigger: section,

          start: "top top",

          once: false,

        },

      })

      .to(firstImage, {

        scale: 1.08,

        duration: 0.45,

        ease: "power2.out",

      })

      .to(firstImage, {

        scale: 1,

        duration: 0.55,

        ease: "power2.out",

      });


      /* =====================================================
         MASTER TIMELINE
      ===================================================== */

      const masterTimeline =
        gsap.timeline({

          defaults: {
            ease: "none",
          },

          scrollTrigger: {

            trigger: section,

            start: "top top",

            end: () =>
              `+=${window.innerHeight *
                (cards.length - 1)}`,

            pin: true,

            scrub: 0.8,

            anticipatePin: 1,

            invalidateOnRefresh: true,

          },

        });


      /* =====================================================
         CARD 1 → CARD 2
      ===================================================== */

      masterTimeline

        /* -----------------------------------------------
           CARD 1 TILT
        ------------------------------------------------ */

        .to(
          cards[0],
          {

            scale: 0.955,

            yPercent: -1.5,

            rotation:
              eventsData[0].tilt,

            borderRadius: "24px",

            duration: 1,

          }
        )


        /* -----------------------------------------------
           CARD 2 ENTER
        ------------------------------------------------ */

        .to(
          cards[1],
          {

            yPercent: 0,

            duration: 1.15,

          },

          "<0.12"
        )


        /* -----------------------------------------------
           CARD 2 HEADING
        ------------------------------------------------ */

        .to(
          blocks[1].querySelector(
            ".events-heading"
          ),
          {

            y: 0,

            opacity: 1,

            duration: 0.65,

          },

          "<0.38"
        )


        /* -----------------------------------------------
           CARD 2 NUMBER
        ------------------------------------------------ */

        .to(
          blocks[1].querySelector(
            ".events-number"
          ),
          {

            y: 0,

            opacity: 1,

            duration: 0.5,

          },

          "<0.05"
        )


        /* -----------------------------------------------
           CARD 2 DESCRIPTION
        ------------------------------------------------ */

        .to(
          blocks[1].querySelector(
            ".events-description"
          ),
          {

            y: 0,

            opacity: 1,

            duration: 0.5,

          },

          "<0.05"
        )


        /* -----------------------------------------------
           CARD 2 IMAGE REVEAL + SCALE
        ------------------------------------------------ */

        .to(
          blocks[1].querySelector(
            ".events-image"
          ),
          {

            y: 0,

            opacity: 1,

            scale: 1.08,

            duration: 0.45,

            ease: "power2.out",

          },

          "<0.05"
        )

        .to(
          blocks[1].querySelector(
            ".events-image"
          ),
          {

            scale: 1,

            duration: 0.5,

            ease: "power2.out",

          }
        )


        /* -----------------------------------------------
           CARD 2 CTA
        ------------------------------------------------ */

        .to(
          blocks[1].querySelector(
            ".events-cta"
          ),
          {

            y: 0,

            opacity: 1,

            duration: 0.45,

          },

          "<0.05"
        );


      /* =====================================================
         CARD 2 → CARD 3
      ===================================================== */

      masterTimeline

        /* -----------------------------------------------
           CARD 2 TILT
        ------------------------------------------------ */

        .to(
          cards[1],
          {

            scale: 0.955,

            yPercent: -1.5,

            rotation:
              eventsData[1].tilt,

            borderRadius: "24px",

            duration: 1,

          }
        )


        /* -----------------------------------------------
           CARD 3 ENTER
        ------------------------------------------------ */

        .to(
          cards[2],
          {

            yPercent: 0,

            duration: 1.15,

          },

          "<0.12"
        )


        /* -----------------------------------------------
           CARD 3 HEADING
        ------------------------------------------------ */

        .to(
          blocks[2].querySelector(
            ".events-heading"
          ),
          {

            y: 0,

            opacity: 1,

            duration: 0.65,

          },

          "<0.38"
        )


        /* -----------------------------------------------
           CARD 3 NUMBER
        ------------------------------------------------ */

        .to(
          blocks[2].querySelector(
            ".events-number"
          ),
          {

            y: 0,

            opacity: 1,

            duration: 0.5,

          },

          "<0.05"
        )


        /* -----------------------------------------------
           CARD 3 DESCRIPTION
        ------------------------------------------------ */

        .to(
          blocks[2].querySelector(
            ".events-description"
          ),
          {

            y: 0,

            opacity: 1,

            duration: 0.5,

          },

          "<0.05"
        )


        /* -----------------------------------------------
           CARD 3 IMAGE REVEAL + SCALE
        ------------------------------------------------ */

        .to(
          blocks[2].querySelector(
            ".events-image"
          ),
          {

            y: 0,

            opacity: 1,

            scale: 1.08,

            duration: 0.45,

            ease: "power2.out",

          },

          "<0.05"
        )

        .to(
          blocks[2].querySelector(
            ".events-image"
          ),
          {

            scale: 1,

            duration: 0.5,

            ease: "power2.out",

          }
        )


        /* -----------------------------------------------
           CARD 3 CTA
        ------------------------------------------------ */

        .to(
          blocks[2].querySelector(
            ".events-cta"
          ),
          {

            y: 0,

            opacity: 1,

            duration: 0.45,

          },

          "<0.05"
        );


      /* =====================================================
         REFRESH
      ===================================================== */

      ScrollTrigger.refresh();

    }, section);


    return () => {

      ctx.revert();

    };

  }, []);


  /* =========================================================
     JSX
  ========================================================= */

  return (

    <section
      ref={sectionRef}
      className="events-section"
    >

      <div className="events-stage">

        {eventsData.map(
          (item, index) => (

            <article
              key={item.number}
              className={
                `events-block events-block-${index + 1}`
              }
            >

              <div
                className="events-card"
                style={{
                  backgroundColor:
                    item.background,
                }}
              >

                {/* =================================================
                    TOP TITLE
                ================================================= */}

                <div className="events-top">

                  <h2 className="events-main-title">
                    {item.title}
                  </h2>

                </div>


                {/* =================================================
                    CONTENT
                ================================================= */}

                <div className="events-content">

                  {/* NUMBER */}

                  <div className="events-number-wrap">

                    <span className="events-number">
                      {item.number}
                    </span>

                  </div>


                  {/* COPY */}

                  <div className="events-copy">

                    <div className="events-heading-mask">

                      <h3 className="events-heading">
                        {item.heading}
                      </h3>

                    </div>


                    <p className="events-description">
                      {item.description}
                    </p>

                  </div>


                  {/* IMAGE */}

                  <div className="events-image-wrap">

                    <img
                      src={item.image}
                      alt={item.title}
                      className="events-image"
                    />

                  </div>

                </div>


                {/* =================================================
                    CTA
                ================================================= */}

                <div className="events-bottom">

                  <EventsCTA />

                </div>

              </div>

            </article>

          )
        )}

      </div>

    </section>

  );
}