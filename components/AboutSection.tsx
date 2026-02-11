
import React, { useRef, useEffect } from 'react';
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
  const color = useTransform(progress, range, ["#1a1a1a", "#ffffff"]);
  const opacity = useTransform(progress, range, [0.1, 1]);

  return (
    <motion.span
      style={{ color, opacity }}
      className="text-4xl md:text-8xl font-syne font-bold leading-[1] tracking-tight"
    >
      {children}
    </motion.span>
  );
};

const AboutSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  
  const text = "I sit at the intersection of human emotion and digital precision. To me, a website isn't a collection of pages—it’s a living, breathing ecosystem. I specialize in turning complex problems into 'how-did-they-do-that' digital experiences. My philosophy is simple: If it’s been done before, it’s already obsolete. I build for the future, obsessed with the details that 99% of people miss, creating the 1% of work that the world remembers.";
  
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
        backgroundColor: "#1e133d",
        overwrite: 'auto'
      });
    }, containerRef);
    
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[150vh] py-60 flex flex-col items-center justify-center">
      {/* Background Layer for Morph */}
      <div ref={bgRef} className="fixed inset-0 -z-20 transition-colors duration-700 pointer-events-none bg-[#050505]" />
      
      <div className="max-w-7xl w-full px-6 md:px-24">
        <div className="mb-16">
          <span className="text-blue-500 uppercase tracking-[0.8em] text-xs font-bold mb-4 block">Our DNA</span>
        </div>
        
        <div className="flex flex-wrap gap-x-[0.2em] gap-y-[0.1em]">
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
    </section>
  );
};

export default AboutSection;
