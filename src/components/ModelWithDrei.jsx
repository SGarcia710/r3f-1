import { useGLTF, Clone } from '@react-three/drei';

export default () => {
  // This also supports draco
  const model = useGLTF('./BabyLich/scene.gltf');

  return (
    <>
      <Clone object={model.scene} position-x={-3} scale={0.3} />
      <Clone object={model.scene} position-x={-2} scale={0.3} />
      <Clone
        object={model.scene}
        position-x={-2.5}
        position-z={1}
        scale={0.3}
      />
    </>
  );
};

useGLTF.preload('./BabyLich/scene.gltf');
