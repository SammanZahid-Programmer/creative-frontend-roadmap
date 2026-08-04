// "use client";
// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);
// export default function Technology() {
// const sectionRef = useRef(null);
// const textRef = useRef(null);
// const lineRef = useRef(null);
// useEffect(() => {
// const section = sectionRef.current;
// const text = textRef.current;
// const line = lineRef.current;
// if (!section || !text || !line) {
//   return;
// }
// const ctx = gsap.context(() => {
//   // =====================================
//   // CALCULATE HORIZONTAL DISTANCE
//   // =====================================
//   const getScrollAmount = () => {
//     return Math.max(
//       0,
//       text.scrollWidth - window.innerWidth
//     );
//   };
//   // =====================================
//   // MAIN PINNED ANIMATION
//   // =====================================
//   const timeline = gsap.timeline({
//     scrollTrigger: {
//       trigger: section,
//       start: "top top",
//       end: () => {
//         return `+=${window.innerHeight * 3}`;
//       },
//       pin: true,
//       scrub: 1,
//       anticipatePin: 1,
//       invalidateOnRefresh: true,
//     },
//   });
//   // =====================================
//   // HORIZONTAL TEXT MOVEMENT
//   // =====================================
//   timeline.to(
//     text,
//     {
//       x: () => {
//         return -getScrollAmount();
//       },
//       ease: "none",
//       duration: 3,
//     }
//   );
//   // =====================================
//   // PROGRESS LINE
//   // =====================================
//   timeline.to(
//     line,
//     {
//       scaleX: 1,
//       ease: "none",
//       duration: 3,
//     },
//     0
//   );
//   // =====================================
//   // BACKGROUND COLOR CHANGE
//   // =====================================
//   timeline.to(
//     section,
//     {
//       backgroundColor: "#172a46",
//       duration: 1,
//       ease: "none",
//     },
//     1
//   );
//   timeline.to(
//     section,
//     {
//       backgroundColor: "#321c42",
//       duration: 1,
//       ease: "none",
//     },
//     2
//   );
//   // =====================================
//   // REFRESH SCROLLTRIGGER
//   // =====================================
//   ScrollTrigger.refresh();
// }, section);
// // =====================================
// // RESIZE
// // =====================================
// const handleResize = () => {
//   ScrollTrigger.refresh();
// };
// window.addEventListener(
//   "resize",
//   handleResize
// );
// // =====================================
// // CLEANUP
// // =====================================
// return () => {
//   window.removeEventListener(
//     "resize",
//     handleResize
//   );
//   ctx.revert();
// };
// }, []);
// return ( <section
//    ref={sectionRef}
//    className="technology-section"
//  >
// {/* ================================= */}
// {/* TOP INFORMATION */}
// {/* ================================= */}
// ```
//   <div className="technology-top">
//     <p>
//       ORBITAL TECHNOLOGY
//     </p>
//     <span>
//       2026 / 01—03
//     </span>
//   </div>
//   {/* ================================= */}
//   {/* CENTER TEXT WRAPPER */}
//   {/* ================================= */}
//   <div className="technology-text-wrapper">
//     <div
//       ref={textRef}
//       className="technology-big-text"
//     >
//       <span className="text-white">
//         EXPLORE
//       </span>
//       <span className="text-blue">
//         BEYOND
//       </span>
//       <span className="text-white">
//         THE
//       </span>
//       <span className="text-purple">
//         UNKNOWN
//       </span>
//     </div>
//   </div>
//   {/* ================================= */}
//   {/* BOTTOM INFORMATION */}
//   {/* ================================= */}
//   <div className="technology-bottom">
//     <p>
//       THE FUTURE OF HUMAN EXPLORATION
//     </p>
//     <p>
//       SCROLL TO DISCOVER
//     </p>
//   </div>
//   {/* ================================= */}
//   {/* PROGRESS LINE */}
//   {/* ================================= */}
//   <div className="technology-line">
//     <div
//       ref={lineRef}
//       className="technology-line-progress"
//     ></div>
//   </div>
// </section>
// );
// }
