gsap.registerPlugin(ScrollTrigger);
const lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);


gsap.from("#page2",{
    scale:0.9,
    opacity:0,

    scrollTrigger:{
        trigger:"#page2",
        start:"top 80%",
        scrub:true
    }
})
// gsap.from("#page2",{
//     clipPath:"inset(100% 0 0 0)",

//     scrollTrigger:{
//         trigger:"#page2",
//         start:"top 80%",
//         scrub:true
//     }
// })

// gsap.from("#page2", {
//     opacity: 0,
//     duration: 1.5,
//     ease: "power2.out",

//     scrollTrigger: {
//         trigger: "#page2",
//         start: "top 80%",
//         end: "top 50%",
//         scrub: 1,
//         markers: true
//     }
// });
// gsap.from("#page2",{
//     opacity:0,
//     y:100,

//     scrollTrigger:{
//         trigger:"#page2",
//         start:"top 80%"
//     }
// })
gsap.from("#page3",{
    opacity:0,
    filter:"blur(60px)",

    scrollTrigger:{
        trigger:"#page2",
        start:"top 50%",
        scrub:true
    }
})
gsap.from("#page4",{
    y:150,
    opacity:0,

    scrollTrigger:{
        trigger:"#page2",
        start:"top 80%",
        end:"top 40%",
        scrub:1
    }
})


gsap.from("#page1 #box",{
    duration:1,
    scale:0,
    rotate:360,
    delay:1
})
gsap.from("#page2 #box",{
    duration:1,
    scale:0,
    rotate:360,
    delay:0.6,
    scrollTrigger:{
        trigger:"#page2 #box",
        toggleActions:"play reverse play reverse",
        // scroller:"body",
        markers:true,
        start:"top 60%",
        scrub:2
    }
})

gsap.from("#page3 h1",{
    x:500,
    duration:1,
    scrollTrigger:{
    trigger:"#page3 h1",
    //  scroller:"body",
     toggleActions:"play reverse play reverse"
      
    }
})
gsap.from("#page3 h2",{
    x:-500,
    duration:1,
    scrollTrigger:{
        trigger:"#page3 h2",
        //  scroller:"body",
         toggleActions:"play reverse play reverse"
    }
})
// gsap.to("#page4 h1",{
//     // transform: "translateX(-150%)",
//     x:"-150%",
//     ease:"none",
//     scrollTrigger:{
//     trigger:"#page4",
//      scroller:"body",
//      toggleActions:"play reverse play reverse",
//      scrub:2,
//       start:"top top",
//         end: "+=5500",
//     //  start: "top 0%",
//     //  end:"top -150%",
//      pin:true,
//      markers:true
      
//     }
// })
  
const heading = document.querySelector("#page4 h1");

gsap.to(heading, {
    x: -(heading.scrollWidth - window.innerWidth),
    ease: "none",
    scrollTrigger: {
        trigger: "#page4",
        start: "top top",
        end: () => "+=" + heading.scrollWidth,
        pin: true,
        scrub: 2,
        markers: true,
        invalidateOnRefresh:true
    }
});

gsap.from("#page5 img",{
    scale:1.1,
    duration:1,
    scrollTrigger:{
        trigger:"#page5",
        scrub:1,
        start:"top 80%",
          toggleActions:"play reverse play reverse",
        markers:true
    }
})