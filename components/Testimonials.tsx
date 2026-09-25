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

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % FEATURED_TESTIMONIALS.length);
    }, 9000);
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
      className="py-14 md:py-20 bg-white text-brand-dark relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-6 relative z-10 max-w-3xl">
        {/* Subtle Section Header */}
        <div className="text-center mb-8">
          <p className="text-brand-gold text-[11px] uppercase tracking-[0.3em] font-medium mb-1.5">
            {t.testimonials?.tag || 'Kind Words'}
          </p>
          <h2 className="text-xl md:text-2xl font-display font-bold uppercase tracking-widest text-brand-dark">
            {t.testimonials?.title || 'Was Paare sagen'}
          </h2>
          <div className="h-[1px] w-12 bg-brand-gold/60 mx-auto mt-3" />
        </div>

        {/* Minimalist Couple Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-8">
          {FEATURED_TESTIMONIALS.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`px-3.5 py-1.5 text-[10px] md:text-[11px] uppercase tracking-[0.18em] transition-all duration-300 rounded-full cursor-pointer ${
                currentIndex === idx
                  ? 'bg-brand-dark text-white font-medium shadow-sm'
                  : 'bg-brand-gray/70 hover:bg-brand-gray text-brand-dark/60 hover:text-brand-dark'
              }`}
            >
              {item.couple}
            </button>
          ))}
        </div>

        {/* Quote Spotlight Box */}
        <div className="relative min-h-[220px] md:min-h-[200px] flex flex-col justify-center items-center text-center px-4 sm:px-10">
          <Quote size={22} className="text-brand-gold/70 mb-4" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="w-full flex flex-col items-center"
            >
              <blockquote className="font-display text-sm sm:text-base md:text-lg font-light italic text-brand-dark/85 leading-relaxed max-w-2xl whitespace-pre-line">
                "{current.quote}"
              </blockquote>

              {/* Author & Location */}
              <div className="mt-6 pt-2 w-full max-w-xs flex flex-col items-center">
                <p className="text-[11px] md:text-xs uppercase tracking-[0.2em] text-brand-dark font-bold">
                  {current.couple}
                </p>
                <p className="text-[10px] uppercase tracking-[0.15em] text-brand-dark/50 font-light mt-0.5">
                  {current.location}
                </p>

                {/* Direct Link to Project */}
                <Link
                  to={`/wedding/${current.slug}`}
                  className="mt-3 inline-flex items-center gap-1.5 text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-brand-gold hover:text-brand-dark transition-colors duration-300 group font-medium"
                >
                  <span>{t.testimonials?.watchFilm || 'Film ansehen'}</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Left / Right Nav Arrows (Desktop) */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous quote"
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-brand-dark/30 hover:text-brand-dark transition-colors hidden sm:block cursor-pointer"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next quote"
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-brand-dark/30 hover:text-brand-dark transition-colors hidden sm:block cursor-pointer"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Minimalist Pagination Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-6">
          {FEATURED_TESTIMONIALS.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to quote ${idx + 1}`}
              className={`h-1 transition-all duration-300 rounded-full cursor-pointer ${
                currentIndex === idx ? 'w-5 bg-brand-gold' : 'w-1 bg-black/15 hover:bg-black/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
