import * as THREE from 'three';
import { setupPlayer, updatePlayer, player, handlePlayerInput } from './player';
import { setupTerrain, updateTerrain } from './terrain';
import { spawnObstacle, updateObstacles, checkCollisions } from './obstacle';

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;

let lastObstacleZ = 0;
const obstacleInterval = 20;

export function initGame(container: HTMLElement) {
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x88cc88, 20, 100);

  camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(0, 5, -10);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 10, 5);
  light.castShadow = true;
  scene.add(light);

  const ambient = new THREE.AmbientLight(0x404040);
  scene.add(ambient);

  setupTerrain(scene);
  setupPlayer(scene);
  handlePlayerInput();

  animate();
}

function animate() {
  requestAnimationFrame(animate);

  const playerZ = player.position.z;

  if (playerZ + 50 > lastObstacleZ) {
    spawnObstacle(scene, lastObstacleZ + obstacleInterval);
    lastObstacleZ += obstacleInterval;
  }

  updatePlayer();
  updateTerrain(scene, camera);
  updateObstacles(scene);

  if (checkCollisions()) {
    alert("Game Over!");
    window.location.reload();
    return;
  }

  camera.position.z = player.position.z - 5;
  camera.position.x = player.position.x;
  camera.lookAt(player.position);

  renderer.render(scene, camera);
}
