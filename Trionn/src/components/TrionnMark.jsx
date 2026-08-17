import { RoundedBox } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/* =========================================================
   SINGLE TRIONN PIECE
========================================================= */

function Piece({
  position,
  rotation = [0, 0, 0],
  scale,
  orange = false,
}) {
  return (
    <RoundedBox
      args={[1, 1, 1]}
      radius={0.075}
      smoothness={8}
      position={position}
      rotation={rotation}
      scale={scale}
      castShadow
      receiveShadow
    >
      {/* <meshPhysicalMaterial
        color={orange ? "#40434a" : "#3b3f45"}
        metalness={1}
        roughness={0.14}
        clearcoat={1}
        clearcoatRoughness={0.06}
        reflectivity={1}
        emissive={orange ? "#421000" : "#302f2f"}
        emissiveIntensity={orange ? 0.45 : 0}
      /> */}
      <meshPhysicalMaterial
  color="#393d43"
  metalness={0.95}
  roughness={0.22}
  clearcoat={1}
  clearcoatRoughness={0.1}
  reflectivity={0.9}
  emissive="#454343"
  emissiveIntensity={0}
/>
    </RoundedBox>
  );
}


/* =========================================================
   TRIONN MARK
========================================================= */

export default function TrionnMark() {
  const group = useRef();
  const shineLight = useRef();

  const { pointer } = useThree();

  /* =======================================================
     ANIMATION VALUES
  ======================================================= */

  const introProgress = useRef(0);

  const scrollProgress = useRef(0);

  const rotationY = useRef(-0.22);


  /* =======================================================
     PIECES

     assembled = final logo position

     exploded = broken position
  ======================================================= */

  const pieces = useMemo(
    () => [
      /* -----------------------------------------------
         TOP LEFT
      ------------------------------------------------ */

      {
        assembled: [-0.65, 0.62, 0],

        exploded: [-2.15, 1.65, -0.7],

        rotation: [0, 0, -0.18],

        scale: [0.42, 2.35, 0.45],

        orange: false,
      },


      /* -----------------------------------------------
         TOP RIGHT
      ------------------------------------------------ */

      {
        assembled: [0.58, 0.62, 0.04],

        exploded: [2.1, 1.8, 0.5],

        rotation: [0, 0, 0.24],

        scale: [0.42, 2.25, 0.45],

        // orange: true,
      },


      /* -----------------------------------------------
         CENTER HORIZONTAL
      ------------------------------------------------ */

      {
        assembled: [-0.05, -0.18, 0],

        exploded: [0.35, -0.1, 1.1],

        rotation: [0, 0, -0.02],

        scale: [1.65, 0.35, 0.46],

        orange: false,
      },


      /* -----------------------------------------------
         LOWER LEFT
      ------------------------------------------------ */

      {
        assembled: [-0.42, -0.82, 0.02],

        exploded: [-1.85, -1.55, 0.6],

        rotation: [0, 0, -0.27],

        scale: [0.42, 1.78, 0.45],

        orange: false,
      },


      /* -----------------------------------------------
         LOWER RIGHT
      ------------------------------------------------ */

      {
        assembled: [0.58, -0.78, 0],

        exploded: [1.9, -1.4, -0.4],

        rotation: [0, 0, 0.2],

        scale: [0.42, 1.72, 0.45],

        orange: false,
      },


      /* -----------------------------------------------
         LOWER HORIZONTAL
      ------------------------------------------------ */

      {
        assembled: [0.13, -1.04, -0.02],

        exploded: [0.55, -2.05, 0.75],

        rotation: [0, 0, 0.02],

        scale: [1.28, 0.35, 0.46],

        orange: false,
      },
    ],
    []
  );


  /* =========================================================
     MAIN ANIMATION LOOP
  ========================================================= */

  useFrame((state, delta) => {
    if (!group.current) return;


    const time = state.clock.getElapsedTime();


    /* =====================================================
       1. INTRO ASSEMBLY
       
       Page load par pieces bahar se
       center logo mein assemble honge.
    ===================================================== */

    const introDuration = 2.4;

    introProgress.current = THREE.MathUtils.clamp(
      time / introDuration,
      0,
      1
    );


    /*
      Smooth easing.
    */

    const introEase =
      introProgress.current *
      introProgress.current *
      (3 - 2 * introProgress.current);


    /* =====================================================
       2. SCROLL PROGRESS

       Hero ke andar scroll karne par
       logo break hoga.
    ===================================================== */

    const currentScroll =
      window.scrollY || window.pageYOffset || 0;


    /*
      Kitni scrolling ke baad logo
      break hona start kare.

      0.8 viewport = relatively early.
    */

    const scrollDistance =
      window.innerHeight * 0.8;


    const targetScroll = THREE.MathUtils.clamp(
      currentScroll / scrollDistance,
      0,
      1
    );


    /*
      Smooth scroll response.
    */

    scrollProgress.current =
      THREE.MathUtils.lerp(
        scrollProgress.current,
        targetScroll,
        0.055
      );


    /* =====================================================
       3. FINAL PIECE PROGRESS

       Intro ke waqt logo assemble ho raha hai.

       Uske baad scroll:
       assembled → exploded
    ===================================================== */

    const breakProgress =
      THREE.MathUtils.clamp(
        scrollProgress.current,
        0,
        1
      );


    /*
      Smooth easing for breaking.
    */

    const breakEase =
      breakProgress *
      breakProgress *
      (3 - 2 * breakProgress);


    /* =====================================================
       4. LOGO GROUP POSITION

       Mouse parallax.
    ===================================================== */

    const targetPositionX =
      0.7 + pointer.x * 0.18;

    const targetPositionY =
      pointer.y * 0.12;


    group.current.position.x =
      THREE.MathUtils.lerp(
        group.current.position.x,
        targetPositionX,
        0.045
      );


    group.current.position.y =
      THREE.MathUtils.lerp(
        group.current.position.y,
        targetPositionY,
        0.045
      );


    /* =====================================================
       5. Y AXIS ROTATION

       IMPORTANT:

       Logo sirf Y axis par rotate karega.
    ===================================================== */

    /*
      Intro ke baad continuous rotation.
    */

    rotationY.current +=
      delta * 0.32;


    group.current.rotation.y =
      rotationY.current;


    /* =====================================================
       6. VERY SUBTLE X TILT

       Sirf mouse interaction ke liye.
       Continuous X rotation nahi.
    ===================================================== */

    const targetRotationX =
      pointer.y * 0.025;


    group.current.rotation.x =
      THREE.MathUtils.lerp(
        group.current.rotation.x,
        targetRotationX,
        0.035
      );


    /* =====================================================
       7. VERY SUBTLE Z PARALLAX
    ===================================================== */

    const targetRotationZ =
      pointer.x * 0.045;


    group.current.rotation.z =
      THREE.MathUtils.lerp(
        group.current.rotation.z,
        targetRotationZ,
        0.035
      );


    /* =====================================================
       8. MOVING SHINE LIGHT

       Light logo ke around move karegi.

       Is se metallic pieces par
       moving highlight / shine ayegi.
    ===================================================== */

    if (shineLight.current) {
      const radius = 3.2;


      shineLight.current.position.x =
        Math.cos(rotationY.current) *
        radius;


      shineLight.current.position.z =
        Math.sin(rotationY.current) *
        radius;


      shineLight.current.position.y =
        0.5 +
        Math.sin(time * 1.2) *
        0.35;
    }


    /* =====================================================
       9. MOVE EVERY PIECE

       Intro:

       exploded → assembled

       Scroll:

       assembled → exploded
    ===================================================== */

    pieces.forEach((piece, index) => {
      const child =
        group.current.children[index + 1];

      /*
        +1 because first child is
        shine light.
      */

      if (!child) return;


      let x;
      let y;
      let z;


      /* ===================================================
         INTRO PHASE
      =================================================== */

      if (
        introProgress.current < 1 &&
        currentScroll < 20
      ) {
        /*
          Start from exploded position
          and move toward assembled.
        */

        x = THREE.MathUtils.lerp(
          piece.exploded[0],
          piece.assembled[0],
          introEase
        );


        y = THREE.MathUtils.lerp(
          piece.exploded[1],
          piece.assembled[1],
          introEase
        );


        z = THREE.MathUtils.lerp(
          piece.exploded[2],
          piece.assembled[2],
          introEase
        );
      }


      /* ===================================================
         NORMAL STATE
      =================================================== */

      else {
        /*
          assembled → exploded
        */

        x = THREE.MathUtils.lerp(
          piece.assembled[0],
          piece.exploded[0],
          breakEase
        );


        y = THREE.MathUtils.lerp(
          piece.assembled[1],
          piece.exploded[1],
          breakEase
        );


        z = THREE.MathUtils.lerp(
          piece.assembled[2],
          piece.exploded[2],
          breakEase
        );
      }


      /*
        Smooth piece movement.
      */

      child.position.x =
        THREE.MathUtils.lerp(
          child.position.x,
          x,
          0.11
        );


      child.position.y =
        THREE.MathUtils.lerp(
          child.position.y,
          y,
          0.11
        );


      child.position.z =
        THREE.MathUtils.lerp(
          child.position.z,
          z,
          0.11
        );
    });
  });


  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <group
      ref={group}
      position={[0.7, 0, 0]}
      rotation={[0, -0.22, -0.16]}
      scale={0.9}
    >

      {/* ===================================================
          MOVING METALLIC SHINE
      =================================================== */}

      <pointLight
        ref={shineLight}
        intensity={3.5}
        distance={5}
        decay={2}
        color="#ffffff"
      />


      {/* ===================================================
          TRIONN PIECES
      =================================================== */}

      {pieces.map((piece, index) => (
        <Piece
          key={`trionn-piece-${index}`}
          position={piece.exploded}
          rotation={piece.rotation}
          scale={piece.scale}
          orange={piece.orange}
        />
      ))}

    </group>
  );
}