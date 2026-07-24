let main= document.querySelector(".main")
let box= document.querySelector(".box")
let img=document.querySelector(".imgbox")

                                         //quickTo()
// let boxX= gsap .quickTo(box,"x",{
//     duration:0.3
// })
// let boxY= gsap .quickTo(box,"y",{
//     duration:0.3
// })
// main.addEventListener("mousemove", function(e){
//     boxX(e.x);
//     boxY(e.y);
// });
                                          //gsapTo()
// main.addEventListener("mousemove", function(e){
//     gsap.to(box,{
//         x:e.x,
//         y:e.y
//     })
// })


                                                //quicksetter()

// let setterX = gsap.quickSetter(box,"x","px");
// let setterY = gsap.quickSetter(box,"y","px");
// main.addEventListener("mousemove",function(e){
//         setterX(e.x);
//         setterY(e.y);
// })

                                             //lerp effect
let trgtX = 0;
let trgtY = 0;
let crrntX =0;
let crrntY = 0;
let speed =0.12;
window.addEventListener("mousemove", function(e){
    trgtX = e.clientX;
    trgtY = e.clientY;
});
function lrpCursor(){
    crrntX = crrntX+(trgtX-crrntX)*speed;
    crrntY = crrntY+(trgtY-crrntY)*speed;
    gsap. set(box,{
        x: crrntX,
        y:crrntY
    })
    requestAnimationFrame(lrpCursor);
}
lrpCursor();

img.addEventListener("mouseenter", function(e){
    box.innerText="View More",
    gsap.to(box,{
        scale:4,
        duration: 0.3,
        backgroundColor:"rgb(212, 84, 105)" ,
        border:"1px solid rgb(241, 90, 115)"
        
    })
})
img.addEventListener("mouseleave", function(e){
      box.innerText="",
    gsap.to(box,{
        scale:1,
        duration: 0.3,
         backgroundColor:"white",
         border:"none"
    })
})


                         //magnetic effects

let mgntic_btn = document.querySelector(".mgntic_btn")
let att_box = document.querySelector(".att_box")
let att_img = document.querySelector(".att_img")
let tlt_card = document.querySelectorAll(".tlt_card")


mgntic_btn.addEventListener("mousemove",function(e){
    let rect=mgntic_btn.getBoundingClientRect();
    let centerX = rect.left+ rect.width/2;
    let centerY = rect.top + rect.height/2;
    let distX = e.clientX - centerX;
    let distY = e.clientY - centerY;
    gsap.to(mgntic_btn,{
        x:distX*0.3,
        y:distY*0.3,
        duration:0.3
    });
});
mgntic_btn.addEventListener("mousemove",function(e){
      gsap.to(mgntic_btn,{
        x:0,
        y:0,
        duration:0.3
    });
});
// IMAGE FOLLOWS CURSOR
att_box.addEventListener("mousemove",function(e){
     let rect=mgntic_btn.getBoundingClientRect();
    let mouseX = e.clientX - rect.left - rect.width/2;
    let mouseY = e.clientY - rect.top - rect.height/2;

    gsap.to(att_img,{
        x: mouseX*0.12,
        y: mouseY*0.12,
        duration:0.5,
        ease:"power3.out"
    });
});
att_box.addEventListener("mouseleave", function(){
    gsap.to(att_img,{
        x:0, y:0,
        duration:0.6,
        ease:"power3.out"
    });
});

// TILT CARDS
tlt_card.forEach(function(card){
    card.addEventListener("mousemove", function(e){
        let rect = card.getBoundingClientRect();
        let mouseX = e.clientX - rect.left;
        let mouseY = e.clientY - rect.top;
        let rotateX = (mouseY - rect.height/2)/15;
        let rotateY = (rect.width/2 - mouseX)/15;

        gsap.to(card,{
            rotateX: rotateX,
            rotateY: rotateY,
            duration:0.3,
            ease:"power2.out"
        });
    });
    card.addEventListener("mouseleave", function(){
        gsap.to(card,{
            rotateX:0, rotateY:0,
            duration:0.6,
            ease:"power3.out"
        });
    });
});










