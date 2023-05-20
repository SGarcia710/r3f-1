import { useRef } from 'react';
import { OrbitControls, Stage } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';

const StageScene = () => {
  const cubeRef = useRef();
  const sphereRef = useRef();

  return (
    <>
      <OrbitControls makeDefault />

      <Stage
        shadows={{
          type: 'contact',
          opacity: 0.2,
          blur: 3,
        }}
        environment="sunset"
        preset="portrait"
        // intensity={2}
      >
        <mesh ref={sphereRef} position-x={-2} castShadow position-y={1}>
          <sphereGeometry />
          <meshStandardMaterial color={'#ff0066'} />
        </mesh>

        <mesh ref={cubeRef} position-x={2} castShadow position-y={1}>
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
      </Stage>
    </>
  );
};

export default StageScene;
