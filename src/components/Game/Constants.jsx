import * as THREE from 'three';

// Fix for colors used outside react
THREE.ColorManagement.legacyMode = false;

export const WALL_MATERIAL = new THREE.MeshStandardMaterial({
  color: '#887777',
  metalness: 0,
  roughness: 0,
});
export const FLOOR_1_MATERIAL = new THREE.MeshStandardMaterial({
  color: '#111111',
  metalness: 0,
  roughness: 0,
});
export const FLOOR_2_MATERIAL = new THREE.MeshStandardMaterial({
  color: '#222222',
  metalness: 0,
  roughness: 0,
});
export const OBSTACLE_MATERIAL = new THREE.MeshStandardMaterial({
  color: '#ff0000',
  metalness: 0,
  roughness: 1,
});
export const BOX_GEOMETRY = new THREE.BoxGeometry(1, 1, 1);
