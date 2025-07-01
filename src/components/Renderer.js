import * as THREE from "three";

export function Renderer() {
    const canvas = document.querySelector("canvas.game");
    if (!canvas) throw new Error("Canvas cannot be found!");

    const renderer = new THREE.WebGLRenderer({
        alpha: true, // Enable transparency for layered rendering
        antialias: true,
        canvas: canvas,
    });
    
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Enable shadows for depth effect
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Clear color should be transparent
    renderer.setClearColor(0x000000, 0);

    return renderer
}