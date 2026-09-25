import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Quote, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../src/context/LanguageContext';

interface TestimonialItem {
  id: string;
  couple: string;
  location: string;
  quote: string;
  slug: string;
}

const FEATURED_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'patrick-stella',
    couple: 'Patrick & Stella',
    location: 'Zandvoort, near Amsterdam · Netherlands',
    quote: 'Watching the video touched me incredibly deeply. You didn’t simply capture beautiful moments — you captured the emotions, the love, the little details, and somehow even a part of everything that has happened in my life and everything that brought me to this moment. It feels like you really saw the story behind the day, and that means more to me than I can put into words.',
    slug: 'patrick-stella'
  },
  {
    id: 'yana-eduard',
    couple: 'Yana & Eduard',
    location: 'Wedding Film',
    quote: 'We watched it, and I’m literally crying 😭\n\nTolya, Tosya, this is just unbelievably emotional. The way you captured all the moments, the editing, the transitions… we were literally sitting there with our mouths open 😅\nI expected it to be amazing, of course, but THIS amazing?!)) In short, we’re absolutely blown away ❤️❤️❤️\n\nWe definitely made the right choice with you two 😉\n\nThank you for these memories 🥹❤️',
    slug: 'yana-eduard'
  },
  {
    id: 'rike-jonathan',
    couple: 'Rike & Jonathan',
    location: 'Hotel Jagdschloss Kranichstein · Darmstadt, Germany',
    quote: 'Tolyaaaaaaa, we finally got to watch it!!!! Its soooooooooooooooooooooooooooooooooooooooo good!!!! Wow wow wow wow wow!!!! Thank you so much for your amazing work!!!! We are really really happy with how everything turned out!',
    slug: 'rike-jonathan'
  }
];

const Testimonials: React.FC = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const current = FEATURED_TESTIMONIALS[currentIndex];

  // Optional auto-rotation every 8 seconds when not hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % FEATURED_TESTIMONIALS.length);
    }, 8500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + FEATURED_TESTIMONIALS.length) % FEATURED_TESTIMONIALS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % FEATURED_TESTIMONIALS.length);
  };

  return (
    <section
      id="testimonials"
      className="py-20 md:py-32 bg-[#111111] text-white relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12">
          <p className="text-brand-gold text-xs uppercase tracking-[0.35em] mb-3 font-medium">
            {t.testimonials?.tag || 'Kind Words'}
          </p>
          <h2 className="text-2xl md:text-4xl font-display font-bold uppercase tracking-wider text-white">
            {t.testimonials?.title || 'Was Paare sagen'}
          </h2>
          <div className="h-0.5 w-16 bg-brand-gold/60 mx-auto mt-4" />
        </div>

        {/* Couples Pill Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {FEATURED_TESTIMONIALS.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`px-4 py-2 text-[11px] md:text-xs uppercase tracking-[0.18em] rounded-full transition-all duration-300 border cursor-pointer ${
                currentIndex === idx
                  ? 'bg-brand-gold text-brand-dark font-bold border-brand-gold shadow-lg shadow-brand-gold/20 scale-105'
                  : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border-white/10'
              }`}
            >
              {item.couple}
            </button>
          ))}
        </div>

        {/* Quote Spotlight Box */}
        <div className="relative min-h-[260px] md:min-h-[240px] flex flex-col justify-center items-center text-center px-4 md:px-12">
          <Quote size={34} className="text-brand-gold/70 mb-6 drop-shadow-md" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="w-full flex flex-col items-center"
            >
              <blockquote className="font-display text-base sm:text-lg md:text-xl lg:text-2xl font-light italic text-white/95 leading-relaxed max-w-3xl whitespace-pre-line">
                "{current.quote}"
              </blockquote>

              {/* Author & Location */}
              <div className="mt-8 pt-6 border-t border-white/10 w-full max-w-md flex flex-col items-center">
                <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-brand-gold font-bold">
                  {current.couple}
                </p>
                <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/50 font-light mt-1">
                  {current.location}
                </p>

                {/* Direct Link to Project */}
                <Link
                  to={`/wedding/${current.slug}`}
                  className="mt-4 inline-flex items-center gap-2 text-[11px] md:text-xs uppercase tracking-[0.2em] text-white/70 hover:text-brand-gold transition-colors duration-300 group"
                >
                  <span>{t.testimonials?.watchFilm || 'Film ansehen'}</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300 text-brand-gold" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Left / Right Nav Arrows (Desktop) */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous quote"
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-white/40 hover:text-brand-gold transition-colors hidden sm:block cursor-pointer"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next quote"
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-white/40 hover:text-brand-gold transition-colors hidden sm:block cursor-pointer"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {FEATURED_TESTIMONIALS.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to quote ${idx + 1}`}
              className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                currentIndex === idx ? 'w-6 bg-brand-gold' : 'w-1.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
