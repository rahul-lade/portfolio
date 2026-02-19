'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Octahedron, Torus, Decahedron } from '@react-three/drei';
import type { Mesh, Group } from 'three';
import * as THREE from 'three';

const CrystalCore = () => {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <Octahedron ref={meshRef} args={[1.5, 0]}>
      <meshStandardMaterial
        color="#8b5cf6"
        wireframe
        emissive="#8b5cf6"
        emissiveIntensity={0.5}
        transparent
        opacity={0.3}
      />
    </Octahedron>
  );
};

const InnerSolid = () => {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <Octahedron ref={meshRef} args={[0.8, 0]}>
      <meshStandardMaterial
        color="#c4b5fd"
        emissive="#8b5cf6"
        emissiveIntensity={1}
        roughness={0.2}
        metalness={0.8}
      />
    </Octahedron>
  );
};

const OrbitingRing = ({ radius, speed, axis = 'y' }: { radius: number, speed: number, axis?: 'x' | 'y' | 'z' }) => {
  const ref = useRef<Mesh>(null);
  
  useFrame((_, delta) => {
    if (ref.current) {
      if (axis === 'y') ref.current.rotation.z += delta * speed;
      if (axis === 'x') ref.current.rotation.x += delta * speed;
      if (axis === 'z') ref.current.rotation.y += delta * speed;
    }
  });

  return (
    <Torus ref={ref} args={[radius, 0.02, 16, 100]}>
      <meshBasicMaterial color="#06b6d4" transparent opacity={0.6} side={THREE.DoubleSide} />
    </Torus>
  );
};

const FloatingCrystal = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`h-full w-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <group>
            <CrystalCore />
            <InnerSolid />
            <group rotation={[Math.PI / 4, Math.PI / 4, 0]}>
              <OrbitingRing radius={2.2} speed={0.2} axis="z" />
              <OrbitingRing radius={2.6} speed={-0.15} axis="x" />
            </group>
          </group>
        </Float>
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate speed={0.5} />
      </Canvas>
    </div>
  );
};

export { FloatingCrystal };
