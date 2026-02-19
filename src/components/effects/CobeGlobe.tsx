'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import createGlobe from 'cobe';

const MARKER_LOCATIONS: { location: [number, number]; size: number }[] = [
  { location: [20.5937, 78.9629], size: 0.08 },   // India
  { location: [37.0902, -95.7129], size: 0.06 },   // USA
  { location: [51.5074, -0.1278], size: 0.06 },    // London
  { location: [35.6762, 139.6503], size: 0.06 },   // Tokyo
  { location: [-33.8688, 151.2093], size: 0.05 },  // Sydney
  { location: [48.8566, 2.3522], size: 0.05 },     // Paris
  { location: [1.3521, 103.8198], size: 0.05 },    // Singapore
  { location: [49.2827, -123.1207], size: 0.05 },  // Vancouver
];

const CobeGlobe = ({ className = '' }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(0);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
    if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
  }, []);

  const onPointerUp = useCallback(() => {
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
  }, []);

  const onPointerOut = useCallback(() => {
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (pointerInteracting.current !== null) {
      const delta = e.clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
    }
  }, []);

  useEffect(() => {
    let width = 0;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onResize = () => {
      if (canvas) {
        width = canvas.offsetWidth;
      }
    };
    onResize();
    window.addEventListener('resize', onResize);

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.25,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 20000,
      mapBrightness: 4,
      baseColor: [0.15, 0.1, 0.25],
      markerColor: [0.6, 0.4, 1.0],
      glowColor: [0.35, 0.2, 0.6],
      markers: MARKER_LOCATIONS,
      onRender: (state) => {
        if (pointerInteracting.current === null) {
          phiRef.current += 0.003;
        }
        state.phi = phiRef.current + pointerInteractionMovement.current / 200;
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    return () => {
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <canvas
        ref={canvasRef}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerOut={onPointerOut}
        onMouseMove={onMouseMove}
        className="aspect-square w-full max-w-sm cursor-grab"
        style={{ contain: 'layout paint size' }}
      />
    </div>
  );
};

export { CobeGlobe };
