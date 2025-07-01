import * as THREE from "three";
import { tileSize } from "../constants";

export function Tree(tileIndex, height) {
    const tree = new THREE.Group();
    tree.position.x = tileIndex * tileSize;
    
    const trunk = new THREE.Mesh(
        new THREE.BoxGeometry(15, 15, 20),
        new THREE.MeshLambertMaterial({
            color: 0x8B4513,
            flatShading: true,
        })
    );
    trunk.position.z = 10;
    tree.add(trunk);
    
    const foliage = new THREE.Mesh(
        new THREE.BoxGeometry(30, 30, height),
        new THREE.MeshLambertMaterial({
            color: 0x228B22,
            flatShading: true,
        })
    );
    foliage.position.z = height / 2 + 20;
    tree.add(foliage);
    
    return tree;
}
