import { useRef } from 'react';
import {
  OrbitControls,
  useHelper,
  BakeShadows,
  softShadows,
  SoftShadows,
  AccumulativeShadows,
  RandomizedLight,
  ContactShadows,
  Sky,
  Environment,
  Lightformer,
} from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';

// This impacts performance on big scenes.
// softShadows({
//   frustum: 3.75,
//   size: 0.005,
//   near: 9.5,
//   samples: 17,
//   rings: 11,
// });

/**
 * Baking Shadows:
 *
 * If we have static elements generating shadows, we can bake them in order to
 * generate the result and avoid calculating it everytime we want to load our scene.
 */

const EnvironmentAndStaging = () => {
  const cubeRef = useRef();
  const sphereRef = useRef();

  const directionalLightRef = useRef();
  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1, 'black');

  const { color, opacity, blur } = useControls('Contact Shadows', {
    color: '#4b2709',
    opacity: { value: 0.4, max: 1, min: 0.01 },
    blur: { value: 2.8, min: 0, max: 10 },
  });

  const { sunPosition } = useControls('sky', {
    // Spherical coordinates should be the system we use to position the sun
    sunPosition: { value: [1, 2, 3] },
  });

  const { envMapIntesity, envMapHeight, envMapRadius, envMapScale } =
    useControls('Environment Map', {
      envMapIntesity: { value: 3.5, min: 0, max: 12 },
      envMapHeight: { value: 7, min: 0, max: 100 },
      envMapRadius: { value: 28, min: 10, max: 1000 },
      envMapScale: { value: 100, min: 10, max: 1000 },
    });

  useFrame((state, dt) => {
    cubeRef.current.rotation.y += dt * 0.2;

    // const time = state.clock.elapsedTime;
    // cubeRef.current.position.x = 2 + Math.sin(time);
  });

  return (
    <>
      <Environment
        ground={{
          height: envMapHeight,
          radius: envMapRadius,
          scale: envMapScale,
        }}
        // background
        // files={[
        //   './environmentMaps/2/px.jpg',
        //   './environmentMaps/2/nx.jpg',
        //   './environmentMaps/2/py.jpg',
        //   './environmentMaps/2/ny.jpg',
        //   './environmentMaps/2/pz.jpg',
        //   './environmentMaps/2/nz.jpg',
        // ]}

        //load hdr file
        // files={'./environmentMaps/the_sky_is_on_fire_2k.hdr'}
        preset="sunset" // Prsets come from PolyHaven
        //resolution={32} // this is only working when we actually tweak the environment using colors, meshes or light former inside. If we dont have tweaks for our environment, we are just using the original file.
      >
        {/* <color args={['#000000']} attach="background" /> */}
        {/* <mesh scale={10} position-z={-5}>
          <planeGeometry />
          <meshBasicMaterial color={[10, 0, 0]} />
        </mesh> */}
        {/* <Lightformer
          scale={10}
          position-z={-5}
          color="red"
          intensity={10}
          form="ring"
        /> */}
      </Environment>

      {/* This works for native shadows. The ones we use setting castShadows/receiveShadows */}
      {/* <BakeShadows /> */}

      {/* <SoftShadows
        frustum={3.75}
        size={0.005}
        near={9.5}
        samples={17}
        rings={11}
      /> */}
      <OrbitControls makeDefault />

      {/* This setup with accumulative shadows will render a nice and soft 
      shadow map but will only render them for the first 100 frames 
      (thanks to the temporal flag).
      The problem here is that animated stuff wont have animated shadows. 
      So, this is just good for static scenes.

      this is somekind of Baking in real time.

      these work for always but only static. we need to situate them exactly where we have our directional lights.
      */}
      {/* <AccumulativeShadows
        //use the scale to make the shadow fit your scene
        scale={10}
        position-y={-0.99}
        color="#316d39"
        opacity={0.8}
        // all these shadows will be loaded at the first frame
        // frames={100}
        // to avoid baked shadows and keep rendering them each frame, we can use infinity
        frames={Infinity}
        // we can spread the renders in time
        temporal
        // When using infinite frames, the accumulativeshadows is only blending the last 20 shadows renders.
        // lets change using blend with 100. But it wont look good and the performance is not great.
        blend={100}
      >
        <RandomizedLight
          position={[1, 2, 3]}
          amount={8}
          radius={1}
          ambient={0.5}
          intensity={1}
          bias={0.001}

          // mapSize={1024}
          // size={20}
          // near={1}
          // far={10}
        />
      </AccumulativeShadows> */}

      {/* This is just like a light coming from the top. */}
      <ContactShadows
        position-y={0}
        //use the scale to make the shadow fit your scene
        scale={10}
        resolution={512}
        far={5}
        opacity={opacity}
        blur={blur}
        color={color}
        // if we have an static scene, we can bake the shadows using frame 1
        frames={1}
      />

      {/* <directionalLight
        ref={directionalLightRef}
        position={sunPosition}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={5}
        shadow-camera-right={5}
        shadow-camera-bottom={-5}
        shadow-camera-left={-5}
      /> */}

      {/* <Sky sunPosition={sunPosition} /> */}

      {/* <ambientLight intensity={0.5} /> */}
      {/* <hemisphereLight /> */}
      {/* <pointLight/> */}
      {/* <rectAreaLight/> */}
      {/* <spotLight/> */}

      <mesh ref={sphereRef} position-x={-2} castShadow position-y={1}>
        <sphereGeometry />
        <meshStandardMaterial
          color={'#ff0066'}
          envMapIntensity={envMapIntesity}
        />
      </mesh>

      <mesh ref={cubeRef} position-x={2} castShadow position-y={1}>
        <boxGeometry />
        <meshStandardMaterial
          color="mediumpurple"
          envMapIntensity={envMapIntesity}
        />
      </mesh>

      {/* <mesh
        // If we are going to use accumulative shadow we have to remove the receiveShadow since this is for planes using native shadows
        // receiveShadow
        position-y={0}
        scale={10}
        rotation-x={-Math.PI * 0.5}
      >
        <planeGeometry />
        <meshStandardMaterial
          color="greenyellow"
          side={THREE.DoubleSide}
          envMapIntensity={envMapIntesity}
        />
      </mesh> */}
    </>
  );
};

export default EnvironmentAndStaging;
