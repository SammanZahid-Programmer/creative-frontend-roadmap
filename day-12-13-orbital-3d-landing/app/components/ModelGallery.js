"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
gsap.registerPlugin(ScrollTrigger);
export default function ModelGallery() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef(null);
  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    // GSAP SCROLL ANIMATION
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        {
          y: 80,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          },
        },
      );
      gsap.fromTo(
        cards.children,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cards,
            start: "top 80%",
          },
        },
      );
    }, section);
    // LOAD 3D MODELS
    const modelContainers = document.querySelectorAll(".fleet-model");
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(
      "https://www.gstatic.com/draco/versioned/decoders/1.5.7/",
    );
    loader.setDRACOLoader(dracoLoader);
    const models = [
      "/models/spacecraft1-v1.glb",
      "/models/spacecraft2-v1.glb",
      "/models/spacecraft3-v1.glb",
    ];
    const scenes = [];
    modelContainers.forEach((container, index) => {
      // SCENE
      const scene = new THREE.Scene();
      // CAMERA
      const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        100,
      );
      camera.position.set(0, 0.5, 7);
      // RENDERER
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.3;
      container.appendChild(renderer.domElement);
      // LIGHTS
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
      scene.add(ambientLight);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);
      const blueLight = new THREE.PointLight(0x6688ff, 20, 15);
      blueLight.position.set(-3, 2, 3);
      scene.add(blueLight);
      // LOAD MODEL
      loader.load(
        models[index],
        (gltf) => {
          const model = gltf.scene;
          if (index === 1) {
            model.scale.set(0.15, 0.15, 0.15);
            model.position.set(0, -1.5, 0);
          } else {
            model.scale.set(0.5, 0.5, 0.5);
            model.position.set(0, -0.3, 0);
          }
          model.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
          scene.add(model);
          scenes.push({
            scene,
            camera,
            renderer,
            model,
            container,
          });
        },
        undefined,
        (error) => {
          console.error(`Model ${index + 1} loading error:`, error);
        },
      );
    });
    // ANIMATION LOOP
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      scenes.forEach((item) => {
        item.model.rotation.y += 0.001;
        item.renderer.render(item.scene, item.camera);
      });
    };
    animate();
    // RESIZE
    const handleResize = () => {
      scenes.forEach((item) => {
        const width = item.container.clientWidth;
        const height = item.container.clientHeight;
        item.camera.aspect = width / height;
        item.camera.updateProjectionMatrix();
        item.renderer.setSize(width, height);
      });
    };
    window.addEventListener("resize", handleResize);
    // CLEANUP
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      scenes.forEach((item) => {
        item.renderer.dispose();
        if (item.container.contains(item.renderer.domElement)) {
          item.container.removeChild(item.renderer.domElement);
        }
      });
      ctx.revert();
    };
  }, []);
  return (
    <section ref={sectionRef} className="model-gallery">
      <div ref={titleRef} className="fleet-header">
        <p className="section-eyebrow">ORBITAL COLLECTION / 2026</p>
        <h2>
          EXPLORE
          <br />
          OUR FLEET
        </h2>
        <p className="fleet-description">
          Discover our collection of next-generation spacecraft engineered for
          exploration, research and life beyond Earth.
        </p>
      </div>
      <div ref={cardsRef} className="fleet-grid">
        <article className="fleet-card">
          <div className="fleet-card-number">01</div>
          <div className="fleet-model"></div>
          <div className="fleet-card-content">
            <p>ORBITAL SERIES</p>
            <h3>EXPLORER X1</h3>
            <span>Deep-space exploration spacecraft</span>
          </div>
        </article>
        <article className="fleet-card">
          <div className="fleet-card-number">02</div>
          <div className="fleet-model"></div>
          <div className="fleet-card-content">
            <p>LUNAR SERIES</p>
            <h3>LUNAR MK-II</h3>
            <span>Advanced lunar transport system</span>
          </div>
        </article>
        <article className="fleet-card">
          <div className="fleet-card-number">03</div>
          <div className="fleet-model"></div>
          <div className="fleet-card-content">
            <p>MARS SERIES</p>
            <h3>MARS ROVER</h3>
            <span>Autonomous planetary exploration</span>
          </div>
        </article>
      </div>
    </section>
  );
}
