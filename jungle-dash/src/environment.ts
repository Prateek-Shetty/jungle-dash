import * as THREE from 'three';
import { gltfLoader } from './loaders';

export function setupEnvironment(scene: THREE.Scene) {
  scene.fog = new THREE.FogExp2(0x556b2f, 0.03);
  scene.background = new THREE.Color(0x3c5529);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 10, 7);
  scene.add(light);

  const ambient = new THREE.AmbientLight(0x404040);
  scene.add(ambient);

  for (let i = 0; i < 20; i++) {
    gltfLoader.load('/assets/tree.glb', (gltf) => {
      const tree = gltf.scene;
      tree.scale.set(0.5, 0.5, 0.5);
      tree.position.set((Math.random() * 20 - 10), 0, -i * 10);
      scene.add(tree);
    });
  }
}
