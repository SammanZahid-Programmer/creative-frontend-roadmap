const redMotion = document.querySelector(".box1")
const matchMotion = document.querySelector(".box2")
const matchMedia = gsap.matchMedia(); ///2X

//note:to observe the reduced-motion--->go to inspect,select cntrl+shift+P,then enter render and
//select Emulate CSS media features-reduced-motion:reduced and vice versa----->you will observe 
//rotation of box become stop

matchMedia.add("(prefers-reduced-motion:no-preference)", ()=>{
	gsap.to(redMotion,{
		rotation:360,
		duration:3,
		repeat:-1,
		ease:"none"
	});
});
matchMedia.add("(prefers-reduced-motion:reduce)",()=>{
	gsap.killTweensOf(redMotion);
     gsap.set(redMotion,{
		rotation:0
	 });
});

matchMedia.add("(min-width:768px)",()=>{
	gsap.fromTo(matchMotion,
		{
			x:-300
		},
		{
			x:300,
			duration:2,
			repeat:-1,
			yoyo:true,
			ease:"power1.inOut"
		}
)
})

matchMedia.add("(max-width:767px)",()=>{
 gsap.fromTo(matchMotion,
		{
			y:-200
		},
		{
			y:200,
			duration:2,
			repeat:-1,
			yoyo:true,
			ease:"power1.inOut"
		}
)
})

const auroraMenuToggle= document.querySelector(".aurora-menu-toggle");
const auroraMobileMenu= document.querySelector(".aurora-mobile-menu");
const auroraMenuLines= document.querySelectorAll(".aurora-menu-toggle span");
const auroraModal= document.querySelector(".aurora-modal");
const auroraModalOverlay= document.querySelector(".aurora-modal-overlay");
const auroraModalClose= document.querySelector(".aurora-modal-close");
const auroraOpenButtons= document.querySelectorAll(".aurora-open-modal");
const auroraForm= document.querySelector(".aurora-contact-form");
const auroraToast= document.querySelector(".aurora-toast");
const auroraCards= document.querySelectorAll(".aurora-card");
const auroraLoader= document.querySelector(".aurora-loader");
const auroraLoaderLine= document.querySelector(".aurora-loader_line");



const auroraLenis= new Lenis({
    smoothWheel:true,
    lerp:0.08
});
function auroraLenisAnimation(time){
    auroraLenis.raf(time);
    requestAnimationFrame(auroraLenisAnimation);
}
requestAnimationFrame(auroraLenisAnimation);

const auroraMM = gsap.matchMedia();
auroraMM.add("(prefers-reduced-motion:reduce)",()=>{
    gsap.set([".aurora-hero-content",
                ".aurora-hero-visual",
                ".aurora-card",
                ".aurora-section-heading",
                ".aurora-studio-content",
                ".aurora-cta-box"],
            {
                opacity:1,
                clearProps:"transform"
            });
           gsap.set(auroraLoader,{
                autoAlpha:0
            })
            const instantMenuOpen = () => {
           gsap.set(auroraMobileMenu, {
                y: 0,
                autoAlpha: 1
            });
       };
       const instantMenuClose = () => {
           gsap.set(auroraMobileMenu, {
                y: "-150%",
                autoAlpha: 0
            });
       };
       /* Modal instant state */
       const instantModalOpen = () => {
           gsap.set(auroraModalOverlay, {
                autoAlpha: 1
            });
           gsap.set(auroraModal, {
                scale: 1,
                autoAlpha: 1
            });
           auroraModal.setAttribute(
                "aria-hidden",
                "false"
            );
       };
       const instantModalClose = () => {
           gsap.set(auroraModalOverlay, {
                autoAlpha: 0
            });
           gsap.set(auroraModal, {
                scale: .8,
                autoAlpha: 0
            });
           auroraModal.setAttribute(
                "aria-hidden",
                "true"
            );
       };
       return () => {
           /*
            MatchMedia cleanup
            */
       };
})


auroraMM.add(
    "(prefers-reduced-motion: no-preference)",
    () => {
        //    LOADER ANIMATION
      const auroraLoaderTimeline =
            gsap.timeline();
       auroraLoaderTimeline
           .to(
                auroraLoaderLine,
                {
                    scaleX: 1,
                    duration: .8,
                    ease: "power2.inOut"
                }
            )
           .to(
                auroraLoader,
                {
                    yPercent: -100,
                    duration: .8,
                    ease: "power4.inOut"
                }
            );
            //    HERO INTRO
      const auroraHeroTimeline =
            gsap.timeline({
                delay: 1.1
            });
       auroraHeroTimeline
           .from(
                ".aurora-eyebrow",
                {
                    y: 25,
                    opacity: 0,
                    duration: .5
                }
            )
           .from(
                ".aurora-hero-title",
                {
                    y: 50,
                    opacity: 0,
                    duration: .7,
                    ease: "power3.out"
                },
                "-=.2"
            )
           .from(
                ".aurora-hero-description",
                {
                    y: 25,
                    opacity: 0,
                    duration: .5
                },
                "-=.3"
            )
           .from(
                ".aurora-hero-actions",
                {
                    y: 20,
                    opacity: 0,
                    duration: .5
                },
                "-=.25"
            )
           .from(
                ".aurora-hero-visual",
                {
                    scale: .9,
                    opacity: 0,
                    rotation: -5,
                    duration: .8,
                    ease: "power3.out"
                },
                "-=.6"
            );
            // HERO VISUAL FLOAT
      gsap.to(
            ".aurora-visual-card",
            {
                y: -12,
                duration: 2.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            }
        );
        //    ORBITS
      gsap.to(
            ".aurora-orbit--one",
            {
                rotation: 360,
                duration: 30,
                repeat: -1,
                ease: "none"
            }
        );
       gsap.to(
            ".aurora-orbit--two",
            {
                rotation: -360,
                duration: 40,
                repeat: -1,
                ease: "none"
            }
        );
        //  CARD HOVER SYSTEM
      auroraCards.forEach(
            (card) => {
               const icon =
                    card.querySelector(
                        ".aurora-card-icon"
                    );
               const arrow =
                    card.querySelector(
                        ".aurora-card-arrow"
                    );
            //    const glow =
            //         card.querySelector(
            //             "::after"
            //         );
               card.addEventListener(
                    "mouseenter",
                    () => {
                       gsap.to(
                            card,
                            {
                                y: -10,
                                duration: .35,
                                ease: "power2.out"
                            }
                        );
                       gsap.to(
                            icon,
                            {
                                scale: 1.12,
                                rotation: 8,
                                duration: .3,
                                ease: "back.out(1.5)"
                            }
                        );
                       gsap.to(
                            arrow,
                            {
                                x: 8,
                                duration: .3
                            }
                        );
                       gsap.to(
                            card,
                            {
                                boxShadow:
                                    "0 25px 60px rgba(36,70,60,.12)",
                                duration: .3
                            }
                        );
                   }
                );
               card.addEventListener(
                    "mouseleave",
                    () => {
                       gsap.to(
                            card,
                            {
                                y: 0,
                                duration: .45,
                                ease: "power3.out"
                            }
                        );
                       gsap.to(
                            icon,
                            {
                                scale: 1,
                                rotation: 0,
                                duration: .4
                            }
                        );
                       gsap.to(
                            arrow,
                            {
                                x: 0,
                                duration: .3
                            }
                        );
                       gsap.to(
                            card,
                            {
                                boxShadow:
                                    "0 0 0 rgba(0,0,0,0)",
                                duration: .3
                            }
                        );
                   }
                );
           }
        );
        //   BUTTON MICRO INTERACTION
      const auroraButtons =
            document.querySelectorAll(
                ".aurora-button, .aurora-nav-action"
            );
       auroraButtons.forEach(
            (button) => {
               button.addEventListener(
                    "mouseenter",
                    () => {
                       gsap.to(
                            button,
                            {
                                y: -3,
                                duration: .2,
                                ease: "power2.out"
                            }
                        );
                   }
                );
               button.addEventListener(
                    "mouseleave",
                    () => {
                       gsap.to(
                            button,
                            {
                                y: 0,
                                duration: .3
                            }
                        );
                   }
                );
               button.addEventListener(
                    "mousedown",
                    () => {
                       gsap.to(
                            button,
                            {
                                scale: .95,
                                duration: .1
                            }
                        );
                   }
                );
               button.addEventListener(
                    "mouseup",
                    () => {
                       gsap.to(
                            button,
                            {
                                scale: 1,
                                duration: .2
                            }
                        );
                   }
                );
           }
        );
       // MOBILE MENU
       let auroraMenuOpen = false;
       const auroraMenuTimeline =
            gsap.timeline({
                paused: true
            });
       auroraMenuTimeline
           .to(
                auroraMobileMenu,
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: .45,
                    ease: "power3.out"
                }
            )
           .to(
                auroraMenuLines[0],
                {
                    rotation: 45,
                    y: 6,
                    duration: .25
                },
                0
            )
           .to(
                auroraMenuLines[1],
                {
                    opacity: 0,
                    duration: .2
                },
                0
            )
           .to(
                auroraMenuLines[2],
                {
                    rotation: -45,
                    y: -6,
                    duration: .25
                },
                0
            );
       auroraMenuToggle.addEventListener(
            "click",
            () => {
               auroraMenuOpen =
                    !auroraMenuOpen;
               auroraMenuToggle.setAttribute(
                    "aria-expanded",
                    auroraMenuOpen
                );
               if (auroraMenuOpen) {
                   auroraMenuTimeline.play();
               } else {
                   auroraMenuTimeline.reverse();
               }
           }
        );
       //  MODAL
       const auroraModalTimeline =
            gsap.timeline({
                paused: true
            });
       auroraModalTimeline
           .to(
                auroraModalOverlay,
                {
                    autoAlpha: 1,
                    duration: .3
                }
            )
           .to(
                auroraModal,
                {
                    autoAlpha: 1,
                    scale: 1,
                    duration: .5,
                    ease: "back.out(1.5)"
                },
                "-=.1"
            );
       function auroraOpenModal() {
           auroraModalTimeline.play();
           auroraModal.setAttribute(
                "aria-hidden",
                "false"
            );
       }
       function auroraCloseModal() {
           auroraModalTimeline.reverse();
           auroraModal.setAttribute(
                "aria-hidden",
                "true"
            );
       }
       auroraOpenButtons.forEach(
            (button) => {
               button.addEventListener(
                    "click",
                    auroraOpenModal
                );
           }
        );
       auroraModalClose.addEventListener(
            "click",
            auroraCloseModal
        );
       auroraModalOverlay.addEventListener(
            "click",
            auroraCloseModal
        );
       //   ESCAPE CLOSE
       window.addEventListener(
            "keydown",
            (event) => {
               if (
                    event.key === "Escape"
                ) {
                   auroraCloseModal();
               }
           }
        );
       //  MOBILE NAV LINK CLOSE
       document
            .querySelectorAll(
                ".aurora-mobile-link"
            )
            .forEach(
                (link) => {
                   link.addEventListener(
                        "click",
                        () => {
                           if (
                                auroraMenuOpen
                            ) {
                               auroraMenuOpen =
                                    false;
                               auroraMenuTimeline.reverse();
                               auroraMenuToggle.setAttribute(
                                    "aria-expanded",
                                    "false"
                                );
                           }
                       }
                    );
               }
            );
       //    FORM + LOCAL STORAGE
      auroraForm.addEventListener(
            "submit",
            (event) => {
               event.preventDefault();
               const formData =
                    new FormData(
                        auroraForm
                    );
               const auroraUserData = {
                   name:
                        formData.get(
                            "name"
                        ),
                   email:
                        formData.get(
                            "email"
                        ),
                   project:
                        formData.get(
                            "project"
                        ),
                   submittedAt:
                        new Date()
                            .toISOString()
               };
                // EXISTING DATA GET
              let auroraMessages =
                    JSON.parse(
                        localStorage.getItem(
                            "auroraMessages"
                        )
                    ) || [];
                        // NEW DATA ADD
              auroraMessages.push(
                    auroraUserData
                );
                //   SAVE TO LOCAL STORAGE
              localStorage.setItem(
                    "auroraMessages",
                    JSON.stringify(
                        auroraMessages
                    )
                );
                // FORM RESET
              auroraForm.reset();
                // CLOSE MODAL
              auroraCloseModal();
                // SUCCESS TOAST
              const toastTimeline =
                    gsap.timeline();
               toastTimeline
                   .to(
                        auroraToast,
                        {
                            y: 0,
                            opacity: 1,
                            duration: .4,
                            ease: "power3.out"
                        }
                    )
                   .to(
                        auroraToast,
                        {
                            y: 120,
                            opacity: 0,
                            duration: .4,
                            delay: 2,
                            ease: "power3.in"
                        }
                    );
           }
        );
   }
);