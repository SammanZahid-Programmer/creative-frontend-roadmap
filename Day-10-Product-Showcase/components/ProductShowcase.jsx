"use client";
import {useEffect,useRef,useState} from "react";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";

export default function ProductShowcase(){
    const mountRef= useRef(null);
    const [activeView,setActiveView]= useState("front");
    const cameraTargetRef = useRef(
        new THREE.Vector3(4,3,6)
    );
    useEffect(()=>{
    const scene = new THREE.Scene();
    scene.background= new THREE.Color(0x111111);
    const camera = new THREE.PerspectiveCamera(45,window.innerWidth/ window.innerHeight
        ,0.1,1000
    );
    camera.position.set(4,3,6);
    const renderer= new THREE.WebGLRenderer({
        antialias:true,
    });
    renderer.setSize(window.innerWidth , window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
    mountRef.current.appendChild(renderer.domElement);
    //lights
    const directionalLight= new THREE.DirectionalLight( 0xffffff,3);
    directionalLight.position.set(5,8,5);
    scene.add(directionalLight);
    const ambientLight =new THREE.AmbientLight( 0xffffff, 1.5);
    scene.add( ambientLight );
    //laptop grp

    const laptop =
      new THREE.Group();

    // Keep laptop smaller
    laptop.scale.set(
      0.6,
      0.6,
      0.6
    );

    scene.add(
      laptop
    );
//LAPTOP BASE
    const baseGeometry =
      new THREE.BoxGeometry(
        4,
        0.3,
        2.8
      );

    const laptopMaterial =
      new THREE.MeshStandardMaterial({
        color: 0x444444,
        metalness: 0.6,
        roughness: 0.3,
      });

    const base =
      new THREE.Mesh(
        baseGeometry,
        laptopMaterial
      );

    laptop.add(
      base
    );
//KEYBOARD
    const keyGeometry =
      new THREE.BoxGeometry(
        0.35,
        0.08,
        0.25
      );
    const keyMaterial =
      new THREE.MeshStandardMaterial({
        color: 0x222222,
        roughness: 0.5,
      });
    for (
      let row = 0;
      row < 4;
      row++
    ) {
      for (
        let col = 0;
        col < 9;
        col++
      ) {
        const key =
          new THREE.Mesh(
            keyGeometry,
            keyMaterial
          );

        key.position.x =
          -1.55 +
          col * 0.39;

        key.position.y =
          0.2;

        key.position.z =
          -0.7 +
          row * 0.35;

        laptop.add(
          key
        );
      }
    }
//TRACKPAD
    const trackpadGeometry =
      new THREE.BoxGeometry(
        1.4,
        0.05,
        0.8
      );
    const trackpadMaterial =
      new THREE.MeshStandardMaterial({
        color: 0x777777,
        roughness: 0.4,
      });
    const trackpad =
      new THREE.Mesh(
        trackpadGeometry,
        trackpadMaterial
      );
    trackpad.position.set(
      0,
      0.2,
      0.8
    );
    laptop.add(
      trackpad
    );
//SCREEN FRAME
    const screenFrameGeometry =
      new THREE.BoxGeometry(
        4,
        2.7,
        0.2
      );
    const screenFrameMaterial =
      new THREE.MeshStandardMaterial({
        color: 0x333333,
        metalness: 0.5,
        roughness: 0.3,
      });

    const screenFrame =
      new THREE.Mesh(
        screenFrameGeometry,
        screenFrameMaterial
      );
    screenFrame.position.set(
      0,
      1.5,
      -1.25
    );
    screenFrame.rotation.x = -0.15;
      laptop.add(screenFrame);
//screen display
   const displayGeometry= new THREE.PlaneGeometry(3.5,2.2);
   const displayMaterial= new THREE.MeshStandardMaterial({
    color:0x2196f3, emissive:0x0a2a4a,roughness:0.2,
   });
   const display= new THREE.Mesh(displayGeometry,displayMaterial);
   display.position.set(0,1.5,-1.13);
   display.rotation.x= -0.15;
   laptop.add(display);
//orbitcontrols
   const controls =
      new OrbitControls(
        camera,
        renderer.domElement
      );
    // Smooth movement
    controls.enableDamping =
      true;
    controls.dampingFactor =
      0.05;
   // Zoom limits
    controls.minDistance =4;
    controls.maxDistance = 12;
    // Camera looks at laptop
    controls.target.set(
      0,
      0.8,
      0
    );
//clock
    const clock= new THREE.Clock();
//animation loop
    function animate(){
        requestAnimationFrame(animate);
    const delta = clock.getDelta();
//idle laptop rotation
    laptop.rotation.y += delta*0.3;
    camera.position.lerp(cameraTargetRef.current,0.05);
    controls.update();
//renderer
    renderer.render(scene,camera);
    }
    animate();
//responsive
    function handleResize(){
        camera.aspect= window.innerWidth/window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth , window.innerHeight);
    }
    window.addEventListener("resize",handleResize);
//cleanup
    return () => {

      window.removeEventListener(
        "resize",
        handleResize
      );

      controls.dispose();

      baseGeometry.dispose();

      keyGeometry.dispose();

      trackpadGeometry.dispose();

      screenFrameGeometry.dispose();

      displayGeometry.dispose();

      laptopMaterial.dispose();

      keyMaterial.dispose();

      trackpadMaterial.dispose();

      screenFrameMaterial.dispose();

      displayMaterial.dispose();

      renderer.dispose();

      if (mountRef.current) {

        mountRef.current.removeChild(
          renderer.domElement
        );
      }
    };

  }, []);
//camera focus function
    const focusCamera=(view)=>{
    setActiveView(view);
    if(view === "front"){
        cameraTargetRef.current.set(0,2,7);
    }
    if(view === "top"){
        cameraTargetRef.current.set(0,8,0.5);
    }
    if(view === "side"){
        cameraTargetRef.current.set(7,2,0);
    }
    }


//UI
return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >

      {/* Three.js Canvas */}

      <div
        ref={mountRef}
        style={{
          width: "100%",
          height: "100%",
        }}
      />


      {/* Camera Focus Controls */}

      <div
        style={{
          position: "absolute",
          bottom: "30px",
          left: "50%",
          transform:
            "translateX(-50%)",

          display: "flex",
          gap: "10px",

          padding: "10px",

          background:
            "rgba(255,255,255,0.1)",

          backdropFilter:
            "blur(10px)",

          borderRadius: "12px",
        }}
      >

        <button
          onClick={() =>
            focusCamera("front")
          }
          style={{
            padding:
              "10px 20px",

            border: "none",

            borderRadius: "8px",

            cursor: "pointer",

            background:
              activeView === "front"
                ? "#2196f3"
                : "#ffffff",

            color:
              activeView === "front"
                ? "#ffffff"
                : "#111111",
          }}
        >
          Front
        </button>


        <button
          onClick={() =>
            focusCamera("top")
          }
          style={{
            padding:
              "10px 20px",

            border: "none",

            borderRadius: "8px",

            cursor: "pointer",

            background:
              activeView === "top"
                ? "#2196f3"
                : "#ffffff",

            color:
              activeView === "top"
                ? "#ffffff"
                : "#111111",
          }}
        >
          Top
        </button>


        <button
          onClick={() =>
            focusCamera("side")
          }
          style={{
            padding:
              "10px 20px",

            border: "none",

            borderRadius: "8px",

            cursor: "pointer",

            background:
              activeView === "side"
                ? "#2196f3"
                : "#ffffff",

            color:
              activeView === "side"
                ? "#ffffff"
                : "#111111",
          }}
        >
          Side
        </button>

      </div>

    </main>
  );
}