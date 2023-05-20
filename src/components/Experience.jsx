import { useRef } from 'react';
import {
  OrbitControls,
  TransformControls,
  PivotControls,
  Html,
  Text,
  Float,
  MeshReflectorMaterial,
} from '@react-three/drei';
import * as THREE from 'three';
import { useControls, button } from 'leva';

const Experience = () => {
  const cubeRef = useRef();
  const sphereRef = useRef();
  const { position, color, visible } = useControls(
    'sphere',
    {
      position: {
        value: {
          x: -2,
          y: 0,
        },
        step: 0.01,
        joystick: 'invertY',
      },
      color: '#ff0044',
      visible: true,
      myInterval: {
        min: 0,
        max: 10,
        value: [4, 5],
      },
      clickMe: button(() => {
        console.log('testing people');
      }),
      options: {
        options: ['a', 'b', 'c', 'd'],
      },
    },
    {
      collapsed: true,
    }
  );

  const { scale } = useControls(
    'cube',
    {
      scale: {
        value: 1.5,
        step: 0.01,
        min: 0,
        max: 5,
      },
    },
    {
      collapsed: true,
    }
  );

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
        <mesh
          ref={sphereRef}
          position={[position.x, position.y, 0]}
          visible={visible}
        >
          <sphereGeometry />
          <meshStandardMaterial color={color} />
          <Html
            wrapperClass="cubeLabel"
            position={[1, 1, 0]}
            center // with this we make the origin of the element to be at the center of the element
            distanceFactor={6} // this way we provide a factor to handle perspective. So it gets smaller when we are away, and bigger when we are close
            // occlude={[sphereRef, cubeRef]}
          >
            This is a sphere
          </Html>
        </mesh>
      </PivotControls>

      <mesh ref={cubeRef} position-x={2} scale={scale}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      <TransformControls object={cubeRef} mode="translate" />

      <mesh position-y={-1} scale={10} rotation-x={-Math.PI * 0.5}>
        <planeGeometry />
        {/* <meshStandardMaterial color="greenyellow" side={THREE.DoubleSide} /> */}
        {/* This only works for plane objects */}
        <MeshReflectorMaterial
          color="greenyellow"
          side={THREE.DoubleSide}
          resolution={512}
          blur={[1000, 1000]}
          mixBlur={1} // 0 no blur
          mirror={0.75} // 1 full mirror
        />
      </mesh>

      <Float speed={3} floatIntensity={5}>
        {/* Text (Uses Troika at the background) supports woff, ttf and otf. But the recomendation is to use woff since they are optimized for the www */}
        <Text
          fontSize={1}
          color="salmon"
          font="./bangers-v20-latin-regular.woff"
          position-y={2}
          maxWidth={2}
          textAlign="center"
        >
          I LOVE R3F
        </Text>
      </Float>
    </>
  );
};

export default Experience;
