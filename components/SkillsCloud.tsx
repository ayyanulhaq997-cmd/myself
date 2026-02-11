
import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  "React", "TypeScript", "WebGL", "Three.js", "Framer Motion", 
  "Tailwind", "Next.js", "Creative Coding", "UI/UX", "System Design",
  "Node.js", "D3.js", "Interaction Design", "Animation"
];

const SkillsCloud: React.FC = () => {
  return (
    <section className="min-h-screen py-32 px-10 md:px-20 relative flex flex-col items-center">
      <h2 className="text-center text-4xl md:text-7xl font-syne font-bold uppercase mb-20">
        The Stack <span className="text-gray-600">&</span> Expertise
      </h2>

      <div className="relative w-full max-w-6xl h-[600px] flex flex-wrap justify-center items-center gap-6">
        {skills.map((skill, i) => (
          <motion.div
            key={skill}
            drag
            dragConstraints={{ left: -300, right: 300, top: -200, bottom: 200 }}
            whileHover={{ scale: 1.2, zIndex: 10 }}
            whileDrag={{ scale: 0.9, cursor: 'grabbing' }}
            initial={{ 
              x: (Math.random() - 0.5) * 400, 
              y: (Math.random() - 0.5) * 400,
              opacity: 0
            }}
            animate={{ 
              opacity: 1,
              transition: { delay: i * 0.05 }
            }}
            className="glass px-8 py-4 rounded-full cursor-grab active:cursor-grabbing select-none border border-white/10"
          >
            <span className="text-lg md:text-2xl font-syne font-medium whitespace-nowrap">
              {skill}
            </span>
          </motion.div>
        ))}
        
        {/* Subtle decorative background text */}
        <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none">
          <span className="text-[25vw] font-syne font-black text-white/[0.02] uppercase leading-none">Skills</span>
        </div>
      </div>

      <p className="mt-20 text-gray-500 uppercase tracking-widest text-sm animate-pulse">
        Click and drag skills to interact
      </p>
    </section>
  );
};

export default SkillsCloud;
