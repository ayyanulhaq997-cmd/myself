
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import Magnetic from './Magnetic';

const BentoSection: React.FC = () => {
  return (
    <section className="py-60 px-4 md:px-20 bg-black relative">
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto gap-6 max-w-7xl mx-auto">
        
        {/* Big Intro */}
        <div className="md:col-span-2 md:row-span-2 glass rounded-[2.5rem] p-10 md:p-16 flex flex-col justify-between overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <span className="text-[12vw] font-black leading-none uppercase select-none">Me</span>
          </div>
          <div>
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-blue-500 uppercase tracking-[0.8em] text-[10px] font-black mb-6 block"
            >
              The Mind
            </motion.span>
            <h2 className="text-4xl md:text-7xl font-syne font-black leading-[0.9] mb-10 tracking-tighter">
              Synthesizing <br />Code & <br /><span className="text-gray-500">Culture.</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-sm font-light">
              Crafting high-end digital solutions from Tokyo. I bridge the gap between complex engineering and minimalist aesthetic direction.
            </p>
          </div>
          <div className="mt-16 flex gap-6">
             {[Twitter, Github, Linkedin].map((Icon, i) => (
               <Magnetic key={i} strength={0.4}>
                 <div className="w-14 h-14 rounded-full glass flex items-center justify-center cursor-none interactive hover:bg-white hover:text-black transition-all duration-500">
                   <Icon size={22} strokeWidth={1.5} />
                 </div>
               </Magnetic>
             ))}
          </div>
        </div>

        {/* Experience */}
        <div className="md:col-span-2 glass rounded-[2.5rem] p-10 flex flex-col justify-between group cursor-none interactive overflow-hidden relative">
          <div className="flex justify-between items-start z-10">
            <h3 className="text-2xl font-syne font-bold uppercase tracking-tight">Timeline</h3>
            <ArrowUpRight className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
          </div>
          <div className="mt-12 space-y-8 z-10">
            <div className="group/item">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block mb-1 group-hover/item:text-blue-500 transition-colors">23' - Now</span>
              <span className="text-xl font-bold">Principal Tech @ Etherial</span>
            </div>
            <div className="group/item">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block mb-1 group-hover/item:text-blue-500 transition-colors">21' - 23'</span>
              <span className="text-xl font-bold">Lead Motion @ Studio Lux</span>
            </div>
          </div>
          <div className="absolute inset-0 bg-blue-600/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out" />
        </div>

        {/* Status */}
        <div className="md:col-span-1 glass rounded-[2.5rem] p-8 flex flex-col items-center justify-center gap-6 bg-blue-600/5 border-blue-500/10 group overflow-hidden">
          <div className="relative">
            <div className="w-4 h-4 bg-green-500 rounded-full animate-ping absolute inset-0" />
            <div className="w-4 h-4 bg-green-500 rounded-full relative" />
          </div>
          <span className="text-center font-black uppercase tracking-[0.3em] text-[9px] group-hover:tracking-[0.5em] transition-all duration-700">Open for Collaborations</span>
        </div>

        {/* Contact CTA */}
        <Magnetic strength={0.2}>
          <div className="md:col-span-1 glass rounded-[2.5rem] p-10 flex flex-col justify-between group cursor-none interactive bg-white/[0.03] hover:bg-white/10 transition-colors h-full">
            <Mail size={32} strokeWidth={1} className="text-blue-500" />
            <div className="mt-12">
              <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Connect</span>
              <h3 className="text-2xl font-syne font-bold">Mail.</h3>
            </div>
          </div>
        </Magnetic>

        {/* Image Grid Block */}
        <div className="md:col-span-2 glass rounded-[2.5rem] overflow-hidden min-h-[300px] relative group cursor-none interactive">
          <img 
            src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1200" 
            alt="Studio abstract" 
            className="w-full h-full object-cover grayscale transition-all duration-[2000ms] scale-110 group-hover:scale-100 group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-colors duration-1000" />
        </div>

      </div>
    </section>
  );
};

export default BentoSection;
