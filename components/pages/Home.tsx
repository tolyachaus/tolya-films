import React from 'react';
import Hero from '../Hero';
import Portfolio from '../Portfolio';
import About from '../About';
import Contact from '../Contact';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen selection:bg-brand-dark selection:text-brand-light overflow-x-hidden">
      <main className="relative z-10">
        <Hero />
        <Portfolio />
        <About />
      </main>
      <Contact />
    </div>
  );
};

export default Home;
