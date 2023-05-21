import {
  OrbitControls,
  Text3D,
  Center,
  useMatcapTexture,
} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

// Native Threejs in order to optimize
const TORUS_GEOMETRY = new THREE.TorusGeometry(1, 0.6, 16, 32);
const MATCAP_MATERIAL = new THREE.MeshMatcapMaterial();

const ThreeText = () => {
  const [matCapTexture] = useMatcapTexture('660505_F2B090_DD4D37_AA1914', 256);
  const donutsGroup = useRef();
  // const donuts = useRef([]);
  // const [torusGeometry, setTorusGeometry] = useState();
  // const [meshMatcapMaterial, setMeshMatcapMaterial] = useState();

  useEffect(() => {
    matCapTexture.encoding = THREE.sRGBEncoding;
    matCapTexture.needsUpdate = true;

    MATCAP_MATERIAL.matcap = matCapTexture;
    MATCAP_MATERIAL.needsUpdate = true;
  }, []);

  useFrame((_, dt) => {
    // Group trick
    for (const donut of donutsGroup.current.children)
      donut.rotation.y += dt * 0.2;

    // References array trick
    // for (const donut of donuts.current) donut.rotation.y += dt * 0.2;
  });

  return (
    <>
      <OrbitControls makeDefault />

      {/* <torusGeometry ref={setTorusGeometry} args={[1, 0.6, 16, 32]} />
      <meshMatcapMaterial ref={setMeshMatcapMaterial} matcap={matCapTexture} /> */}

      <Center>
        <Text3D
          material={MATCAP_MATERIAL}
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          font="./fonts/helvetiker_regular.typeface.json"
        >
          HELLO WORLD
        </Text3D>
      </Center>

      <group ref={donutsGroup}>
        {[...Array(100)].map((_, i) => {
          return (
            <mesh
              // ref={(donut) => (donuts.current[i] = donut)}
              geometry={TORUS_GEOMETRY}
              material={MATCAP_MATERIAL}
              key={`DONUT__${i}`}
              position={[
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
              ]}
              scale={0.2 + Math.random() * 0.2}
              rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
            />
          );
        })}
      </group>
    </>
  );
};

export default ThreeText;
