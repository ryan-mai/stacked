import * as THREE from 'three';
import { Renderer } from "./components/Renderer";
import { Camera } from "./components/Camera";
import { player } from "./components/Player";
import { map, initializeMap } from "./components/Map";
import "./style.css";

// Game state management
let gameStarted = false;
let score = 0;

// Get UI elements
const startScreen = document.getElementById('startScreen');
const gameUI = document.getElementById('gameUI');
const playButton = document.getElementById('playButton');
const scoreElement = document.getElementById('score');

// Set up play button event listener
playButton.addEventListener('click', startGame);

function startGame() {
    gameStarted = true;
    startScreen.classList.add('hidden');
    gameUI.classList.remove('hidden');
    
    // Initialize the game
    initializeGame();
}

function updateScore(newScore) {
    score = newScore;
    scoreElement.textContent = score;
}

const scene = new THREE.Scene();

// Create gradient background shader for ombre effect
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  void main() {
    // Create teal gradient from top to bottom like Stack game
    vec3 topColor = vec3(0.306, 0.827, 0.769); // Light teal #4ECDC4
    vec3 bottomColor = vec3(0.173, 0.471, 0.451); // Darker teal #2C7873
    
    // Mix colors based on vertical position
    vec3 color = mix(bottomColor, topColor, vUv.y);
    gl_FragColor = vec4(color, 1.0);
  }
`;

// Create a large plane to serve as gradient background
const backgroundGeometry = new THREE.PlaneGeometry(2, 2);
const backgroundMaterial = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  depthWrite: false,
});

const backgroundMesh = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
backgroundMesh.position.z = -1;

// Create a separate scene for the background
const backgroundScene = new THREE.Scene();
backgroundScene.add(backgroundMesh);

// Create orthographic camera for background
const backgroundCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

scene.add(player);
scene.add(map);

// Softer ambient lighting for the aesthetic
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

// Directional light positioned to create nice shadows
const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(50, -50, 100);
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;
scene.add(dirLight);

const camera = Camera();
scene.add(camera);

// Don't initialize game immediately - wait for play button
createFloatingParticles();

function initializeGame() {
    initializeMap();
}

// Add floating particles like in Stack game
function createFloatingParticles() {
    const particleGeometry = new THREE.SphereGeometry(1, 8, 8);
    const particleMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xffffff, 
        transparent: true, 
        opacity: 0.6 
    });

    for (let i = 0; i < 20; i++) {
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        particle.position.set(
            (Math.random() - 0.5) * 400,
            (Math.random() - 0.5) * 400,
            Math.random() * 300 + 50
        );
        scene.add(particle);
        
        // Animate particles
        function animateParticle() {
            particle.position.y += Math.sin(Date.now() * 0.001 + i) * 0.2;
            particle.position.x += Math.cos(Date.now() * 0.001 + i) * 0.1;
        }
        
        // Store animation function for later use
        particle.animate = animateParticle;
    }
}

const renderer = Renderer();

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Always animate floating particles
    scene.children.forEach(child => {
        if (child.animate) {
            child.animate();
        }
    });
    
    // Render background first
    renderer.render(backgroundScene, backgroundCamera);
    
    // Then render main scene with transparent background
    renderer.autoClear = false;
    
    // Only render game objects if game has started
    if (gameStarted) {
        renderer.render(scene, camera);
    } else {
        // Just render the background and particles for start screen
        const startScene = new THREE.Scene();
        // Add only floating particles to start scene
        scene.children.forEach(child => {
            if (child.animate) {
                startScene.add(child.clone());
            }
        });
        renderer.render(startScene, camera);
    }
    
    renderer.autoClear = true;
}
animate();