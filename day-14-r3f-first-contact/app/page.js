"use client";

import { Canvas } from "@react-three/fiber";

export default function Home() {
  return (
    <main>
      <Canvas>
        <mesh>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="orange" />
        </mesh>
      </Canvas>
    </main>
  );
}