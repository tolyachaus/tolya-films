import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ASSETS } from '../types';

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="about" className="py-24 bg-white overflow-hidden relative" ref={containerRef}>
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* Image Section */}
          <motion.div
            className="w-full lg:w-1/2 relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ y: imageY }}
          >
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:mx-0 overflow-hidden rounded-sm shadow-2xl">
              <div className="absolute inset-0 border border-white/10 z-20"></div>
              {/* Use a solid color fallback behind image in case of load failure */}
              <div className="w-full h-full bg-gray-800">
                <img
                  src={ASSETS.profilePhoto}
                  alt="Tolya Portrait"
                  className="w-full h-full object-cover filter sepia-[20%] contrast-110"
                />
              </div>
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/5 z-0 hidden lg:block backdrop-blur-sm"></div>
            <div className="absolute -top-8 -left-8 w-32 h-32 border border-white/10 z-0 hidden lg:block"></div>
          </motion.div>

          {/* Text Section */}
          <motion.div
            className="w-full lg:w-1/2 space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight text-brand-dark">
                ÜBER MICH
              </h2>
              <div className="h-1 w-16 bg-brand-gold mb-8"></div>
            </div>

            <div className="space-y-6 text-brand-dark font-light text-lg leading-relaxed">
              <p>
                Ich erstelle Videos, die Aufmerksamkeit erregen – um Menschen und Marken dabei zu helfen,
                <span className="font-medium"> gesehen, gehört und wiedererkannt</span> zu werden.
                Ich arbeite mit vollem Einsatz, achte auf jedes Detail und halte mein Wort.
                Meine Arbeiten im Portfolio sprechen am besten für meine Leistungen.
              </p>

              <div className="p-6 bg-brand-gray border-l-2 border-brand-gold backdrop-blur-sm">
                <h3 className="font-display text-xl uppercase tracking-widest mb-2 font-bold">Was ich mache</h3>
                <p>
                  Ich filme und schneide Videos. Neben dem Video bin ich auch Musiker – das gibt mir ein besonderes Gefühl für
                  <span className="font-medium"> Rhythmus, Sound und Stimmung</span> im Bild.
                </p>
              </div>

              <div>
                <h3 className="font-display text-xl uppercase tracking-widest mb-2 font-bold">Mein Stil</h3>
                <p>
                  Lebendig, emotional und visuell stark. Im Fokus stehen <span className="italic">Echtheit und Rhythmus</span>.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;