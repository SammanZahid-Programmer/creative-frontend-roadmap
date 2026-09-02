import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import project01 from "../assets/images/client1.png";
import project02 from "../assets/images/client1.png";
import project03 from "../assets/images/client2.svg";
import project04 from "../assets/images/client3.svg";
import project05 from "../assets/images/client4.png";
import project06 from "../assets/images/client5.svg";
import project07 from "../assets/images/client6.png";
import project08 from "../assets/images/client7.svg";
import project09 from "../assets/images/client8.svg";
import project10 from "../assets/images/client9.svg";
import project11 from "../assets/images/client10.svg";
import project12 from "../assets/images/client11.svg";
import project13 from "../assets/images/client12.svg";
import project14 from "../assets/images/client13.svg";
import project15 from "../assets/images/client14.svg";
import project16 from "../assets/images/client15.svg";
import project17 from "../assets/images/client16.svg";
import project18 from "../assets/images/client17.svg";
import project19 from "../assets/images/client18.svg";

import "./ClientsSection.css";

gsap.registerPlugin(ScrollTrigger);

export default function ClientsSection() {
  const sectionRef = useRef(null);
  const listRef = useRef(null);
  const activeIndexRef = useRef(0);

  const clients = [
    { name: "NL", image: project01 },
    { name: "UEFA", image: project02 },
    { name: "Turkish Airlines", image: project03 },
    { name: "Pfizer", image: project04 },
    { name: "FedEx", image: project05 },
    { name: "Adidas", image: project06 },
    { name: "Euroleague", image: project07 },
    { name: "Ribbon Communications", image: project08 },
    { name: "Centrient", image: project09 },
    { name: "Corden Pharma", image: project10 },
    { name: "Radisys", image: project11 },
    { name: "NL", image: project12 },
    { name: "YPO", image: project13 },
    { name: "Menzies", image: project14 },
    { name: "Adevinta", image: project15 },
    { name: "European Commission", image: project16 },
    { name: "ISE", image: project17 },
    { name: "Fiat", image: project18 },
    { name: "VEEAM", image: project19 },
  ];

  const setActiveClient = (index, items) => {
    if (activeIndexRef.current === index) return;

    activeIndexRef.current = index;

    items.forEach((item, i) => {
      const image = item.querySelector(".clients-inline-image");

      if (i === index) {
        item.classList.add("clients-name-active");

        if (image) {
          gsap.to(image, {
            opacity: 1,
            scale: 1,
            x: 0,
            rotate: 0,
            duration: 0.4,
            ease: "power3.out",
            overwrite: true,
          });
        }
      } else {
        item.classList.remove("clients-name-active");

        if (image) {
          gsap.to(image, {
            opacity: 0,
            scale: 0.15,
            x: -10,
            rotate: -8,
            duration: 0.25,
            ease: "power2.out",
            overwrite: true,
          });
        }
      }
    });
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const list = listRef.current;

    if (!section || !list) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(
        ".clients-name-item"
      );

      const totalItems = items.length;

      if (!totalItems) return;

      /* ---------------------------------------------
         INITIAL STATE
      --------------------------------------------- */

      activeIndexRef.current = 0;

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

      /* ---------------------------------------------
         RESPONSIVE SCROLL DISTANCE
      --------------------------------------------- */

      const getScrollDistance = () => {
        const width = window.innerWidth;

        let distance;

        if (width <= 480) {
          distance = totalItems * 250;
        } else if (width <= 768) {
          distance = totalItems * 285;
        } else if (width <= 1024) {
          distance = totalItems * 320;
        } else {
          distance = totalItems * 360;
        }

        return Math.max(5000, distance);
      };

      /* ---------------------------------------------
         LIST MOVEMENT
      --------------------------------------------- */

      const getListMovement = () => {
        const listHeight = list.scrollHeight;
        const viewportHeight = section.clientHeight;

        const difference =
          listHeight - viewportHeight;

        return difference > 0
          ? -difference
          : 0;
      };

      /* ---------------------------------------------
         MAIN ANIMATION
      --------------------------------------------- */

      gsap.to(list, {
        y: getListMovement,

        ease: "none",

        scrollTrigger: {
          trigger: section,

          start: "top top",

          end: () =>
            `+=${getScrollDistance()}`,

          pin: true,

          scrub: 1,

          anticipatePin: 1,

          invalidateOnRefresh: true,

          onUpdate: (self) => {
            const progress = self.progress;

            const index = Math.min(
              totalItems - 1,
              Math.round(
                progress * (totalItems - 1)
              )
            );

            setActiveClient(index, items);
          },
        },
      });

      /* ---------------------------------------------
         REFRESH AFTER LAYOUT
      --------------------------------------------- */

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      className="clients-section"
      ref={sectionRef}
    >
      <div className="clients-inner">

        {/* =========================================
            LEFT SIDE
        ========================================= */}

        <div className="clients-left">

          <div className="clients-intro">

            <span className="clients-small-title">
              Clients
            </span>

            <h2 className="clients-heading">
              Trusted by
              <br />
              leading brands
            </h2>

          </div>

        </div>


        {/* =========================================
            RIGHT SIDE
        ========================================= */}

        <div className="clients-right">

          <div
            className="clients-list"
            ref={listRef}
          >

            {clients.map((client, index) => (
              <div
                className={`clients-name-item ${
                  index === 0
                    ? "clients-name-active"
                    : ""
                }`}
                key={`${client.name}-${index}`}
                data-index={index}
              >

                <span className="clients-name-text">
                  {client.name}
                </span>


                <div className="clients-image-column">

                  <img
                    className="clients-inline-image"
                    src={client.image}
                    alt={`${client.name} project`}
                  />

                </div>

              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}