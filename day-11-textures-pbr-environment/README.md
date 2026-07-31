Day 11:

Learning Today: Today I have learned about Three.js Textures, PBR Materials & Environment Maps in which I have covered the following topics:-

Loading external textures in Three.js using THREE.TextureLoader.
Applying texture maps to 3D objects using MeshStandardMaterial.
Understanding UV mapping and how textures are placed on 3D geometry.
Configuring texture wrapping using RepeatWrapping.
Controlling texture tiling and repetition using texture.repeat.
Understanding PBR (Physically Based Rendering) materials.
Using Color/Diffuse maps to add realistic surface details.
Using Roughness maps to control how shiny or rough a surface appears.
Understanding Normal maps and their role in adding surface depth without increasing geometry.
Understanding Ambient Occlusion (AO) maps for adding realistic contact shadows and depth.
Working with HDRI environment maps for realistic lighting and reflections.
Loading HDRI files using RGBELoader and applying them as scene.environment.
Configuring EquirectangularReflectionMapping for HDRI environment lighting.
Using tone mapping and exposure to improve the overall visual quality of the scene.
Creating a realistic wooden cabin environment using textures, PBR materials, HDRI lighting, shadows, fog, and dynamic lights.
Combining environment lighting with custom Hemisphere, Directional, and Point Lights.
Creating realistic water using MeshPhysicalMaterial with properties like roughness, clearcoat, transparency, and transmission.
Adding animated firelight and water opacity effects to make the scene feel more dynamic and immersive.

In this project I have created a 3D Wooden Cabin Environment using Three.js. I have applied a real wood texture with Color and Roughness maps to the cabin body and configured UV repetition for a more natural texture appearance. I also integrated an HDRI environment from Poly Haven to create realistic environmental lighting and reflections. The scene includes a wooden cabin, roof, door, windows, chimney, deck, table, barrels, campfire, pond, and wooden logs. I combined HDRI lighting with custom moonlight, cabin lights, and dynamic firelight to create a dark nighttime atmosphere. I also implemented OrbitControls, shadows, fog, tone mapping, responsive resizing, and animation effects for fire and water.

Technologies Used:

Next.js
React
Three.js
JavaScript
TextureLoader
PBR Materials
HDRI Environment Maps
RGBELoader
OrbitControls
MeshStandardMaterial
MeshPhysicalMaterial

Next Goal:

DAY 12 — 3D Models: GLB Workflow
Learn: GLTFLoader · Loading & placing GLB models · Draco compression · Inspecting/optimizing with gltf.report