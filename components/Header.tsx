import React, { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { NAV_LINKS } from '../constants';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 py-3'
          : 'bg-white/70 backdrop-blur-sm border-b border-slate-200/60 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center gap-4">
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-sky-700/90 hidden sm:block">
            On this page
          </span>
          <a
            href="#/"
            className="flex items-center gap-3 text-2xl font-bold text-slate-800 font-serif tracking-tight shrink-0"
          >
            <img
              src="/data/My%20Studio%20Photo.JPG"
              alt=""
              className="w-10 h-10 rounded-full object-cover border-2 border-sky-600 shadow-sm"
            />
            <span>
              K<span className="text-sky-600">.</span> Dandapat
            </span>
          </a>
        </div>

        <nav
          className="hidden md:flex items-center gap-5"
          aria-label="Sections on this portfolio page"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors uppercase tracking-wider"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/data/CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
            className="flex items-center gap-2 bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition-colors text-sm font-medium shadow-lg shadow-sky-600/20"
          >
            <Download size={16} /> CV
          </a>
        </nav>

        <button
          type="button"
          className="md:hidden text-slate-800 p-2 shrink-0"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col p-6 gap-1" aria-label="Portfolio sections">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-slate-700 hover:text-sky-600 py-2 border-b border-slate-100"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/data/CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              className="flex justify-center items-center gap-2 bg-sky-600 text-white px-4 py-3 rounded-md hover:bg-sky-700 transition-colors mt-4"
              onClick={() => setIsOpen(false)}
            >
              <Download size={18} /> Download CV
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
