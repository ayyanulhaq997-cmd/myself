
import React, { useState, useEffect } from 'react';
import ParticlesBackground from './components/ParticlesBackground';
import Hero from './components/Hero';
import WorkCarousel from './components/WorkCarousel';
import AboutSection from './components/AboutSection';
import SkillsCloud from './components/SkillsCloud';
import BentoSection from './components/BentoSection';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate high-end asset loading
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
          >
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              className="h-[1px] bg-white mb-4"
            />
            <span className="font-syne text-xs uppercase tracking-[0.5em] text-white">Initializing Experience</span>
          </motion.div>
        )}
      </AnimatePresence>

      <ParticlesBackground />

      <nav className="fixed top-0 left-0 w-full p-8 md:p-12 flex justify-between items-center z-50 mix-blend-difference">
        <div className="font-syne font-extrabold text-2xl tracking-tighter cursor-pointer group">
          A<span className="text-gray-500 group-hover:text-white transition-colors">/</span>GARD
        </div>
        <div className="flex gap-8 text-xs uppercase font-bold tracking-widest overflow-hidden h-5">
          {["Work", "About", "Contact"].map((item) => (
            <motion.div 
              key={item}
              whileHover={{ y: -20 }}
              className="cursor-pointer transition-transform"
            >
              <div className="h-5">{item}</div>
              <div className="h-5 text-blue-500">{item}</div>
            </motion.div>
          ))}
        </div>
      </nav>

      <main>
        <Hero />
        <AboutSection />
        <WorkCarousel />
        <SkillsCloud />
        <BentoSection />
        
        <footer className="py-20 px-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-gray-500 text-xs uppercase tracking-widest">
          <div>© 2024 Aethelgard Studio</div>
          <div className="flex gap-10">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Cookies</span>
          </div>
          <div className="flex items-center gap-2">
            Built with <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Tokyo
          </div>
        </footer>
      </main>

      {/* Aesthetic UI Elements */}
      <div className="fixed bottom-10 left-10 z-40 hidden md:block pointer-events-none">
        <div className="flex flex-col gap-4">
          <div className="w-[1px] h-20 bg-white/10 mx-auto" />
          <div className="rotate-90 origin-left text-[8px] uppercase tracking-[0.4em] text-white/20 whitespace-nowrap">
            Avant-Garde Digital Artform
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
