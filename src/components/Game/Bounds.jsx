import React from 'react';
import { BOX_GEOMETRY, WALL_MATERIAL } from './Constants';
import { CuboidCollider, RigidBody } from '@react-three/rapier';

const Bounds = ({ length = 2 }) => {
  return (
    <RigidBody type="fixed" restitution={0.2} friction={0}>
      <mesh
        geometry={BOX_GEOMETRY}
        material={WALL_MATERIAL}
        position={[2 + 0.15, 1.5 - 0.2, -length * 2 + 2]}
        scale={[0.3, 3, 4 * length]}
        castShadow
      />
      <mesh
        geometry={BOX_GEOMETRY}
        material={WALL_MATERIAL}
        position={[-2 - 0.15, 1.5 - 0.2, -length * 2 + 2]}
        scale={[0.3, 3, 4 * length]}
        receiveShadow
      />
      <mesh
        geometry={BOX_GEOMETRY}
        material={WALL_MATERIAL}
        position={[0, 1.5 - 0.2, -length * 4 + 2 - 0.15]}
        scale={[4, 3, 0.3]}
        receiveShadow
      />

      <CuboidCollider
        args={[2, 0.1, 2 * length]}
        position={[0, -0.1, -(length * 2) + 2]}
        restitution={0.2}
        friction={1}
      />
    </RigidBody>
  );
};

export default Bounds;
