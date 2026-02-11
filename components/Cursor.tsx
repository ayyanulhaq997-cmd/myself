
import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const Cursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [hoverType, setHoverType] = useState<string | null>(null);

  // Different physics for a "lagging" organic follower effect
  const mouseX = useSpring(0, { stiffness: 400, damping: 35, mass: 0.5 });
  const mouseY = useSpring(0, { stiffness: 400, damping: 35, mass: 0.5 });
  
  const cursorSize = useSpring(16, { stiffness: 300, damping: 20 });

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
        cursorSize.set(80);
      } else if (isProject) {
        setIsHovering(true);
        setHoverType('project');
        cursorSize.set(100);
      } else {
        setIsHovering(false);
        setHoverType(null);
        cursorSize.set(16);
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
        animate={{
          borderRadius: hoverType === 'project' ? '12px' : '9999px'
        }}
      >
        {hoverType === 'project' && (
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[8px] font-black uppercase tracking-[0.4em] text-black"
          >
            View
          </motion.span>
        )}
      </motion.div>
      
      {/* Trailing secondary ring for depth */}
      {!isHovering && (
        <motion.div 
          className="absolute w-full h-full border border-white/20 rounded-full"
          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      )}
    </motion.div>
  );
};

export default Cursor;
