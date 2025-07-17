import * as THREE from 'three';
import { player } from './player';

let obstacles: THREE.Mesh[] = [];

export function spawnObstacle(scene: THREE.Scene, zPos: number) {
  const geometry = new THREE.BoxGeometry(1.5, 2, 1.5);
  const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  const obstacle = new THREE.Mesh(geometry, material);
  const lane = [-3, 0, 3][Math.floor(Math.random() * 3)];
  obstacle.position.set(lane, 1, zPos);
  obstacle.castShadow = true;
  scene.add(obstacle);
  obstacles.push(obstacle);
}

export function updateObstacles(scene: THREE.Scene) {
  for (let i = obstacles.length - 1; i >= 0; i--) {
    if (obstacles[i].position.z < player.position.z - 10) {
      scene.remove(obstacles[i]);
      obstacles.splice(i, 1);
    }
  }
}

export function checkCollisions(): boolean {
  const playerBox = new THREE.Box3().setFromObject(player);
  for (const obs of obstacles) {
    const obsBox = new THREE.Box3().setFromObject(obs);
    if (playerBox.intersectsBox(obsBox)) {
      return true;
    }
  }
  return false;
}
