import React, { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { feature } from "topojson-client";
import worldData from "world-atlas/countries-110m.json";

import "./RaporaSection.css";

const cities = [
  "Amsterdam",
  "Madrid",
  "Berlin",
  "Vienna",
  "Lisbon",
  "Paris",
];

function createLandDots() {
  const countries = feature(
    worldData,
    worldData.objects.countries
  );

  const width = 1600;
  const height = 800;

  const canvas = document.createElement("canvas");

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d", {
    willReadFrequently: true,
  });

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#ffffff";

  const drawRing = (ring) => {
    if (!ring || !ring.length) return;

    ctx.beginPath();

    ring.forEach(([lon, lat], index) => {
      const x = ((lon + 180) / 360) * width;
      const y = ((90 - lat) / 180) * height;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.closePath();
    ctx.fill();
  };

  const drawPolygon = (polygon) => {
    polygon.forEach(drawRing);
  };

  countries.features.forEach((country) => {
    if (!country.geometry) return;

    if (country.geometry.type === "Polygon") {
      drawPolygon(country.geometry.coordinates);
    }

    if (country.geometry.type === "MultiPolygon") {
      country.geometry.coordinates.forEach(drawPolygon);
    }
  });

  const imageData = ctx.getImageData(
    0,
    0,
    width,
    height
  );

  const pixels = imageData.data;
  const positions = [];

  const step = 3.8;

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const px = Math.floor(x);
      const py = Math.floor(y);

      const index = (py * width + px) * 4;
      const alpha = pixels[index + 3];

      if (alpha < 100) continue;

      const longitude = (x / width) * 360 - 180;
      const latitude = 90 - (y / height) * 180;

      const lat = THREE.MathUtils.degToRad(latitude);
      const lon = THREE.MathUtils.degToRad(longitude);

      const radius = 3;

      const sphereX =
        radius *
        Math.cos(lat) *
        Math.cos(lon);

      const sphereY =
        radius * Math.sin(lat);

      const sphereZ =
        radius *
        Math.cos(lat) *
        Math.sin(lon);

      positions.push(
        sphereX,
        sphereY,
        sphereZ
      );
    }
  }

  return new Float32Array(positions);
}

function createGlobeEdgeDots() {
  const positions = [];

  const radius = 3;
  const latSteps = 130;
  const lonSteps = 260;

  for (let latIndex = 0; latIndex <= latSteps; latIndex++) {
    const latitude =
      -Math.PI / 2 +
      (latIndex / latSteps) * Math.PI;

    for (
      let lonIndex = 0;
      lonIndex < lonSteps;
      lonIndex += 2
    ) {
      const longitude =
        (lonIndex / lonSteps) *
        Math.PI *
        2;

      const x =
        radius *
        Math.cos(latitude) *
        Math.cos(longitude);

      const y =
        radius *
        Math.sin(latitude);

      const z =
        radius *
        Math.cos(latitude) *
        Math.sin(longitude);

      positions.push(x, y, z);
    }
  }

  return new Float32Array(positions);
}

function DottedEarth() {
  const globeRef = useRef();

  const mouse = useRef({
    x: 0,
    y: 0,
  });

  const mouseRotation = useRef({
    x: 0,
    y: 0,
  });

  const landPositions = useMemo(
    () => createLandDots(),
    []
  );

  const edgePositions = useMemo(
    () => createGlobeEdgeDots(),
    []
  );

  useEffect(() => {
    const handleMouseMove = (event) => {
      mouse.current.x =
        (event.clientX / window.innerWidth) * 2 - 1;

      mouse.current.y =
        (event.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
    };
  }, []);

  const landGeometry = useMemo(() => {
    const geometry =
      new THREE.BufferGeometry();

    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        landPositions,
        3
      )
    );

    return geometry;
  }, [landPositions]);

  const edgeGeometry = useMemo(() => {
    const geometry =
      new THREE.BufferGeometry();

    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        edgePositions,
        3
      )
    );

    return geometry;
  }, [edgePositions]);

  const landMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uSize: {
          value: 1.55,
        },
      },

      vertexShader: `
        uniform float uSize;

        void main() {
          vec4 mvPosition =
            modelViewMatrix *
            vec4(position, 1.0);

          gl_PointSize = uSize;

          gl_Position =
            projectionMatrix *
            mvPosition;
        }
      `,

      fragmentShader: `
        void main() {
          vec2 point =
            gl_PointCoord -
            vec2(0.5);

          float distance =
            length(point);

          if (distance > 0.5) {
            discard;
          }

          float alpha =
            smoothstep(
              0.5,
              0.18,
              distance
            );

          gl_FragColor =
            vec4(
              1.0,
              1.0,
              1.0,
              alpha
            );
        }
      `,

      transparent: true,
      depthWrite: false,
      depthTest: true,
    });
  }, []);

  const edgeMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uSize: {
          value: 1.1,
        },
      },

      vertexShader: `
        uniform float uSize;

        void main() {
          vec4 mvPosition =
            modelViewMatrix *
            vec4(position, 1.0);

          gl_PointSize = uSize;

          gl_Position =
            projectionMatrix *
            mvPosition;
        }
      `,

      fragmentShader: `
        void main() {
          vec2 point =
            gl_PointCoord -
            vec2(0.5);

          float distance =
            length(point);

          if (distance > 0.5) {
            discard;
          }

          gl_FragColor =
            vec4(
              1.0,
              1.0,
              1.0,
              0.85
            );
        }
      `,

      transparent: true,
      depthWrite: false,
    });
  }, []);

  useFrame((state, delta) => {
    if (!globeRef.current) return;

    globeRef.current.rotation.y +=
      delta * 0.09;

    const targetX =
      mouse.current.y * 0.12;

    const targetY =
      mouse.current.x * 0.22;

    mouseRotation.current.x +=
      (targetX - mouseRotation.current.x) *
      delta *
      2;

    mouseRotation.current.y +=
      (targetY - mouseRotation.current.y) *
      delta *
      2;

    globeRef.current.rotation.x =
      THREE.MathUtils.lerp(
        globeRef.current.rotation.x,
        mouseRotation.current.x,
        delta * 0.7
      );
  });

  return (
    <group
      ref={globeRef}
      rotation={[
        THREE.MathUtils.degToRad(3),
        THREE.MathUtils.degToRad(-72),
        0,
      ]}
    >
      <points
        geometry={landGeometry}
        material={landMaterial}
      />

      <points
        geometry={edgeGeometry}
        material={edgeMaterial}
      />
    </group>
  );
}

function EarthCanvas() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 8.5],
        fov: 50,
        near: 0.1,
        far: 100,
      }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
      }}
      frameloop="always"
    >
      <DottedEarth />
    </Canvas>
  );
}

export default function RaporaSection() {
  return (
    <section className="rapora-section">
      <div className="rapora-cities">
        <div className="rapora-city-track">
          <div className="rapora-city-group">
            {cities.map((city) => (
              <div
                className="rapora-city"
                key={city}
              >
                {city}
              </div>
            ))}
          </div>

          <div
            className="rapora-city-group"
            aria-hidden="true"
          >
            {cities.map((city) => (
              <div
                className="rapora-city"
                key={`copy-${city}`}
              >
                {city}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rapora-brand">
        IVENTIONS
      </div>

      <div className="rapora-copy">
        <h2>
          We’ve produced
          <br />
          events in Europe’s
          <br />
          most iconic cities.
        </h2>

        <p>
          Bringing together audiences, cultures and ideas.
          <br />
          Boundless reach. Seamless delivery. We bring the
          <br />
          spotlight anywhere you need it.
        </p>
      </div>

      <div className="rapora-globe">
        <EarthCanvas />
      </div>
    </section>
  );
}