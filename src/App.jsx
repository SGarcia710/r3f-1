import './App.css';
import { Canvas } from '@react-three/fiber';
import Experience from './components/Experience';
import { Perf } from 'r3f-perf';
import { useControls } from 'leva';

/**
 * React Three Fiber handles pixel ratio automatically
 * We should clamp pixel it to avoid performance issues.
 * This is because some devices have high nubmer of
 * pixel ratio.
 * For example some devices have a pixel ratio of three,
 * this means it will render 3 pixels on the x axis
 * and 3 pixels on the y axis in a single pixel... so
 * this device will render 9 pixels per each pixel, and
 * this can be a problem when we talk about 3D.
 */

function App() {
  const { showPerf } = useControls({
    showPerf: true,
  });
  return (
    <Canvas
      dpr={1} // Pixel ratio. All devices will use 1px as pixel ratio. we can use a an array to provide a range. i.e.: [1,2] this is the default value from R3F
      // flat //toneMapping // default tone mapping is ACESFilmicToneMapping
      // orthographic // how to use another camera
      gl={
        {
          //antialias: false, //default true
          // toneMapping: THREE.CineonToneMapping, // manual way to provide an specific or custom toneMapping
          // Default color Encoding is THREE.sRGBEncoding
          // Default renderer's background is transparent
        }
      }
      camera={{
        fov: 45, // not used for orthographic camera
        // zoom: 100,
        near: 0.1,
        far: 200,
        position: [6, 4, 15],
      }}
    >
      <Experience />

      {showPerf ? <Perf position="top-left" /> : null}
    </Canvas>
  );
}

export default App;
