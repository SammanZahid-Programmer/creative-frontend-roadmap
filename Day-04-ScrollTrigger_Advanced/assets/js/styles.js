gsap.registerPlugin(ScrollTrigger);
gsap.to("#progBar",{
    width:"100%",
    ease:"none",
    scrollTrigger:{
        trigger:document.body,
        start: "top top",
        end:"bottom bottom",
        scrub:3
    }
});



gsap.to(".hero_bg",{
    y:280,
    // scale:1.2,
     scrollTrigger:{
        trigger:".hero_section",
        start:"top 0%",
        end:"bottom top",
        scrub:2
     }
})

gsap.to(".left_crcle",{
    y:-180,
    x:100,
     scrollTrigger:{
        trigger:".hero_section",
        start:"top 0%",
        end:"bottom top",
        scrub:2
     }

})
gsap.to(".right_crcle",{
    y:280,
    x:140,
    rotate:-170,
    scrollTrigger:{
        trigger:".hero_section",
        start:"top 0%",
        end:"bottom top",
        scrub:2
    }
})

gsap.to(".main_cntnt",{
    y:-195,
    opacity:0,
    scrollTrigger:{
        trigger:".hero_section",
        start:"top 0%",
        end:"top 70%",
        scrub:2
    }
})


let gallery_section= document.querySelector(".gallery_section")
let gal_box= document.querySelector(".gal_box")

let horiDistance= gal_box.scrollWidth-window.innerWidth;
gsap.to(gal_box,{
    x:-horiDistance,
    scrollTrigger:{
        trigger:gallery_section,
        start:"top 0%",
        end:()=>`+=${horiDistance}`,
        pin:true,
        scrub:2,
        invalidateOnRefresh:true
    }
})


const stryTimeline = gsap.timeline({
    scrollTrigger:{
        trigger:".stryTll_section",
        start:"top top",
        end:"bottom bottom",
        pin:".stry_main",
        scrub:2,
        invalidateOnRefresh:true
    }
})

stryTimeline.to(".stry_text:nth-child(1)",{
    opacity:0.2,
    duration:1
})
stryTimeline.to(".stry_text:nth-child(2)",{
    opacity:1,
    duration:1
},"<")
stryTimeline.to(".img1",{
    opacity:0,
    duration:1
},"<")
stryTimeline.to(".img2",{
    opacity:1,
    duration:1
},"<")
stryTimeline.to(".stry_text:nth-child(2)",{
    opacity:0.2,
    duration:1
})
stryTimeline.to(".stry_text:nth-child(3)",{
    opacity:1,
    duration:1
},"<")
stryTimeline.to(".img2",{
    opacity:0,
    duration:1
},"<")
stryTimeline.to(".img3",{
    opacity:1,
    duration:1
},"<")