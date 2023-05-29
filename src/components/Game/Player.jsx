import { RigidBody, useRapier } from '@react-three/rapier';
import { useKeyboardControls } from '@react-three/drei';
import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import useGame from './stores/useGame';

const Player = () => {
  const [subscribeKeys, getKeys] = useKeyboardControls();

  const startGame = useGame((state) => state.start);
  const endGame = useGame((state) => state.end);
  const blocksCount = useGame((state) => state.blocksCount);
  const restartGame = useGame((state) => state.restart);

  const player = useRef();

  const { rapier, world } = useRapier();
  const rapierWorld = world.raw();

  // camera's initial position.
  const [smoothedCameraPos] = useState(() => new THREE.Vector3(10, 10, 10));
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3());

  const handleJump = () => {
    const origin = player.current.translation();
    origin.y -= 0.31; // Radius is 0.3. I want the origin to be just below that.
    const direction = { x: 0, y: -1, z: 0 };

    const ray = new rapier.Ray(origin, direction);
    const hit = rapierWorld.castRay(ray, 10, true); // ray, max time of impact, true for considering everything as solid.

    if (hit.toi < 0.15) {
      player.current.applyImpulse({
        x: 0,
        y: 0.5,
        z: 0,
      });
    }
  };

  const handleResetPlayer = () => {
    player.current.setTranslation({ x: 0, y: 1, z: 0 });
    player.current.setLinvel({ x: 0, y: 0, z: 0 });
    player.current.setAngvel({ x: 0, y: 0, z: 0 });
  };

  useFrame((state, dt) => {
    /**
     * Controls
     */
    const { forward, backward, leftward, rightward } = getKeys();

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 0.6 * dt;
    const torqueImpulseStrength = 0.2 * dt;

    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueImpulseStrength;
    }
    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueImpulseStrength;
    }
    if (leftward) {
      impulse.x -= impulseStrength;
      torque.z += torqueImpulseStrength;
    }
    if (rightward) {
      impulse.x += impulseStrength;
      torque.z -= torqueImpulseStrength;
    }

    player.current.applyImpulse(impulse);
    player.current.applyTorqueImpulse(torque);

    /**
     * Camera
     */
    const playerPos = player.current.translation();

    const cameraPos = new THREE.Vector3();
    cameraPos.copy(playerPos);
    cameraPos.z += 2.25;
    cameraPos.y += 0.65;

    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(playerPos);
    cameraPos.y += 0.15;

    smoothedCameraPos.lerp(cameraPos, 5 * dt);
    smoothedCameraTarget.lerp(cameraTarget, 5 * dt);

    state.camera.position.copy(smoothedCameraPos);
    state.camera.lookAt(smoothedCameraTarget);

    /**
     * Phases
     */

    if (playerPos.z < -(blocksCount * 4 + 2)) {
      endGame();
    }

    if (playerPos.y < -4) {
      restartGame();
    }
  });

  useEffect(() => {
    const unsubGamePhase = useGame.subscribe(
      (state) => state.phase,
      (phase) => {
        if (phase === 'ready') {
          handleResetPlayer();
        }
      }
    );

    const unsubJump = subscribeKeys(
      (state) => state.jump, // selector: What I want to listen
      (value) => {
        if (value) {
          handleJump();
        }
      } // what happens
    );

    const unsubStart = subscribeKeys(() => startGame());

    return () => {
      unsubJump();
      unsubStart();
      unsubGamePhase();
    };
  }, []);

  return (
    <RigidBody
      ref={player}
      restitution={0.2}
      friction={1}
      colliders="ball"
      position={[0, 1, 0]}
      linearDamping={0.5}
      angularDamping={0.5}
    >
      <mesh castShadow>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial flatShading color="mediumpurple" />
      </mesh>
    </RigidBody>
  );
};

export default Player;
