import { useFrame } from '@react-three/fiber';
import { OrbitControls, meshBounds, useGLTF } from '@react-three/drei';
import { useRef } from 'react';

export default function PointerEvents() {
  const cube = useRef();
  const model = useGLTF('./BabyLich/scene.gltf');

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  const onClickCubeHandler = (event) => {
    cube.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`);
  };

  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <primitive
        object={model.scene}
        scale={0.5}
        onClick={(e) => {
          console.log(e.object.name);
          e.stopPropagation();
        }}
      />

      <mesh
        position-x={-2}
        onClick={(e) => {
          // this will allow me to occlude click events on other objects if i click on the sphere
          e.stopPropagation();
        }}
        onContextMenu={() => {
          console.log('Right click or hold tap');
        }}
        onDoubleClick={() => {
          console.log('double click');
        }}
        onPointerUp={() => {
          console.log('click released');
        }}
        onPointerDown={() => {
          console.log('click down');
        }}
        // on R3F  these two are the same
        onPointerEnter={() => {
          console.log('pointer inside the object');
        }}
        onPointerOver={() => {
          console.log('pointer inside the object');
        }}
        // on R3F these two are the same
        onPointerOut={() => {
          console.log('pointer leaves the object');
        }}
        onPointerLeave={() => {
          console.log('pointer leaves the object');
        }}
        onPointerMove={() => {
          console.log('pointer moving inside the object');
        }}
        onPointerMissed={() => {
          console.log('click  outside the object');
        }}
      >
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh
        raycast={meshBounds}
        onPointerEnter={(e) => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerLeave={(e) => {
          document.body.style.cursor = 'default';
        }}
        onClick={onClickCubeHandler}
        ref={cube}
        position-x={2}
        scale={1.5}
      >
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
