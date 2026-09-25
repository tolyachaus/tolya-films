import React, { useEffect } from 'react';
import Hero from '../Hero';
import Portfolio from '../Portfolio';
import Testimonials from '../Testimonials';
import About from '../About';
import Contact from '../Contact';

const Home: React.FC = () => {
  useEffect(() => {
    document.body.classList.add('landing-ranade');
    return () => {
      document.body.classList.remove('landing-ranade');
    };
  }, []);

  return (
    <div className="landing-ranade min-h-screen selection:bg-brand-dark selection:text-brand-light overflow-x-hidden">
      <main className="relative z-10">
        <Hero />
        <Portfolio />
        <Testimonials />
        <About />
      </main>
      <Contact />
    </div>
  );
};

export default Home;
