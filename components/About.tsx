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
    <section id="about" className="py-12 md:py-32 bg-white overflow-hidden relative" ref={containerRef}>
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

            <div className="space-y-6 text-brand-dark font-light text-base md:text-lg leading-relaxed">
              <p>
                Ich heiße Tolya. Ich bin Wedding Filmmaker aus Mannheim – tätig in ganz Deutschland und darüber hinaus.
              </p>
              <p>
                Für mich ist jede Hochzeit keine Veranstaltung, die man einfach dokumentiert, sondern eine Geschichte, die es verdient, in Bildern, Schnitt, Musik und Stimme erzählt zu werden.
              </p>
              <p>
                Mein Blick auf Hochzeitsfilme kommt nicht aus einem Videografie-Kurs, sondern aus jahrelanger Erfahrung mit Musik. Das gibt mir etwas, das man sich nicht antrainieren kann: ein Gespür für Rhythmus, für Pausen, für den Moment, in dem eine Einstellung stehen bleiben muss – und den, in dem sich das Tempo abrupt ändert. Genau deshalb wirken meine Filme nicht nur schön geschnitten, sondern haben eine eigene Dramaturgie, wie echtes Kino.
              </p>

              <div className="p-6 bg-brand-gray border-l-2 border-brand-gold backdrop-blur-sm mt-8">
                <h3 className="font-display text-lg uppercase tracking-widest mb-2 font-bold text-brand-dark">
                  MEINE SPEZIALISIERUNG
                </h3>
                <p className="text-brand-dark/90 leading-relaxed text-base">
                  Ich erstelle einen einzigen, in sich stimmigen Hochzeitsfilm – statt euch mit zehn verschiedenen Formaten zu überhäufen. Einen Film, den ihr euch noch in Jahren ansehen und dabei den Tag jedes Mal aufs Neue erleben werdet. Ich passe mich eurem Ablauf an und nehme aus eurem Tag genau das mit, was wirklich erzählenswert ist.
                </p>
              </div>

              <div className="p-6 bg-brand-gray border-l-2 border-brand-gold backdrop-blur-sm mt-6">
                <h3 className="font-display text-lg uppercase tracking-widest mb-2 font-bold text-brand-dark">
                  MEIN STIL
                </h3>
                <p className="text-brand-dark/90 leading-relaxed text-base">
                  Autorenhaft. Ich dokumentiere eure Hochzeit nicht – ich interpretiere sie wie ein Regisseur: Ich entscheide, wo die Kamera schweigt und wo sie spricht, welcher Moment zum Höhepunkt des Films wird und welcher außen vor bleibt. Das Ergebnis ist kein einfach schönes Video, sondern ein Film mit Charakter.
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