import { useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useControls } from 'leva';

export default () => {
  const model = useGLTF('./Fox/glTF/Fox.gltf');
  const animations = useAnimations(model.animations, model.scene);

  const { animationName } = useControls('Fox Animations', {
    animationName: { options: animations.names },
  });

  useEffect(() => {
    const action = animations.actions[animationName];
    action.reset().fadeIn(0.5).play();

    return () => {
      action.fadeOut(0.5);
    };

    // window.setTimeout(() => {
    //   animations.actions.Walk.play();
    // This crossFadeFrom just switch from the animation passed in 1 second to the one we just played
    //   animations.actions.Walk.crossFadeFrom(animations.actions.Run, 1);
    // }, 2000);
  }, [animationName]);

  return (
    <primitive object={model.scene} scale={0.03} position={[-3.5, 0, 3]} />
  );
};
