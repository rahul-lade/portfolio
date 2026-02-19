'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Float, Line } from '@react-three/drei';
import type { Group, Mesh } from 'three';
import * as THREE from 'three';

/* ── Wireframe globe shell ── */
const GlobeWireframe = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
      meshRef.current.rotation.x += delta * 0.03;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshBasicMaterial
        color="#8b5cf6"
        wireframe
        transparent
        opacity={0.12}
      />
    </mesh>
  );
};

/* ── Glowing inner sphere ── */
const GlobeGlow = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.95, 32, 32]} />
      <meshBasicMaterial
        color="#7c3aed"
        transparent
        opacity={0.04}
      />
    </mesh>
  );
};

/* ── Dot markers on globe surface ── */
const MARKER_POSITIONS: [number, number][] = [
  [20.5937, 78.9629],    // India
  [37.0902, -95.7129],   // USA
  [51.5074, -0.1278],    // London
  [35.6762, 139.6503],   // Tokyo
  [-33.8688, 151.2093],  // Sydney
  [48.8566, 2.3522],     // Paris
  [55.7558, 37.6173],    // Moscow
  [-23.5505, -46.6333],  // São Paulo
  [1.3521, 103.8198],    // Singapore
  [49.2827, -123.1207],  // Vancouver
];

const latLongToVector3 = (lat: number, lng: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
};

const GlobeDots = () => {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
      groupRef.current.rotation.x += delta * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      {MARKER_POSITIONS.map(([lat, lng], i) => {
        const pos = latLongToVector3(lat, lng, 2.02);
        return (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color="#06b6d4" transparent opacity={0.9} />
          </mesh>
        );
      })}
    </group>
  );
};

/* ── Animated arc connections using drei's Line ── */
const ARC_PAIRS: [number, number][] = [
  [0, 1],
  [0, 3],
  [1, 4],
  [2, 5],
  [3, 8],
  [6, 0],
  [7, 1],
  [9, 3],
];

const GlobeArc = ({ from, to }: { from: [number, number]; to: [number, number] }) => {
  const fromVec = latLongToVector3(from[0], from[1], 2.02);
  const toVec = latLongToVector3(to[0], to[1], 2.02);
  const mid = new THREE.Vector3().addVectors(fromVec, toVec).multiplyScalar(0.5);
  mid.normalize().multiplyScalar(3.2);

  const curve = new THREE.QuadraticBezierCurve3(fromVec, mid, toVec);
  const points = curve.getPoints(50);

  return (
    <Line
      points={points.map((p) => [p.x, p.y, p.z] as [number, number, number])}
      color="#8b5cf6"
      lineWidth={1}
      transparent
      opacity={0.25}
    />
  );
};

const GlobeArcs = () => {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
      groupRef.current.rotation.x += delta * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      {ARC_PAIRS.map(([fromIdx, toIdx], i) => (
        <GlobeArc
          key={i}
          from={MARKER_POSITIONS[fromIdx]}
          to={MARKER_POSITIONS[toIdx]}
        />
      ))}
    </group>
  );
};

/* ── Floating ring accent ── */
const GlobeRing = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[2.8, 0.008, 16, 100]} />
      <meshBasicMaterial color="#8b5cf6" transparent opacity={0.2} />
    </mesh>
  );
};

/* ── Ambient particles ── */
const GlobeParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(200 * 3);
    Array.from({ length: 200 }).forEach((_, i) => {
      const r = 3 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    });
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial color="#8b5cf6" size={0.02} transparent opacity={0.4} sizeAttenuation />
    </points>
  );
};

/* ── Main scene ── */
const GlobeScene = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`h-full w-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <GlobeWireframe />
          <GlobeGlow />
          <GlobeDots />
          <GlobeArcs />
          <GlobeRing />
        </Float>
        <GlobeParticles />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
};

export { GlobeScene };
