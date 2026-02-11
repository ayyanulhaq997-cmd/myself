
import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const Cursor: React.FC = () => {
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
        width: cursorSize,
        height: cursorSize,
      }}
    >
      <motion.div
        className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {hoverType === 'project' && (
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
          scale: isHovering ? 1.1 : 1,
          opacity: isHovering ? 0.3 : 0.05 
        }}
      />
    </motion.div>
  );
};

// Internal Import for Cursor
import { AnimatePresence } from 'framer-motion';

export default Cursor;
