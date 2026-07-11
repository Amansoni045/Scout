import { useState, useRef, MouseEvent } from "react";

export function useParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    
    // Relative coordinates of mouse pointer inside the container
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalize coordinates around center (0,0)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Maximum tilt angle (e.g. 15 degrees)
    const maxTilt = 15;
    const rotateX = ((centerY - y) / centerY) * maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setCoords({ x, y });
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    // Reset to neutral states
    setCoords({ x: 0, y: 0 });
    setRotate({ x: 0, y: 0 });
  };

  return {
    containerRef,
    coords,
    rotate,
    handleMouseMove,
    handleMouseLeave,
  };
}
