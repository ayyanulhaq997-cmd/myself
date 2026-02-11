
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -200]);
  const y2 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.2]);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden z-10">
      <motion.div 
        style={{ opacity, scale }}
        className="text-center px-4"
      >
        <motion.div style={{ y: y1 }} className="overflow-hidden">
          <h1 className="text-[12vw] md:text-[10vw] font-syne font-extrabold leading-none tracking-tighter uppercase text-mask">
            Creative
          </h1>
        </motion.div>
        
        <motion.div style={{ y: y2 }} className="overflow-hidden -mt-[4vw]">
          <h1 className="text-[12vw] md:text-[10vw] font-syne font-extrabold leading-none tracking-tighter uppercase stroke-white text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>
            Visionary
          </h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-8 md:mt-12 max-w-xl mx-auto"
        >
          <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed">
            Architecting immersive digital landscapes where <span className="text-white">technology</span> meets <span className="text-white">imagination</span>.
          </p>
        </motion.div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-gray-500">Scroll to Explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
