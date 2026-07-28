"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import GUI from "lil-gui";

export default function ThreeScene(){
    const mountRef = useRef(null);
    useEffect(()=>{
        const scene = new THREE.Scene();
        scene.background= new THREE.Color(0x111111);
        const camera = new THREE.PerspectiveCamera(60,
            window.innerWidth/ window.innerHeight,0.1,1000
        );
        camera.position.set(0,3,10);
        const renderer = new THREE.WebGLRenderer({
            antialias:true,
        });
        renderer.setSize(window.innerWidth,window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
        renderer.shadowMap.enabled=true;

        renderer.shadowMap.type=THREE.PCFSoftShadowMap;
        mountRef.current.appendChild(renderer.domElement);
        //
        const basicMaterial = new THREE.MeshBasicMaterial({color: 0xff3333,});
        const standardMaterial = new THREE.MeshStandardMaterial({
            color: 0x33ff88, roughness:0.5, metalness:0.2
        });
        const physicalMaterial = new THREE.MeshPhysicalMaterial({
           color: 0x4488ff, roughness:0.2,metalness:0.5,clearcoat:1, clearcoatRoughness:0.1, 
        });
 ///box -obj1
    const boxGeometry = new THREE.BoxGeometry(1.5,1.5,1.5);
    const box = new THREE.Mesh(boxGeometry,basicMaterial);
    box.position.set(-3.4,1.4,0);
    box.castShadow=true;
    scene.add(box);
//obj2 sphere
    const sphereGeometry= new THREE.SphereGeometry(0.9,32,32);
    const sphere = new THREE.Mesh(sphereGeometry,standardMaterial);
    sphere.position.set(-1,1,0);
    sphere.castShadow=true;
    scene.add(sphere);
//obj3 torus
    const torusGeometry = new THREE.TorusGeometry(0.8,0.3,32,64);
    const torus = new THREE.Mesh(torusGeometry,physicalMaterial);
    torus.position.set(
      1.5,
      1,
      0
    );
    torus.castShadow = true;
    scene.add(torus);
// obj4 sphere2
    const sphere2Geometry =new THREE.SphereGeometry(0.8,32,32);
    const sphere2 = new THREE.Mesh(sphere2Geometry,physicalMaterial);
    sphere2.position.set(
      3.5,
      1,
      0
    );
    sphere2.castShadow = true;
    scene.add(sphere2);
//obj5 box2
    const box2Geometry =  new THREE.BoxGeometry(1.3,1.3,1.3);
    const box2 = new THREE.Mesh(
      box2Geometry,
      standardMaterial
    );
    box2.position.set(
      -1.6,
       4,
      2
    );
    box2.castShadow = true;
    scene.add(box2);
//obj6 torus2
    const torus2Geometry =  new THREE.TorusGeometry(0.7,0.25,24,48);
    const torus2 = new THREE.Mesh(
      torus2Geometry,
      basicMaterial
    );
    torus2.position.set(
      1.2,
      4,
      2
    );
    torus2.castShadow = true;
    scene.add(torus2);
    
//
const planeGeometry= new THREE.PlaneGeometry(12,10);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0x333333, roughness: 0.8, metalness: 0.1,  
});
const plane = new THREE.Mesh(planeGeometry,planeMaterial);
plane.rotation.x= -Math.PI/2;
plane.receiveShadow=true;
scene.add(plane);
//
const ambientLight= new THREE.AmbientLight(0xffffff,0.4);
scene.add(ambientLight);
const directionalLight= new THREE.DirectionalLight(0xffffff,2);
directionalLight.position.set(5,8,5);
directionalLight.castShadow=true;
directionalLight.shadow.mapSize.width= 2048;
directionalLight.shadow.mapSize.height= 2048;
scene.add(directionalLight);
const pointLight =
      new THREE.PointLight(
        0xff8800,
        5,
        20
      );

    pointLight.position.set(
      0,
      4,
      3
    );

    pointLight.castShadow = true;

    scene.add(pointLight);

    // =========================================
    // 15. SPOT LIGHT
    // =========================================

    const spotLight =
      new THREE.SpotLight(
        0x4488ff,
        10
      );

    spotLight.position.set(
      -4,
      6,
      4
    );

    spotLight.angle =
      Math.PI / 6;

    spotLight.penumbra = 0.5;

    spotLight.decay = 2;

    spotLight.distance = 30;

    spotLight.castShadow = true;

    scene.add(spotLight);

    // SpotLight target
    spotLight.target.position.set(
      0,
      0,
      0
    );

    scene.add(
      spotLight.target
    );

    // =========================================
    // 16. LIGHT SETUP EXPERIMENT
    // =========================================

    const lightSetup = {
      setup: "All Lights",
    };

    function updateLightSetup() {
      const selected =
        lightSetup.setup;

      // Pehle sab lights off
      ambientLight.visible = false;
      directionalLight.visible = false;
      pointLight.visible = false;
      spotLight.visible = false;

      // Sirf selected light on
      if (
        selected === "Ambient"
      ) {
        ambientLight.visible = true;
      }

      if (
        selected === "Directional"
      ) {
        directionalLight.visible = true;
      }

      if (
        selected === "Point"
      ) {
        pointLight.visible = true;
      }

      if (
        selected === "Spot"
      ) {
        spotLight.visible = true;
      }

      // All lights
      if (
        selected === "All Lights"
      ) {
        ambientLight.visible = true;
        directionalLight.visible = true;
        pointLight.visible = true;
        spotLight.visible = true;
      }
    }

    // =========================================
    // 17. LIL-GUI
    // =========================================

    const gui = new GUI();

    // Light Setup Experiment
    const experimentFolder =
      gui.addFolder(
        "Light Setup Experiment"
      );

    experimentFolder
      .add(
        lightSetup,
        "setup",
        [
          "Ambient",
          "Directional",
          "Point",
          "Spot",
          "All Lights",
        ]
      )
      .name("Choose Light")
      .onChange(
        updateLightSetup
      );

    // -----------------------------------------
    // Ambient Controls
    // -----------------------------------------

    const ambientFolder =
      gui.addFolder(
        "Ambient Light"
      );

    ambientFolder
      .add(
        ambientLight,
        "intensity",
        0,
        2,
        0.01
      )
      .name("Intensity");

    // -----------------------------------------
    // Directional Controls
    // -----------------------------------------

    const directionalFolder =
      gui.addFolder(
        "Directional Light"
      );

    directionalFolder
      .add(
        directionalLight,
        "intensity",
        0,
        5,
        0.01
      )
      .name("Intensity");

    directionalFolder
      .add(
        directionalLight.position,
        "x",
        -10,
        10,
        0.1
      )
      .name("Position X");

    directionalFolder
      .add(
        directionalLight.position,
        "y",
        0,
        10,
        0.1
      )
      .name("Position Y");

    directionalFolder
      .add(
        directionalLight.position,
        "z",
        -10,
        10,
        0.1
      )
      .name("Position Z");

    // -----------------------------------------
    // Point Controls
    // -----------------------------------------

    const pointFolder =
      gui.addFolder(
        "Point Light"
      );

    pointFolder
      .add(
        pointLight,
        "intensity",
        0,
        20,
        0.1
      )
      .name("Intensity");

    pointFolder
      .add(
        pointLight.position,
        "x",
        -10,
        10,
        0.1
      )
      .name("Position X");

    pointFolder
      .add(
        pointLight.position,
        "y",
        0,
        10,
        0.1
      )
      .name("Position Y");

    pointFolder
      .add(
        pointLight.position,
        "z",
        -10,
        10,
        0.1
      )
      .name("Position Z");

    // -----------------------------------------
    // Spot Controls
    // -----------------------------------------

    const spotFolder =
      gui.addFolder(
        "Spot Light"
      );

    spotFolder
      .add(
        spotLight,
        "intensity",
        0,
        30,
        0.1
      )
      .name("Intensity");

    spotFolder
      .add(
        spotLight.position,
        "x",
        -10,
        10,
        0.1
      )
      .name("Position X");

    spotFolder
      .add(
        spotLight.position,
        "y",
        0,
        10,
        0.1
      )
      .name("Position Y");

    spotFolder
      .add(
        spotLight.position,
        "z",
        -10,
        10,
        0.1
      )
      .name("Position Z");

    // -----------------------------------------
    // Material Controls
    // -----------------------------------------

    const materialFolder =
      gui.addFolder(
        "Materials"
      );

    materialFolder
      .add(
        standardMaterial,
        "roughness",
        0,
        1,
        0.01
      )
      .name("Standard Roughness");

    materialFolder
      .add(
        standardMaterial,
        "metalness",
        0,
        1,
        0.01
      )
      .name("Standard Metalness");

    materialFolder
      .add(
        physicalMaterial,
        "roughness",
        0,
        1,
        0.01
      )
      .name("Physical Roughness");

    materialFolder
      .add(
        physicalMaterial,
        "metalness",
        0,
        1,
        0.01
      )
      .name("Physical Metalness");

    materialFolder
      .add(
        physicalMaterial,
        "clearcoat",
        0,
        1,
        0.01
      )
      .name("Clearcoat");

    // =========================================
    // 18. INITIAL LIGHT SETUP
    // =========================================

    updateLightSetup();

    // =========================================
    // 19. RESIZE
    // =========================================

    function handleResize() {
      camera.aspect =
        window.innerWidth /
        window.innerHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(
        window.innerWidth,
        window.innerHeight
      );

      renderer.setPixelRatio(
        Math.min(
          window.devicePixelRatio,
          2
        )
      );
    }

    window.addEventListener(
      "resize",
      handleResize
    );

    // =========================================
    // 20. ANIMATION
    // =========================================

    function animate() {
      requestAnimationFrame(
        animate
      );

      // Object animations
      box.rotation.x += 0.005;
      box.rotation.y += 0.005;

      sphere.rotation.y += 0.005;

      torus.rotation.x += 0.005;
      torus.rotation.y += 0.005;

      sphere2.rotation.y += 0.005;

      box2.rotation.x += 0.005;
      box2.rotation.y += 0.005;

      torus2.rotation.x += 0.005;
      torus2.rotation.y += 0.005;

      // Render
      renderer.render(
        scene,
        camera
      );
    }

    animate();

    // =========================================
    // 21. CLEANUP
    // =========================================

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );

      // Destroy GUI
      gui.destroy();

      // Remove renderer
      if (
        mountRef.current &&
        renderer.domElement
      ) {
        mountRef.current.removeChild(
          renderer.domElement
        );
      }

      // Dispose geometries
      boxGeometry.dispose();
      sphereGeometry.dispose();
      torusGeometry.dispose();
      sphere2Geometry.dispose();
      box2Geometry.dispose();
      torus2Geometry.dispose();
      planeGeometry.dispose();

      // Dispose materials
      basicMaterial.dispose();
      standardMaterial.dispose();
      physicalMaterial.dispose();
      planeMaterial.dispose();

      // Dispose renderer
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    />
  );
}
