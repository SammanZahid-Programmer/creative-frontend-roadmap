"use client";
import { useEffect,useRef} from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";


export default function WoodenCabinScene(){
  const mountRef = useRef(null);

  useEffect(()=>{
    const scene= new THREE.Scene();
    scene.background= new THREE.Color(0x0b1220);
    scene.fog= new THREE.Fog(0x202d3a,10,0);

    const camera = new THREE.PerspectiveCamera(45,window.innerWidth/ window.innerHeight, 0.1,100);
    camera.position.set(14,8,16);

    const renderer = new THREE.WebGLRenderer({
      antialias:true
    });
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
    renderer.shadowMap.enabled= true;
    renderer.shadowMap.type= THREE.PCFShadowMap;
    renderer.outputColorSpace= THREE.SRGBColorSpace;
    renderer.toneMapping= THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure= 1.55;

    mountRef.current.appendChild(
      renderer.domElement
    );

const rgbeLoader = new RGBELoader();

rgbeLoader.load(
  "/textures/lot_01_4k.hdr",
  (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;

    scene.environment = texture;
    scene.environmentIntensity = 0.05;
    console.log("HDRI Environment Loaded");
  }
);

    const textureLoader = new THREE.TextureLoader();
  const woodColor= textureLoader.load("/textures/fine_grained_wood_col_4k.jpg");
  // const woodNormal= textureLoader.load("/textures/wood/wood_normal.jpg");
  const woodRoughness= textureLoader.load("/textures/fine_grained_wood_rough_4k.jpg");
  // const woodAO= textureLoader.load("/textures/wood/wood_ao.webp");
  
   woodColor.colorSpace = THREE.SRGBColorSpace; 
// UV / Texture Repeat
   woodColor.wrapS = THREE.RepeatWrapping;
   woodColor.wrapT = THREE.RepeatWrapping;
   woodRoughness.wrapS = THREE.RepeatWrapping;
   woodRoughness.wrapT = THREE.RepeatWrapping;


// Texture repeat
woodColor.repeat.set(3, 2);
woodRoughness.repeat.set(3, 2);
  //orbit controls
   const controls = new OrbitControls(camera, renderer.domElement);
   controls.enableDamping= true;
   controls.dampingFactor= 0.05;
   controls.enableZoom= true;
   controls.zoomSpeed= 0.8;
   controls.rotateSpeed= 0.7;
   controls.enablePan= true;
   controls.panSpeed= 0.5;
   controls.minDistance= 7;
   controls.maxDistance=35;
   controls.maxPolarAngle= Math.PI/ 2.05;
   controls.target.set(0,2.5,0);

    // Main Wood

const woodMaterial = new THREE.MeshStandardMaterial({
  map: woodColor,
  // normalMap: woodNormal,
  roughnessMap: woodRoughness,
  // aoMap: woodAO,

  roughness: 0.8,
  metalness: 0,

  // aoMapIntensity: 1.2,
});


    // Dark Wood

    const darkWoodMaterial =
      new THREE.MeshStandardMaterial({

        color:
          0x3b2114,

        roughness:
          0.85

      });


    // Light Wood

    const lightWoodMaterial =
      new THREE.MeshStandardMaterial({

        color:
          0xa66b3f,

        roughness:
          0.7

      });


    // Roof

    const roofMaterial =
      new THREE.MeshStandardMaterial({

        color:
          0x252525,

        roughness:
          0.9

      });


    // Stone

    const stoneMaterial =
      new THREE.MeshStandardMaterial({

        color:
          0x555555,

        roughness:
          1

      });


    // Metal

    const metalMaterial =
      new THREE.MeshStandardMaterial({

        color:
          0x555555,

        metalness:
          1,

        roughness:
          0.2

      });


    // Water

    const waterMaterial =
      new THREE.MeshPhysicalMaterial({

        color:
          0x176b87,

        transparent:
          true,

        opacity:
          0.75,

        roughness:
          0.05,

        metalness:
          0.1,

        clearcoat:
          1,

        clearcoatRoughness:
          0.05,
        transmission: 0.05,

      });


    // =================================================
    // 6. GROUND
    // =================================================

    const ground =
      new THREE.Mesh(

        new THREE.PlaneGeometry(

          80,

          80

        ),

        new THREE.MeshStandardMaterial({

          color:
            0x263b2b,

          roughness:
            1

        })

      );


    ground.rotation.x =
      -Math.PI / 2;


    ground.receiveShadow =
      true;


    scene.add(

      ground

    );


    // =================================================
    // 7. CABIN GROUP
    // =================================================

    const cabin =
      new THREE.Group();


    // =================================================
    // 8. CABIN MAIN BODY
    // =================================================

    const cabinBody =
      new THREE.Mesh(

        new THREE.BoxGeometry(

          7,

          4,

          5

        ),

        woodMaterial

      );


    cabinBody.position.y =
      2.2;


    cabinBody.castShadow =
      true;


    cabinBody.receiveShadow =
      true;


    cabin.add(

      cabinBody

    );


    // =================================================
    // 9. ROOF
    // =================================================

    const roof =
      new THREE.Mesh(

        new THREE.ConeGeometry(

          5.2,

          3.5,

          4

        ),

        roofMaterial

      );


    roof.rotation.y =
      Math.PI / 4;


    roof.position.y =
      6;


    roof.castShadow =
      true;


    cabin.add(

      roof

    );


    // =================================================
    // 10. DOOR
    // =================================================

    const door =
      new THREE.Mesh(

        new THREE.BoxGeometry(

          1.5,

          2.8,

          0.2

        ),

        darkWoodMaterial

      );


    door.position.set(

      0,

      1.6,

      2.55

    );


    door.castShadow =
      true;


    cabin.add(

      door

    );


    // =================================================
    // 11. DOOR HANDLE
    // =================================================

    const handle =
      new THREE.Mesh(

        new THREE.SphereGeometry(

          0.12,

          12,

          12

        ),

        metalMaterial

      );


    handle.position.set(

      0.45,

      1.6,

      2.7

    );


    cabin.add(

      handle

    );


    // =================================================
    // 12. WINDOWS
    // =================================================

    const windowMaterial =
      new THREE.MeshStandardMaterial({

        color:
          0xffb52e,

        emissive:
          0xff8c00,

        emissiveIntensity:
          2

      });


    function createWindow(

      x,

      y,

      z

    ) {


      const window =
        new THREE.Mesh(

          new THREE.BoxGeometry(

            1.6,

            1.4,

            0.15

          ),

          windowMaterial

        );


      window.position.set(

        x,

        y,

        z

      );


      cabin.add(

        window

      );

    }


    // Front Windows

    createWindow(

      -2.1,

      3,

      2.55

    );


    createWindow(

      2.1,

      3,

      2.55

    );


    // =================================================
    // 13. CHIMNEY
    // =================================================

    const chimney =
      new THREE.Mesh(

        new THREE.BoxGeometry(

          0.8,

          3,

          0.8

        ),

        stoneMaterial

      );


    chimney.position.set(

      2,

      7,

      0

    );


    chimney.castShadow =
      true;


    cabin.add(

      chimney

    );


    // =================================================
    // 14. WOODEN DECK
    // =================================================

    const deck =
      new THREE.Mesh(

        new THREE.BoxGeometry(

          9,

          0.35,

          3

        ),

        lightWoodMaterial

      );


    deck.position.set(

      0,

      0.5,

      4

    );


    deck.castShadow =
      true;


    deck.receiveShadow =
      true;


    cabin.add(

      deck

    );


    // =================================================
    // 15. DECK RAILINGS
    // =================================================

    function createRail(

      x

    ) {


      const post =
        new THREE.Mesh(

          new THREE.BoxGeometry(

            0.25,

            1.5,

            0.25

          ),

          darkWoodMaterial

        );


      post.position.set(

        x,

        1.3,

        5.2

      );


      cabin.add(

        post

      );

    }


    createRail(-4);

    createRail(-2);

    createRail(0);

    createRail(2);

    createRail(4);


    // Horizontal Rail

    const horizontalRail =
      new THREE.Mesh(

        new THREE.BoxGeometry(

          9,

          0.25,

          0.25

        ),

        darkWoodMaterial

      );


    horizontalRail.position.set(

      0,

      1.8,

      5.2

    );


    cabin.add(

      horizontalRail

    );


    // =================================================
    // 16. WOODEN TABLE
    // =================================================

    const table =
      new THREE.Group();


    // Table Top

    const tableTop =
      new THREE.Mesh(

        new THREE.BoxGeometry(

          3,

          0.3,

          1.5

        ),

        lightWoodMaterial

      );


    tableTop.position.y =
      1.5;


    tableTop.castShadow =
      true;


    table.add(

      tableTop

    );


    // Table Legs

    for (

      let x of [-1.2, 1.2]

    ) {


      for (

        let z of [-0.5, 0.5]

      ) {


        const leg =
          new THREE.Mesh(

            new THREE.BoxGeometry(

              0.2,

              1.5,

              0.2

            ),

            darkWoodMaterial

          );


        leg.position.set(

          x,

          0.75,

          z

        );


        leg.castShadow =
          true;


        table.add(

          leg

        );

      }

    }


    table.position.set(

      0,

      0.5,

      4

    );


    cabin.add(

      table

    );


    // =================================================
    // 17. WOODEN BARRELS
    // =================================================

    function createBarrel(

      x,

      z

    ) {


      const barrel =
        new THREE.Mesh(

          new THREE.CylinderGeometry(

            0.7,

            0.7,

            1.5,

            16

          ),

          darkWoodMaterial

        );


      barrel.rotation.z =
        Math.PI / 2;


      barrel.position.set(

        x,

        1.2,

        z

      );


      barrel.castShadow =
        true;


      cabin.add(

        barrel

      );

    }


    createBarrel(

      -5,

      4

    );


    createBarrel(

      5,

      4

    );


    // =================================================
    // 18. CAMPFIRE
    // =================================================

    const firePlace =
      new THREE.Group();


    // Fire Stones

    for (

      let i = 0;

      i < 8;

      i++

    ) {


      const angle =

        (i / 8) *

        Math.PI *

        2;


      const stone =
        new THREE.Mesh(

          new THREE.DodecahedronGeometry(

            0.4,

            1

          ),

          stoneMaterial

        );


      stone.position.set(

        Math.cos(angle) *

        1.5,

        0.35,

        Math.sin(angle) *

        1.5

      );


      stone.castShadow =
        true;


      firePlace.add(

        stone

      );

    }


    // Fire

    const fire =
      new THREE.Mesh(

        new THREE.ConeGeometry(

          0.8,

          2,

          16

        ),

        new THREE.MeshBasicMaterial({

          color:
            0xff6600

        })

      );


    fire.position.y =
      1;


    firePlace.add(

      fire

    );


    firePlace.position.set(

      -5,

      0,

      7

    );


    cabin.add(

      firePlace

    );


    // =================================================
    // 19. POND
    // =================================================

    const pond =
      new THREE.Mesh(

        new THREE.CircleGeometry(

          6,

          64

        ),

        waterMaterial

      );


    pond.rotation.x =
      -Math.PI / 2;


    pond.position.set(

      -8,

      0.05,

      -5

    );


    scene.add(

      pond

    );


    // =================================================
    // 20. WOOD LOGS
    // =================================================

    function createLog(

      x,

      z,

      rotation

    ) {


      const log =
        new THREE.Mesh(

          new THREE.CylinderGeometry(

            0.35,

            0.35,

            3,

            12

          ),

          darkWoodMaterial

        );


      log.rotation.z =
        Math.PI / 2;


      log.rotation.y =
        rotation;


      log.position.set(

        x,

        0.4,

        z

      );


      log.castShadow =
        true;


      scene.add(

        log

      );

    }


    createLog(

      5,

      -3,

      0

    );


    createLog(

      5,

      -3.7,

      0.2

    );


    createLog(

      5,

      -4.4,

      -0.1

    );


    // =================================================
    // 21. ADD CABIN
    // =================================================

    cabin.position.set(

      0,

      0,

      0

    );


    scene.add(

      cabin

    );
  //Lighting
  const hemisphere= new THREE.HemisphereLight( 0x9db8d6,0x182018,1.8);
  scene.add(hemisphere);
  const moonLight = new THREE.DirectionalLight(0x9bb7d4,0.5);
  moonLight.position.set(-10,15,10);
  moonLight.castShadow= true;
  moonLight.shadow.mapSize.width= 2048;
  moonLight.shadow.mapSize.height= 2048;
  scene.add(moonLight);

  //cabin light
  const cabinLight= new THREE.PointLight(0xff8c32,13,17);
  cabinLight.position.set(0,3,3);
  cabin.add(cabinLight);
  //firelight
  const firelight = new THREE.PointLight(0xff5500,17,14);
  firelight.position.set(-5,2,7);
  cabin.add(firelight);
  function animate(){
    requestAnimationFrame(animate);
    controls.update();
    firelight.intensity= 14+ Math.sin(Date.now()*0.01)*3;
    fire.scale.y= 1+ Math.sin(Date.now()*0.008)*0.15;
    pond.material.opacity= 0.65+ Math.sin(Date.now()*0.001)*0.05;

    renderer.render(scene,camera);
  }
  animate();
  const handleResize = ()=>{
    camera.aspect = window.innerWidth/ window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth , window.innerHeight);
  };
  window.addEventListener("resize", handleResize);
  //cleanup
  return()=>{
    window.removeEventListener("resize",handleResize);
    controls.dispose();
    renderer.dispose();
    if(
      mountRef.current && renderer.domElement.parentNode === mountRef.current
    ){
      mountRef.current.removeChild(renderer.domElement);
    }
  };
  },[]);
  return(
    <main 
    ref= {mountRef}
    style={{
      width:"100vw", height:"100vh", overflow: "hidden",
    }} />
  );
}