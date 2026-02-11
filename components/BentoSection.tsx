
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, ArrowUpRight } from 'lucide-react';

const BentoSection: React.FC = () => {
  return (
    <section className="py-32 px-4 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto gap-4 max-w-7xl mx-auto">
        
        {/* Big Intro */}
        <div className="md:col-span-2 md:row-span-2 glass rounded-3xl p-8 md:p-12 flex flex-col justify-between">
          <div>
            <span className="text-blue-500 uppercase tracking-widest text-sm font-bold mb-4 block">About Me</span>
            <h2 className="text-4xl md:text-6xl font-syne font-bold leading-tight mb-8">
              Pioneering <br />Digital <br /><span className="text-gray-500">Excellence.</span>
            </h2>
            <p className="text-gray-400 text-xl leading-relaxed max-w-md">
              A creative technologist based in Tokyo, focused on pushing the boundaries of what is possible on the web through high-end motion and immersive interactions.
            </p>
          </div>
          <div className="mt-12 flex gap-4">
             <div className="w-12 h-12 rounded-full glass flex items-center justify-center cursor-pointer hover:bg-white hover:text-black transition-colors">
               <Twitter size={20} />
             </div>
             <div className="w-12 h-12 rounded-full glass flex items-center justify-center cursor-pointer hover:bg-white hover:text-black transition-colors">
               <Github size={20} />
             </div>
             <div className="w-12 h-12 rounded-full glass flex items-center justify-center cursor-pointer hover:bg-white hover:text-black transition-colors">
               <Linkedin size={20} />
             </div>
          </div>
        </div>

        {/* Experience */}
        <div className="md:col-span-2 glass rounded-3xl p-8 flex flex-col justify-between group cursor-pointer overflow-hidden relative">
          <div className="flex justify-between items-start">
            <h3 className="text-2xl font-syne font-bold">Experience</h3>
            <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
          <div className="mt-8">
            <div className="mb-4">
              <span className="text-xs text-gray-500 block">2023 - Present</span>
              <span className="text-lg font-bold">Senior Creative Engineer @ Etherial</span>
            </div>
            <div>
              <span className="text-xs text-gray-500 block">2021 - 2023</span>
              <span className="text-lg font-bold">Interactive Designer @ Studio Lux</span>
            </div>
          </div>
        </div>

        {/* Available for Work */}
        <div className="md:col-span-1 glass rounded-3xl p-8 flex flex-col items-center justify-center gap-4 bg-blue-600/10 border-blue-500/20">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-ping" />
          <span className="text-center font-bold uppercase tracking-widest text-sm">Available for Projects</span>
        </div>

        {/* Contact CTA */}
        <div className="md:col-span-1 glass rounded-3xl p-8 flex flex-col justify-between group cursor-pointer bg-white/5">
          <Mail size={32} className="text-blue-500" />
          <div className="mt-8">
            <span className="text-sm text-gray-400">Ready to chat?</span>
            <h3 className="text-2xl font-syne font-bold">Get in Touch</h3>
          </div>
        </div>

        {/* Image Grid Block */}
        <div className="md:col-span-2 glass rounded-3xl overflow-hidden h-64 md:h-auto">
          <img 
            src="https://picsum.photos/1200/800?abstract" 
            alt="Work abstract" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-110 hover:scale-100"
          />
        </div>

      </div>
    </section>
  );
};

export default BentoSection;
