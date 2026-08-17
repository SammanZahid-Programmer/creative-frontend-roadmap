import { Line } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/* =========================================================
   CREATE 3 CUSTOM WIRES
========================================================= */

function createWire(index) {
  const paths = [
    [
      [-9, -2.9, -1.0],
      [-6.0, -2.45, -1.0],
      [-3.0, -1.65, -1.0],
      [0.0, -0.85, -1.0],
      [3.2, 0.15, -1.0],
      [6.0, 1.15, -1.0],
      [9.0, 2.05, -1.0],
    ],

    [
      [-9, -1.55, -1.03],
      [-6.5, -1.25, -1.03],
      [-4.0, -0.65, -1.03],
      [-1.2, 0.0, -1.03],
      [1.8, 0.75, -1.03],
      [4.8, 1.55, -1.03],
      [9.0, 2.65, -1.03],
    ],

    [
      [-9, -4.05, -1.06],
      [-6.5, -3.55, -1.06],
      [-4.2, -2.75, -1.06],
      [-1.5, -1.55, -1.06],
      [1.5, -0.15, -1.06],
      [4.8, 1.65, -1.06],
      [9.0, 3.45, -1.06],
    ],
  ];

  const curve = new THREE.CatmullRomCurve3(
    paths[index].map(
      ([x, y, z]) =>
        new THREE.Vector3(x, y, z)
    ),
    false,
    "catmullrom",
    0.5
  );

  const points = curve.getPoints(150);

  return {
    points,
    curve,
  };
}

/* =========================================================
   ELECTRICITY
========================================================= */

function Electricity({
  curve,
  active,
  offset = 0,
}) {
  const group = useRef();

  /*
    One-way progress.

    0 -> 1

    End par ja kar dobara
    0 se start.
  */

  useFrame(({ clock }) => {
    if (!group.current) return;

    if (!active) {
      group.current.visible = false;
      return;
    }

    group.current.visible = true;

    const time = clock.getElapsedTime();

    /*
      FLOW SPEED

      Increase 0.55 if you want
      even faster electricity.
    */

    const progress =
      (time * 0.30 + offset) % 1;

    /*
      Actual position on wire
    */

    const point =
      curve.getPoint(progress);

    /*
      Direction of wire
    */

    const tangent =
      curve.getTangent(progress);

    /*
      Move electricity exactly
      along wire.
    */

    group.current.position.copy(point);

    /*
      Rotate according to wire.
    */

    group.current.rotation.z =
      Math.atan2(
        tangent.y,
        tangent.x
      );

    /*
      Tiny lightning flicker.
    */

    const flicker =
      Math.sin(
        time * 45 +
        offset * 20
      ) *
        0.5 +
      0.5;

    /*
      Keep electricity approximately
      the same thickness as the wire.
    */

    const width =
      0.020 +
      flicker * 0.018;

    const length =
      0.10 +
      flicker * 0.08;

    group.current.scale.set(
      length,
      width,
      1
    );

    /*
      Opacity flicker
    */

    const material =
      group.current.children[0]
        ?.material;

    if (material) {
      material.opacity =
        0.45 +
        flicker * 0.55;
    }
  });

  return (
    <group
      ref={group}
      visible={false}
    >
      <mesh>
        <planeGeometry
          args={[1, 1]}
        />

        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0}
          blending={
            THREE.AdditiveBlending
          }
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   MAIN WIRE FIELD
========================================================= */

export default function WireField() {
  const group = useRef();

  const { pointer } = useThree();

  /*
    Exactly 3 wires
  */

  const wires = useMemo(() => {
    return Array.from(
      { length: 3 },
      (_, index) =>
        createWire(index)
    );
  }, []);

  /*
    Mouse center area

    Electricity appears when
    mouse enters this area.
  */

  const sparkActive =
    pointer.x > -0.55 &&
    pointer.x < 0.55 &&
    pointer.y > -0.65 &&
    pointer.y < 0.65;

  /* =====================================================
     WIRE MOVEMENT
  ===================================================== */

  useFrame(({ clock }) => {
    if (!group.current) return;

    const time =
      clock.getElapsedTime();

    /*
      Slight horizontal movement
    */

    group.current.position.x =
      Math.sin(time * 0.28) *
      0.045;

    /*
      Slight vertical movement
    */

    group.current.position.y =
      Math.cos(time * 0.22) *
      0.03;

    /*
      Very subtle rotation
    */

    group.current.rotation.z =
      Math.sin(time * 0.16) *
      0.003;

    /*
      Mouse interaction
    */

    const targetRotationX =
      pointer.y * 0.012;

    const targetRotationY =
      pointer.x * 0.008;

    group.current.rotation.x +=
      (targetRotationX -
        group.current.rotation.x) *
      0.02;

    group.current.rotation.y +=
      (targetRotationY -
        group.current.rotation.y) *
      0.02;
  });

  return (
    <group ref={group}>

      {/* =================================================
          WIRES
      ================================================= */}

      {wires.map(
        (wire, index) => (
          <Line
            key={`wire-${index}`}
            points={wire.points}
            color="#2d3741"
            lineWidth={0.65}
            transparent
            opacity={0.72}
          />
        )
      )}

      {/* =================================================
          ELECTRICITY
      ================================================= */}

      {wires.map(
        (wire, index) => (
          <Electricity
            key={`electric-${index}`}
            curve={wire.curve}
            active={sparkActive}
            offset={
              index * 0.22
            }
          />
        )
      )}

    </group>
  );
}