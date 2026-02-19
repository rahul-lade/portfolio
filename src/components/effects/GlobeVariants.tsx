'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Line, useTexture } from '@react-three/drei';
import type { Group, Mesh } from 'three';
import * as THREE from 'three';

/* ═══════════════════════════════════════════════ */
/*  Shared helpers                                 */
/* ═══════════════════════════════════════════════ */
const MARKER_POSITIONS: [number, number][] = [
  [20.5937, 78.9629],
  [37.0902, -95.7129],
  [51.5074, -0.1278],
  [35.6762, 139.6503],
  [-33.8688, 151.2093],
  [48.8566, 2.3522],
  [55.7558, 37.6173],
  [-23.5505, -46.6333],
  [1.3521, 103.8198],
  [49.2827, -123.1207],
];

const ARC_PAIRS: [number, number][] = [
  [0, 1], [0, 3], [1, 4], [2, 5], [3, 8], [6, 0], [7, 1], [9, 3],
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

/* ═══════════════════════════════════════════════ */
/*  Option A: Earth Texture Globe                  */
/* ═══════════════════════════════════════════════ */
const EarthTextureGlobe = () => {
  const meshRef = useRef<Mesh>(null);
  const glowRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.12;
    }
    if (glowRef.current) {
      glowRef.current.rotation.y += delta * 0.12;
    }
  });

  /* Procedural dark earth via shader-like gradient sphere */
  return (
    <React.Fragment>
      {/* Main sphere with solid dark color + wireframe overlay */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          color="#0a0a1a"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>
      {/* Continent outlines via wireframe with color */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[2.01, 24, 24]} />
        <meshBasicMaterial
          color="#8b5cf6"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
      {/* Atmosphere glow */}
      <mesh>
        <sphereGeometry args={[2.15, 32, 32]} />
        <meshBasicMaterial
          color="#7c3aed"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>
    </React.Fragment>
  );
};

/* ═══════════════════════════════════════════════ */
/*  Option B: Glowing Pulse Arcs Globe             */
/* ═══════════════════════════════════════════════ */
const PulseArc = ({ from, to }: { from: [number, number]; to: [number, number] }) => {
  const fromVec = latLongToVector3(from[0], from[1], 2.02);
  const toVec = latLongToVector3(to[0], to[1], 2.02);
  const mid = new THREE.Vector3().addVectors(fromVec, toVec).multiplyScalar(0.5);
  mid.normalize().multiplyScalar(3.2);
  const curve = new THREE.QuadraticBezierCurve3(fromVec, mid, toVec);
  const points = curve.getPoints(60);

  return (
    <Line
      points={points.map((p) => [p.x, p.y, p.z] as [number, number, number])}
      color="#06b6d4"
      lineWidth={2}
      transparent
      opacity={0.6}
    />
  );
};

const PulseGlobe = () => {
  const wireRef = useRef<Mesh>(null);
  const dotsRef = useRef<Group>(null);
  const arcsRef = useRef<Group>(null);

  useFrame((_, delta) => {
    const speed = delta * 0.12;
    if (wireRef.current) wireRef.current.rotation.y += speed;
    if (dotsRef.current) dotsRef.current.rotation.y += speed;
    if (arcsRef.current) arcsRef.current.rotation.y += speed;
  });

  return (
    <React.Fragment>
      <mesh ref={wireRef}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.1} />
      </mesh>
      {/* Glowing dots */}
      <group ref={dotsRef}>
        {MARKER_POSITIONS.map(([lat, lng], i) => {
          const pos = latLongToVector3(lat, lng, 2.03);
          return (
            <React.Fragment key={i}>
              <mesh position={pos}>
                <sphereGeometry args={[0.06, 12, 12]} />
                <meshBasicMaterial color="#06b6d4" />
              </mesh>
              {/* Glow ring around dot */}
              <mesh position={pos}>
                <sphereGeometry args={[0.12, 12, 12]} />
                <meshBasicMaterial color="#06b6d4" transparent opacity={0.2} />
              </mesh>
            </React.Fragment>
          );
        })}
      </group>
      {/* Bright arcs */}
      <group ref={arcsRef}>
        {ARC_PAIRS.map(([fromIdx, toIdx], i) => (
          <PulseArc key={i} from={MARKER_POSITIONS[fromIdx]} to={MARKER_POSITIONS[toIdx]} />
        ))}
      </group>
      {/* Atmosphere */}
      <mesh>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>
    </React.Fragment>
  );
};

/* ═══════════════════════════════════════════════ */
/*  Option C: Particles-Only Globe                 */
/* ═══════════════════════════════════════════════ */
const ParticleGlobe = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(3000 * 3);
    const colors = new Float32Array(3000 * 3);
    Array.from({ length: 3000 }).forEach((_, i) => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);

      // violet to cyan gradient
      const t = Math.random();
      colors[i * 3] = 0.55 * (1 - t) + 0.02 * t;
      colors[i * 3 + 1] = 0.36 * (1 - t) + 0.71 * t;
      colors[i * 3 + 2] = 0.96 * (1 - t) + 0.83 * t;
    });
    return { positions: arr, colors };
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.1;
      pointsRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <React.Fragment>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions.positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[positions.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.025}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
    </React.Fragment>
  );
};

/* ═══════════════════════════════════════════════ */
/*  Option D: Holographic Grid Globe               */
/* ═══════════════════════════════════════════════ */
const HoloGridGlobe = () => {
  const latRef = useRef<Group>(null);
  const longRef = useRef<Group>(null);
  const dotsRef = useRef<Group>(null);

  useFrame((state, delta) => {
    const speed = delta * 0.1;
    if (latRef.current) latRef.current.rotation.y += speed;
    if (longRef.current) longRef.current.rotation.y += speed;
    if (dotsRef.current) dotsRef.current.rotation.y += speed;
  });

  const latitudeLines = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => {
      const lat = -70 + (i * 140) / 7;
      const phi = (90 - lat) * (Math.PI / 180);
      const r = 2 * Math.sin(phi);
      const y = 2 * Math.cos(phi);
      const points: [number, number, number][] = Array.from({ length: 65 }).map((_, j) => {
        const theta = (j / 64) * Math.PI * 2;
        return [r * Math.cos(theta), y, r * Math.sin(theta)];
      });
      return points;
    });
  }, []);

  const longitudeLines = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => {
      const lng = (i / 12) * Math.PI * 2;
      const points: [number, number, number][] = Array.from({ length: 65 }).map((_, j) => {
        const phi = (j / 64) * Math.PI;
        return [
          2 * Math.sin(phi) * Math.cos(lng),
          2 * Math.cos(phi),
          2 * Math.sin(phi) * Math.sin(lng),
        ];
      });
      return points;
    });
  }, []);

  return (
    <React.Fragment>
      <group ref={latRef}>
        {latitudeLines.map((points, i) => (
          <Line key={`lat-${i}`} points={points} color="#8b5cf6" lineWidth={0.8} transparent opacity={0.2} />
        ))}
      </group>
      <group ref={longRef}>
        {longitudeLines.map((points, i) => (
          <Line key={`lng-${i}`} points={points} color="#06b6d4" lineWidth={0.8} transparent opacity={0.15} />
        ))}
      </group>
      <group ref={dotsRef}>
        {MARKER_POSITIONS.map(([lat, lng], i) => {
          const pos = latLongToVector3(lat, lng, 2.03);
          return (
            <mesh key={i} position={pos}>
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshBasicMaterial color="#22d3ee" />
            </mesh>
          );
        })}
      </group>
      <mesh>
        <sphereGeometry args={[1.98, 32, 32]} />
        <meshBasicMaterial color="#0f0f23" transparent opacity={0.5} />
      </mesh>
    </React.Fragment>
  );
};

/* ═══════════════════════════════════════════════ */
/*  Three.js Canvas Wrapper                        */
/* ═══════════════════════════════════════════════ */
const GlobeCanvas = ({ children }: { children: React.ReactNode }) => (
  <Canvas
    camera={{ position: [0, 0, 6], fov: 45 }}
    style={{ background: 'transparent' }}
    gl={{ alpha: true, antialias: true }}
  >
    <ambientLight intensity={0.5} />
    <pointLight position={[10, 10, 10]} intensity={0.3} />
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.2}>
      {children}
    </Float>
    <OrbitControls
      enableZoom={false}
      enablePan={false}
      autoRotate={false}
      minPolarAngle={Math.PI / 3}
      maxPolarAngle={Math.PI / 1.5}
    />
  </Canvas>
);

export {
  EarthTextureGlobe,
  PulseGlobe,
  ParticleGlobe,
  HoloGridGlobe,
  GlobeCanvas,
};
