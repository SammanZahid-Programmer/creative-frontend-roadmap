
                      (*)  Creative Frontend  Developer Roadmap

Week 1 — GSAP, Lenis & the Language of Motion (Days 1–7)
    Day 1: 
           Learning Today: Today I have learned about GSAP basics in which I have covered the following topics:-
          1. gsap.to,from,fromTo 
          2. duration, delay, repeat, yoyo 
          3.easing (power, back, elastic, expo) 
          4.stagger 
          5.SplitText basics 
        In this project I have made the 4 tasks including hero headline reveal using SplitText, loading effect,staggering on cards,button hover/press effects.Moreover, I have also write a code in index file after studing documentation or tutorials. 
        
        Next Goal: 
                  "DAY 2 Timelines & choreography
Learn: gsap.timeline() · position parameter ('<', '-=0.3', labels) · sequencing & overlap · nested timelines ·
timeline control (pause, reverse, seek)"




    Day 2: Timelines & Choreography
            Learning Today: Today I learned about GSAP Timelines and how to create smooth, well-organized animation sequences. I covered the following topics:

         1. gsap.timeline() for combining multiple animations into a single master timeline.
         2.Position Parameters such as "<", "-=0.3", and labels to control the timing and overlap of animations.
         3.Sequencing & Overlap to create natural and cinematic motion effects.
         4.Nested Timelines for organizing complex animations into reusable sections.
         5.Timeline Controls including pause(), play(), reverse(), restart(), and seek().

         Project Completed:

         For today's practice, I built a Cuberto-inspired landing page intro animation using GSAP Timeline. The project includes:

         Animated logo reveal.
         Smooth navigation link animation with stagger.
         Hero headline reveal using a mask (overflow: hidden) effect.
         Description and CTA button animation.
         Hero video reveal animation.
         Replay button to restart the complete landing page intro animation.
         Responsive layout for desktop, tablet, and mobile devices.

         Through this project, I learned how to organize multiple animations into a single master timeline and create smooth, professional animation choreography similar to modern creative websites.

"Next Goal:
        Day 3 –ScrollTrigger + Lenis smooth scrolling
Learn: ScrollTrigger: trigger, start, end, markers · scrub & toggleActions · pin basics · Lenis setup and
syncing Lenis with ScrollTrigger"





        Day 3: ScrollTrigger + Lenis Smooth Scrolling
        Learning Today:

         Today I learned how to create scroll-driven animations using GSAP ScrollTrigger and how to integrate Lenis Smooth Scrolling with ScrollTrigger for a modern, premium scrolling experience. I covered the following topics:

         ScrollTrigger Basics including trigger, start, end, and markers for controlling when animations begin and end.
         Scrub & ToggleActions to synchronize animations with the user's scroll and control animation behavior while scrolling forward and backward.
         Pin Basics to keep sections fixed during scrolling for interactive storytelling effects.
         Lenis Smooth Scrolling setup and configuration for creating buttery smooth scrolling.
         Syncing Lenis with ScrollTrigger to ensure smooth scrolling works perfectly with GSAP scroll-based animations.

        Project Completed:

        For today's practice, I built a 5-section scrolling demo using GSAP ScrollTrigger and Lenis. The project includes:

         Smooth scrolling using Lenis integrated with GSAP.
         Scroll-triggered box animation with scaling and rotation.
         Text reveal animations from both left and right directions.
         Horizontal scrolling text section using Pin and Scrub.
         Scroll-linked image scale animation.
         Real-time debugging using ScrollTrigger Markers.
         Responsive full-screen section layout for smooth scrolling practice.

        Through this project, I learned how to build modern scroll-based interactions, synchronize animations with the user's scroll position, and integrate Lenis with ScrollTrigger to create smooth, professional scrolling experiences commonly used in creative and award-winning websites.

 Next Goal:
 DAY 4 Advanced ScrollTrigger
       Learn: pinning sections · horizontal scroll inside vertical scroll · scrub-linked progress · parallax layers
       Build / practice:
       •  Horizontal-scrolling gallery section
       •  A pinned section with staged content changes
       •  Scroll progress indicator
       •  Multi-layer parallax hero




 Day 4: Advanced ScrollTrigger

    Learning Today:Today I learned how to create advanced scroll-driven interactions using GSAP ScrollTrigger. I focused on pinning sections, horizontal scrolling inside vertical scrolling, scrub-linked progress animations, and multi-layer parallax effects to create immersive and modern web experiences. I covered the following topics:

    Pinning Sections to keep specific sections fixed during scrolling and create interactive storytelling experiences.

    Horizontal Scroll Inside Vertical Scroll to create horizontal-scrolling content while the user continues scrolling vertically.

    Scrub-Linked Progress to synchronize animations and progress indicators directly with the user's scroll position.

    Parallax Layers to create depth and movement by animating multiple layers at different speeds during scrolling.

    Build / Practice:

    For today's practice, I built an advanced scroll-based website experience using GSAP ScrollTrigger. The project includes:

    • Horizontal-scrolling gallery section with multiple cards.
    • A pinned storytelling section with staged content changes.
    • Scroll-linked progress indicator that updates according to the scroll position.
    • Multi-layer parallax hero section with different movement speeds.
    • Scroll-triggered image and content animations.
    • Responsive layout for desktop, tablet, and mobile devices.
    • Mobile testing to handle pinned sections and touch-based scrolling behavior.

       Through this project, I learned how to combine advanced ScrollTrigger features to create immersive scroll-based interactions and modern storytelling experiences similar to creative agency and product websites. I also learned the importance of testing pinned sections on mobile devices because scrolling and pinning behavior can differ on touch screens.

Next Goal:
DAY 5 Mouse & Pointer Interactions

Learn: gsap.quickTo / quickSetter · lerp-based following · getBoundingClientRect for magnetic effects




   Day 5: Mouse & Pointer Interactions

        Learning Today:Today I learned how to create interactive mouse and pointer-based experiences using GSAP. I focused on optimizing mouse-driven animations with gsap.quickTo() and gsap.quickSetter(), creating smooth lerp-based following effects, and using getBoundingClientRect() to calculate element positions for magnetic interactions. I covered the following topics:

       gsap.quickTo() to create smooth and optimized animations for frequently changing values such as mouse movement and pointer interactions.
       gsap.quickSetter() to efficiently update properties repeatedly during high-frequency pointer events without creating new tweens each time.
       Lerp-Based Following to create smooth and natural movement by gradually interpolating an element's position toward the mouse or pointer position.
       getBoundingClientRect() to calculate the position and dimensions of elements and use pointer coordinates to create accurate magnetic and interactive effects.

       Build / Practice:

       For today's practice, I built an interactive motion playground using GSAP mouse and pointer interactions. The project includes:

       • Custom cursor with interactive hover states that respond to different elements.

       • Magnetic buttons that smoothly attract toward the pointer when the mouse moves near them.

       • Image-following effect where images smoothly follow the cursor position.

       • Tilt-on-hover cards that rotate based on the pointer's position inside the card.

       • Smooth pointer movement using gsap.quickTo() and gsap.quickSetter().

       • Lerp-based following effect for creating natural and fluid motion.

       • getBoundingClientRect() based calculations for accurate pointer positioning and magnetic effects.

       • Responsive behavior with custom cursor and pointer interactions disabled on touch devices using matchMedia("(pointer: fine)").

       Through this project, I learned how to combine GSAP utilities with JavaScript pointer events to create smooth, responsive, and engaging micro-interactions. I also learned how optimized animation techniques such as quickTo(), quickSetter(), and lerp-based movement can improve the performance of frequently triggered mouse interactions. The project helped me understand how small pointer-based interactions can make a website feel more dynamic and interactive.

Next Goal: DAY 6 Micro-interactions + Motion Accessibility _ gsap.matchMedia() for responsive and reduced-motion animations · prefers-reduced-motion · FLIP basics (optional)



   Day 6: Micro-interactions + Motion Accessibility

       Learning Today:Today I learned how to create polished UI micro-interactions while keeping animations responsive and accessible. I focused on using gsap.matchMedia() to control animations based on screen size and user motion preferences, and explored prefers-reduced-motion to provide a comfortable experience for users who prefer minimal motion. I also explored the basics of FLIP animations. I covered the following topics:

      gsap.matchMedia() to create responsive GSAP animations and apply different animation logic based on device and screen size.
      prefers-reduced-motion to detect when users have enabled reduced-motion preferences and provide instant or simplified states instead of continuous animations.
      Animated Navigation / Burger Menu to create a responsive navigation system with smooth open and close transitions and animated menu icon states.
      Modal Open / Close Transitions to create smooth modal animations using GSAP timelines, overlay transitions, scaling effects, and reversible animations.
      Card Hover Systems to add polished hover interactions and visual feedback to UI cards.
      FLIP Basics to understand how the First, Last, Invert, and Play technique can be used to animate layout and position changes smoothly.

      Build / Practice:

       For today's practice, I built a polished and responsive UI component set focused on micro-interactions and motion accessibility. The project includes:

      • Animated responsive navigation with a mobile burger menu.

      • Burger menu icon animation that transforms between menu and close states.

      • Modal component with smooth open and close transitions.

      • Modal overlay animation with click-outside and Escape key support.

      • Interactive cards with hover effects and visual feedback.

      • Button micro-interactions with subtle press and hover animations.

      • Responsive layout for desktop, tablet, and mobile devices.

      • GSAP timelines for coordinating multiple UI animations.

      • gsap.matchMedia() implementation for responsive animation behavior.

      • prefers-reduced-motion support to provide instant states and minimize unnecessary motion for users who prefer reduced animation.

      • Lenis smooth scrolling integrated into the overall motion experience.

      • Accessibility-focused interaction handling with keyboard support and visible focus states.

      Through this project, I learned that modern motion design is not only about creating visually appealing animations but also about making those animations accessible and responsive. I learned how to use gsap.matchMedia() and prefers-reduced-motion to adapt animations according to the user's preferences and device. I also learned how micro-interactions such as navigation transitions, modal animations, card hover effects, and button feedback can make a UI feel more polished and natural when they are used thoughtfully.

Next Goal: DAY 7 – Week 1 Motion Project / Final Integration _Combining GSAP timelines, ScrollTrigger, Lenis, mouse interactions, micro-interactions, responsive animation systems, and reduced-motion accessibility into one polished creative frontend experience.
