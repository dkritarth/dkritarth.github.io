import React, { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import { getSiteUrls } from '../siteUrls';

export const Header: React.FC = () => {
  const site = getSiteUrls();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const hubLabel =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
      ? 'Hub (local preview)'
      : 'Hub (dkritarth.com)';

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
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center gap-4">
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

        <nav className="hidden xl:flex items-center gap-5 text-xs font-medium text-slate-600 uppercase tracking-wider">
          <a href={site.hub} className="hover:text-sky-600">
            Hub
          </a>
          <a href={site.notebook} className="hover:text-sky-600">
            Notebook
          </a>
          <a href={`${site.hub}/configs/`} className="hover:text-sky-600">
            Configs
          </a>
          <span className="text-slate-300">|</span>
          <a href="#/personal-statement" className="hover:text-sky-600 normal-case tracking-normal">
            Personal statement
          </a>
          <a href="#/statement-of-purpose" className="hover:text-sky-600 normal-case tracking-normal">
            Statement of purpose
          </a>
        </nav>

        <nav className="hidden md:flex xl:hidden items-center gap-4 flex-wrap justify-end">
          <a href={site.hub} className="text-xs font-medium text-slate-600 hover:text-sky-600">
            Hub
          </a>
          <a href={site.notebook} className="text-xs font-medium text-slate-600 hover:text-sky-600">
            Notebook
          </a>
          <a href={`${site.hub}/configs/`} className="text-xs font-medium text-slate-600 hover:text-sky-600">
            Configs
          </a>
          <a href="#/personal-statement" className="text-xs font-medium text-slate-600 hover:text-sky-600">
            PS
          </a>
          <a href="#/statement-of-purpose" className="text-xs font-medium text-slate-600 hover:text-sky-600">
            SOP
          </a>
        </nav>

        <nav className="hidden md:flex items-center gap-6">
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
          className="md:hidden text-slate-800 p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 max-h-[85vh] overflow-y-auto">
          <nav className="flex flex-col p-6 gap-3">
            <a
              href={site.hub}
              className="text-sm font-medium text-slate-700 hover:text-sky-600"
              onClick={() => setIsOpen(false)}
            >
              {hubLabel}
            </a>
            <a
              href={site.notebook}
              className="text-sm font-medium text-slate-700 hover:text-sky-600"
              onClick={() => setIsOpen(false)}
            >
              Notebook
            </a>
            <a
              href={`${site.hub}/configs/`}
              className="text-sm font-medium text-slate-700 hover:text-sky-600"
              onClick={() => setIsOpen(false)}
            >
              Configs
            </a>
            <a
              href="#/personal-statement"
              className="text-sm font-medium text-slate-700 hover:text-sky-600"
              onClick={() => setIsOpen(false)}
            >
              Personal statement
            </a>
            <a
              href="#/statement-of-purpose"
              className="text-sm font-medium text-slate-700 hover:text-sky-600"
              onClick={() => setIsOpen(false)}
            >
              Statement of purpose
            </a>
            <hr className="border-slate-200" />
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-slate-700 hover:text-sky-600"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/data/CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              className="flex justify-center items-center gap-2 bg-sky-600 text-white px-4 py-3 rounded-md hover:bg-sky-700 transition-colors"
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
