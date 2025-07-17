import * as THREE from 'three';

let terrainChunks: THREE.Mesh[] = [];

export function setupTerrain(scene: THREE.Scene) {
  const geometry = new THREE.PlaneGeometry(10, 20);
  const material = new THREE.MeshStandardMaterial({ color: 0x775533 });

  for (let i = 0; i < 6; i++) {
    const chunk = new THREE.Mesh(geometry, material);
    chunk.rotation.x = -Math.PI / 2;
    chunk.position.z = i * 20;
    chunk.receiveShadow = true;
    terrainChunks.push(chunk);
    scene.add(chunk);
  }
}

export function updateTerrain(scene: THREE.Scene, camera: THREE.Camera) {
  const camZ = camera.position.z;

  for (const chunk of terrainChunks) {
    if (chunk.position.z + 10 < camZ) {
      chunk.position.z += 120;
    }
  }
}
