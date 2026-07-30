import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Quote, Instagram, Facebook, Youtube } from 'lucide-react';
import { ASSETS, SOCIAL_LINKS, KERSTIN_FREDDY_DATA } from '../../types';

const KerstinFreddy: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-light text-brand-dark flex flex-col justify-between selection:bg-brand-dark selection:text-brand-light">
      <div>
        {/* ── 1. HERO ── */}
        <section className="relative h-[65vh] md:h-[80vh] min-h-[480px] w-full overflow-hidden bg-black flex items-end pb-12 md:pb-20">
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={KERSTIN_FREDDY_DATA.coverImage}
              alt={KERSTIN_FREDDY_DATA.title}
              className="w-full h-full object-cover object-center opacity-85 scale-105 transition-transform duration-1000"
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/60 to-transparent" />
          </div>

          {/* Navigation Back Link */}
          <div className="absolute top-28 left-6 md:left-12 z-20">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 text-xs uppercase tracking-[0.25em] group bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
              Portfolio
            </Link>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 container mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl"
            >
              <p className="text-brand-gold text-xs uppercase tracking-[0.35em] mb-3 font-medium">
                Wedding Film
              </p>
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-bold tracking-[0.06em] uppercase text-white drop-shadow-2xl mb-4 leading-none">
                {KERSTIN_FREDDY_DATA.title}
              </h1>
              <div className="flex items-center gap-3 text-white/70 text-xs md:text-sm tracking-[0.2em] uppercase font-light">
                <MapPin size={14} className="text-brand-gold" />
                <span>Morrhof · Großkarlbach</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 2. HIGHLIGHT FILM (MAIN ACCENT) ── */}
        <section className="py-20 md:py-32 bg-brand-light relative">
          <div className="container mx-auto px-6 md:px-12 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-10 md:mb-14"
            >
              <p className="text-brand-gold text-xs uppercase tracking-[0.35em] mb-3 font-medium">
                Highlight Film
              </p>
              <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-wider text-brand-dark mb-4">
                Trailer & Highlights
              </h2>
              <div className="h-[1px] w-16 bg-brand-gold mx-auto" />
            </motion.div>

            {/* Video Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-video w-full rounded-sm overflow-hidden shadow-2xl bg-black border border-black/10"
            >
              <iframe
                src={`https://www.youtube.com/embed/${KERSTIN_FREDDY_DATA.highlightVideoId}?rel=0&modestbranding=1`}
                title={`${KERSTIN_FREDDY_DATA.title} - Highlight Film`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-none"
              />
            </motion.div>
          </div>
        </section>

        {/* ── 3. FULL WEDDING FILM ── */}
        <section className="py-20 md:py-32 bg-white border-t border-b border-black/[0.05]">
          <div className="container mx-auto px-6 md:px-12 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-10 md:mb-14"
            >
              <p className="text-brand-gold text-xs uppercase tracking-[0.35em] mb-3 font-medium">
                Full Wedding Film
              </p>
              <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-wider text-brand-dark mb-4">
                The Complete Story
              </h2>
              <div className="h-[1px] w-16 bg-brand-gold mx-auto" />
            </motion.div>

            {/* Video Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-video w-full rounded-sm overflow-hidden shadow-xl bg-black border border-black/10"
            >
              <iframe
                src={`https://www.youtube.com/embed/${KERSTIN_FREDDY_DATA.fullFilmVideoId}?rel=0&modestbranding=1`}
                title={`${KERSTIN_FREDDY_DATA.title} - Full Wedding Film`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-none"
              />
            </motion.div>
          </div>
        </section>

        {/* ── 4. LOCATION BLOCK ── */}
        <section className="py-24 md:py-36 bg-brand-light">
          <div className="container mx-auto px-6 md:px-12 max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-brand-gold text-xs uppercase tracking-[0.35em] mb-4 font-medium">
                Location
              </p>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-brand-dark mb-2 tracking-wide uppercase">
                {KERSTIN_FREDDY_DATA.location.name}
              </h2>
              <p className="text-xs uppercase tracking-[0.25em] text-brand-gold mb-8 font-medium">
                {KERSTIN_FREDDY_DATA.location.region}
              </p>
              <div className="h-[1px] w-12 bg-brand-gold/50 mx-auto mb-8" />
              <p className="text-brand-dark/75 text-base md:text-lg font-light leading-relaxed tracking-wide max-w-2xl mx-auto">
                {KERSTIN_FREDDY_DATA.location.description}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── 5. KIND WORDS (TESTIMONIAL) ── */}
        <section className="py-24 md:py-36 bg-white border-t border-black/[0.06]">
          <div className="container mx-auto px-6 md:px-12 max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <Quote className="mx-auto text-brand-gold/30 mb-6" size={48} strokeWidth={1} />
              <p className="text-brand-gold text-xs uppercase tracking-[0.35em] mb-8 font-medium">
                Kind Words
              </p>
              <blockquote className="font-display text-xl md:text-3xl font-light italic text-brand-dark leading-relaxed tracking-wide mb-6">
                "{KERSTIN_FREDDY_DATA.quote}"
              </blockquote>
            </motion.div>
          </div>
        </section>
      </div>

      {/* ── FOOTER ── */}
      <footer className="border-t border-black/[0.06] py-16 bg-white">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <Link to="/">
            <img
              src={ASSETS.logoBlack}
              alt="Tolya Films"
              className="h-10 w-auto object-contain opacity-50 hover:opacity-80 transition-opacity duration-300"
            />
          </Link>
          <p className="text-brand-dark/40 text-xs tracking-widest uppercase text-center">
            © {new Date().getFullYear()} Tolya Films · Mannheim
          </p>
          <div className="flex items-center gap-4">
            {[
              { href: SOCIAL_LINKS.instagram, label: 'Instagram', icon: <Instagram size={16} /> },
              { href: SOCIAL_LINKS.facebook, label: 'Facebook', icon: <Facebook size={16} /> },
              { href: SOCIAL_LINKS.youtube, label: 'YouTube', icon: <Youtube size={16} /> },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-full border border-black/15 flex items-center justify-center text-brand-dark/40 hover:text-brand-dark hover:border-brand-dark/50 transition-all duration-300"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default KerstinFreddy;
