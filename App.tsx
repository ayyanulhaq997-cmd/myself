
import React, { useState, useEffect, useLayoutEffect } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap-scrolltrigger';
import ParticlesBackground from './components/ParticlesBackground';
import Hero from './components/Hero';
import WorkCarousel from './components/WorkCarousel';
import AboutSection from './components/AboutSection';
import SkillsCloud from './components/SkillsCloud';
import BentoSection from './components/BentoSection';
import Cursor from './components/Cursor';
import Magnetic from './components/Magnetic';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // Update ScrollTrigger on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis to GSAP ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable GSAP ticker lag smoothing for better sync
    gsap.ticker.lagSmoothing(0);

    // Set initial scroll position to top
    window.scrollTo(0, 0);

    // Initial preloader
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Let the exit animation finish slightly before refreshing triggers
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 1200);
    }, 2000);

    return () => {
      clearTimeout(timer);
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="relative text-white min-h-screen">
      <Cursor />
      <ParticlesBackground />
      
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center overflow-hidden pointer-events-auto"
          >
            <div className="relative">
              <motion.h2 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="font-syne text-[10vw] font-black uppercase tracking-tighter"
              >
                Aethelgard
              </motion.h2>
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, ease: "circInOut" }}
                className="h-[2px] bg-blue-500 w-full mt-2 origin-left"
              />
            </div>
            <motion.span 
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="font-syne text-[10px] uppercase tracking-[1em] text-white/40 mt-8"
            >
              Initializing
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="fixed top-0 left-0 w-full p-10 md:p-16 flex justify-between items-center z-[90] mix-blend-difference">
        <Magnetic strength={0.2}>
          <div className="font-syne font-black text-3xl tracking-tighter cursor-none group interactive">
            A<span className="text-blue-500">/</span>G
          </div>
        </Magnetic>
        
        <div className="flex gap-12 text-[10px] uppercase font-bold tracking-[0.4em]">
          {["Work", "About", "Studio"].map((item) => (
            <Magnetic key={item} strength={0.3}>
              <motion.div 
                whileHover={{ y: -5 }}
                className="cursor-none transition-transform interactive group"
              >
                <div className="relative overflow-hidden h-4">
                  <div className="group-hover:-translate-y-full transition-transform duration-500 ease-[0.76, 0, 0.24, 1]">
                    {item}
                  </div>
                  <div className="absolute top-0 left-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.76, 0, 0.24, 1] text-blue-400">
                    {item}
                  </div>
                </div>
              </motion.div>
            </Magnetic>
          ))}
        </div>
      </nav>

      <main id="main-content" className="relative z-10 w-full">
        <Hero />
        <AboutSection />
        <WorkCarousel />
        <SkillsCloud />
        <BentoSection />
        
        <footer className="py-32 px-10 md:px-24 border-t border-white/5 bg-black flex flex-col gap-20">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <h2 className="text-[12vw] font-syne font-black tracking-tighter leading-none text-white/10 uppercase">Let's Create.</h2>
            <div className="flex flex-col gap-8 md:items-end">
              <Magnetic strength={0.4}>
                <button className="bg-white text-black px-12 py-6 rounded-full font-bold uppercase tracking-widest text-xs interactive transition-transform hover:scale-110 active:scale-95">
                  Start a Project
                </button>
              </Magnetic>
              <div className="text-gray-500 space-y-2 uppercase text-[10px] tracking-widest text-right">
                <p>Tokyo, Japan</p>
                <p>contact@aethelgard.io</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-20 border-t border-white/10 text-gray-600 text-[10px] uppercase tracking-[0.5em]">
            <div>© 2025 Aethelgard Studio</div>
            <div className="flex gap-12 mt-6 md:mt-0">
              <span className="hover:text-white cursor-none interactive">Twitter</span>
              <span className="hover:text-white cursor-none interactive">LinkedIn</span>
              <span className="hover:text-white cursor-none interactive">Behance</span>
            </div>
          </div>
        </footer>
      </main>

      {/* Aesthetic Border Elements */}
      <div className="fixed inset-0 border-[20px] border-black z-[85] pointer-events-none hidden md:block" />
    </div>
  );
};

export default App;
