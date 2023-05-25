import { useFrame } from '@react-three/fiber';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import Hamburger from './Hamburger';
import Bounds from './Bounds';
import {
  BOX_GEOMETRY,
  FLOOR_1_MATERIAL,
  FLOOR_2_MATERIAL,
  OBSTACLE_MATERIAL,
} from './Constants';

export const StartBlock = ({ position = [0, 0, 0] }) => {
  return (
    <group position={position}>
      <mesh
        geometry={BOX_GEOMETRY}
        material={FLOOR_1_MATERIAL}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
    </group>
  );
};

export const TrapBlockSpinner = ({ position = [0, 0, 0] }) => {
  const obstacle = useRef();
  const speed = useMemo(() => {
    const value = Math.random() + 0.05;

    // Randomize the direction of the rotation
    if (Math.random() < 0.5) return value * -1;
    else return value * 1;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const rotation = new THREE.Quaternion();
    rotation.setFromEuler(new THREE.Euler(0, time * speed, 0)); // Rotate only on y
    obstacle.current.setNextKinematicRotation(rotation);
  });

  return (
    <group position={position}>
      <mesh
        geometry={BOX_GEOMETRY}
        material={FLOOR_2_MATERIAL}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2} // bouce char just a little back
        friction={0} // we dont want to get stuck or to travel arround the obstacle
      >
        <mesh
          geometry={BOX_GEOMETRY}
          material={OBSTACLE_MATERIAL}
          scale={[3.5, 0.3, 0.3]}
          receiveShadow
          castShadow
        />
      </RigidBody>
    </group>
  );
};

export const TrapBlockLimbo = ({ position = [0, 0, 0] }) => {
  const obstacle = useRef();
  const timeOffset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const y = Math.sin(time + timeOffset) + 1.15;
    obstacle.current.setNextKinematicTranslation({
      x: position[0],
      y: position[1] + y,
      z: position[2],
    });
  });

  return (
    <group position={position}>
      <mesh
        geometry={BOX_GEOMETRY}
        material={FLOOR_2_MATERIAL}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2} // bouce char just a little back
        friction={0} // we dont want to get stuck or to travel arround the obstacle
      >
        <mesh
          geometry={BOX_GEOMETRY}
          material={OBSTACLE_MATERIAL}
          scale={[3.5, 0.3, 0.3]}
          receiveShadow
          castShadow
        />
      </RigidBody>
    </group>
  );
};

export const TrapBlockWall = ({ position = [0, 0, 0] }) => {
  const obstacle = useRef();
  const timeOffset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const x = Math.sin(time + timeOffset) * 1.25;

    obstacle.current.setNextKinematicTranslation({
      x: position[0] + x,
      y: position[1] + 1,
      z: position[2],
    });
  });

  return (
    <group position={position}>
      <mesh
        geometry={BOX_GEOMETRY}
        material={FLOOR_2_MATERIAL}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 1, 0]}
        restitution={0.2} // bouce char just a little back
        friction={0} // we dont want to get stuck or to travel arround the obstacle
      >
        <mesh
          geometry={BOX_GEOMETRY}
          material={OBSTACLE_MATERIAL}
          scale={[1.5, 2, 0.3]}
          receiveShadow
          castShadow
        />
      </RigidBody>
    </group>
  );
};

export const EndBlock = ({ position = [0, 0, 0] }) => {
  return (
    <group position={position}>
      <mesh
        geometry={BOX_GEOMETRY}
        material={FLOOR_1_MATERIAL}
        position={[0, 0, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />

      <Hamburger position={[position[0], position[1] + 1, 0]} />
      <RigidBody
        type="fixed"
        restitution={0.2}
        friction={0}
        position={[0, 0 + 0.6, 0 - 0.25]}
      >
        <CuboidCollider args={[2, 0.5, 0.1]} />
      </RigidBody>
    </group>
  );
};

export const Level = ({
  count = 8,
  types = [TrapBlockSpinner, TrapBlockLimbo, TrapBlockWall],
}) => {
  const blocks = useMemo(() => {
    const _blocks = [];

    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      _blocks.push(type);
    }

    return _blocks;
  }, [count, types]);

  return (
    <>
      <StartBlock position={[0, 0, 0]} />
      {blocks.map((Block, index) => {
        return (
          <Block key={`BLOCK_${index}`} position={[0, 0, -((index + 1) * 4)]} />
        );
      })}
      <EndBlock position={[0, 0, -(count + 1) * 4]} />

      <Bounds length={count + 2} />
    </>
  );
};

export default Level;
