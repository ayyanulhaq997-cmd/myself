
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
  const y = useTransform(progress, range, [100, 0]);
  const opacity = useTransform(progress, range, [0, 1]);
  const blur = useTransform(progress, range, [10, 0]);

  return (
    <motion.span
      style={{ y, opacity, filter: useTransform(blur, (v) => `blur(${v}px)`) }}
      className="inline-block text-3xl md:text-[5vw] font-syne font-black leading-[1] tracking-tighter mr-[0.2em] mb-[0.1em] uppercase overflow-hidden"
    >
      {children}
    </motion.span>
  );
};

const AboutSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  
  const text = "Aethelgard is a digital sanctuary for the unconventional. We bridge the void between raw technology and visceral human emotion. Our sites are not just tools—they are experiences engineered to linger in the subconscious. We believe in the power of micro-motion, the precision of a pixel, and the soul of a scroll. Every frame is a statement. Every interaction is a story.";
  
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
        scale: 1.1,
        backgroundColor: "#080810",
        opacity: 1,
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[200vh] py-60 flex flex-col items-center justify-center overflow-hidden">
      <div ref={bgRef} className="absolute inset-0 -z-20 pointer-events-none bg-black transition-all duration-[3000ms] opacity-50" />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-blue-500/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] w-full px-10 md:px-24">
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [0, 1]) }}
          className="mb-32 flex items-center gap-12"
        >
          <div className="w-32 h-[1px] bg-blue-500" />
          <span className="text-blue-500 uppercase tracking-[1.5em] text-[9px] font-black block">Manifesto</span>
        </motion.div>
        
        <div className="flex flex-wrap w-full">
          {words.map((word, i) => {
            const start = i / words.length * 0.8;
            const end = start + 0.15;
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
          style={{ 
            opacity: useTransform(scrollYProgress, [0.7, 0.85], [0, 1]),
            y: useTransform(scrollYProgress, [0.7, 0.85], [50, 0])
          }}
          className="mt-60 grid grid-cols-1 md:grid-cols-2 gap-24 items-end"
        >
          <div className="space-y-10">
            <h4 className="text-[10px] font-black uppercase tracking-[1em] text-gray-500">Our Core</h4>
            <div className="space-y-4">
              {["Non-Linear Motion", "Sub-Pixel Precision", "Atmospheric UI"].map((trait) => (
                <div key={trait} className="flex items-center gap-6 group cursor-none interactive">
                  <div className="w-2 h-2 rounded-full border border-blue-500 group-hover:bg-blue-500 transition-all duration-500" />
                  <span className="text-2xl font-syne font-bold uppercase tracking-tight">{trait}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="text-gray-500 text-sm max-w-sm font-light leading-relaxed">
            We don't follow trends; we observe the patterns of the future and engineer them into the present. Our aesthetic is cold, our performance is fast, and our impact is lasting.
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
