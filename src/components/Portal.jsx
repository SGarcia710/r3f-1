import {
  Center,
  OrbitControls,
  useGLTF,
  useTexture,
  Sparkles,
  shaderMaterial,
} from '@react-three/drei';
import React, { useRef } from 'react';
import * as THREE from 'three';
import portalVertexShader from '../assets/shaders/portal/vertex.glsl';
import portalFragmentShader from '../assets/shaders/portal/fragment.glsl';
import { extend, useFrame } from '@react-three/fiber';

const POLE_LIGHT_MATERIAL = new THREE.MeshBasicMaterial({
  color: '#ffffe5',
});

// Shader with R3F + Drei way. This way we can also reutilize this shader/material. Also this makes animating easier.
const PORTAL_MATERIAL = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color('#ffffff'),
    uColorEnd: new THREE.Color('#000000'),
  },
  portalVertexShader,
  portalFragmentShader
);

extend({
  PortalShaderMaterial: PORTAL_MATERIAL,
});

const Portal = () => {
  const { nodes } = useGLTF('./Portal/portal.glb');
  const portalShaderMaterialRef = useRef();

  const bakedTexture = useTexture('./Portal/baked.jpg');
  // bakedTexture.flipY = false;

  useFrame((_, dt) => {
    portalShaderMaterialRef.current.uTime += dt;
  });

  return (
    <>
      <OrbitControls makeDefault />

      <Center>
        <mesh geometry={nodes.baked.geometry}>
          <meshBasicMaterial map={bakedTexture} map-flipY={false} />
        </mesh>

        <mesh
          geometry={nodes.poleLightA.geometry}
          position={nodes.poleLightA.position}
          material={POLE_LIGHT_MATERIAL}
        />

        <mesh
          geometry={nodes.poleLightB.geometry}
          position={nodes.poleLightB.position}
          material={POLE_LIGHT_MATERIAL}
        />

        <mesh
          geometry={nodes.portalLight.geometry}
          position={nodes.portalLight.position}
          rotation={nodes.portalLight.rotation}
        >
          {/* Native shader */}
          {/* <shaderMaterial
            vertexShader={portalVertexShader}
            fragmentShader={portalFragmentShader}
            uniforms={{
              uTime: { value: 0 },
              uColorStart: { value: new THREE.Color('#ffffff') },
              uColorEnd: { value: new THREE.Color('#000000') },
            }}
          /> */}
          <portalShaderMaterial ref={portalShaderMaterialRef} />
        </mesh>

        <Sparkles
          size={6}
          scale={[4, 2, 4]}
          position-y={1}
          speed={0.2}
          count={40}
        />
      </Center>
    </>
  );
};

export default Portal;
