"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
export default function MissionScene() {
  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    // SCENE
    const scene = new THREE.Scene();
    // CAMERA
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0.3, 7);
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
    // SPACE BACKGROUND
    scene.background = new THREE.Color(0x02030a);
    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);
    const keyLight = new THREE.DirectionalLight(0xffffff, 4);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);
    const blueLight = new THREE.PointLight(0x4169ff, 30, 25);
    blueLight.position.set(-5, 2, 4);
    scene.add(blueLight);
    // DRACO
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(
      "https://www.gstatic.com/draco/versioned/decoders/1.5.7/",
    );
    // GLTF
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    let model = null;
    // LOAD SPACECRAFT
    loader.load(
      "/models/spacecraft1-optimized.glb",
      (gltf) => {
        model = gltf.scene;
        // MODEL SIZE
        model.scale.set(1.1, 1.1, 1.1);
        // MODEL POSITION
        model.position.set(0, -0.5, 0);
        // ROTATION
        model.rotation.set(0, -0.4, 0);
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        scene.add(model);
      },
      undefined,
      (error) => {
        console.error("Mission model error:", error);
      },
    );
    // STARS
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 1200;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 30;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    starGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(starPositions, 3),
    );
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.025,
      transparent: true,
      opacity: 0.8,
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
    // ORBIT RINGS
    const ringGeometry = new THREE.TorusGeometry(2.2, 0.008, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x6688ff,
      transparent: true,
      opacity: 0.35,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2.5;
    ring.rotation.z = 0.4;
    scene.add(ring);
    // MOUSE
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
    // ANIMATION
    let animationId;
    let elapsedTime = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      elapsedTime += delta;
      // Mouse smoothing
      target.x += (mouse.x - target.x) * 0.03;
      target.y += (mouse.y - target.y) * 0.03;
      // Camera movement
      camera.position.x = target.x * 0.4;
      camera.position.y = target.y * 0.25 + 0.3;
      camera.lookAt(0, 0, 0);
      // Spacecraft
      if (model) {
        model.rotation.y += 0.001;
        model.position.y = -0.5 + Math.sin(elapsedTime * 0.8) * 0.08;
      }
      // Stars
      stars.rotation.y += 0.00015;
      stars.rotation.x += 0.00005;
      // Orbit
      ring.rotation.y += 0.001;
      renderer.render(scene, camera);
    };
    animate();
    // RESIZE
    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);
    // CLEANUP
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      renderer.dispose();
      dracoLoader.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);
  return <div ref={containerRef} className="mission-3d" />;
}
