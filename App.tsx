
import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
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
import PhysicsSandbox from './components/PhysicsSandbox';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isGravityCrushed, setIsGravityCrushed] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [showFlash, setShowFlash] = useState(false);
  
  const mainRef = useRef<HTMLDivElement>(null);
  const holdTimerRef = useRef<number | null>(null);

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

    const colors = ['#050505', '#080812', '#120808', '#08120a', '#050505'];

    ScrollTrigger.create({
      trigger: mainRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        if (isGravityCrushed) return;
        const progress = self.progress;
        const colorIndex = Math.floor(progress * (colors.length - 1));
        gsap.to(document.body, {
          backgroundColor: colors[colorIndex],
          duration: 1.2,
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
  }, [isGravityCrushed]);

  // Handle Restoration
  const restoreReality = () => {
    setIsGravityCrushed(false);
    setHoldProgress(0);
    // Force a small delay then refresh scroll triggers
    setTimeout(() => {
      ScrollTrigger.refresh();
      window.scrollTo(0, 0);
    }, 100);
  };

  // Robust Global Gravity Crush Trigger Logic
  useEffect(() => {
    const startHold = () => {
      if (isGravityCrushed || isLoading) return;
      
      const startTime = Date.now();
      const duration = 2500; 

      if (holdTimerRef.current) clearInterval(holdTimerRef.current);

      holdTimerRef.current = window.setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setHoldProgress(progress);
        
        if (progress > 0.4) {
          gsap.to(mainRef.current, {
            x: (Math.random() - 0.5) * (progress * 20),
            y: (Math.random() - 0.5) * (progress * 20),
            duration: 0.05,
          });
        }

        if (progress >= 1) {
          clearInterval(holdTimerRef.current!);
          holdTimerRef.current = null;
          setShowFlash(true);
          setIsGravityCrushed(true);
          setHoldProgress(0);
          gsap.to(mainRef.current, { x: 0, y: 0, duration: 0.1 });
          setTimeout(() => setShowFlash(false), 500);
        }
      }, 16);
    };

    const endHold = () => {
      if (holdTimerRef.current) {
        clearInterval(holdTimerRef.current);
        holdTimerRef.current = null;
        setHoldProgress(0);
        gsap.to(mainRef.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isGravityCrushed) {
        restoreReality();
      }
    };

    window.addEventListener('mousedown', startHold);
    window.addEventListener('mouseup', endHold);
    window.addEventListener('touchstart', startHold);
    window.addEventListener('touchend', endHold);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('mousedown', startHold);
      window.removeEventListener('mouseup', endHold);
      window.removeEventListener('touchstart', startHold);
      window.removeEventListener('touchend', endHold);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isGravityCrushed, isLoading]);

  return (
    <div className="relative text-white min-h-screen transition-colors duration-1000 selection:bg-blue-500">
      <Cursor holdProgress={holdProgress} />
      <AmbientBackground isCharging={holdProgress > 0} />
      
      {/* Reality Collapse Flash */}
      <AnimatePresence>
        {showFlash && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-[20000] pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Physics Simulation Overlay */}
      <PhysicsSandbox isActive={isGravityCrushed} onReset={restoreReality} />

      <AnimatePresence>
        {holdProgress > 0 && !isGravityCrushed && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: holdProgress * 15, opacity: holdProgress * 0.4 }}
            exit={{ scale: 20, opacity: 0 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-white blur-[120px] z-[50] pointer-events-none mix-blend-overlay"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isNavigating && (
          <motion.div 
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.8, ease: [0.85, 0, 0.15, 1] }}
            className="fixed inset-0 bg-blue-600 z-[9999] origin-top"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute inset-0 flex items-center justify-center font-syne font-black text-[10vw] uppercase tracking-tighter"
            >
              Loading...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

      <nav className={`fixed top-0 left-0 w-full p-10 md:p-14 flex justify-between items-start z-[90] mix-blend-difference pointer-events-none transition-opacity duration-500 ${isGravityCrushed ? 'opacity-0' : 'opacity-100'}`}>
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

      <main ref={mainRef} id="main-content" className={`relative z-10 w-full ${isGravityCrushed ? 'pointer-events-none' : ''}`}>
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

      <div className={`fixed inset-0 border-[1px] border-white/5 z-[85] pointer-events-none transition-opacity duration-500 ${isGravityCrushed ? 'opacity-0' : 'opacity-100'}`} />
    </div>
  );
};

export default App;
