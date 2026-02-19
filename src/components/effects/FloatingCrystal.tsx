'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Float,
  OrbitControls,
  MeshDistortMaterial,
  Environment,
  Sphere,
} from '@react-three/drei';
import * as THREE from 'three';

/* ═══════════════════════════════════════════════════════════
 * Main orb — liquid-metal morphing sphere
 * Uses MeshDistortMaterial which properly recalculates normals
 * after noise displacement, giving realistic shading + reflections
 * ═══════════════════════════════════════════════════════════ */
const LiquidOrb = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1.4, 128, 128]}>
      <MeshDistortMaterial
        color="#7c3aed"
        envMapIntensity={1.2}
        clearcoat={1}
        clearcoatRoughness={0}
        metalness={0.9}
        roughness={0.15}
        distort={0.35}
        speed={1.8}
      />
    </Sphere>
  );
};

/* ═══════════════════════════════════════════════════════════
 * Glass shell — translucent outer layer for depth
 * ═══════════════════════════════════════════════════════════ */
const GlassShell = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = -state.clock.elapsedTime * 0.03;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1.8, 64, 64]}>
      <MeshDistortMaterial
        color="#06b6d4"
        envMapIntensity={0.8}
        metalness={0.1}
        roughness={0}
        transparent
        opacity={0.08}
        distort={0.2}
        speed={1.2}
      />
    </Sphere>
  );
};

/* ═══════════════════════════════════════════════════════════
 * Orbital ring — subtle accent
 * ═══════════════════════════════════════════════════════════ */
const OrbitalRing = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.PI / 2.5 + Math.sin(state.clock.elapsedTime * 0.3) * 0.08;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.12;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[2.4, 0.008, 16, 128]} />
      <meshBasicMaterial color="#8b5cf6" transparent opacity={0.3} />
    </mesh>
  );
};

/* ═══════════════════════════════════════════════════════════
 * Ambient particles — dots surrounding the orb
 * ═══════════════════════════════════════════════════════════ */
const AmbientParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const count = 500;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    Array.from({ length: count }).forEach((_, i) => {
      const r = 2.5 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const t = Math.random();
      col[i * 3] = 0.545 * (1 - t) + 0.024 * t;
      col[i * 3 + 1] = 0.361 * (1 - t) + 0.714 * t;
      col[i * 3 + 2] = 0.965 * (1 - t) + 0.831 * t;
    });

    return { positions: pos, colors: col };
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.012;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.012}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

/* ═══════════════════════════════════════════════════════════
 * FloatingCrystal — Full scene with environment lighting
 * ═══════════════════════════════════════════════════════════ */
const FloatingCrystal = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`h-full w-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 42 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        {/* Studio-quality environment for reflections */}
        <Environment preset="city" />

        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#e0d5ff" />
        <pointLight position={[-4, -2, 3]} intensity={0.5} color="#06b6d4" />

        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
          <group>
            <LiquidOrb />
            <GlassShell />
            <OrbitalRing />
          </group>
        </Float>

        <AmbientParticles />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
        />
      </Canvas>
    </div>
  );
};

export { FloatingCrystal };
