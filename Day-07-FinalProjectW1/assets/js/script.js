gsap.registerPlugin(ScrollTrigger);
const lenis = new Lenis({
  duration:1.2,
  smoothWheel:true,
  syncTouch:true
});
// function raf(time){
//   lenis.raf(time);
//   requestAnimationFrame(raf);
// };
// requestAnimationFrame(raf);
                              //for syncing lenis with scrolltrigger:
lenis.on("scroll",ScrollTrigger.update);
gsap.ticker.add((time)=>{
  lenis.raf(time*1000);
});
gsap.ticker.lagSmoothing(0)
                              // for cursor:
const cursor= document.querySelector(".cursor")
const cursorX = gsap.quickTo(cursor,"left",{
  duration:0.35,
  ease:"power3.out"
})
const cursorY = gsap.quickTo(cursor,"top",{
  duration:0.35,
  ease:"power3.out"
})
window.addEventListener("mousemove",(e)=>{
  cursorX(e.clientX)
  cursorY(e.clientY)
})

const cursorTargets= document.querySelectorAll(
  "button,.project-card,.service-item,.value-card,.magnetic"
)
cursorTargets.forEach((item)=>{
  item.addEventListener("mouseenter",()=>{
    cursor.classList.add("active")
  })
 
  item.addEventListener("mouseleave",()=>{
    cursor.classList.remove("active")
  })
})
                              //for loader

const loader = document.querySelector(".loader")
const counter = document.querySelector(".counter")
const loaderProgress= document.querySelector(".loader-progress")
const loaderTimeline= gsap.timeline()

let count ={ value:0}
loaderTimeline.to(count,{
  value:100,
  duration:2,
  ease:"power2.inOut",
  onUpdate:()=>{
    counter.textContent=Math.round(count.value)
    gsap.set(loaderProgress,{
      width:`${count.value}%`
    })
  }
})   
loaderTimeline.to(loader,{
  yPercent:-100,
  duration:1.2,
  ease:"power4.inOut",
  delay:0.3,
  onComplete:()=>{
    document.body.style.overflow="";
    heroIntro()
  }
})
                      // for hero section
function heroIntro(){
  const tl=gsap.timeline()
  tl.from(".navbar",{
    y:-50,
    opacity:0,
    duration:0.8,
    ease:"power3.out"
  })

.from(".hero-top span",{
    y:30,
    opacity:0,
    stagger:0.1,
    duration:0.7
},"-=0.5")
.from(".hero-title .line",{
    yPercent:120,
    stagger:0.12,
    duration:1.2,
    ease:"power4.out"
},"-=0.4")
.from(".hero-reveal",{
    y:30,
    opacity:0,
    duration:0.8
},"-=0.7")
.from(".hero-description",{
    y:30,
    opacity:0,
    duration:0.8
},"-=0.5")
.from(".circle-cta",{
    scale:0,
    rotation:-90,
    duration:1,
    ease:"back.out(1.7)"
},"-=0.7")
.from(".scroll.indicator",{
    opacity:0,
    duration:0.6,
    y:20
},"-=0.4")
}
                  //for magnetic effect:
const magneticElements=document.querySelectorAll(".magnetic")
magneticElements.forEach((element)=>{
  element.addEventListener("mousemove",(e)=>{
  const rect =element.getBoundingClientRect()
  const x=e.clientX-rect.left-rect.width/2;
  const y=e.clientY-rect.top-rect.height/2;

  gsap.to(element,{
    x:x*0.25,
    y:y*0.25,
    duration:0.4,
    ease:"power3.out"
  })
  })
   element.addEventListener("mouseleave",()=>{
    gsap.to(element,{
      x:0,
      y:0,
      duration:0.8,
      ease:"elastic.out(1,0.3)"
    })
   })
})

//marquee part:
gsap.to(".marquee-track",{
  xPercent:-30,
  ease:"none",
  scrollTrigger:{
    trigger:".marquee-section",
    start:"top bottom",
    end:"bottom top",
    scrub:1
  }
});

                           //for parallax effect of image:
gsap.to(".about-image img",{
  xPercent:-15,
  ease:"none",
  scrollTrigger:{
    trigger:".about-image-wrap",
    start:"top bottom",
    end:"bottom top",
    scrub:1
  }
})
                         //for heading-reveal:
                         
gsap.to(".about-heading",{
  xPercent:100,
  opacity:0,
  duration:1,
  delay:2,
  scrollTrigger:{
    trigger:".about-heading",
    start:"top 80%",
     end: "bottom 20%",
    scrub: 1
  }
})
                          //for hovering service part:
const services=document.querySelectorAll(".service-item")
services.forEach((service)=>{
  const preview=service.querySelector(".service-preview")
  if (!preview) return;
 service.addEventListener("mouseenter",()=>{
    gsap.to(preview,{
      opacity:1,
      scale:1,
      rotation:0,
      duration:0.5,
      ease:"power3.out"
    })
 })

  service.addEventListener("mouseleave",()=>{
    gsap.to(preview,{
      opacity:0,
      scale:0.7,
      rotation:8,
      duration:0.4,
      ease:"power2.out"
    })
 })
})
                             //for horizontal scroll:
const horizontalTrack= document.querySelector(".horizontal-track")
function horizontalScroll(){
  if(window.innerWidth <= 900){
    gsap.set(horizontalTrack,{
      clearProps:"all"
    })
    return;
  }
  const totalWidth =horizontalTrack.scrollWidth -
    window.innerWidth;
  gsap.to(horizontalTrack, {
    x: -totalWidth,
    ease: "none",
    scrollTrigger: {
      trigger: ".horizontal-wrapper",
      start: "top top",
      end: () => `+=${totalWidth}`,
      scrub: 1,
      pin: true,
      invalidateOnRefresh: true
    }
  });
}
horizontalScroll()
                             //for pinned section for animation
const processTitle= document.querySelector(".process-title")
const processCounter= document.querySelector(".process-counter")
const processCircle= document.querySelector(".process-circle")
const processTimeline= gsap.timeline({
  scrollTrigger:{
    trigger:".process-section",
    start:"top top",
    end:"bottom bottom",
    scrub:1
  }
})
processTimeline.to(processTitle,{
  textContent:"Create",
  duration:1
})
.to(processCounter,{
  textContent:"02 / 04",
  duration:1
},"<")
.to(processCircle,{
  rotation:180,
  scale:1.2,
  duration:1
},"<")
.to(processTitle,{
  textContent:"Build",
  duration:1
})
.to(processCounter,{
  textContent:"03 / 04",
  duration:1
},"<")
.to(processCircle,{
  rotation:360,
  borderRadius:"20%",
  duration:1
},"<")
.to(processTitle,{
  textContent:"Move",
  duration:1
})
.to(processCounter,{
  textContent:"04 / 04",
  duration:1
},"<")
.to(processCircle,{
  rotation:540,
  scale:0.8,
  duration:1
},"<")
                           // for tilt cards:
const tiltCards = document.querySelectorAll(".value-card")
tiltCards.forEach((card) => {

  card.addEventListener("mousemove", (e) => {

    const rect = card.getBoundingClientRect();

    const x =
      (e.clientX - rect.left) /
      rect.width;

    const y =
      (e.clientY - rect.top) /
      rect.height;


    const rotateX =
      (y - .5) * -10;

    const rotateY =
      (x - .5) * 10;


    gsap.to(card, {

      rotateX,
      rotateY,

      duration: .4,

      ease: "power2.out",

      transformPerspective: 800

    });

  });


  card.addEventListener("mouseleave", () => {

    gsap.to(card, {

      rotateX: 0,
      rotateY: 0,

      duration: .7,

      ease: "elastic.out(1, .4)"

    });

  });

});
                      // for statement reveal part:
gsap.from(".statement h2",{
  y:150,
  opacity:0,
  duration:1.2,
  scrollTrigger:{
    trigger:".statement",
    start:"top 70%",
    toggleActions:"play none none reverse"
  }
})
                    // for contact animation:
gsap.from(".contact h2",{
  y:150,
  opacity:0,
  duration:1.2,
  ease:"power4.out",
  scrollTrigger:{
    trigger:".contact",
    start:"top 70%",
    toggleActions:"play none none reverse"
  }
})
                       // for contact ORB part:
gsap.from(".contact-orb",{
  y:-150,
  rotation:180,
  ease:"none",
  scrollTrigger:{
    trigger:".contact",
    start:"top bottom",
    end:"bottom top",
    scrub:1
  }
})
                      //for mobile menu section:
const menuBtn = document.querySelector(".menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");

let menuOpen = false;


const menuTimeline = gsap.timeline({
  paused: true
});


menuTimeline

  .set(mobileMenu, {

    display: "block"

  })

  .from(".mobile-links a", {

    y: 100,

    opacity: 0,

    stagger: .1,

    duration: .7,

    ease: "power4.out"

  })

  .from(".mobile-footer", {

    opacity: 0,

    duration: .5

  }, "-=.3");


menuBtn.addEventListener("click", () => {

  menuOpen = !menuOpen;

  if (menuOpen) {

    menuTimeline.play();

    document.body.classList.add("menu-open");

  } else {

    menuTimeline.reverse();

    document.body.classList.remove("menu-open");

  }

});

 //close menu on link

document.querySelectorAll(".mobile-links a").forEach(link => {

  link.addEventListener("click", () => {

    menuOpen = false;

    menuTimeline.reverse();

    document.body.classList.remove("menu-open");

  });

});
                   // for reduced motion:
const mm= gsap.matchMedia()
mm.add("(prefers-reduced-motion:reduce)",()=>{
  gsap.globalTimeline.timeScale(100)
  lenis.stop();
  ScrollTrigger.getAll().forEach(
    (trigger)=>trigger.kill()
  );
  gsap.set(
    [
      ".hero-title .line",
      ".hero-reveal",
      ".hero-description",
      ".circle-cta",
      ".scroll-indicator",
      ".about-heading",
      ".statement h2",
      ".contact h2"
    ],
    {
      clearProps:"all"
    }
  )
})
                    //for responsive animation:
mm.add("(min-width:901px",()=>{
  gsap.to(".hero-orb",{
    x:100,
    y:80,
    ease:"none",
    scrollTrigger:{
      trigger:".hero",
      start:"top top",
      end:"bottom top",
      scrub:1
    }
  });
});
                          //for refresh:
window.addEventListener("resize",()=>{
  ScrollTrigger.refresh()
})