import * as THREE from "three";

export const player = Player();

function Player() {
    const body = new THREE.Mesh(
        new THREE.BoxGeometry(40, 20, 7),
        new THREE.MeshLambertMaterial({
            color: "white", // Same cream color as platforms
            flatShading: true,
        })
    );
    body.position.set(0, 0, 115); // Position on top of the highest platform
    body.castShadow = true;

    // Add white outline for the player too
    const edges = new THREE.EdgesGeometry(body.geometry);
    const outline = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 })
    );
    outline.position.copy(body.position);

    const playerGroup = new THREE.Group();
    playerGroup.add(body);
    playerGroup.add(outline);

    return playerGroup;
}