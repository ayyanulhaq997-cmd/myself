
import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import gsap from 'https://esm.sh/gsap@3.12.5';
import { ScrollTrigger } from 'https://esm.sh/gsap@3.12.5/ScrollTrigger';
import Magnetic from './Magnetic';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  // Mouse position or Device Orientation
  const xValue = useMotionValue(0);
  const yValue = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      xValue.set(clientX / innerWidth - 0.5);
      yValue.set(clientY / innerHeight - 0.5);
    };

    const handleDeviceMotion = (e: DeviceOrientationEvent) => {
      if (e.beta !== null && e.gamma !== null) {
        // Map tilt to -0.5 to 0.5 range
        const x = (e.gamma / 45); // Roughly 45 deg tilt
        const y = (e.beta / 45) - 1; // Adjust beta to center around horizontal holding
        xValue.set(Math.max(-0.5, Math.min(0.5, x)));
        yValue.set(Math.max(-0.5, Math.min(0.5, y)));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('deviceorientation', handleDeviceMotion);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleDeviceMotion);
    };
  }, [xValue, yValue]);

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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const text = "ATHELGARD";
  
  return (
    <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden z-10 select-none bg-black">
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
                x: useTransform(xValue, [-0.5, 0.5], [i * -12, i * 12]),
                scale: useTransform(yValue, [-0.5, 0.5], [1, 1.08]),
                rotateY: useTransform(xValue, [-0.5, 0.5], ["-10deg", "10deg"]),
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

      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <motion.div 
          className="floating-cta pointer-events-auto"
          style={{
            x: useSpring(useTransform(xValue, [-0.5, 0.5], [-200, 200]), { stiffness: 50, damping: 20 }),
            y: useSpring(useTransform(yValue, [-0.5, 0.5], [-100, 100]), { stiffness: 50, damping: 20 }),
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
