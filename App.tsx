
import React, { useState, useLayoutEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'https://esm.sh/gsap@3.12.5';
import { ScrollTrigger } from 'https://esm.sh/gsap@3.12.5/ScrollTrigger';
import Lenis from 'https://esm.sh/lenis@1.1.18';

import AmbientBackground from './components/AmbientBackground';
import Hero from './components/Hero';
import WorkCarousel from './components/WorkCarousel';
import AboutSection from './components/AboutSection';
import SkillsCloud from './components/SkillsCloud';
import BentoSection from './components/BentoSection';
import Cursor from './components/Cursor';
import Magnetic from './components/Magnetic';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      autoResize: true,
    });

    lenis.stop();
    lenis.on('scroll', ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.normalizeScroll(true);

    // Background Morphing Sequence
    const sections = gsap.utils.toArray('section');
    const colors = ['#050505', '#080812', '#120808', '#08120a', '#050505'];

    // Map colors to scroll progress of sections
    ScrollTrigger.create({
      trigger: mainRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const progress = self.progress;
        const colorIndex = Math.floor(progress * (colors.length - 1));
        const nextColorIndex = Math.min(colorIndex + 1, colors.length - 1);
        const lerpFactor = (progress * (colors.length - 1)) % 1;
        
        // Use GSAP to smoothly interpolate the background color variable
        gsap.to(document.body, {
          backgroundColor: colors[colorIndex],
          duration: 1,
          overwrite: 'auto',
          ease: "power2.out"
        });
      }
    });

    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        lenis.start();
        ScrollTrigger.refresh();
        window.dispatchEvent(new Event('resize'));
      }, 1000);
    }, 2500);

    return () => {
      clearTimeout(timer);
      lenis.destroy();
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <div className="relative text-white min-h-screen transition-colors duration-1000 selection:bg-blue-500">
      <Cursor />
      <AmbientBackground />
      
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.85, 0, 0.15, 1] }}
            className="fixed inset-0 z-[1000] bg-[#050505] flex flex-col items-center justify-center overflow-hidden pointer-events-auto"
          >
            <div className="relative overflow-hidden px-10">
              <motion.h2 
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="font-syne text-[12vw] font-black uppercase tracking-tighter leading-none"
              >
                Aethelgard
              </motion.h2>
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 0.2, ease: [0.85, 0, 0.15, 1] }}
                className="h-[1px] bg-white w-full mt-4 origin-left opacity-30"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="fixed top-0 left-0 w-full p-10 md:p-14 flex justify-between items-start z-[90] mix-blend-difference pointer-events-none">
        <Magnetic strength={0.3}>
          <div className="font-syne font-black text-4xl tracking-tighter cursor-none group interactive pointer-events-auto">
            A<span className="text-blue-500">.</span>G
          </div>
        </Magnetic>
        
        <div className="flex flex-col gap-6 text-[10px] uppercase font-bold tracking-[0.6em] items-end pointer-events-auto">
          {["Work", "About", "Studio"].map((item) => (
            <Magnetic key={item} strength={0.2}>
              <motion.div className="cursor-none interactive group py-1">
                <div className="relative overflow-hidden h-4">
                  <div className="group-hover:-translate-y-full transition-transform duration-700 ease-[0.16, 1, 0.3, 1]">
                    {item}
                  </div>
                  <div className="absolute top-0 left-0 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16, 1, 0.3, 1] text-blue-500">
                    {item}
                  </div>
                </div>
              </motion.div>
            </Magnetic>
          ))}
        </div>
      </nav>

      <main ref={mainRef} id="main-content" className="relative z-10 w-full">
        <Hero />
        <AboutSection />
        <WorkCarousel />
        <SkillsCloud />
        <BentoSection />
        
        <footer className="py-40 px-10 md:px-24 border-t border-white/5 flex flex-col gap-20">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <h2 className="text-[14vw] font-syne font-black tracking-tighter leading-[0.8] text-white/10 uppercase">World<br/>Class.</h2>
            <div className="flex flex-col gap-8 md:items-end">
              <Magnetic strength={0.4}>
                <button className="bg-white text-black px-16 py-8 rounded-full font-bold uppercase tracking-widest text-[10px] interactive transition-all hover:bg-blue-500 hover:text-white">
                  Get in Touch
                </button>
              </Magnetic>
            </div>
          </div>
          <div className="flex justify-between items-center pt-20 border-t border-white/5 text-gray-600 text-[9px] uppercase tracking-[0.6em]">
            <div>© 2025 Aethelgard Studio / Japan</div>
            <div className="flex gap-12">
              <span className="hover:text-white cursor-none interactive transition-colors">TW</span>
              <span className="hover:text-white cursor-none interactive transition-colors">LI</span>
              <span className="hover:text-white cursor-none interactive transition-colors">BE</span>
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed inset-0 border-[1px] border-white/5 z-[85] pointer-events-none" />
    </div>
  );
};

export default App;
