import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./StatsShowcase.css";

import statsProjects from "../assets/images/stats-projects.jpeg";
import statsClients from "../assets/images/stats-clients.jpeg";
import statsEvents from "../assets/images/stats-events.jpeg";
import statsPartners from "../assets/images/stats-partners.jpeg";
import statsExperiences from "../assets/images/stats-experiences.jpeg";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    number: "270+",
    title: "Projects Delivered",
    description:
      "Big stages, small details. Each one designed to leave a mark.",
    image: statsProjects,
  },
  {
    number: "90%",
    title: "Loyal Clients",
    description:
      "Our clients love to come back, proof that true partnership lasts.",
    image: statsClients,
  },
  {
    number: "21",
    title: "Team Nationalities",
    description:
      "One team. Twenty-one perspectives. Countless cultural insights.",
    image: statsEvents,
  },
  {
    number: "31",
    title: "Countries Reached",
    description:
      "We don’t just go global. We bring the world to every event.",
    image: statsPartners,
  },
  {
    number: "1.2k",
    title: "Lightbulb Moments",
    description:
      "That’s ideas, not coffee. Brilliant ones, brewed daily.",
    image: statsExperiences,
  },
];

function StatsShowcase() {
  const sectionRef = useRef(null);

  const numberTrackRef = useRef(null);
  const leftTrackRef = useRef(null);
  const rightTrackRef = useRef(null);

  const imageRef = useRef(null);

  const numberRefs = useRef([]);
  const leftItemRefs = useRef([]);
  const rightItemRefs = useRef([]);

  const currentImageRef = useRef(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const numberTrack = numberTrackRef.current;
    const leftTrack = leftTrackRef.current;
    const rightTrack = rightTrackRef.current;
    const image = imageRef.current;

    const numbers = numberRefs.current;
    const leftItems = leftItemRefs.current;
    const rightItems = rightItemRefs.current;

    if (
      !section ||
      !numberTrack ||
      !leftTrack ||
      !rightTrack ||
      !image ||
      !numbers.length
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      const getItemHeight = () => window.innerHeight;
      const total = stats.length;

      gsap.set(numberTrack, { y: 0 });
      gsap.set(leftTrack, { y: 0 });
      gsap.set(rightTrack, { y: 0 });

      numbers.forEach((number, index) => {
        gsap.set(number, {
          color: index === 0 ? "#d8ff72" : "#ffffff",
        });
      });

      leftItems.forEach((item, index) => {
        gsap.set(item, {
          opacity: index === 0 ? 1 : 0,
        });
      });

      rightItems.forEach((item, index) => {
        gsap.set(item, {
          opacity: index === 0 ? 1 : 0,
        });
      });

      const changeImage = (index) => {
        if (index === currentImageRef.current) {
          return;
        }

        currentImageRef.current = index;

        gsap.to(image, {
          opacity: 0,
          scale: 1.035,
          duration: 0.18,
          ease: "power2.out",
          onComplete: () => {
            image.src = stats[index].image;

            gsap.to(image, {
              opacity: 1,
              scale: 1,
              duration: 0.42,
              ease: "power2.out",
            });
          },
        });
      };

      const updateActiveItem = (progress) => {
        const exactIndex = progress * (total - 1);

        const activeIndex = Math.min(
          total - 1,
          Math.max(0, Math.round(exactIndex))
        );

        numbers.forEach((number, index) => {
          const distance = Math.abs(exactIndex - index);

          gsap.to(number, {
            color: distance < 0.45 ? "#d8ff72" : "#ffffff",
            duration: 0.2,
            overwrite: true,
          });
        });

        leftItems.forEach((item, index) => {
          const distance = Math.abs(exactIndex - index);

          const opacity = gsap.utils.clamp(
            0,
            1,
            1 - distance * 2.8
          );

          gsap.to(item, {
            opacity,
            duration: 0.2,
            overwrite: true,
          });
        });

        rightItems.forEach((item, index) => {
          const distance = Math.abs(exactIndex - index);

          const opacity = gsap.utils.clamp(
            0,
            1,
            1 - distance * 2.8
          );

          gsap.to(item, {
            opacity,
            duration: 0.2,
            overwrite: true,
          });
        });

        changeImage(activeIndex);
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => {
            const height = getItemHeight();

            return `+=${(total - 1) * height + height * 1.15}`;
          },
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            updateActiveItem(self.progress);
          },
        },
      });

      tl.to(
        numberTrack,
        {
          y: () => -(total - 1) * getItemHeight(),
          duration: total - 1,
          ease: "none",
        },
        0
      );

      tl.to(
        leftTrack,
        {
          y: () => -(total - 1) * getItemHeight(),
          duration: total - 1,
          ease: "none",
        },
        0
      );

      tl.to(
        rightTrack,
        {
          y: () => -(total - 1) * getItemHeight(),
          duration: total - 1,
          ease: "none",
        },
        0
      );

      image.src = stats[0].image;

      gsap.set(image, {
        opacity: 1,
        scale: 1,
      });

      ScrollTrigger.refresh();
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      className="stats-showcase"
      ref={sectionRef}
    >
      <div className="stats-stage">
        <div className="stats-tagline">
          Where passion meets precision
        </div>

        <div className="stats-left-window">
          <div
            className="stats-left-track"
            ref={leftTrackRef}
          >
            {stats.map((item, index) => (
              <div
                className="stats-left-item"
                key={index}
                ref={(el) => {
                  leftItemRefs.current[index] = el;
                }}
              >
                <h2>{item.title}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className="stats-image-window">
          <div className="stats-image-inner">
            <img
              ref={imageRef}
              src={stats[0].image}
              alt={stats[0].title}
            />
          </div>
        </div>

        <div className="stats-number-window">
          <div
            className="stats-number-track"
            ref={numberTrackRef}
          >
            {stats.map((item, index) => (
              <div
                className="stats-number-item"
                key={index}
                ref={(el) => {
                  numberRefs.current[index] = el;
                }}
              >
                {item.number}
              </div>
            ))}
          </div>
        </div>

        <div className="stats-right-window">
          <div
            className="stats-right-track"
            ref={rightTrackRef}
          >
            {stats.map((item, index) => (
              <div
                className="stats-right-item"
                key={index}
                ref={(el) => {
                  rightItemRefs.current[index] = el;
                }}
              >
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="stats-final">
          <button
            className="stats-button"
            type="button"
          >
            <span className="stats-button-text">
              GET TO KNOW US
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default StatsShowcase;