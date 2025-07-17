import * as THREE from 'three';

export let player: THREE.Mesh;
let velocityY = 0;
let isJumping = false;
let currentLane = 0;

const GRAVITY = -0.9;
const JUMP_FORCE = 0.18;
const FORWARD_SPEED = 0.3;

export function setupPlayer(scene: THREE.Scene) {
  const geometry = new THREE.BoxGeometry(1, 2, 1);
  const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
  player = new THREE.Mesh(geometry, material);
  player.position.set(0, 1, 0);
  player.castShadow = true;
  scene.add(player);
}

export function handlePlayerInput() {
  window.addEventListener('keydown', (event) => {
    if ((event.key === 'ArrowLeft' || event.key === 'a') && currentLane < 1) {
      currentLane++;
    }
    if ((event.key === 'ArrowRight' || event.key === 'd') && currentLane > -1) {
      currentLane--;
    }
    if ((event.key === ' ' || event.key === 'ArrowUp') && !isJumping) {
      velocityY = JUMP_FORCE;
      isJumping = true;
    }
  });
}


export function updatePlayer() {
  // Auto-run forward
  player.position.z += FORWARD_SPEED;

  // Smooth lane movement
  const targetX = currentLane * 3;
  player.position.x += (targetX - player.position.x) * 0.2;

  // Gravity / Jump
  velocityY += GRAVITY * 0.016;
  player.position.y += velocityY;

  // Ground check
  if (player.position.y <= 1) {
    player.position.y = 1;
    velocityY = 0;
    isJumping = false;
  }
}
