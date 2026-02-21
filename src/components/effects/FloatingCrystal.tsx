'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

/* ═══════════════════════════════════════════════════════════
 * Particle Wave Field — grid of particles that undulate
 * like ocean waves with layered sine / cosine motion
 * ═══════════════════════════════════════════════════════════ */
const ParticleWave = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const GRID = 32;
  const COUNT = GRID * GRID;
  const SPACING = 0.12;

  const basePositions = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    Array.from({ length: GRID }).forEach((_, ix) => {
      Array.from({ length: GRID }).forEach((_, iz) => {
        const idx = ix * GRID + iz;
        pos[idx * 3] = (ix - GRID / 2) * SPACING;
        pos[idx * 3 + 1] = 0;
        pos[idx * 3 + 2] = (iz - GRID / 2) * SPACING;
      });
    });
    return pos;
  }, []);

  const currentPositions = useMemo(() => new Float32Array(basePositions), [basePositions]);

  const colors = useMemo(() => {
    const col = new Float32Array(COUNT * 3);
    Array.from({ length: COUNT }).forEach((_, i) => {
      const t = Math.random();
      // Violet (#8b5cf6) → Cyan (#06b6d4) blend
      col[i * 3] = 0.545 * (1 - t) + 0.024 * t;
      col[i * 3 + 1] = 0.361 * (1 - t) + 0.714 * t;
      col[i * 3 + 2] = 0.965 * (1 - t) + 0.831 * t;
    });
    return col;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;

    Array.from({ length: COUNT }).forEach((_, i) => {
      const x = basePositions[i * 3];
      const z = basePositions[i * 3 + 2];
      currentPositions[i * 3 + 1] =
        Math.sin(x * 3 + t * 1.2) * 0.3 +
        Math.cos(z * 2.5 + t * 0.9) * 0.2 +
        Math.sin((x + z) * 2 + t * 0.7) * 0.1;
    });

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y = t * 0.04;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[currentPositions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} vertexColors transparent opacity={0.85} sizeAttenuation />
    </points>
  );
};

/* ═══════════════════════════════════════════════════════════
 * Ambient particles — dots orbiting around the wave field
 * ═══════════════════════════════════════════════════════════ */
const AmbientParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const count = 300;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    Array.from({ length: count }).forEach((_, i) => {
      const r = 2.5 + Math.random() * 3;
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
      pointsRef.current.rotation.y += delta * 0.015;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
};

/* ═══════════════════════════════════════════════════════════
 * FloatingCrystal — Scene composition
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
        <ambientLight intensity={0.3} />
        <pointLight position={[3, 3, 3]} intensity={0.6} color="#8b5cf6" distance={12} />
        <pointLight position={[-2, -1, 2]} intensity={0.4} color="#06b6d4" distance={10} />

        <Float speed={1} rotationIntensity={0.03} floatIntensity={0.1}>
          <ParticleWave />
        </Float>

        <AmbientParticles />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.4}
        />
      </Canvas>
    </div>
  );
};

export { FloatingCrystal };
