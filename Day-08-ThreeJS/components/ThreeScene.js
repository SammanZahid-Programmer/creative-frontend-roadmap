"use client";
import{useEffect,useRef} from "react";
import * as THREE from "three";

export default function ThreeScene(){
    const mountRef = useRef(null);
    useEffect(()=>{
        //for scenes:
    const scene = new THREE.Scene();
        //for camera"
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z=5;
        //for renderer:
    const renderer = new THREE.WebGLRenderer({
        antialias:true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
    //adding renderer into the html container 
    mountRef.current.appendChild(renderer.domElement);

    //geometry
    const geometry= new THREE.BoxGeometry();
    //material
    const material= new THREE.MeshBasicMaterial({
        color:0x00ff00,
    });
    //mesh
    const cube = new THREE.Mesh(geometry,material);
    scene.add(cube);
    //for resizing
    function handleResize(){
        camera.aspect= window.innerWidth / window.innerHeight; //camera k aspect ratio update k liye
        camera.updateProjectionMatrix(); // camera ki new setting update krne k liye 
        renderer.setSize(window.innerWidth, window.innerHeight); //for renderer k size update 
        renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)); //for update pixel raatio      window.addEventListener("resize",handleResize);
    }
    // animation
    function animate(){
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene,camera);
    }
    animate();
    //cleanup
    return()=>{
    window.removeEventListener("resize",handleResize);
    mountRef.current.removeChild(renderer.domElement);
    };
    },[]);
    return <div ref={mountRef} />;
}