// @ts-nocheck
import { extend, ThreeElements, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useRef } from 'react';
import { CustomObject } from './CustomObject';

/**
 * Since orbitcontrols is not directly included on threejs we need to
 * create the extension of it in order to use it like: <orbitControls />
 */
extend({ OrbitControls });

const Experience = () => {
  const cubeRef = useRef<ThreeElements['mesh']>();
  const objectsRef = useRef<ThreeElements['group']>();

  const { camera, gl } = useThree();

  useFrame((state, delta) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.y += delta;
    }
    if (objectsRef.current) {
      objectsRef.current.rotation.y += delta;
    }

    //Animate camera - Rotate around on x looking at the center
    // const angle = state.clock.elapsedTime;

    // state.camera.position.x = Math.sin(angle) * 8;
    // state.camera.position.z = Math.cos(angle) * 8;
    // state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <group ref={objectsRef}>
        <mesh position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>

        <mesh ref={cubeRef} rotation-y={Math.PI * 0.25} position-x={2}>
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
      </group>

      <mesh position-y={-1} scale={10} rotation-x={-Math.PI * 0.5}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>

      <CustomObject />
    </>
  );
};

export default Experience;
