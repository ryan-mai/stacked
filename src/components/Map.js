import * as THREE from "three";
import { Grass } from "./Grass";
import { Tree } from "./Tree";

export const metadata = [
    {
        type: "platform",
        size: { width: 160, height: 130, depth: 10 },
        color: "white",
        position: { x: -30, y: 40, z: -120 }
    },
    {
        type: "platform",
        size: { width: 160, height: 130, depth: 7 },
        color: "white",
        position: { x: -30, y: 40, z: -113 }
    },
    {
        type: "platform",
        size: { width: 160, height: 130, depth: 7 },
        color: "white",
        position: { x: -30, y: 40, z: -106 }
    },
    {
        type: "platform",
        size: { width: 160, height: 130, depth: 7 },
        color: "white",
        position: { x: -30, y: 40, z: -99 }
    },
    {
        type: "platform",
        size: { width: 160, height: 130, depth: 7 },
        color: "white",
        position: { x: -30, y: 40, z: -92 }
    },
    {
        type: "platform",
        size: { width: 160, height: 130, depth: 7 },
        color: "white",
        position: { x: -30, y: 40, z: -85 }
    },
    {
        type: "platform",
        size: { width: 150, height: 120, depth: 7 },
        color: "white",
        position: { x: -35, y: 40, z: -78 }
    },
    {
        type: "platform",
        size: { width: 150, height: 120, depth: 7 },
        color: "white",
        position: { x: -35, y: 40, z: -71 }
    },
    {
        type: "platform",
        size: { width: 150, height: 120, depth: 7 },
        color: "white",
        position: { x: -35, y: 40, z: -64 }
    },
    {
        type: "platform",
        size: { width: 140, height: 110, depth: 7 },
        color: "white",
        position: { x: -40, y: 40, z: -50 }
    },
    {
        type: "platform",
        size: { width: 120, height: 90, depth: 7 },
        color: "white",
        position: { x: -35, y: 40, z: -35 }
    },
    {
        type: "platform",
        size: { width: 100, height: 70, depth: 7 },
        color: "white",
        position: { x: -35, y: 30, z: -15 }
    },
    {
        type: "platform",
        size: { width: 80, height: 50, depth: 7 },
        color: "white",
        position: { x: -30, y: 35, z: 0 }
    },
];

export const map = new THREE.Group();

export function initializeMap() {
    // No bottom platform - let the ombre background handle the void effect
    addPlatforms();
}

export function addPlatforms() {
    metadata.forEach((platformData) => {
        if (platformData.type === "platform") {
            const platform = new THREE.Mesh(
                new THREE.BoxGeometry(
                    platformData.size.width,
                    platformData.size.height, 
                    platformData.size.depth
                ),
                new THREE.MeshLambertMaterial({ 
                    color: platformData.color,
                    flatShading: true // For that Stack game aesthetic
                })
            );
            
            platform.position.set(
                platformData.position.x,
                platformData.position.y,
                platformData.position.z + platformData.size.depth / 2
            );
            
            platform.castShadow = true;
            platform.receiveShadow = true;
            
            map.add(platform);
            
            // Add white outline/border effect like in the image
            const edges = new THREE.EdgesGeometry(platform.geometry);
            const outline = new THREE.LineSegments(
                edges,
                new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 })
            );
            outline.position.copy(platform.position);
            map.add(outline);
        }
    });
}