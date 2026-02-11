
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

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
  
  // Parallax for content inside the card
  const contentX = useTransform(mouseXSpring, [-0.5, 0.5], [-30, 30]);
  const contentY = useTransform(mouseYSpring, [-0.5, 0.5], [-30, 30]);

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
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="project-card relative flex-shrink-0 w-[85vw] md:w-[45vw] aspect-[4/5] overflow-hidden rounded-[3rem] glass group cursor-none"
    >
      {/* Background Parallax Image */}
      <motion.div 
        style={{ 
          transform: "translateZ(-50px) scale(1.2)",
          x: useTransform(mouseXSpring, [-0.5, 0.5], [20, -20]),
          y: useTransform(mouseYSpring, [-0.5, 0.5], [20, -20]),
        }}
        className="absolute inset-0 z-0"
      >
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 grayscale group-hover:grayscale-0"
        />
      </motion.div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
      
      {/* Floating Content Parallax */}
      <motion.div 
        style={{ 
          transform: "translateZ(100px)",
          x: contentX,
          y: contentY
        }}
        className="absolute inset-0 z-20 flex flex-col justify-end p-12 md:p-16 pointer-events-none"
      >
        <div className="overflow-hidden">
          <motion.span 
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            className="text-blue-500 text-xs font-black mb-4 uppercase tracking-[0.5em] block"
          >
            {project.category}
          </motion.span>
        </div>
        <h3 className="text-5xl md:text-7xl font-syne font-black mb-6 tracking-tighter leading-[0.8] uppercase">{project.title}</h3>
        <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-sm font-light leading-relaxed">{project.description}</p>
        <div className="flex items-center gap-4 text-white font-black opacity-0 group-hover:opacity-100 transition-opacity duration-500">
           <div className="p-4 rounded-full border border-white/20">
             <ExternalLink size={24} />
           </div>
           <span className="uppercase text-[10px] tracking-widest font-black">View Project Details</span>
        </div>
      </motion.div>
      
      {/* Background Numbering */}
      <div className="absolute top-16 right-16 text-[14vw] font-syne font-black text-white/5 pointer-events-none z-0">
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
    <section ref={containerRef} className="h-[450vh] relative">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="absolute top-24 left-10 md:left-24 z-20">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-6xl md:text-[9vw] font-syne font-black uppercase tracking-tighter leading-[0.8]"
          >
            Latest <br /><span className="text-gray-700">Explorations</span>
          </motion.h2>
        </div>

        <motion.div style={{ x }} className="flex gap-32 pl-[45vw] pr-[10vw]">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WorkCarousel;
