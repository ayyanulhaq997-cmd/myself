
import React, { useEffect, useState } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';

interface CursorProps {
  holdProgress?: number;
}

const Cursor: React.FC<CursorProps> = ({ holdProgress = 0 }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [hoverType, setHoverType] = useState<string | null>(null);

  const mouseX = useSpring(0, { stiffness: 600, damping: 45, mass: 0.15 });
  const mouseY = useSpring(0, { stiffness: 600, damping: 45, mass: 0.15 });
  
  const cursorSize = useSpring(12, { stiffness: 350, damping: 35 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [role="button"], .interactive');
      const isProject = target.closest('.project-card');
      
      if (isInteractive) {
        setIsHovering(true);
        setHoverType('link');
        cursorSize.set(90);
      } else if (isProject) {
        setIsHovering(true);
        setHoverType('project');
        cursorSize.set(130);
      } else {
        setIsHovering(false);
        setHoverType(null);
        cursorSize.set(12);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, cursorSize]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[10000] pointer-events-none flex items-center justify-center mix-blend-difference"
      style={{
        x: mouseX,
        y: mouseY,
        translateX: '-50%',
        translateY: '-50%',
        width: holdProgress > 0 ? 100 : cursorSize,
        height: holdProgress > 0 ? 100 : cursorSize,
      }}
    >
      <motion.div
        className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden relative"
      >
        {/* Hold Progress Ring */}
        {holdProgress > 0 && (
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="48%"
              fill="none"
              stroke="black"
              strokeWidth="4"
              strokeDasharray="300"
              strokeDashoffset={300 - (holdProgress * 300)}
              className="transition-all duration-75"
            />
          </svg>
        )}

        <AnimatePresence mode="wait">
          {holdProgress > 0 ? (
            <motion.span 
              key="charging"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-[8px] font-black uppercase text-black"
            >
              CHARGING
            </motion.span>
          ) : hoverType === 'project' && (
            <motion.span 
              key="view"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              className="text-[10px] font-black uppercase tracking-[0.4em] text-black"
            >
              VIEW
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Outer Glow Ring */}
      <motion.div 
        className="absolute inset-[-12px] border border-white/5 rounded-full"
        animate={{ 
          scale: (isHovering || holdProgress > 0) ? 1.2 : 1,
          opacity: (isHovering || holdProgress > 0) ? 0.3 : 0.05 
        }}
      />
    </motion.div>
  );
};

export default Cursor;
