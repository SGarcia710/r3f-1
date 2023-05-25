import { OrbitControls, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import {
  Debug,
  Physics as PhysicsRapier,
  RigidBody,
  CuboidCollider,
  BallCollider,
  InstancedRigidBodies,
} from '@react-three/rapier';
import { useRef, useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';

export default function Physics() {
  const cube = useRef();
  const sphere = useRef();
  const twister = useRef();

  const [hitSound] = useState(() => new Audio('./hit.mp3'));
  const model = useGLTF(
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/beach-ball/model.gltf'
  );

  const cubeJump = () => {
    const mass = cube.current.mass();

    cube.current.applyImpulse({
      x: 0,
      y: 5 * mass, //mutiplying the impulse by the actual mass, we can get the same jump result but with a different behaivor. A small mass will jump to 5 but moving like crazy. A big mass will jump to 5 but it wont move/rotate that much in the air.
      z: 0,
    });
    cube.current.applyTorqueImpulse({
      x: Math.random() - 0.5,
      y: Math.random() - 0.5,
      z: Math.random() - 0.5,
    });
  };

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const eulerRotation = new THREE.Euler(0, time * 3, 0);
    const quaternionRotation = new THREE.Quaternion();
    quaternionRotation.setFromEuler(eulerRotation);

    twister.current.setNextKinematicRotation(quaternionRotation);

    const angle = time * 0.5;
    const x = Math.cos(angle) * 2;
    const z = Math.sin(angle) * 2;
    twister.current.setNextKinematicTranslation({
      x,
      y: -0.8,
      z,
    });
  });

  const collisionEnter = () => {
    // hitSound.currentTime = 0;
    // hitSound.volume = Math.random();
    // hitSound.play();

    console.log('collision enter');
  };

  const collisionExit = () => {
    // hitSound.currentTime = 0;
    // hitSound.volume = Math.random();
    // hitSound.play();

    console.log('collision exit');
  };

  const cubesCount = 50;
  const cubes = useRef();

  //  This is the way we setup instanced rigidbodies.
  const cubesTransform = useMemo(() => {
    const positions = [];
    const rotations = [];
    const scales = [];

    for (let i = 0; i < cubesCount; i++) {
      positions.push([
        (Math.random() - 0.5) * 8,
        6 + i * 0.2,
        (Math.random() - 0.5) * 8,
      ]);

      rotations.push([Math.random(), Math.random(), Math.random()]);

      const scale = 0.2 + Math.random() * 0.8;
      scales.push([scale, scale, scale]);
    }

    return { positions, rotations, scales };
  }, []);

  //  This is the way we setup instanced meshes.
  // useEffect(() => {
  //   for (let i = 0; i < cubesCount; i++) {
  //     const matrix = new THREE.Matrix4();
  //     matrix.compose(
  //       new THREE.Vector3(i * 2, 0, 0),
  //       new THREE.Quaternion(),
  //       new THREE.Vector3(1, 1, 1)
  //     );
  //     cubes.current.setMatrixAt(i, matrix);
  //   }
  // }, []);

  return (
    <>
      <color args={['#212121']} attach="background" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <PhysicsRapier gravity={[0, -9.81, 0]}>
        {/* <Debug /> */}

        <RigidBody
          ref={sphere}
          colliders="ball"
          gravityScale={1} // default 1
          restitution={0} // default 0
          friction={0.7} // 0.7 default
          position={[-2, 2, 0]}
        >
          <mesh castShadow>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>

        <RigidBody colliders={false} position-y={2}>
          <BallCollider args={[1]} />
          <primitive object={model.scene} />
        </RigidBody>

        <RigidBody
          ref={twister}
          position-y={-0.8}
          friction={0}
          type="kinematicPosition"
        >
          <mesh castShadow scale={[0.4, 0.4, 3]}>
            <boxGeometry />
            <meshStandardMaterial color="brown" />
          </mesh>
        </RigidBody>

        {/* Default collider is a Cuboid. It matches perfectly the cubes */}
        <RigidBody
          // onCollisionEnter={collisionEnter}
          // onCollisionExit={collisionExit}
          onSleep={() => {
            console.log('Sleeping');
          }}
          onWake={() => {
            console.log('awake');
          }}
          position={[2, 2, 0]}
          ref={cube}
          colliders={false}
        >
          <CuboidCollider
            mass={0.5} // Mass can be only m odified on a custom collider
            args={[0.5, 0.5, 0.5]}
          />
          <mesh onClick={cubeJump} castShadow>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody>

        {/* Trimesh should be used only for static bodies. Not for dynamic bodies. */}
        {/* Scale is not supported on rigidBody */}
        {/* <RigidBody
          colliders={false}
          rotation-x={Math.PI * 0.5}
          position={[0, 1, 0]}
        > */}
        {/* <CuboidCollider args={[1.5, 1.5, 0.5]} /> */}
        {/* <BallCollider args={[1.5]}  /> */}
        {/* <mesh castShadow>
            <torusGeometry args={[1, 0.5, 16, 32]} />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody> */}

        <RigidBody
          type="fixed"
          friction={0.7} // 0.7 default
        >
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>

        {/* If we want to have the same geometry many times, we can use instanced Mesh in order to only draw it once. + Performance for repeated meshes */}
        <InstancedRigidBodies
          positions={cubesTransform.positions}
          rotations={cubesTransform.rotations}
          scales={cubesTransform.scales}
        >
          <instancedMesh castShadow ref={cubes} args={[null, null, cubesCount]}>
            <boxGeometry />
            <meshStandardMaterial color="tomato" />
          </instancedMesh>
        </InstancedRigidBodies>

        <RigidBody type="fixed">
          <CuboidCollider args={[5, 5, 0.5]} position={[0, 4, 5.25]} />
          <CuboidCollider args={[5, 5, 0.5]} position={[0, 4, -5.25]} />
          <CuboidCollider args={[0.5, 5, 5]} position={[5.25, 4, 0]} />
          <CuboidCollider args={[0.5, 5, 5]} position={[-5.25, 4, 0]} />
        </RigidBody>
      </PhysicsRapier>
    </>
  );
}
