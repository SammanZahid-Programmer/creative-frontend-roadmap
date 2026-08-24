import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Stories.css";


gsap.registerPlugin(
  ScrollTrigger
);


/* =========================================================
   STORIES DATA
========================================================= */

const stories = [

  {
    id: 1,

    title:
      "LUXURY PRESENCE",

    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80",

    quote:
      "Sunny and his award winning team are second to none when it comes to responsive web design. Their ability to take an idea and make it a work of art has always been a great experience. When you find companies like his you make sure to keep them close.",

    name:
      "Doug Petrie",

    role:
      "Founder & CEO · USA",
  },


  {
    id: 2,

    title:
      "CREDIBLE",

    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=300&q=80",

    quote:
      "Working together felt effortless. Every detail was considered, every challenge had a solution, and the final result gave our brand a completely new level of confidence.",

    name:
      "Sarah Mitchell",

    role:
      "Marketing Director · UK",
  },


  {
    id: 3,

    title:
      "FAST RESUME",

    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",

    quote:
      "The team understood exactly what we wanted before we could even fully explain it. The experience was collaborative, creative and incredibly smooth from beginning to end.",

    name:
      "Jessica Morgan",

    role:
      "Founder · USA",
  },


  {
    id: 4,

    title:
      "VENTIS",

    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",

    quote:
      "A great creative partnership is difficult to find. This was one of those rare experiences where strategy, design and execution all worked perfectly together.",

    name:
      "Daniel Brooks",

    role:
      "Creative Director · Canada",
  },


  {
    id: 5,

    title:
      "VENTINCE",

    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",

    quote:
      "The result feels bigger than just a website. It gave us a stronger identity and a platform that finally represents who we are and where we are going.",

    name:
      "Emily Carter",

    role:
      "Brand Director · USA",
  },

];


const Stories = () => {

  const sectionRef =
    useRef(null);

  const contentRef =
    useRef(null);

  const topPlusRef =
    useRef(null);

  const bottomPlusRef =
    useRef(null);

  const listenTextRef =
    useRef(null);


  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0);


  const [
    isAnimating,
    setIsAnimating,
  ] = useState(false);


  const activeStory =
    stories[activeIndex];


  /* =========================================================
     PLUS ROTATION

     IMPORTANT:
     Navbar theme is NOT controlled here.

     Navbar.jsx handles automatic
     background detection.
  ========================================================= */

  useEffect(() => {

    const section =
      sectionRef.current;


    if (!section) {
      return;
    }


    const ctx =
      gsap.context(
        () => {


          /* =================================================
             TOP PLUS
          ================================================= */

          gsap.to(
            topPlusRef.current,
            {
              rotate: 360,

              ease: "none",

              scrollTrigger: {
                trigger: section,

                start:
                  "top bottom",

                end:
                  "bottom top",

                scrub: 1,
              },
            }
          );


          /* =================================================
             BOTTOM PLUS
          ================================================= */

          gsap.to(
            bottomPlusRef.current,
            {
              rotate: -360,

              ease: "none",

              scrollTrigger: {
                trigger: section,

                start:
                  "top bottom",

                end:
                  "bottom top",

                scrub: 1,
              },
            }
          );

        },

        section
      );


    return () => {

      ctx.revert();

    };

  }, []);


  /* =========================================================
     CHANGE SLIDE
  ========================================================= */

  const changeSlide = (
    nextIndex
  ) => {

    if (
      isAnimating
    ) {
      return;
    }


    setIsAnimating(
      true
    );


    let finalIndex =
      nextIndex;


    if (
      finalIndex >=
      stories.length
    ) {

      finalIndex = 0;

    }


    if (
      finalIndex < 0
    ) {

      finalIndex =
        stories.length - 1;

    }


    gsap.to(
      contentRef.current,
      {

        opacity: 0,

        duration: 0.35,

        ease:
          "power2.out",


        onComplete: () => {

          setActiveIndex(
            finalIndex
          );


          requestAnimationFrame(
            () => {

              gsap.to(
                contentRef.current,
                {

                  opacity: 1,

                  duration: 0.55,

                  ease:
                    "power2.out",


                  onComplete: () => {

                    setIsAnimating(
                      false
                    );

                  },

                }
              );

            }
          );

        },

      }
    );

  };


  /* =========================================================
     AUTO SLIDER
  ========================================================= */

  useEffect(() => {

    const autoSlider =
      setTimeout(
        () => {

          if (
            !isAnimating
          ) {

            changeSlide(
              activeIndex + 1
            );

          }

        },

        5000
      );


    return () => {

      clearTimeout(
        autoSlider
      );

    };

  }, [
    activeIndex,
    isAnimating,
  ]);


  /* =========================================================
     ARROW HOVER
  ========================================================= */

  const animateArrow = (
    event,
    direction
  ) => {

    const button =
      event.currentTarget;


    const arrow =
      button.querySelector(
        ".story-arrow-symbol"
      );


    if (!arrow) {
      return;
    }


    const exitX =
      direction === "next"
        ? 40
        : -40;


    const enterX =
      direction === "next"
        ? -40
        : 40;


    const tl =
      gsap.timeline();


    tl.to(
      arrow,
      {

        x: exitX,

        opacity: 0,

        duration: 0.12,

        ease:
          "power2.in",

      }
    )


      .set(
        arrow,
        {
          x: enterX,
        }
      )


      .to(
        arrow,
        {

          x: 0,

          opacity: 1,

          duration: 0.2,

          ease:
            "power3.out",

        }
      );

  };


  /* =========================================================
     LISTEN ANIMATION
  ========================================================= */

  const animateListen =
    () => {

      const text =
        listenTextRef.current;


      if (!text) {
        return;
      }


      const tl =
        gsap.timeline();


      tl.to(
        text,
        {

          opacity: 0,

          filter:
            "blur(8px)",

          letterSpacing:
            "0.25em",

          duration: 0.3,

          ease:
            "power2.in",

        }
      )


        .set(
          text,
          {

            opacity: 0,

            filter:
              "blur(10px)",

            letterSpacing:
              "0.3em",

          }
        )


        .to(
          text,
          {

            opacity: 1,

            filter:
              "blur(0px)",

            letterSpacing:
              "0.05em",

            duration: 0.65,

            ease:
              "power3.out",

          }
        );

    };


  /* =========================================================
     RETURN
  ========================================================= */

  return (

    <section
      className="stories-section"
      ref={sectionRef}
    >

      <div
        className="stories-inner"
      >


        {/* ===================================================
            TOP HEADING
        =================================================== */}

        <div
          className="
            stories-heading-row
          "
        >

          <h2>
            Client stories
          </h2>


          <p>

            Great work is built through

            <br />

            partnership. Here's what

            <br />

            our clients say.

          </p>

        </div>


        {/* ===================================================
            TOP DIVIDER
        =================================================== */}

        <div
          className="
            stories-divider
            stories-divider-top
          "
        >

          <div
            className="
              stories-plus
            "
            ref={
              topPlusRef
            }
          >
            +
          </div>

        </div>


        {/* ===================================================
            SLIDER
        =================================================== */}

        <div
          className="
            stories-slider
          "
        >


          {/* =================================================
              LEFT
          ================================================= */}

          <div
            className="
              stories-left
            "
          >

            <div
              className="
                stories-links
              "
            >

              {stories.map(
                (
                  story,
                  index
                ) => (

                  <button
                    key={
                      story.id
                    }

                    className={`
                      story-link
                      ${
                        index ===
                        activeIndex
                          ? "active"
                          : ""
                      }
                    `}

                    onClick={() =>
                      changeSlide(
                        index
                      )
                    }

                    type="button"
                  >

                    <span>
                      {
                        story.title
                      }
                    </span>


                    {index ===
                      activeIndex && (

                      <span
                        className="
                          story-link-arrow
                        "
                      >
                        →
                      </span>

                    )}

                  </button>

                )
              )}

            </div>


            {/* =================================================
                NAVIGATION
            ================================================= */}

            <div
              className="
                stories-navigation
              "
            >

              {/* PREVIOUS */}

              <button
                className="
                  story-nav-button
                "

                onMouseEnter={(
                  e
                ) =>
                  animateArrow(
                    e,
                    "prev"
                  )
                }

                onClick={() =>
                  changeSlide(
                    activeIndex - 1
                  )
                }

                aria-label="
                  Previous story
                "

                type="button"
              >

                <span
                  className="
                    story-arrow-symbol
                  "
                >
                  ←
                </span>

              </button>


              {/* NEXT */}

              <button
                className="
                  story-nav-button
                "

                onMouseEnter={(
                  e
                ) =>
                  animateArrow(
                    e,
                    "next"
                  )
                }

                onClick={() =>
                  changeSlide(
                    activeIndex + 1
                  )
                }

                aria-label="
                  Next story
                "

                type="button"
              >

                <span
                  className="
                    story-arrow-symbol
                  "
                >
                  →
                </span>

              </button>

            </div>

          </div>


          {/* =================================================
              RIGHT
          ================================================= */}

          <div
            className="
              stories-right
            "

            ref={
              contentRef
            }
          >

            <div
              className="
                story-main-content
              "
            >


              {/* QUOTE */}

              <div
                className="
                  story-quote
                "
              >

                {
                  activeStory.quote
                }

              </div>


              {/* PERSON */}

              <div
                className="
                  story-person-row
                "
              >

                <div
                  className="
                    story-person
                  "
                >

                  <img
                    src={
                      activeStory.image
                    }

                    alt={
                      activeStory.name
                    }
                  />


                  <div
                    className="
                      story-person-info
                    "
                  >

                    <h4>
                      {
                        activeStory.name
                      }
                    </h4>


                    <p>
                      {
                        activeStory.role
                      }
                    </p>

                  </div>

                </div>


                {/* LISTEN */}

                <button
                  className="
                    story-listen-button
                  "

                  onMouseEnter={
                    animateListen
                  }

                  type="button"
                >

                  <span
                    className="
                      listen-icon
                    "
                  >
                    ▷
                  </span>


                  <span
                    className="
                      listen-text
                    "

                    ref={
                      listenTextRef
                    }
                  >
                    LISTEN TO HIM!
                  </span>

                </button>

              </div>


              {/* BECOME CLIENT */}

              <div
                className="
                  story-client-link
                "
              >

                <span>
                  BECOME A CLIENT
                </span>


                <span>
                  →
                </span>

              </div>

            </div>

          </div>

        </div>


        {/* ===================================================
            BOTTOM PLUS
        =================================================== */}

        <div
          className="
            stories-bottom-plus
          "
        >

          <div
            className="
              stories-plus
            "

            ref={
              bottomPlusRef
            }
          >
            +
          </div>

        </div>

      </div>

    </section>

  );

};


export default Stories;