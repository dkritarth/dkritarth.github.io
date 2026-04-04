import React from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Research } from '../components/Research';
import { Blog } from '../components/Blog';
import { Projects } from '../components/Projects';
import { Timeline } from '../components/Timeline';
import { Footer } from '../components/Footer';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-sky-200 selection:text-sky-900">
      <Header />
      <main>
        <Hero />
        <About />
        <Research />
        <Blog />
        <Projects />
        <Timeline />
      </main>
      <Footer />
    </div>
  );
};
