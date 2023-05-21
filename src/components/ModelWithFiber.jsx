import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

const ModelWithFiber = () => {
  const model = useLoader(GLTFLoader, './happyBananav2-v1.glb');
  const dracoCompressedModel = useLoader(
    GLTFLoader,
    './CrabSnap/scene.gltf',
    (loader) => {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('./draco/');

      loader.setDRACOLoader(dracoLoader);
    }
  );
  return (
    <>
      <primitive
        object={model.scene}
        position-y={1.8}
        rotation-z={-Math.PI * 0.35}
        rotation-y={-Math.PI * 0.5}
      />
      <primitive
        object={dracoCompressedModel.scene}
        position-x={3}
        scale={30}
      />
    </>
  );
};

export default ModelWithFiber;
