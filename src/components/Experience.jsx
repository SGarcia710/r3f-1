import { useRef } from 'react';
import {
  OrbitControls,
  TransformControls,
  PivotControls,
  Html,
} from '@react-three/drei';
import * as THREE from 'three';

const Experience = () => {
  const cubeRef = useRef();
  const sphereRef = useRef();

  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      {/* depthTest={false} makes the controls to appear in top of the object.
      anchor defines its position, in this case [0,0,0] move it to the center of the object. These values are relative values to the object. 1 will put it at the top of the element and -1 at the bottom (outside) */}
      <PivotControls
        anchor={[0, 0, 0]}
        lineWidth={4}
        axisColors={['#9381ff', '#ff4d6d', '#7ae582']}
        depthTest={false}
        scale={100} //pixel scaling
        fixed // fix the size of the controls. With this we will need to set a size for them using scale.
      >
        <mesh ref={sphereRef} position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
          <Html
            wrapperClass="cubeLabel"
            position={[1, 1, 0]}
            center // with this we make the origin of the element to be at the center of the element
            distanceFactor={6} // this way we provide a factor to handle perspective. So it gets smaller when we are away, and bigger when we are close
            occlude={[sphereRef, cubeRef]}
          >
            This is a sphere
          </Html>
        </mesh>
      </PivotControls>

      <mesh ref={cubeRef} position-x={2}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      <TransformControls object={cubeRef} mode="translate" />

      <mesh position-y={-1} scale={10} rotation-x={-Math.PI * 0.5}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" side={THREE.DoubleSide} />
      </mesh>
    </>
  );
};

export default Experience;
