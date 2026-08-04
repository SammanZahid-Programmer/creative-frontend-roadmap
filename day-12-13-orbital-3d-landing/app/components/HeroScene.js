"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
export default function HeroScene() {
  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    // Scene
    const scene = new THREE.Scene();
    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0.5, 6);
    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    container.appendChild(renderer.domElement);
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    const keyLight = new THREE.DirectionalLight(0xffffff, 3);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);
    const fillLight = new THREE.PointLight(0x8888ff, 30, 20);
    fillLight.position.set(-4, 2, 3);
    scene.add(fillLight);
    // Model Group
    const modelGroup = new THREE.Group();
    // Spacecraft ko thora right side move karna
    modelGroup.position.set(1.5, 0, 0);
    scene.add(modelGroup);
    // GLTF Loader
    const loader = new GLTFLoader();
    let model = null;
    loader.load(
      "/models/spacecraft.glb",
      (gltf) => {
        model = gltf.scene;
        // Model Scale
        model.scale.set(1.5, 1.5, 1.5);
        // Model Position
        model.position.set(0, -1, 0);
        // Shadows
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        // Add Model
        modelGroup.add(model);
        console.log("Spacecraft Loaded Successfully", gltf);
      },
      (progress) => {
        if (progress.total) {
          const percent = (progress.loaded / progress.total) * 100;
          console.log(`Loading: ${percent.toFixed(0)}%`);
        }
      },
      (error) => {
        console.error("Spacecraft Loading Error:", error);
      },
    );
    // Mouse Parallax
    const mouse = {
      x: 0,
      y: 0,
    };
    const target = {
      x: 0,
      y: 0,
    };
    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    // Drag Control
    let isDragging = false;
    let previousX = 0;
    let previousY = 0;
    const handlePointerDown = (event) => {
      isDragging = true;
      previousX = event.clientX;
      previousY = event.clientY;
      renderer.domElement.style.cursor = "grabbing";
    };
    const handlePointerMove = (event) => {
      if (!isDragging || !model) {
        return;
      }
      const deltaX = event.clientX - previousX;
      const deltaY = event.clientY - previousY;
      // Horizontal Rotation
      model.rotation.y += deltaX * 0.01;
      // Vertical Rotation
      model.rotation.x += deltaY * 0.005;
      // Rotation Limit
      model.rotation.x = THREE.MathUtils.clamp(model.rotation.x, -0.5, 0.5);
      previousX = event.clientX;
      previousY = event.clientY;
    };
    const handlePointerUp = () => {
      isDragging = false;
      renderer.domElement.style.cursor = "grab";
    };
    renderer.domElement.style.cursor = "grab";
    renderer.domElement.addEventListener("pointerdown", handlePointerDown);
    renderer.domElement.addEventListener("pointermove", handlePointerMove);
    renderer.domElement.addEventListener("pointerup", handlePointerUp);
    renderer.domElement.addEventListener("pointerleave", handlePointerUp);
    // Clock
    const clock = new THREE.Clock();
    // Animation
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      // Smooth Camera Parallax
      target.x += (mouse.x - target.x) * 0.03;
      target.y += (mouse.y - target.y) * 0.03;
      camera.position.x = target.x * 0.5;
      camera.position.y = target.y * 0.3 + 0.5;
      camera.lookAt(0, 0, 0);
      // Spacecraft Animation
      if (model) {
        // Automatic Rotation
        if (!isDragging) {
          model.rotation.y += 0.003;
        }
        // Floating Animation
        model.position.y = -1 + Math.sin(elapsedTime * 1.2) * 0.08;
      }
      // Render
      renderer.render(scene, camera);
    };
    animate();
    // Resize
    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener("resize", handleResize);
    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      renderer.domElement.removeEventListener("pointerdown", handlePointerDown);
      renderer.domElement.removeEventListener("pointermove", handlePointerMove);
      renderer.domElement.removeEventListener("pointerup", handlePointerUp);
      renderer.domElement.removeEventListener("pointerleave", handlePointerUp);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);
  return <div ref={containerRef} className="hero-scene" />;
}
