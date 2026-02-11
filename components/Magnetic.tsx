
import React, { useRef, useState, ReactElement } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface MagneticProps {
  children: ReactElement;
  strength?: number;
}

const Magnetic: React.FC<MagneticProps> = ({ children, strength = 0.5 }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Use high-performance springs for that "luxury" response
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const quickX = useSpring(x, springConfig);
  const quickY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    
    // Calculate distance from center
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const deltaX = (clientX - centerX) * strength;
    const deltaY = (clientY - centerY) * strength;
    
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: quickX, y: quickY }}
      className="inline-block h-full"
    >
      {children}
    </motion.div>
  );
};

export default Magnetic;
