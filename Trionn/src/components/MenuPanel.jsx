import { useEffect } from "react";
import gsap from "gsap";
export default function MenuPanel({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const panel = document.querySelector(".menu-panel");
    const items = document.querySelectorAll(".menu-item");
    const timeline = gsap.timeline();
    timeline.fromTo(
      panel,
      {
        x: "105%",
      },
      {
        x: "0%",
        duration: 0.8,
        ease: "power4.out",
      },
    );
    timeline.fromTo(
      items,
      {
        y: 30,
        opacity: 0,
        filter: "blur(8px)",
      },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.65,
        stagger: 0.08,
        ease: "power3.out",
      },
      "-=0.35",
    );
    return () => {
      timeline.kill();
    };
  }, [open]);
  if (!open) return null;
  return (
    <aside className="menu-panel">
      {}
      <div className="menu-panel-top">
        <div className="panel-controls">
          <button className="panel-sound" aria-label="Sound">
            ◖×)
          </button>
          <button className="panel-talk">LET'S TALK</button>
          <button className="panel-close" onClick={onClose}>
            MENU
            <span>×</span>
          </button>
        </div>
      </div>
      {}
      <nav className="menu-navigation">
        <a href="#work" className="menu-item">
          Work
        </a>
        <a href="#services" className="menu-item">
          Services
        </a>
        <a href="#about" className="menu-item">
          About
        </a>
        <a href="#contact" className="menu-item">
          Contact
        </a>
      </nav>
      {}
      <button className="story-button">✦ THE TRIONN NAME STORY</button>
      {}
      <div className="panel-bottom">
        <div className="business">
          <span>BUSINESS ENQUIRY</span>
          <p>
            E. &nbsp;
            <a href="mailto:hello@trionn.com">hello@trionn.com</a>
          </p>
          <p>P. &nbsp; +91 9824182099</p>
        </div>
        <div className="socials">
          <span>SOCIAL</span>
          <div className="social-grid">
            <a href="#">LinkedIn</a>
            <a href="#">Facebook</a>
            <a href="#">Dribbble</a>
            <a href="#">Instagram</a>
          </div>
        </div>
      </div>
    </aside>
  );
}
