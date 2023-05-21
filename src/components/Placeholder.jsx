import React from 'react';

const Placeholder = () => {
  return (
    <mesh position-y={1.5} scale={[2, 4, 2]}>
      <boxGeometry args={[1, 1, 1, 2, 2, 2]} />
      <meshStandardMaterial wireframe color="blue" />
    </mesh>
  );
};

export default Placeholder;
