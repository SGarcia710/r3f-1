import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import {
  EffectComposer,
  Vignette,
  Glitch,
  Noise,
  Bloom,
  DepthOfField,
  SSR,
} from '@react-three/postprocessing';
import { BlendFunction, GlitchMode } from 'postprocessing';
import { useControls } from 'leva';
import Drunk from '../effects/Drunk';

export default function PostProcessing() {
  // const { blendingMode } = useControls('Blending Mode', {
  //   blendingMode: { options: BlendFunction, value: BlendFunction.NORMAL },
  // });

  const drunkEffectRef = useRef();

  // const ssrProps = useControls({
  //   temporalResolve: true,
  //   STRETCH_MISSED_RAYS: true,
  //   USE_MRT: true,
  //   USE_NORMALMAP: true,
  //   USE_ROUGHNESSMAP: true,
  //   ENABLE_JITTERING: true,
  //   ENABLE_BLUR: true,
  //   temporalResolveMix: { value: 0.9, min: 0, max: 1 },
  //   temporalResolveCorrectionMix: { value: 0.25, min: 0, max: 1 },
  //   maxSamples: { value: 0, min: 0, max: 1 },
  //   resolutionScale: { value: 1, min: 0, max: 1 },
  //   blurMix: { value: 0.5, min: 0, max: 1 },
  //   blurKernelSize: { value: 8, min: 0, max: 8 },
  //   blurSharpness: { value: 0.5, min: 0, max: 1 },
  //   rayStep: { value: 0.3, min: 0, max: 1 },
  //   intensity: { value: 1, min: 0, max: 5 },
  //   maxRoughness: { value: 0.1, min: 0, max: 1 },
  //   jitter: { value: 0.7, min: 0, max: 5 },
  //   jitterSpread: { value: 0.45, min: 0, max: 1 },
  //   jitterRough: { value: 0.1, min: 0, max: 1 },
  //   roughnessFadeOut: { value: 1, min: 0, max: 1 },
  //   rayFadeOut: { value: 0, min: 0, max: 1 },
  //   MAX_STEPS: { value: 20, min: 0, max: 20 },
  //   NUM_BINARY_SEARCH_STEPS: { value: 5, min: 0, max: 10 },
  //   maxDepthDifference: { value: 3, min: 0, max: 10 },
  //   maxDepth: { value: 1, min: 0, max: 1 },
  //   thickness: { value: 10, min: 0, max: 10 },
  //   ior: { value: 1.45, min: 0, max: 2 },
  // });

  return (
    <>
      <color args={['#fff']} attach="background" />

      <EffectComposer
        multisampling={
          // 0 // disable antialias
          8 // default
        }
      >
        {/* <Vignette
          blendFunction={blendingMode}
          // offset={0.9}
          // darkness={0.09}
        /> */}
        {/* <Glitch
          delay={[1, 2]}
          duration={[0.1, 0.3]}
          strength={[0.1, 0.2]}
          mode={GlitchMode.SPORADIC}
        /> */}
        {/* <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} /> */}
        {/* <Bloom mipmapBlur intensity={0.1} luminanceThreshold={0} /> */}
        {/* <DepthOfField
          focusDistance={0.066}
          focalLength={0.025}
          bokehScale={6}
        /> */}
        {/* <SSR {...ssrProps} /> */}
        <Drunk
          ref={drunkEffectRef}
          // frequency={2}
          // amplitude={0.1}
          // blendFunction={BlendFunction.AVERAGE}
        />
      </EffectComposer>

      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <mesh castShadow position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial
          color="orange"
          // roughness={0} metalness={0}
        />
      </mesh>

      <mesh castShadow position-x={2} scale={1.5}>
        <boxGeometry />
        {/* <meshStandardMaterial color={[1.5, 1, 4]} toneMapped={false} /> */}
        {/* <meshStandardMaterial
          color="white"
          emissive="orange"
          emissiveIntensity={2}
          toneMapped={false}
        /> */}
        {/* mesh basic material doesnt care about lights */}
        {/* <meshBasicMaterial color={[1.5, 1, 4]} toneMapped={false} /> */}
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      {/* <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial roughness={0} metalness={0} color="#555555" />
      </mesh> */}

      <mesh
        receiveShadow
        position-y={-1.2}
        rotation-y={-Math.PI * 0.5}
        scale={[10, 0.1, 10]}
      >
        <boxGeometry />
        <meshStandardMaterial roughness={0} metalness={0} color="#555555" />
      </mesh>
    </>
  );
}
