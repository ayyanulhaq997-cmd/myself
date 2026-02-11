
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'https://esm.sh/gsap@3.12.5';
import { ScrollTrigger } from 'https://esm.sh/gsap@3.12.5/ScrollTrigger';

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
            scrub: true,
          },
          y: (i: number) => -150 - (i * 30),
          rotation: (i: number) => (i % 2 === 0 ? 30 : -30),
          opacity: 0,
          stagger: 0.01,
          ease: "none"
        });

        gsap.to(chars2, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          y: (i: number) => 150 + (i * 30),
          rotation: (i: number) => (i % 2 === 0 ? -20 : 20),
          opacity: 0,
          stagger: 0.01,
          ease: "none"
        });
      }
      
      // Background elements parallax
      gsap.to(".hero-bg-accent", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        },
        yPercent: -50,
        scale: 1.5,
        opacity: 0.2
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char inline-block will-change-transform">{char === ' ' ? '\u00A0' : char}</span>
    ));
  };

  return (
    <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden z-10">
      {/* Visual Accents */}
      <div className="hero-bg-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-blue-600/10 blur-[150px] rounded-full -z-10" />
      
      <div className="text-center px-4 select-none">
        <div ref={title1Ref} className="overflow-visible">
          <h1 className="text-[18vw] md:text-[15vw] font-syne font-black leading-[0.75] tracking-tighter uppercase text-mask-animated flex justify-center">
            {splitText("Athelgard")}
          </h1>
        </div>
        
        <div ref={title2Ref} className="overflow-visible -mt-[2vw]">
          <h1 className="text-[18vw] md:text-[15vw] font-syne font-black leading-[0.75] tracking-tighter uppercase stroke-white text-transparent flex justify-center opacity-40" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
            {splitText("Portfolio")}
          </h1>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 2 }}
          className="mt-16 max-w-2xl mx-auto flex flex-col items-center"
        >
          <div className="w-[1px] h-12 bg-white/20 mb-8" />
          <p className="text-gray-500 text-sm md:text-lg font-light tracking-[0.2em] uppercase leading-relaxed text-center px-10">
            Engineered for <span className="text-white font-bold">Emotion</span>. <br/>
            Architected for <span className="text-white font-bold">Infinity</span>.
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-10 md:left-24 flex items-center gap-6">
        <div className="w-12 h-[1px] bg-white/20" />
        <span className="text-[9px] uppercase tracking-[0.8em] text-gray-600 font-bold">Scroll Experience</span>
      </div>
    </section>
  );
};

export default Hero;
