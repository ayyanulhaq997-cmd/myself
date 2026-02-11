
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Project } from '../types';

const projects: Project[] = [
  { id: '1', title: 'Neon Nexus', category: 'Creative Tech', image: 'https://picsum.photos/800/600?random=1', description: 'Interactive WebGL light simulation.' },
  { id: '2', title: 'Aura UI', category: 'Interface Design', image: 'https://picsum.photos/800/600?random=2', description: 'Next-gen glassmorphic component library.' },
  { id: '3', title: 'Ether Cloud', category: 'Data Viz', image: 'https://picsum.photos/800/600?random=3', description: 'Real-time global data visualization engine.' },
  { id: '4', title: 'Synthetix', category: 'AI Tools', image: 'https://picsum.photos/800/600?random=4', description: 'Generative design assistant for modern brands.' },
  { id: '5', title: 'Origin Zero', category: 'Branding', image: 'https://picsum.photos/800/600?random=5', description: 'Digital identity for the next internet era.' },
];

const WorkCarousel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  return (
    <div ref={containerRef} className="h-[400vh] relative">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="absolute top-20 left-10 md:left-20 z-20">
          <h2 className="text-5xl md:text-8xl font-syne font-bold uppercase tracking-tighter">
            Selected <br /><span className="text-gray-600">Works</span>
          </h2>
        </div>

        <motion.div style={{ x }} className="flex gap-20 pl-[40vw] pr-[20vw]">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              whileHover={{ scale: 1.05 }}
              className="relative flex-shrink-0 w-[70vw] md:w-[35vw] aspect-[4/5] overflow-hidden rounded-2xl glass group"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 group-hover:opacity-80 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <span className="text-blue-400 text-sm font-medium mb-2 uppercase tracking-widest">{project.category}</span>
                <h3 className="text-4xl font-syne font-bold mb-4">{project.title}</h3>
                <p className="text-gray-300 text-lg mb-6 max-w-xs">{project.description}</p>
                <div className="flex items-center gap-2 text-white font-bold group/btn cursor-pointer">
                  <span>View Project</span>
                  <ExternalLink size={20} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </div>
              </div>
              <div className="absolute top-8 right-8 text-8xl font-syne font-black text-white/5 pointer-events-none">
                0{index + 1}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default WorkCarousel;
