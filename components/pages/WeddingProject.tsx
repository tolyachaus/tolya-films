import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Quote, Instagram, Facebook, Youtube } from 'lucide-react';
import { ASSETS, SOCIAL_LINKS, WEDDING_PORTFOLIO_ITEMS } from '../../types';

const WeddingProject: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const project = WEDDING_PORTFOLIO_ITEMS.find((item) => item.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-brand-light flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-display text-4xl font-bold uppercase text-brand-dark mb-4">Project Not Found</h1>
        <Link to="/" className="text-sm font-medium uppercase tracking-widest text-brand-gold hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  // Find next project for bottom navigation
  const currentIndex = WEDDING_PORTFOLIO_ITEMS.findIndex((item) => item.slug === slug);
  const nextProject = WEDDING_PORTFOLIO_ITEMS[(currentIndex + 1) % WEDDING_PORTFOLIO_ITEMS.length];

  return (
    <div className="min-h-screen bg-brand-light text-brand-dark flex flex-col justify-between selection:bg-brand-dark selection:text-brand-light">
      <div>
        {/* ── 1. HERO HEADER ── */}
        <section className="relative pt-28 md:pt-36 pb-10 md:pb-14 bg-brand-light border-b border-black/[0.04]">
          <div className="container mx-auto px-6 md:px-12 max-w-5xl">
            {/* Back Button */}
            <div className="mb-6">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-brand-dark/50 hover:text-brand-dark transition-colors duration-300 text-xs uppercase tracking-[0.25em] group"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
                Portfolio
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-brand-gold text-xs uppercase tracking-[0.35em] mb-3 font-medium">
                Wedding Film
              </p>
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-display font-bold tracking-[0.06em] uppercase text-brand-dark mb-4 leading-none">
                {project.title}
              </h1>
              {project.location && (
                <div className="flex items-center gap-2 text-brand-dark/60 text-xs md:text-sm tracking-[0.2em] uppercase font-light">
                  <MapPin size={14} className="text-brand-gold" />
                  <span>{project.location.name} · {project.location.city}</span>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* ── 2. FILM PLAYER (PRIMARY FOCUS) ── */}
        <section className="py-12 md:py-20 bg-brand-light">
          <div className="container mx-auto px-6 md:px-12 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-video w-full rounded-sm overflow-hidden shadow-2xl bg-black border border-black/10"
            >
              <iframe
                src={`https://www.youtube.com/embed/${project.videoId}?autoplay=1&rel=0&modestbranding=1`}
                title={`${project.title} - Wedding Film`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-none"
              />
            </motion.div>
          </div>
        </section>

        {/* ── 3. LOCATION SECTION ── */}
        {project.location && (
          <section className="py-20 md:py-28 bg-white border-t border-b border-black/[0.05]">
            <div className="container mx-auto px-6 md:px-12 max-w-3xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <p className="text-brand-gold text-xs uppercase tracking-[0.35em] mb-3 font-medium">
                  Location
                </p>
                <h2 className="text-2xl md:text-4xl font-display font-bold text-brand-dark mb-2 tracking-wide uppercase">
                  {project.location.name}
                </h2>
                <p className="text-xs uppercase tracking-[0.25em] text-brand-gold mb-6 font-medium">
                  {project.location.city}
                </p>
                <div className="h-[1px] w-12 bg-brand-gold/50 mx-auto mb-6" />
                {project.location.description && (
                  <p className="text-brand-dark/75 text-base md:text-lg font-light leading-relaxed tracking-wide max-w-2xl mx-auto">
                    {project.location.description}
                  </p>
                )}
              </motion.div>
            </div>
          </section>
        )}

        {/* ── 4. KIND WORDS SECTION ── */}
        {project.quote && (
          <section className="py-20 md:py-28 bg-brand-light">
            <div className="container mx-auto px-6 md:px-12 max-w-3xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <Quote className="mx-auto text-brand-gold/30 mb-5" size={44} strokeWidth={1} />
                <p className="text-brand-gold text-xs uppercase tracking-[0.35em] mb-6 font-medium">
                  Kind Words
                </p>
                <blockquote className="font-display text-xl md:text-3xl font-light italic text-brand-dark leading-relaxed tracking-wide">
                  "{project.quote}"
                </blockquote>
              </motion.div>
            </div>
          </section>
        )}

        {/* ── 5. NEXT PROJECT NAVIGATION ── */}
        <section className="py-16 bg-white border-t border-black/[0.06]">
          <div className="container mx-auto px-6 md:px-12 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-dark/40 mb-2 font-medium">
              Next Story
            </p>
            <Link
              to={`/wedding/${nextProject.slug}`}
              className="font-display text-2xl md:text-4xl font-bold uppercase tracking-wider text-brand-dark hover:text-brand-gold transition-colors duration-300"
            >
              {nextProject.title} →
            </Link>
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

export default WeddingProject;
