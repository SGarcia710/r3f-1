import {
  useGLTF,
  Environment,
  Float,
  PresentationControls,
  ContactShadows,
  Html,
  Text,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

const COLORS = {
  fontColor: '#F8F8F8',
  headingColor: '#e7b996',
  darkFontColor: '#E8E9E4',
  background: '#1f2022',
  background2: '#222323',
  mediumFontColor: '#dee2e6',
  lightFontColor: '#868e96',
  lightBackground: '#2d2d31',
  lightBackgroundHover: '#3b3b3e',
  codeBackgroundColor: '#2e2e30',
  border: '#404040',
  linkColor: '#6ab0f3',
  linkColorDarker: '#4a72a5',
  linkHoverColor: '#e1a6f2',
  navbarColor: '#1d1d1d',
  blockquote: '#2a4661',
  transparentText: 'rgba(255, 255, 255, 0.7)',
  transparentBg: 'rgba(0, 0, 0, 0.2)',
  lightTransparentBg: 'rgba(255, 255, 255, 0.05)',
  borderColor: '#3b3b3b',
  background3: '#695b5b',
};

export default function Portfolio() {
  const model = useGLTF('./MacbookModel.gltf');

  return (
    <>
      <color args={[COLORS.background]} attach="background" />

      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
        cursor={false}
        config={{
          mass: 2,
          tension: 400,
        }}
        snap={{
          mass: 2,
          tension: 400,
        }}
      >
        <Float rotationIntensity={0.4}>
          <rectAreaLight
            width={2.5}
            height={1.65}
            intensity={65}
            color={COLORS.headingColor}
            rotation={[-0.1, Math.PI, 0]}
            position={[0, 0.55, -1.55]}
          />
          <primitive object={model.scene} position-y={-1.2}>
            <Html
              transform
              wrapperClass="htmlScreen"
              distanceFactor={1.17}
              position={[0, 1.56, -1.4]}
              rotation-x={-0.256}
            >
              <iframe src="https://sebastiangarcia.dev" />
            </Html>
          </primitive>

          <Text
            font="./bangers-v20-latin-regular.woff"
            fontSize={0.7}
            position={[2, 0.55, 0.35]}
            rotation-y={-1.4}
            maxWidth={2}
            color={COLORS.headingColor}
            textAlign="center"
            // children={'SEBASTIÁN\nGARCÍA'}
          >
            SEBASTIÁN GARCÍA
          </Text>
        </Float>
      </PresentationControls>

      <Environment preset="city" />

      {/* Outside the presentation control because we dont want the shadow to move. This will generate a floor effect. */}
      <ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4} />
    </>
  );
}
