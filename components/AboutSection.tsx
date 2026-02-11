import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface AnimatedWordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}

/**
 * Individual Word component to handle scroll transformations.
 * This ensures useTransform is called at the top level of a functional component.
 */
const AnimatedWord: React.FC<AnimatedWordProps> = ({ children, progress, range }) => {
  const color = useTransform(progress, range, ["#333333", "#ffffff"]);
  const opacity = useTransform(progress, range, [0.3, 1]);

  return (
    <motion.span
      style={{ color, opacity }}
      className="text-4xl md:text-7xl font-syne font-bold leading-[1.1] tracking-tight"
    >
      {children}
    </motion.span>
  );
};

const AboutSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const text = "I sit at the intersection of human emotion and digital precision. To me, a website isn't a collection of pages—it’s a living, breathing ecosystem. I specialize in turning complex problems into 'how-did-they-do-that' digital experiences. My philosophy is simple: If it’s been done before, it’s already obsolete. I build for the future, obsessed with the details that 99% of people miss, creating the 1% of work that the world remembers.";
  
  const words = text.split(" ");
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"]
  });

  return (
    <section ref={containerRef} className="relative min-h-screen py-40 px-6 md:px-24 flex flex-col items-center justify-center bg-[#050505]">
      <div className="max-w-6xl w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-blue-500 uppercase tracking-[0.5em] text-xs font-bold mb-4 block">Philosophy</span>
        </motion.div>
        
        <div className="flex flex-wrap gap-x-[0.3em] gap-y-[0.1em]">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = (i + 1) / words.length;
            return (
              <AnimatedWord 
                key={`${word}-${i}`} 
                progress={scrollYProgress} 
                range={[start, end]}
              >
                {word}
              </AnimatedWord>
            );
          })}
        </div>
      </div>

      <div className="absolute right-10 bottom-20 flex flex-col items-end gap-4 opacity-20 pointer-events-none hidden md:flex">
        <div className="text-[10vw] font-syne font-black uppercase leading-none select-none">Obsessed</div>
        <div className="text-[5vw] font-syne font-light uppercase leading-none select-none -mt-4">With Detail</div>
      </div>
    </section>
  );
};

export default AboutSection;