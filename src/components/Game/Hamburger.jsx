import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default ({ position }) => {
  const model = useGLTF('./FullChest.gltf');
  const chest = useRef();

  model.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
  });

  useFrame((_, dt) => {
    chest.current.rotation.y += dt * 0.2;
  });
  return (
    <primitive
      ref={chest}
      object={model.scene}
      position={position}
      scale={0.8}
    />
  );
};
