
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import gsap from 'https://esm.sh/gsap@3.12.5';
import { ScrollTrigger } from 'https://esm.sh/gsap@3.12.5/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedWordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const AnimatedWord: React.FC<AnimatedWordProps> = ({ children, progress, range }) => {
  const y = useTransform(progress, range, [40, 0]);
  const opacity = useTransform(progress, range, [0, 1]);
  const skew = useTransform(progress, range, [10, 0]);

  return (
    <motion.span
      style={{ y, opacity, skewY: skew }}
      className="inline-block text-3xl md:text-7xl font-syne font-bold leading-[1.1] tracking-tight mr-[0.25em]"
    >
      {children}
    </motion.span>
  );
};

const AboutSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  
  const text = "Aethelgard is a creative laboratory where we synthesize high-end aesthetics with bleeding-edge performance. We don't build websites; we craft digital legacies. Our methodology is obsessive: we focus on the subtle micro-interactions that 99% of developers ignore, creating the 1% of digital experiences that actually move the human soul. Every pixel is intentional. Every motion is physics-driven. Every project is an evolution.";
  
  const words = text.split(" ");
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
        backgroundColor: "#0d0a1a",
        opacity: 0.8,
        overwrite: 'auto'
      });
    }, containerRef);
    
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[180vh] py-60 flex flex-col items-center justify-center overflow-hidden">
      <div ref={bgRef} className="absolute inset-0 -z-20 pointer-events-none bg-[#050505] transition-colors duration-1000" />
      
      {/* Liquid Elements */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-blue-900/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-indigo-900/10 blur-[100px] rounded-full" />

      <div className="max-w-7xl w-full px-10 md:px-24">
        <div className="mb-24 flex items-center gap-8">
          <div className="w-20 h-[1px] bg-blue-500" />
          <span className="text-blue-500 uppercase tracking-[1em] text-[10px] font-black block">Philosophy</span>
        </div>
        
        <div className="flex flex-wrap overflow-hidden">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = (i + 5) / words.length;
            return (
              <AnimatedWord 
                key={`${word}-${i}`} 
                progress={scrollYProgress} 
                range={[start, Math.min(end, 1)]}
              >
                {word}
              </AnimatedWord>
            );
          })}
        </div>

        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0.8, 0.9], [0, 1]) }}
          className="mt-32 pt-20 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {["Purity", "Performance", "Poetry"].map((val, idx) => (
            <div key={val} className="group cursor-none interactive">
              <span className="text-white/20 text-[10px] font-black uppercase tracking-[0.5em] mb-4 block group-hover:text-blue-500 transition-colors">0{idx+1}</span>
              <h4 className="text-2xl font-syne font-bold uppercase">{val}</h4>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
