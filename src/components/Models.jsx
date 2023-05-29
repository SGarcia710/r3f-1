import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Suspense } from 'react';
import Placeholder from './Placeholder';
import ModelWithFiber from './ModelWithFiber';
import ModelWithDrei from './ModelWithDrei';
import { useThree } from '@react-three/fiber';
import CheeseBurger from './CheeseBurger';
import Fox from './Fox';

const Models = () => {
  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight
        castShadow
        position={[1, 2, 3]}
        intensity={1.5}
        shadow-normalBias={0.04}
      />
      <ambientLight intensity={0.5} />
      <mesh position-z={-2}>
        <boxGeometry />
        <meshStandardMaterial color="tomato" wireframe />
      </mesh>

      <Suspense fallback={<Placeholder />}>
        <ModelWithFiber />
      </Suspense>
      <Suspense>
        <ModelWithDrei />
      </Suspense>

      <Suspense>
        <CheeseBurger position-z={4} scale={0.2} />
      </Suspense>

      <Suspense>
        <Fox />
      </Suspense>

      <mesh receiveShadow rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="gray" side={THREE.DoubleSide} />
      </mesh>
    </>
  );
};
export default Models;
