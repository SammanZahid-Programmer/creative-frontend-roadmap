import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import project02 from "../assets/images/project-02.jpeg";
import project03 from "../assets/images/project-03.jpeg";
import project04 from "../assets/images/project-04.webp";
import project05 from "../assets/images/project-05.jpeg";
import project06 from "../assets/images/project-06.jpeg";
import spotlightImage from "../assets/images/spotlight-image.webp";

import "./ClientsSection.css";

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   CLIENTS
========================================================= */

const clients = [
  {
    name: "NL",
    image: spotlightImage,
  },
  {
    name: "UEFA",
    image: project02,
  },
  {
    name: "Turkish Airlines",
    image: project03,
  },
  {
    name: "Pfizer",
    image: project04,
  },
  {
    name: "FedEx",
    image: project05,
  },
  {
    name: "Adidas",
    image: project06,
  },
  {
    name: "Euroleague",
    image: spotlightImage,
  },
  {
    name: "Ribbon Communications",
    image: project02,
  },
  {
    name: "Centrient",
    image: project03,
  },
  {
    name: "Corden Pharma",
    image: project04,
  },
  {
    name: "Radisys",
    image: project05,
  },
  {
    name: "NL",
    image: project06,
  },
  {
    name: "YPO",
    image: spotlightImage,
  },
  {
    name: "Menzies",
    image: project02,
  },
  {
    name: "Adevinta",
    image: project03,
  },
  {
    name: "European Commission",
    image: project04,
  },
  {
    name: "ISE",
    image: project05,
  },
  {
    name: "Fiat",
    image: project06,
  },
  {
    name: "VEEAM",
    image: spotlightImage,
  },
];

/* =========================================================
   COMPONENT
========================================================= */

export default function ClientsSection() {
  const sectionRef = useRef(null);
  const listRef = useRef(null);

  const activeIndexRef = useRef(0);

  /* =======================================================
     ACTIVE CLIENT
  ======================================================= */

  const setActiveClient = (index, items) => {
    if (!items.length) return;

    if (index === activeIndexRef.current) {
      return;
    }

    activeIndexRef.current = index;

    items.forEach((item, itemIndex) => {
      const image = item.querySelector(
        ".clients-inline-image"
      );

      if (itemIndex === index) {
        /* -----------------------------------------------
           ACTIVE WORD
        ------------------------------------------------ */

        item.classList.add("clients-name-active");

        /* -----------------------------------------------
           IMAGE POP IN
        ------------------------------------------------ */

        if (image) {
          gsap.killTweensOf(image);

          gsap.set(image, {
            opacity: 0,
            scale: 0.15,
            x: -10,
            rotate: -8,
          });

          gsap.to(image, {
            opacity: 1,
            scale: 1,
            x: 0,
            rotate: 0,

            duration: 0.55,

            ease: "back.out(1.7)",

            overwrite: true,
          });
        }
      } else {
        /* -----------------------------------------------
           INACTIVE WORD
        ------------------------------------------------ */

        item.classList.remove("clients-name-active");

        /* -----------------------------------------------
           IMAGE DISAPPEAR
        ------------------------------------------------ */

        if (image) {
          gsap.killTweensOf(image);

          gsap.to(image, {
            opacity: 0,
            scale: 0.15,
            x: -10,
            rotate: -8,

            duration: 0.25,

            ease: "power2.in",

            overwrite: true,
          });
        }
      }
    });
  };

  /* =========================================================
     GSAP
  ========================================================= */

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const list = listRef.current;

    if (!section || !list) {
      return;
    }

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(
        ".clients-name-item"
      );

      const totalItems = items.length;

      /* =====================================================
         INITIAL STATE
      ===================================================== */

      items.forEach((item, index) => {
        const image = item.querySelector(
          ".clients-inline-image"
        );

        if (index === 0) {
          item.classList.add(
            "clients-name-active"
          );

          if (image) {
            gsap.set(image, {
              opacity: 1,
              scale: 1,
              x: 0,
              rotate: 0,
            });
          }
        } else {
          item.classList.remove(
            "clients-name-active"
          );

          if (image) {
            gsap.set(image, {
              opacity: 0,
              scale: 0.15,
              x: -10,
              rotate: -8,
            });
          }
        }
      });

      activeIndexRef.current = 0;

      /* =====================================================
         LIST SCROLL
      ===================================================== */

      gsap.to(list, {
        y: () => {
          const viewport = list.parentElement;

          if (!viewport) {
            return 0;
          }

          return -Math.max(
            0,
            list.scrollHeight -
              viewport.offsetHeight
          );
        },

        ease: "none",

        scrollTrigger: {
          trigger: section,

          start: "top top",

          end: () =>
            `+=${Math.max(
              6000,
              totalItems * 400
            )}`,

          pin: true,

          scrub: 1,

          invalidateOnRefresh: true,

          anticipatePin: 1,

          /* ===============================================
             SCROLL UPDATE
          =============================================== */

          onUpdate: (self) => {
            const progress = self.progress;

            const index = Math.min(
              totalItems - 1,

              Math.floor(
                progress * totalItems
              )
            );

            setActiveClient(
              index,
              items
            );
          },

          /* ===============================================
             END
          =============================================== */

          onLeave: () => {
            setActiveClient(
              totalItems - 1,
              items
            );
          },
        },
      });

      /* =====================================================
         REFRESH
      ===================================================== */

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, section);

    /* =======================================================
       CLEANUP
    ======================================================= */

    return () => {
      ctx.revert();

      activeIndexRef.current = 0;
    };
  }, []);

  /* =========================================================
     JSX
  ========================================================= */

  return (
    <section
      className="clients-section"
      ref={sectionRef}
    >
      <div className="clients-inner">

        {/* ==================================================
            LEFT SIDE
        ================================================== */}

        <div className="clients-left">
          <div className="clients-left-content">

            <div className="clients-intro">
              <p>
                We are proud to have
                worked with
              </p>
            </div>

          </div>
        </div>

        {/* ==================================================
            RIGHT SIDE
        ================================================== */}

        <div className="clients-right">
          <div className="clients-list-viewport">

            <div
              className="clients-list"
              ref={listRef}
            >

              {clients.map(
                (client, index) => (
                  <div
                    className={`clients-name-item ${
                      index === 0
                        ? "clients-name-active"
                        : ""
                    }`}
                    key={`${client.name}-${index}`}
                    data-index={index}
                  >

                    {/* WORD */}

                    <span className="clients-name-text">
                      {client.name}
                    </span>

                    {/* IMAGE */}

                    <img
                      className="clients-inline-image"
                      src={client.image}
                      alt=""
                    />

                  </div>
                )
              )}

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}