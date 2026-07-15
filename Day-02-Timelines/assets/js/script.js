var menu= document.querySelector(".nav i")
var cross= document.querySelector(".sidebar i")
var tl= gsap.timeline()
tl.to(".sidebar",{
    right:0,
    duration:0.8
})
 
tl.from(".sidebar h3",{
    x:150,
    duration:0.7,
    stagger:0.5,
    opacity:0
})
tl.from(".sidebar i",{
    opacity:0
})

tl.pause()

menu.addEventListener("click", function(){
    tl.play()
})
cross.addEventListener("click", function(){
    tl.reverse()
})

var tlmain = gsap.timeline()
tlmain.from(".nav h2",{
    y:20,
    duration:1,
    opacity:0
})
tlmain.from(".nav i",{
    y:20,
    duration:1,
    opacity:0
},"<")
tlmain.from(".hero h1",{
    y:20,
    duration:1,
    opacity:0
})

 




