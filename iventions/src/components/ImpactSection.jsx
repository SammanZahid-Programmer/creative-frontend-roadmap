import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ImpactSection.css";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    participants: "2,000",
    industry: "Sports",
    eventType: "Live Event",
    location: "Udine",
    quote:
      "“Thank you for your great work on this project in the planning phase and onsite as well. It was a pleasure on my side too working together.”",
    title: "Hospitality Production",
    client: "UEFA",
    logo: "UEFA",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=85",
  },
  {
    participants: "1,500",
    industry: "Technology",
    eventType: "Exhibition",
    location: "London",
    quote:
      "“A fantastic experience from the initial concept through to the final execution. The entire team delivered beyond expectations.”",
    title: "Technology Experience",
    client: "Microsoft",
    logo: "MICROSOFT",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=85",
  },
  {
    participants: "4,000",
    industry: "Automotive",
    eventType: "Brand Experience",
    location: "Munich",
    quote:
      "“Every detail was carefully considered and the final experience created a real connection with our audience.”",
    title: "Brand Experience",
    client: "BMW",
    logo: "BMW",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=85",
  },
  {
    participants: "850",
    industry: "Finance",
    eventType: "Conference",
    location: "Dubai",
    quote:
      "“The execution was seamless and the creative direction made the entire event feel unique and memorable.”",
    title: "Global Conference",
    client: "HSBC",
    logo: "HSBC",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=85",
  },
  {
    participants: "3,200",
    industry: "Sports",
    eventType: "Championship",
    location: "Paris",
    quote:
      "“A highly professional team that understood the vision and transformed it into something truly remarkable.”",
    title: "Sports Production",
    client: "Adidas",
    logo: "ADIDAS",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=85",
  },
  {
    participants: "1,200",
    industry: "Entertainment",
    eventType: "Live Show",
    location: "Madrid",
    quote:
      "“From strategy to production, every stage was handled with creativity, precision and genuine care.”",
    title: "Live Experience",
    client: "Sony",
    logo: "SONY",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=85",
  },
  {
    participants: "2,700",
    industry: "Healthcare",
    eventType: "Summit",
    location: "Berlin",
    quote:
      "“The team created an environment where our message could connect naturally with every guest.”",
    title: "Healthcare Summit",
    client: "Novartis",
    logo: "NOVARTIS",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85",
  },
  {
    participants: "5,000",
    industry: "Global Brands",
    eventType: "Festival",
    location: "Barcelona",
    quote:
      "“An outstanding project from beginning to end. The result was engaging, bold and exactly what we imagined.”",
    title: "Global Brand Event",
    client: "Coca-Cola",
    logo: "COCA-COLA",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=85",
  },
];

export default function ImpactSection() {
  const sectionRef = useRef(null);
  const purpleCoverRef = useRef(null);
  const creamPanelRef = useRef(null);
  const contentRef = useRef(null);

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const purpleCover = purpleCoverRef.current;
    const creamPanel = creamPanelRef.current;
    const content = contentRef.current;

    if (!section || !purpleCover || !creamPanel || !content) {
      return;
    }

    const ctx = gsap.context(() => {
      /*
      =====================================================
      INITIAL STATE

      Purple completely covers everything.
      =====================================================
      */

      gsap.set(purpleCover, {
        opacity: 1,
      });

      /*
      Cream starts BELOW the viewport.

      Screenshot wali reveal:
      bottom se cream upar aa rahi hai,
      aur uski upper edge diagonal hai.
      */

      gsap.set(creamPanel, {
        clipPath:
          "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      });

      /*
      Content initially thora neeche + invisible.
      */

      gsap.set(content, {
        y: 45,
        opacity: 0,
      });

      /*
      =====================================================
      SCROLL ANIMATION

      IMPORTANT:
      once:false behavior by default.

      Scroll DOWN:
      purple -> cream opens

      Scroll UP:
      cream -> purple closes

      Dobara section mein enter:
      animation dobara chalegi.
      =====================================================
      */

      const tl = gsap.timeline({
        paused: true,
      });

      /*
      -----------------------------------------------------
      PHASE 1
      Purple cover se cream ka bottom portion reveal.
      -----------------------------------------------------
      */

      tl.to(creamPanel, {
        clipPath:
          // "polygon(0% 25%, 100% 56%, 100% 100%, 0% 100%)",
          "polygon(0% 0%, 0% 0%, 100% 36.5%, 100% 63.5%, 0% 100%, 0% 100%)",
        duration: 4.48,
        ease: "power2.inOut",
        
        scrub: 2,
      });

      /*
      -----------------------------------------------------
      PHASE 2
      Content cream ke saath smoothly reveal.
      -----------------------------------------------------
      */

      tl.to(
        content,
        {
          y: 0,
          opacity: 1,
          duration: 0.38,
          ease: "power3.out",
        },
        "-=0.28"
      );

      /*
      -----------------------------------------------------
      PHASE 3
      Screenshot wali final shape.

      Cream full area cover karegi,
      right side par diagonal purple areas
      visible rahengi.
      -----------------------------------------------------
      */

      tl.to(creamPanel, {
        clipPath:
          "polygon(0% 0%, 91% 0%, 100% 25%, 100% 75%, 91% 100%, 0% 100%)",
        duration: 0.55,
        ease: "power3.inOut",
      });

      /*
      Purple cover slowly disappear karega
      as cream opens.
      */

      tl.to(
        purpleCover,
        {
          opacity: 0,
          duration: 0.28,
          ease: "power2.out",
        },
        "-=0.42"
      );

      /*
      =====================================================
      SCROLLTRIGGER

      Section ke enter hote hi animation progress
      scroll ke saath connected hai.

      NO once:true.
      =====================================================
      */

      ScrollTrigger.create({
        trigger: section,

        /*
        Jab section viewport ke bottom se enter hota hai
        animation start.
        */

        start: "top bottom",

        /*
        Jab section ka top viewport ke top ke paas
        aa jata hai animation complete.
        */

        end: "top top",

        scrub: 1.2,

        animation: tl,

        invalidateOnRefresh: true,
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  /*
  =====================================================
  SLIDER
  =====================================================
  */

  const changeSlide = (direction) => {
    const next =
      (current + direction + slides.length) %
      slides.length;

    const content = contentRef.current;

    if (!content) {
      setCurrent(next);
      return;
    }

    gsap.killTweensOf(content);

    gsap.timeline()
      .to(content, {
        opacity: 0,
        y: direction > 0 ? -20 : 20,
        duration: 0.2,
        ease: "power2.in",
      })
      .add(() => {
        setCurrent(next);
      })
      .to(content, {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: "power3.out",
      });
  };

  const slide = slides[current];

  return (
    <section
      ref={sectionRef}
      className="impact-section"
    >
      {/* =================================================
          PURPLE BACKGROUND
      ================================================= */}

      <div
        ref={purpleCoverRef}
        className="impact-purple-cover"
      />

      {/* =================================================
          FINAL PURPLE DIAGONAL BACKGROUND
      ================================================= */}

      <div className="impact-purple-background" />

      {/* =================================================
          CREAM PANEL
      ================================================= */}

      <div
        ref={creamPanelRef}
        className="impact-cream-panel"
      >
        <div
          ref={contentRef}
          className="impact-content"
        >
          {/* =================================================
              TOP INFORMATION
          ================================================= */}

          <div className="impact-meta">
            <div className="impact-meta-item">
              <span>PARTICIPANTS</span>
              <strong>{slide.participants}</strong>
            </div>

            <div className="impact-meta-item">
              <span>INDUSTRY</span>
              <strong>{slide.industry}</strong>
            </div>

            <div className="impact-meta-item">
              <span>EVENT TYPE</span>
              <strong>{slide.eventType}</strong>
            </div>

            <div className="impact-meta-item">
              <span>LOCATION</span>
              <strong>{slide.location}</strong>
            </div>
          </div>

          {/* =================================================
              MAIN AREA
          ================================================= */}

          <div className="impact-main">
            {/* QUOTE */}

            <div className="impact-quote">
              {slide.quote}
            </div>

            {/* CLIENT */}

            <div className="impact-client">
              <h3>{slide.title}</h3>
              <p>{slide.client}</p>
            </div>

            {/* LOGO */}

            <div className="impact-logo">
              {slide.logo}
            </div>

            {/* IMAGE */}

            <div className="impact-person">
              <img
                src={slide.image}
                alt={slide.client}
              />
            </div>
          </div>

          {/* =================================================
              BOTTOM CONTROLS
          ================================================= */}

          <div className="impact-bottom">
            <div className="impact-arrows">
              <button
                type="button"
                onClick={() => changeSlide(-1)}
                aria-label="Previous slide"
              >
                ←
              </button>

              <button
                type="button"
                onClick={() => changeSlide(1)}
                aria-label="Next slide"
              >
                →
              </button>
            </div>

            <div className="impact-counter">
              {String(current + 1).padStart(2, "0")}
              <span>/</span>
              {String(slides.length).padStart(2, "0")}
            </div>

            <button
              type="button"
              className="impact-case-study"
            >
              SEE FULL CASE STUDY
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}