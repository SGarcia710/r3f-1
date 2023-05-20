import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

const verticesCount = 10 * 3; // 10 triangles, 3 vertices per triangle

export const CustomObject = () => {
  const geometryRef = useRef();

  const positions = useMemo(() => {
    // 3 values per triangle (x,y,z)
    const _positions = new Float32Array(verticesCount * 3);

    // Fill the array
    for (let i = 0; i < verticesCount * 3; i++)
      _positions[i] = Math.random() - 0.5;

    return _positions;
  }, []);

  useEffect(() => {
    if (geometryRef.current) geometryRef.current.computeVertexNormals();
  }, []);

  return (
    <mesh>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          count={verticesCount}
          itemSize={3}
          array={positions}
        />
      </bufferGeometry>
      <meshStandardMaterial
        color="pink"
        side={THREE.DoubleSide} // a plane by default is transparent in the oposite face
      />
    </mesh>
  );
};
