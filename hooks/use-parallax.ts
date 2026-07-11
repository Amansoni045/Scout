"use client";
import { useState, useRef, MouseEvent, useCallback } from "react";

interface TiltState {
  x: number; // rotateX degrees
  y: number; // rotateY degrees
}

export function useCardTilt() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState<TiltState>({ x: 0, y: 0 });
  const [lightX, setLightX] = useState(50); // % for radial gradient
  const [lightY, setLightY] = useState(30);
  const [isHovered, setIsHovered] = useState(false);

  const onMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalize -1 to +1
    const nx = (x / rect.width) * 2 - 1;
    const ny = (y / rect.height) * 2 - 1;

    // Max tilt: 14 degrees — elegant, not aggressive
    const MAX_TILT = 14;
    const rotateY = nx * MAX_TILT;
    const rotateX = -ny * MAX_TILT;

    // Light position follows cursor (% for CSS radial-gradient)
    const lx = (x / rect.width) * 100;
    const ly = (y / rect.height) * 100;

    setRotate({ x: rotateX, y: rotateY });
    setLightX(lx);
    setLightY(ly);
  }, []);

  const onMouseLeave = useCallback(() => {
    setRotate({ x: 0, y: 0 });
    setLightX(50);
    setLightY(30);
    setIsHovered(false);
  }, []);

  const onMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return {
    containerRef,
    rotate,
    lightX,
    lightY,
    isHovered,
    onMouseMove,
    onMouseLeave,
    onMouseEnter,
  };
}

// Legacy export for backward compatibility
export function useParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const maxTilt = 14;
    const rotateX = ((centerY - y) / centerY) * maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;
    setCoords({ x, y });
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0 });
    setRotate({ x: 0, y: 0 });
  };

  return { containerRef, coords, rotate, handleMouseMove, handleMouseLeave };
}
