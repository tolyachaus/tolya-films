import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Film, Tv, Clapperboard, Music, Sparkles, Plane, MoreHorizontal } from 'lucide-react';
import { ASSETS, SOCIAL_LINKS } from '../../types';
import { Instagram, Facebook, Youtube } from 'lucide-react';

interface Category {
  id: string;
  title: string;
  titleDe: string;
  description: string;
  icon: React.ReactNode;
}

const categories: Category[] = [
  {
    id: 'documentary',
    title: 'Documentary',
    titleDe: 'Dokumentarfilm',
    description: 'Wahre Geschichten. Authentische Momente.',
    icon: <Film size={32} strokeWidth={1.2} />,
  },
  {
    id: 'commercial',
    title: 'Commercial',
    titleDe: 'Werbefilm',
    description: 'Marken, die man fühlen kann.',
    icon: <Tv size={32} strokeWidth={1.2} />,
  },
  {
    id: 'brand',
    title: 'Brand Film',
    titleDe: 'Markenfilm',
    description: 'Identität in Bewegung.',
    icon: <Clapperboard size={32} strokeWidth={1.2} />,
  },
  {
    id: 'music',
    title: 'Music Video',
    titleDe: 'Musikvideo',
    description: 'Klang trifft auf visuelles Erleben.',
    icon: <Music size={32} strokeWidth={1.2} />,
  },
  {
    id: 'fashion',
    title: 'Fashion',
    titleDe: 'Fashion-Projekt',
    description: 'Ästhetik als Aussage.',
    icon: <Sparkles size={32} strokeWidth={1.2} />,
  },
  {
    id: 'travel',
    title: 'Travel',
    titleDe: 'Reisefilm',
    description: 'Orte, die bleiben.',
    icon: <Plane size={32} strokeWidth={1.2} />,
  },
  {
    id: 'other',
    title: 'Other Works',
    titleDe: 'Weitere Werke',
    description: 'Cinematic storytelling ohne Grenzen.',
    icon: <MoreHorizontal size={32} strokeWidth={1.2} />,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const Documentary: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-brand-light text-brand-dark">

      {/* ── HERO ── */}
      <section className="relative h-[55vh] min-h-[380px] flex items-end pb-16 overflow-hidden border-b border-black/[0.04]">
        {/* Background texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#fafafa] to-[#f5f5f5]" />
        {/* Gold accent line top */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Back link */}
        <Link
          to="/"
          className="absolute top-6 left-6 md:left-12 flex items-center gap-2 text-brand-dark/40 hover:text-brand-dark/80 transition-colors duration-300 text-xs uppercase tracking-widest group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
          Zurück
        </Link>

        {/* Logo */}
        <Link to="/" className="absolute top-4 left-1/2 -translate-x-1/2">
          <img
            src={ASSETS.logoBlack}
            alt="Tolya Films"
            className="h-14 md:h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
          />
        </Link>

        {/* Hero content */}
        <div className="relative z-10 container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-brand-gold text-xs uppercase tracking-[0.35em] mb-4 font-medium">
              Tolya Films
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-[0.06em] uppercase leading-none mb-6">
              Documentary
              <br />
              <span className="text-brand-dark/40 text-3xl md:text-5xl lg:text-6xl">&amp; Commercial</span>
            </h1>
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-12 bg-brand-gold" />
              <p className="text-brand-dark/50 text-sm tracking-widest uppercase">
                A filmmaker's broader lens
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="py-20 md:py-28 bg-white border-b border-black/[0.06]">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <p className="text-brand-dark/70 text-lg md:text-xl font-light leading-relaxed tracking-wide">
              Neben Hochzeitsfilmen entstehen hier Arbeiten, die zeigen, wie ich als
              Filmemacher denke — dokumentarisch, werblich, künstlerisch.
              Jede Produktion ist eine eigene visuelle Sprache.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CATEGORY GRID ── */}
      <section className="py-24 md:py-36 bg-brand-light">
        <div className="container mx-auto px-6 md:px-12">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-xs uppercase tracking-[0.4em] text-brand-dark/40 mb-3">Kategorien</h2>
            <div className="h-[1px] w-8 bg-brand-gold" />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-black/[0.08]"
          >
            {categories.map((cat) => (
              <motion.div
                key={cat.id}
                variants={itemVariants}
                onMouseEnter={() => setHoveredId(cat.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative bg-white p-10 flex flex-col gap-8 cursor-default overflow-hidden group"
                style={{ minHeight: '260px' }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-brand-gold/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />

                {/* Top gold accent */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                {/* Icon */}
                <div className="text-brand-dark/30 group-hover:text-brand-gold transition-colors duration-500">
                  {cat.icon}
                </div>

                {/* Text */}
                <div className="mt-auto">
                  <p className="text-brand-dark/40 text-[10px] uppercase tracking-[0.3em] mb-2 transition-colors duration-300 group-hover:text-brand-gold/80">
                    {cat.titleDe}
                  </p>
                  <h3 className="text-brand-dark text-xl md:text-2xl font-display font-semibold uppercase tracking-widest mb-3 transition-colors duration-300">
                    {cat.title}
                  </h3>
                  <p className="text-brand-dark/60 text-sm font-light leading-relaxed group-hover:text-brand-dark/80 transition-colors duration-300">
                    {cat.description}
                  </p>
                </div>

                {/* Coming soon label */}
                <div className="absolute top-8 right-8">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-brand-dark/40 border border-black/10 px-2 py-1 group-hover:border-brand-gold/30 group-hover:text-brand-gold/60 transition-all duration-300">
                    Demnächst
                  </span>
                </div>
              </motion.div>
            ))}

            {/* Spacer tile for even grid */}
            {categories.length % 4 !== 0 && (
              <div className="hidden xl:block bg-white" />
            )}
          </motion.div>
        </div>
      </section>

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

export default Documentary;
