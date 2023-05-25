import { OrbitControls } from '@react-three/drei';
import Lights from './Lights';
import { Level } from './Level';
import { Debug, Physics } from '@react-three/rapier';

export default function Game() {
  return (
    <>
      <OrbitControls makeDefault />
      <Physics>
        <Debug />
        <Lights />
        <Level />
      </Physics>
    </>
  );
}
