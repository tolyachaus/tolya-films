import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen selection:bg-brand-dark selection:text-brand-light overflow-x-hidden">
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Portfolio />
        <About />
      </main>
      <Contact />
    </div>
  );
}

export default App;