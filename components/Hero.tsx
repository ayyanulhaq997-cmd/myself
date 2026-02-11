
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap-scrolltrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLDivElement>(null);
  const title2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars1 = title1Ref.current?.querySelectorAll('.char');
      const chars2 = title2Ref.current?.querySelectorAll('.char');

      if (chars1 && chars2) {
        gsap.to(chars1, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
          y: (i) => -100 - (i * 20),
          rotate: (i) => i % 2 === 0 ? 15 : -15,
          opacity: 0,
          stagger: 0.02,
        });

        gsap.to(chars2, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
          y: (i) => 100 + (i * 20),
          rotate: (i) => i % 2 === 0 ? -10 : 10,
          opacity: 0,
          stagger: 0.02,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char inline-block">{char === ' ' ? '\u00A0' : char}</span>
    ));
  };

  return (
    <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden z-10">
      <div className="text-center px-4">
        <div ref={title1Ref} className="overflow-visible">
          <h1 className="text-[14vw] md:text-[12vw] font-syne font-extrabold leading-none tracking-tighter uppercase text-mask flex justify-center">
            {splitText("Creative")}
          </h1>
        </div>
        
        <div ref={title2Ref} className="overflow-visible -mt-[4vw]">
          <h1 className="text-[14vw] md:text-[12vw] font-syne font-extrabold leading-none tracking-tighter uppercase stroke-white text-transparent flex justify-center" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.4)' }}>
            {splitText("Visionary")}
          </h1>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 md:mt-12 max-w-xl mx-auto"
        >
          <p className="text-gray-400 text-lg md:text-2xl font-light leading-relaxed">
            Architecting immersive digital landscapes where <span className="text-white">technology</span> meets <span className="text-white">imagination</span>.
          </p>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.6em] text-gray-500 font-bold">Initiate Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-blue-500 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
