import { useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

export default () => {
  const model = useGLTF('./KorriganHatCharacter.gltf');
  const animations = useAnimations(model.animations, model.scene);

  // useEffect(() => {
  //   const action = animations.actions[animationName];
  //   action.reset().fadeIn(0.5).play();

  //   return () => {
  //     action.fadeOut(0.5);
  //   };
  // }, [animationName]);

  useEffect(() => {
    animations.actions['course_chapeau'].play();
  }, []);

  return (
    <primitive
      object={model.scene}
      // scale={0.03}
      // position={[-3.5, 0, 3]}
    />
  );
};
