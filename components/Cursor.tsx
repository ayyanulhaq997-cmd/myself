
import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const Cursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [hoverType, setHoverType] = useState<string | null>(null);

  const mouseX = useSpring(0, { stiffness: 500, damping: 40, mass: 0.2 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 40, mass: 0.2 });
  
  const cursorSize = useSpring(12, { stiffness: 300, damping: 30 });

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
        cursorSize.set(100);
      } else if (isProject) {
        setIsHovering(true);
        setHoverType('project');
        cursorSize.set(120);
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
        {hoverType === 'project' && (
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[9px] font-black uppercase tracking-[0.3em] text-black"
          >
            Observe
          </motion.span>
        )}
      </motion.div>
      
      {/* Aura ring for ambient glow */}
      <motion.div 
        className="absolute inset-[-20px] border border-white/10 rounded-full"
        animate={{ 
          scale: isHovering ? 1.2 : 1,
          opacity: isHovering ? 0.5 : 0.1 
        }}
      />
    </motion.div>
  );
};

export default Cursor;
