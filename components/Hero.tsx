
import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import gsap from 'https://esm.sh/gsap@3.12.5';
import { ScrollTrigger } from 'https://esm.sh/gsap@3.12.5/ScrollTrigger';
import Magnetic from './Magnetic';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  // Mouse position for the reactive typography
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set(clientX / innerWidth - 0.5);
      mouseY.set(clientY / innerHeight - 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".hero-letter", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: (i: number) => -100 - (i * 20),
        rotationX: 45,
        opacity: 0,
        stagger: 0.02,
        ease: "power2.inOut"
      });

      gsap.to(".floating-cta", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: 200,
        opacity: 0,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const text = "ATHELGARD";
  
  return (
    <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden z-10 select-none bg-black">
      {/* Dynamic Background Gradient */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-blue-900/30 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-indigo-900/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative w-full text-center z-10 px-4">
        <h1 
          ref={titleRef}
          className="text-[22vw] font-syne font-black leading-[0.8] tracking-[-0.08em] uppercase flex justify-center items-center pointer-events-none"
        >
          {text.split("").map((char, i) => (
            <motion.span
              key={i}
              className="hero-letter inline-block will-change-transform"
              style={{
                x: useTransform(mouseX, [-0.5, 0.5], [i * -10, i * 10]),
                scale: useTransform(mouseY, [-0.5, 0.5], [1, 1.05]),
              }}
            >
              {char}
            </motion.span>
          ))}
        </h1>

        <div className="mt-8 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="text-[10px] uppercase tracking-[1em] text-blue-500 font-black mb-12"
          >
            Creative Technologist
          </motion.div>
        </div>
      </div>

      {/* Floating Magnetic CTA - Follows the Cursor roughly */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <motion.div 
          className="floating-cta pointer-events-auto"
          style={{
            x: useSpring(useTransform(mouseX, [-0.5, 0.5], [-200, 200]), { stiffness: 50, damping: 20 }),
            y: useSpring(useTransform(mouseY, [-0.5, 0.5], [-100, 100]), { stiffness: 50, damping: 20 }),
          }}
        >
          <Magnetic strength={0.4}>
            <div className="w-32 h-32 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm hover:bg-white hover:text-black transition-all duration-500 cursor-none group interactive">
              <span className="text-[9px] font-black uppercase tracking-widest text-center leading-tight">
                Work <br/> With Me
              </span>
            </div>
          </Magnetic>
        </motion.div>
      </div>

      <div className="absolute bottom-12 w-full px-12 flex justify-between items-end">
        <div className="flex flex-col gap-2">
           <span className="text-[8px] text-gray-500 uppercase tracking-widest">Available 2025</span>
           <div className="w-8 h-[1px] bg-white/20" />
        </div>
        <div className="text-[8px] text-gray-500 uppercase tracking-[0.5em]">Scroll to Enter the Void</div>
      </div>
    </section>
  );
};

export default Hero;
