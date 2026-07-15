// gsap.to("#box1",{
//     x:1200,
//     duration:2,
//     delay:1,
//     rotate:360,
//     backgroundColor:"blue",
//     borderRadius:"50%",
//     scale:1.2
// })
// gsap.to("#box2",{
//    x:500,
//    y:500,
//    duration:2,
//    delay:1,
//    scale:1.2 
// })





// gsap.from("h1",{
//     // color:"red",
//     duration:2,
//     delay:1,
//     opacity:0,
//     y:70,
//     stagger:0.3,  //for getting head lines one by one
//     // stagger:-1
// })

// gsap.to("h1",{
// //    opacity:0,
//     // duration:2,
//     // delay:1,
//     // y:400
// })






// gsap.to("#box",{
//  x:1000,
//     duration:2,
//     delay:1,
// rotate:360,
// // repeat:1,
// repeat:-1,  //for infinite
// yoyo:true
// })



// gsap.to("#box3",{
//     x:1500,
//     duration:2,
//     delay:1
// })
// gsap.to("#box4",{
//     x:1500,
//     duration:2,
//     delay:3
// })
// gsap.to("#box5",{
//     x:1500,
//     duration:2,
//     delay:5
// })



// gsap.to(".box6",{
//     x:1200,
//     duration:2,
//     delay:1,
//     stagger:1,
//     repeat:-1,
//     yoyo:true
// })

// gsap.fromTo("#box",
// {
//   x:0
// },
// {
//     x:800,
//     duration:2
// });


                                                 // easing properties

// gsap.to("#easebox1",{
//     duration:2,
//     y:-400,
//     repeat:-1,
//     yoyo:true,
//     ease:"back.in(1.7)"
// })
// gsap.to("#easebox2",{
//     duration:2,
//     y:-400,
//     repeat:-1,
//     yoyo:true,
//     ease:"power2.in"
    
// })
// gsap.to("#easebox3",{
//     duration:2,
//     y:-400,
//     repeat:-1,
//     yoyo:true,
//    ease: "elastic.in(1,0.4)"
// })
// gsap.to("#easebox4",{
//     duration:2,
//     y:-400,
//     repeat:-1,
//     yoyo:true,
//   ease: "expo.in"
// })


gsap.to("#easebox1",{
    duration:5,
    y:-400,
    repeat:-1,
    yoyo:true,
    ease:"power1.out"
})
gsap.to("#easebox2",{
    duration:5,
    y:-400,
    repeat:-1,
    yoyo:true,
    ease:"back.in(1)"
    
})
gsap.to("#easebox3",{
    duration:5,
    y:-400,
    repeat:-1,
    yoyo:true,
    ease:"elastic.in(1,0.3)"
})
gsap.to("#easebox4",{
    duration:5,
    y:-400,
    repeat:-1,
    yoyo:true,
 ease:"expo.in"
})


                                                        //SplitText

gsap.registerPlugin(SplitText);

const spliting1 = SplitText.create("#nav h2",{
  type:"words"
});
gsap.from(spliting1.words, {
        y: -80,
    opacity: 0,
    // stagger: 0.05,
    duration: 1,
    // ease: "power3.out"

})

const spliting2 = SplitText.create("#navlinks h3",{
  type:"words"
});
gsap.from(spliting2.words, {
        y: -80,
    opacity: 0,
    // stagger: 0.05,
    duration: 1,
    // ease: "power3.out"

})
const spliting3 = SplitText.create("#herosection h1",{
  type:"chars"
});
gsap.from(spliting3.chars, {
     y: -80,
    opacity: 0,
    // stagger: 0.05,
    duration: 1,
    // ease: "power3.out"

})
gsap.to(".gt-strtd-btn",{
    y:70,
    duration:1,

})


                                 //Cards
gsap.from(".card-col",{
    x:-250,
    opacity:0,
    scale:0.9,

    duration:1.2,
  delay:3,
    stagger:0.5,
    ease:"expo.out"
});





                                 ///Loading Effect
gsap.from("#loader-kot i",{
    scale:0,
    opacity:0,
    duration:1,
    ease:"back.out(1)"
});

gsap.to("#loader-kot i",{
    scale:1.0,
    duration:1,
    repeat:-1,
    yoyo:true,
    ease:"power1.inOut"
});

setTimeout(()=>{
    gsap.to("#loader-kot",{
     opacity:0,
    duration:1,
    onComplete(){
    document.getElementById("loader-kot").style.display="none";
        }
    });
},3000);








// Button hover/press content
                       //1
const btn1 = document.querySelector("#btn1");
btn1.addEventListener("mouseenter",()=>{
gsap.to(btn1,{
scale:1.1,
duration:0.3,
ease:"power2.out"
})

})

btn1.addEventListener("mouseleave",()=>{
gsap.to(btn1,{
scale:1,
duration:0.3,
ease:"power2.out"
})

})

                      //2
const btn2=document.querySelector("#btn2");
btn2.addEventListener("mouseenter",()=>{
gsap.to(btn2,{
y:-10,
duration:.3,
ease:"power2.out"
})
})
btn2.addEventListener("mouseleave",()=>{
gsap.to(btn2,{
y:0,
duration:.3,
ease:"power2.out"
})

})

                //3
const btn3=document.querySelector("#btn3");
btn3.addEventListener("mouseenter",()=>{
gsap.to(btn3,{
scale:1.05,
boxShadow:"0px 0px 30px #2563eb",
duration:.4
})
})
btn3.addEventListener("mouseleave",()=>{
gsap.to(btn3,{
scale:1,
boxShadow:"0px 0px 0px #2563eb",
duration:.4
})
})

                            ///4
const btn4=document.querySelector("#btn4");
btn4.addEventListener("mousedown",()=>{
gsap.to(btn4,{
scale:.9,
duration:.15,
ease:"power2.out"
})
})
btn4.addEventListener("mouseup",()=>{
gsap.to(btn4,{
scale:1,
duration:.2,
ease:"back.out(2)"
})
})

                          //5
const btn5=document.querySelector("#btn5");
btn5.addEventListener("click",()=>{
gsap.fromTo(btn5,
{
scale:1
},
{
scale:1.2,
duration:.2,
yoyo:true,
repeat:1,
ease:"back.out(3)"
})
})














                                                                // //timeline
// var tl = gsap.timeline()
// tl.from("#nav h2",{
//     y:-30,
//     opacity:0,
//     duration:1,
//     delay:0.2
// })
// tl.from("#navlinks h3",{
//     y:-30,
//     opacity:0,
//     duration:1,
//     stagger:0.2
// })
// tl.from("#herosection h1",{
//     y:30,
//     opacity:0,
//     duration:1,
//     scale:0.2
// })






