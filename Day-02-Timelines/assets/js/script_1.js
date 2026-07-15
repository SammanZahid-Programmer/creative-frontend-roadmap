                  //Practice-1 

var tmln = gsap.timeline()
tmln.from(".cb-navbar .cb-logo",{
y:30,
opacity:0,
duration:1
})
tmln.from(".cb-navbar .cb-nav-links a",{
y:30,
opacity:0,
duration:1,
stagger:0.2
},"<")
tmln.from(".cb-main-heading",{
y:30,
opacity:0,
duration:1,
stagger:0.2
},"<")

const replybtn = document.querySelector(".exp-btn");
replybtn.addEventListener("click", function(){
    tmln.restart();
})