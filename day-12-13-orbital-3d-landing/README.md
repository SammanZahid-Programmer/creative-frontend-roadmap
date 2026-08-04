# Day 12 & Day 13 — Advanced Three.js, 3D Models & Creative Scroll Experiences

## Learning Today

During Day 12 and Day 13, I continued exploring advanced Three.js concepts and applied my learning to a complete **3D Orbital Space Exploration Website**. The primary focus of these two days was working with external 3D assets, creating interactive 3D experiences, optimizing GLB models, and combining Three.js with GSAP and ScrollTrigger to build immersive, scroll-driven web experiences.

Throughout these two days, I covered the following topics:

* Working with external **GLB/GLTF 3D models** in Three.js.
* Loading external 3D assets using `GLTFLoader`.
* Understanding the GLB/GLTF workflow for web-based 3D experiences.
* Placing, scaling, positioning, and rotating externally loaded 3D models.
* Creating interactive 3D scenes using spacecraft models.
* Managing multiple GLB models within a single 3D model gallery.
* Implementing automatic rotation animations for 3D spacecraft.
* Creating floating animations to add depth and natural movement to 3D objects.
* Implementing pointer-based drag interactions for manually rotating 3D models.
* Creating mouse-based parallax interactions for a more dynamic user experience.
* Working with `PerspectiveCamera` and adjusting camera positioning for optimal model presentation.
* Configuring `AmbientLight`, `DirectionalLight`, and `PointLight` for externally loaded models.
* Using tone mapping and exposure settings to improve overall visual quality.
* Handling responsive Three.js scenes and dynamically updating the camera and renderer on window resize.
* Managing animation loops and render cycles efficiently.
* Properly cleaning up renderers, event listeners, and animation frames when components are unmounted.
* Understanding the performance challenges associated with large 3D assets.
* Optimizing GLB models using **Draco compression**.
* Reducing 3D model file sizes while maintaining visual quality.
* Inspecting 3D assets using **gltf.report** to analyze file size, VRAM usage, draw calls, and other performance metrics.
* Understanding how model size, VRAM consumption, and draw calls affect web-based 3D performance.
* Integrating Three.js with **GSAP** for smooth and controlled animations.
* Using **GSAP ScrollTrigger** for scroll-based interactions.
* Creating scroll-triggered content reveal animations.
* Implementing pinned sections using ScrollTrigger.
* Creating horizontal scrolling experiences controlled through vertical page scrolling.
* Experimenting with large-scale typography and cinematic pinned sections.
* Creating animated background color transitions based on scroll progress.
* Combining 3D graphics, animation, and creative frontend techniques to build immersive digital experiences.

---

## Project Work — 3D Orbital Space Exploration Website

As part of my practical implementation, I developed an interactive **3D Orbital Space Exploration Website** using Next.js, Three.js, and GSAP.

The project includes an interactive hero section featuring a spacecraft loaded from a GLB model using `GLTFLoader`. I implemented automatic rotation, floating animation, mouse-based parallax, and pointer drag interactions, allowing users to interact with and explore the spacecraft directly.

I also developed an **Explore Our Fleet** section featuring multiple spacecraft models. Each model is presented within its own Three.js environment with customized lighting, camera positioning, automatic rotation, and responsive resizing.

To improve the performance of the website, I explored the optimization of heavy 3D assets using **Draco compression** and inspected the optimized models through **gltf.report**. This helped me better understand the relationship between 3D model size, VRAM consumption, draw calls, and overall web performance.

In addition to the 3D experiences, I integrated **GSAP and ScrollTrigger** to create smooth scroll-based interactions. I implemented scroll-triggered animations, pinned sections, horizontal scrolling effects, large-scale typography, and dynamic background transitions to create a more cinematic and engaging user experience.

This project allowed me to practically understand how **Three.js, GLB models, GSAP, ScrollTrigger, and Next.js** can be combined to build modern, interactive, and visually immersive creative frontend experiences.

---

## Key Learning

Through this project, I gained a better understanding of how to move beyond standalone Three.js experiments and apply 3D concepts within a complete production-style frontend experience.

I learned how to:

* Integrate external 3D assets into web applications.
* Create interactive and animated 3D experiences.
* Optimize heavy 3D assets for better performance.
* Analyze 3D performance metrics.
* Combine 3D scenes with scroll-driven animations.
* Use GSAP and ScrollTrigger to enhance storytelling and user interaction.
* Structure a creative website where 3D visuals and animations work together as part of a complete user experience.

---

## Technologies Used

* Next.js
* React
* Three.js
* JavaScript
* GLTFLoader
* GLB / GLTF 3D Models
* Draco Compression
* gltf.report
* PerspectiveCamera
* AmbientLight
* DirectionalLight
* PointLight
* GSAP
* GSAP ScrollTrigger
* CSS
* Responsive 3D Scenes

---

## Next Goal

### DAY 14 — React Three Fiber: First Contact

Learn: `<Canvas>` · JSX → Three.js mapping (`mesh`, geometry `args`, material props) · Drei essentials (`OrbitControls`, `Environment`) · Leva for live controls · r3f-perf for performance monitoring.
