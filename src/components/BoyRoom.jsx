import {
  Center,
  OrbitControls,
  useGLTF,
  useTexture,
  Stage,
} from '@react-three/drei';
import React from 'react';
import * as THREE from 'three';

const BoyRoom = () => {
  const { nodes } = useGLTF('./BoyRoom/scene.gltf');

  // https://www.youtube.com/watch?v=J5Pd9vy9hOw
  // https://www.youtube.com/watch?v=thVl4UOQSEM
  // https://www.animum3d.com/blog/materiales-pbr-para-que-sirven-y-como-se-usan/
  const boyTextures = useTexture({
    map: './BoyRoom/textures/Manster_boy_diffuse.jpeg',
    normalMap: './BoyRoom/textures/Manster_boy_normal.png',
    aoMap: './BoyRoom/textures/Manster_boy_occlusion.png',
    roughnessMap: './BoyRoom/textures/Manster_boy_occlusion.png',
    metalnessMap: './BoyRoom/textures/Manster_boy_occlusion.png',
    alphaMap: './BoyRoom/textures/Manster_boy_specularGlossiness.png',
  });

  const schrankTextures = useTexture({
    map: './BoyRoom/textures/Manster_schrank_diffuse.jpeg',
    normalMap: './BoyRoom/textures/Manster_schrank_normal.png',
    aoMap: './BoyRoom/textures/Manster_schrank_occlusion.png',
    roughnessMap: './BoyRoom/textures/Manster_schrank_occlusion.png',
    metalnessMap: './BoyRoom/textures/Manster_schrank_occlusion.png',
    alphaMap: './BoyRoom/textures/Manster_schrank_specularGlossiness.png',
  });

  const toyTextures = useTexture({
    map: './BoyRoom/textures/Manster_toy3_diffuse.jpeg',
    aoMap: './BoyRoom/textures/Manster_toy3_occlusion.png',
    roughnessMap: './BoyRoom/textures/Manster_toy3_occlusion.png',
    metalnessMap: './BoyRoom/textures/Manster_toy3_occlusion.png',
  });

  const manstaTextures = useTexture({
    map: './BoyRoom/textures/Manster_mansta1_diffuse.jpeg',
    aoMap: './BoyRoom/textures/Manster_mansta1_occlusion.png',
    roughnessMap: './BoyRoom/textures/Manster_mansta1_occlusion.png',
    metalnessMap: './BoyRoom/textures/Manster_mansta1_occlusion.png',
    alphaMap: './BoyRoom/textures/Manster_mansta1_specularGlossiness.png',
  });

  const dertishTextures = useTexture({
    map: './BoyRoom/textures/Manster_Manster_Dertish_diffuse.jpeg',
    aoMap: './BoyRoom/textures/Manster_Manster_Dertish_occlusion.png',
    roughnessMap: './BoyRoom/textures/Manster_Manster_Dertish_occlusion.png',
    metalnessMap: './BoyRoom/textures/Manster_Manster_Dertish_occlusion.png',
    alphaMap:
      './BoyRoom/textures/Manster_Manster_Dertish_specularGlossiness.png',
  });

  const lambertTextures = useTexture({
    map: './BoyRoom/textures/Manster_Manster_lambert1SG_diffuse.jpeg',
    aoMap: './BoyRoom/textures/Manster_Manster_lambert1SG_occlusion.png',
    roughnessMap: './BoyRoom/textures/Manster_Manster_lambert1SG_occlusion.png',
    metalnessMap: './BoyRoom/textures/Manster_Manster_lambert1SG_occlusion.png',
    alphaMap:
      './BoyRoom/textures/Manster_Manster_lambert1SG_specularGlossiness.png',
  });

  const picTextures = useTexture({
    map: './BoyRoom/textures/Manster_pic1_diffuse.jpeg',
    aoMap: './BoyRoom/textures/Manster_pic1_occlusion.png',
    roughnessMap: './BoyRoom/textures/Manster_pic1_occlusion.png',
    metalnessMap: './BoyRoom/textures/Manster_pic1_occlusion.png',
    alphaMap: './BoyRoom/textures/Manster_pic1_specularGlossiness.png',
  });

  const wallTextures = useTexture({
    map: './BoyRoom/textures/Manster_wall1_diffuse.jpeg',
    aoMap: './BoyRoom/textures/Manster_wall1_occlusion.png',
    roughnessMap: './BoyRoom/textures/Manster_wall1_occlusion.png',
    metalnessMap: './BoyRoom/textures/Manster_wall1_occlusion.png',
    alphaMap: './BoyRoom/textures/Manster_wall1_specularGlossiness.png',
  });

  return (
    <>
      <OrbitControls makeDefault />

      <Center>
        <Stage adjustCamera={false} preset="rembrandt" environment="city">
          <group scale={0.03} rotation-x={-Math.PI * 0.5}>
            <mesh castShadow geometry={nodes.Object_2.geometry}>
              <meshPhongMaterial {...dertishTextures} map-flipY={false} />
            </mesh>
            <mesh castShadow geometry={nodes.Object_3.geometry}>
              <meshPhongMaterial {...lambertTextures} map-flipY={false} />
            </mesh>
            <mesh geometry={nodes.Object_4.geometry}>
              <meshPhongMaterial
                {...boyTextures}
                map-flipY={false}
                normalMap-encoding={THREE.LinearEncoding}
              />
            </mesh>
            <mesh castShadow geometry={nodes.Object_5.geometry}>
              <meshPhongMaterial {...manstaTextures} map-flipY={false} />
            </mesh>
            <mesh castShadow geometry={nodes.Object_6.geometry}>
              <meshPhongMaterial {...picTextures} map-flipY={false} />
            </mesh>
            <mesh castShadow geometry={nodes.Object_7.geometry}>
              <meshPhongMaterial
                {...schrankTextures}
                map-flipY={false}
                normalMap-encoding={THREE.LinearEncoding}
              />
            </mesh>
            <mesh castShadow geometry={nodes.Object_8.geometry}>
              <meshStandardMaterial {...toyTextures} map-flipY={false} />
            </mesh>
            <mesh receiveShadow geometry={nodes.Object_9.geometry}>
              <meshPhongMaterial {...wallTextures} map-flipY={false} />
            </mesh>
          </group>
        </Stage>
      </Center>
    </>
  );
};

export default BoyRoom;
