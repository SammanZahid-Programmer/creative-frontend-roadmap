import { Canvas, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";
import TrionnMark from "./TrionnMark";
import WireField from "./WireField";
function SceneContent() {
  const { viewport } = useThree();
  return (
    <>
      {/* =====================================================
          CAMERA
      ===================================================== */}
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={38} />
      {/* =====================================================
          GENERAL AMBIENT LIGHT
      ===================================================== */}
      <ambientLight intensity={0.18} />
      {/* =====================================================
          MAIN WHITE LIGHT
      ===================================================== */}
      <directionalLight
        position={[4, 6, 7]}
        intensity={2.8}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      {/* =====================================================
          TOP WHITE SPOT
      ===================================================== */}
      <spotLight
        position={[-4, 5, 5]}
        intensity={14}
        angle={0.28}
        penumbra={1}
        distance={15}
        castShadow
      />
      {/* =====================================================
          ORANGE LIGHT
          Gives Trionn mark warm reflection.
      ===================================================== */}
      <pointLight
        position={[2.7, -1.2, 2.4]}
        intensity={8}
        distance={7}
        color="#ff4b12"
      />
      {/* =====================================================
          SECOND WARM LIGHT
      ===================================================== */}
      <pointLight
        position={[-2.5, -1, 1]}
        intensity={3.5}
        distance={6}
        color="#a72d08"
      />
      {/* =====================================================
          COOL LIGHT
      ===================================================== */}
      <pointLight
        position={[-3, 3, 2]}
        intensity={2.5}
        distance={7}
        color="#7894ff"
      />
      {/* =====================================================
          WIRES
      ===================================================== */}
      <WireField />
      {/* =====================================================
          TRIONN LOGO
      ===================================================== */}
      <TrionnMark />
    </>
  );
}
/* =========================================================
   HERO SCENE
========================================================= */
export default function HeroScene() {
  return (
    <div className="hero-scene">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          toneMappingExposure: 1.25,
        }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
