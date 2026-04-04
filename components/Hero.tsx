import React from 'react';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-b from-sky-50 to-white">
      
      {/* Abstract background elements */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-sky-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-100 rounded-full blur-3xl opacity-60 translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <div className="space-y-8">
          <div className="space-y-2">
            <p className="text-sky-600 font-semibold tracking-widest uppercase text-sm">Portfolio &amp; research</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 font-serif leading-tight">
              {CONTACT_INFO.name}
            </h1>
            <p className="text-2xl text-slate-600 font-light">
              {CONTACT_INFO.title}
            </p>
          </div>

          <p className="text-lg text-slate-700 leading-relaxed max-w-xl">
            {CONTACT_INFO.bio}
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#research" className="px-6 py-3 bg-slate-900 text-white rounded-md font-medium hover:bg-slate-800 transition-all flex items-center gap-2 group shadow-lg">
              View Research <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href={`mailto:${CONTACT_INFO.email}`} className="px-6 py-3 bg-white border border-slate-200 text-slate-800 rounded-md font-medium hover:border-sky-500 hover:text-sky-600 transition-all shadow-sm">
              Contact Me
            </a>
          </div>

          <div className="flex items-center gap-6 pt-4 border-t border-slate-200">
            <a href={CONTACT_INFO.github} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-900 transition-colors">
              <Github size={24} />
            </a>
            <a href={CONTACT_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-[#0077b5] transition-colors">
              <Linkedin size={24} />
            </a>
            <a href={`mailto:${CONTACT_INFO.email}`} className="text-slate-500 hover:text-red-500 transition-colors">
              <Mail size={24} />
            </a>
          </div>
        </div>

        {/* Visual/Image */}
        <div className="relative hidden md:block h-[600px]">
          <div className="absolute inset-0 bg-slate-200 rounded-2xl rotate-3 transform transition-transform hover:rotate-0 duration-500 overflow-hidden shadow-2xl">
             {/* Placeholder for professional photo. Using a generic tech/code abstract since user didn't provide a photo URL */}
             <img 
              src="https://picsum.photos/800/1000?grayscale" 
              alt="Abstract Technology" 
              className="w-full h-full object-cover opacity-80"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex flex-col justify-end p-8">
                <div className="text-white">
                  <p className="font-mono text-sm text-sky-300 mb-2">Current Focus</p>
                  <p className="text-xl font-serif">Symmetry-Aware Graph Neural Networks & Healthcare AI</p>
                </div>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};