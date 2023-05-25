import * as THREE from 'three';

// Fix for colors used outside react
THREE.ColorManagement.legacyMode = false;

export const WALL_MATERIAL = new THREE.MeshStandardMaterial({
  color: 'slategrey',
});
export const FLOOR_1_MATERIAL = new THREE.MeshStandardMaterial({
  color: 'limegreen',
});
export const FLOOR_2_MATERIAL = new THREE.MeshStandardMaterial({
  color: 'greenyellow',
});
export const OBSTACLE_MATERIAL = new THREE.MeshStandardMaterial({
  color: 'orangered',
});
export const BOX_GEOMETRY = new THREE.BoxGeometry(1, 1, 1);
