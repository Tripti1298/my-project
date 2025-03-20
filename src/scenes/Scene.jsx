import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// Floating chatbot avatar component
const FloatingAvatar = () => {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Creates a floating effect using sine wave
      meshRef.current.position.y = Math.sin(clock.getElapsedTime()) * 0.2;
      meshRef.current.rotation.y += 0.01; // Slight rotation
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      {/* Sphere as the chatbot's head */}
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="deepskyblue" />
    </mesh>
  );
};

const Scene = () => {
  return (
    <Canvas style={{ width: '100%', height: '100%' }}>
      {/* Soft ambient lighting */}
      <ambientLight intensity={0.5} />
      {/* Directional light for depth */}
      <directionalLight position={[2, 5, 2]} intensity={1} />
      {/* Floating chatbot avatar */}
      <FloatingAvatar />
      {/* Allow user interaction */}
      <OrbitControls />
    </Canvas>
  );
};

export default Scene;