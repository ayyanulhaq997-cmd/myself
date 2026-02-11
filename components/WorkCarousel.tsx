
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Project } from '../types';

const projects: Project[] = [
  { id: '1', title: 'Neon Nexus', category: 'Creative Tech', image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800', description: 'Interactive WebGL light simulation.' },
  { id: '2', title: 'Aura UI', category: 'Interface Design', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800', description: 'Next-gen glassmorphic component library.' },
  { id: '3', title: 'Ether Cloud', category: 'Data Viz', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800', description: 'Real-time global data visualization engine.' },
  { id: '4', title: 'Synthetix', category: 'AI Tools', image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800', description: 'Generative design assistant for modern brands.' },
];

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="project-card relative flex-shrink-0 w-[80vw] md:w-[40vw] aspect-[4/5] overflow-hidden rounded-3xl glass group cursor-none"
    >
      <motion.div 
        style={{ transform: "translateZ(50px)" }}
        className="absolute inset-0 z-0"
      >
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 grayscale group-hover:grayscale-0"
        />
      </motion.div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
      
      <div 
        style={{ transform: "translateZ(100px)" }}
        className="absolute inset-0 z-20 flex flex-col justify-end p-10 pointer-events-none"
      >
        <span className="text-blue-500 text-xs font-bold mb-2 uppercase tracking-[0.4em]">{project.category}</span>
        <h3 className="text-4xl md:text-5xl font-syne font-bold mb-4 tracking-tighter leading-none">{project.title}</h3>
        <p className="text-gray-400 text-base md:text-lg mb-8 max-w-xs font-light">{project.description}</p>
        <div className="flex items-center gap-3 text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <ExternalLink size={24} />
           <span className="uppercase text-[10px] tracking-widest">Explore Case Study</span>
        </div>
      </div>
      <div className="absolute top-10 right-10 text-[12vw] font-syne font-black text-white/5 pointer-events-none z-0">
        0{index + 1}
      </div>
    </motion.div>
  );
};

const WorkCarousel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <div ref={containerRef} className="h-[400vh] relative">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="absolute top-24 left-10 md:left-24 z-20">
          <h2 className="text-6xl md:text-[9vw] font-syne font-bold uppercase tracking-tighter leading-none">
            Selected <br /><span className="text-gray-600">Creations</span>
          </h2>
        </div>

        <motion.div style={{ x }} className="flex gap-24 pl-[45vw] pr-[10vw]">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default WorkCarousel;
