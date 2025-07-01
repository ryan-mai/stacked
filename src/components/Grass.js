import * as THREE from "three";
import { tilesPerRow, tileSize } from "../constants";

export function Grass(rowIndex) {
    const grass = new THREE.Group();
    grass.position.y = rowIndex * tileSize;

    // Create hollow platform with outer and inner geometries
    const platformWidth = tilesPerRow * tileSize;
    const platformHeight = tileSize;
    const platformThickness = 4;
    const hollowWidth = platformWidth - 40; // Make it hollow
    const hollowHeight = platformHeight - 20;

    // Outer platform (dark void material)
    const outerPlatform = new THREE.Mesh(
        new THREE.BoxGeometry(platformWidth, platformHeight, platformThickness),
        new THREE.MeshLambertMaterial({ 
            color: 0x1a1a1a, // Very dark gray, almost black
            transparent: true,
            opacity: 0.8
        })
    );
    outerPlatform.position.z = 2;

    // Inner hollow part (even darker, creating depth)
    const innerHollow = new THREE.Mesh(
        new THREE.BoxGeometry(hollowWidth, hollowHeight, platformThickness + 1),
        new THREE.MeshLambertMaterial({ 
            color: 0x000000, // Pure black for void effect
            transparent: true,
            opacity: 0.9
        })
    );
    innerHollow.position.z = 1.5;

    // Add glowing edge effect
    const edgeGlow = new THREE.Mesh(
        new THREE.BoxGeometry(platformWidth + 2, platformHeight + 2, 1),
        new THREE.MeshLambertMaterial({ 
            color: 0x4a4a4a, // Subtle glow
            transparent: true,
            opacity: 0.3
        })
    );
    edgeGlow.position.z = 3;

    grass.add(outerPlatform);
    grass.add(innerHollow);
    grass.add(edgeGlow);

    return grass;
}