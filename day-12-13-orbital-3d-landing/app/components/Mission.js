"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MissionScene from "./MissionScene";
gsap.registerPlugin(ScrollTrigger);
export default function Mission() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      // EYEBROW
      gsap.fromTo(
        eyebrowRef.current,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
          },
        },
      );
      // MAIN TITLE
      gsap.fromTo(
        titleRef.current,
        {
          y: 100,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
          },
        },
      );
      // DESCRIPTION
      gsap.fromTo(
        descriptionRef.current,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
          },
        },
      );
      // BUTTON
      gsap.fromTo(
        buttonRef.current,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
          },
        },
      );
    }, section);
    return () => {
      ctx.revert();
    };
  }, []);
  return (
    <section ref={sectionRef} className="mission-section">
      {/* ================================= */}
      {/* 3D BACKGROUND */}
      {/* ================================= */}
      <div className="mission-background">
        <MissionScene />
      </div>
      {/* ================================= */}
      {/* DARK OVERLAY */}
      {/* ================================= */}
      <div className="mission-overlay" />
      {/* ================================= */}
      {/* CONTENT */}
      {/* ================================= */}
      <div className="mission-content">
        <p ref={eyebrowRef} className="mission-eyebrow">
          OUR MISSION / 01
        </p>
        <h2 ref={titleRef} className="mission-title">
          BEYOND
          <br />
          EARTH.
        </h2>
        <p ref={descriptionRef} className="mission-description">
          We are building the next generation of spacecraft designed to take
          humanity further than ever before.
        </p>
        <button ref={buttonRef} className="mission-button">
          DISCOVER OUR MISSION
          <span>→</span>
        </button>
      </div>
      {/* ================================= */}
      {/* BOTTOM INFO */}
      {/* ================================= */}
      <div className="mission-bottom">
        <div>
          <span>ORBITAL</span>
          <p>SPACE EXPLORATION</p>
        </div>
        <div>
          <span>01</span>
          <p>OUR VISION</p>
        </div>
        <div>
          <span>2026</span>
          <p>THE FUTURE</p>
        </div>
      </div>
    </section>
  );
}
