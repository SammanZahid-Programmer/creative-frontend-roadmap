# Three.js Week 2 — Day 8

## Rotating 3D Cube

This project is part of my Creative Frontend Development learning roadmap.

On Day 8, I started learning the fundamentals of Three.js and built a rotating 3D cube using Next.js and Three.js.

## What I Learned

- Three.js Scene and Scene Graph
- PerspectiveCamera
- Field of View (FOV)
- Camera Aspect Ratio
- Near and Far Clipping Planes
- WebGLRenderer
- Render Loop
- requestAnimationFrame()
- Geometry
- Material
- Mesh
- Handling Window Resize
- Device Pixel Ratio
- Basic Three.js animation

## Technologies Used

- Next.js
- React
- Three.js
- JavaScript
- WebGL

## Main Three.js Concepts

The basic Three.js rendering flow I learned:

Scene
↓
Camera
↓
Renderer
↓
Geometry + Material
↓
Mesh
↓
Animation Loop
↓
Rendered 3D Scene

## Project Features

- Created a 3D scene from scratch
- Added a Perspective Camera
- Created a WebGL Renderer
- Built a 3D cube using BoxGeometry
- Applied MeshBasicMaterial to the cube
- Added rotation animation using requestAnimationFrame()
- Added responsive window resize handling
- Handled device pixel ratio for better rendering quality

## Project Structure

threejs-week2/
├── app/
│   └── page.js
├── components/
│   └── ThreeScene.js
├── public/
├── package.json
└── README.md

## Learning Goal

The goal of Day 8 was to build a correct mental model of 3D rendering on the web and understand the relationship between the Scene, Camera, Renderer, Geometry, Material, and Mesh.

## Day 8 Status

✅ Completed

## Next — Day 9

In Day 9, I will explore Three.js geometries, materials, lights, and basic shadows.

### Topics to Learn

- BoxGeometry
- SphereGeometry
- TorusGeometry
- PlaneGeometry
- MeshBasicMaterial
- MeshStandardMaterial
- MeshPhysicalMaterial
- AmbientLight
- DirectionalLight
- PointLight
- SpotLight
- Basic shadows
- lil-gui for live controls
