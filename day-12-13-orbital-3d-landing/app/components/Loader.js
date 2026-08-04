"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
export default function Loader() {
  const loader = useRef(null);
  const progress = useRef(null);
  useEffect(() => {
    const tl = gsap.timeline();
    tl.to(progress.current, {
      width: "100%",
      duration: 2,
      ease: "power2.inOut",
    })
      .to(loader.current, {
        yPercent: -100,
        duration: 1.2,
        ease: "power4.inOut",
      })
      .set(loader.current, {
        display: "none",
      });
  }, []);
  return (
    <div ref={loader} className="loader">
      <div className="loader-content">
        <p>ORBITAL</p>
        <div className="loader-bar">
          <div ref={progress} className="loader-progress" />
        </div>
        <span>INITIALIZING SYSTEM</span>
      </div>
    </div>
  );
}