import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Quote, Instagram, Facebook, Youtube, ArrowRight, Play, Film } from 'lucide-react';
import { ASSETS, SOCIAL_LINKS, WEDDING_PORTFOLIO_ITEMS } from '../../types';

const WeddingProject: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [activeVideoType, setActiveVideoType] = useState<'trailer' | 'full'>('trailer');

  const project = WEDDING_PORTFOLIO_ITEMS.find((item) => item.slug === slug);

  useEffect(() => {
    setActiveVideoType('trailer');
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

  // Find next project for navigation
  const currentIndex = WEDDING_PORTFOLIO_ITEMS.findIndex((item) => item.slug === slug);
  const nextProject = WEDDING_PORTFOLIO_ITEMS[(currentIndex + 1) % WEDDING_PORTFOLIO_ITEMS.length];

  const activeVideoId = activeVideoType === 'full' && project.fullVideoId ? project.fullVideoId : project.videoId;

  return (
    <div className="min-h-screen bg-brand-light text-brand-dark flex flex-col justify-between selection:bg-brand-dark selection:text-brand-light">
      <div>
        {/* ── DESKTOP SPLIT & MOBILE STACKED MAIN CONTAINER ── */}
        <section className="pt-28 md:pt-32 pb-16 min-h-[calc(100vh-80px)] flex items-center">
          <div className="container mx-auto px-6 md:px-12">
            {/* Top Back Link */}
            <div className="mb-6">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-brand-dark/50 hover:text-brand-dark transition-colors duration-300 text-xs uppercase tracking-[0.25em] group"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
                Portfolio
              </Link>
            </div>

            {/* Split Grid on Desktop (lg:), Stacked on Mobile */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* ── LEFT COLUMN: SINGLE VIDEO PLAYER (PRIMARY FOCUS) ── */}
              <div className="lg:col-span-7 flex flex-col space-y-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative aspect-video w-full rounded-sm overflow-hidden shadow-2xl bg-black border border-black/10"
                >
                  <iframe
                    key={activeVideoId}
                    src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0&modestbranding=1`}
                    title={`${project.title} - Wedding Film`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-none"
                  />
                </motion.div>

                {/* Video Version Toggle Button (If Full Film Exists) */}
                {project.fullVideoId && (
                  <div className="flex items-center justify-between bg-white/80 backdrop-blur-md p-1.5 rounded-sm border border-black/10 shadow-sm">
                    <button
                      type="button"
                      onClick={() => setActiveVideoType('trailer')}
                      className={`flex-1 py-2 px-3 text-[11px] md:text-xs font-semibold uppercase tracking-[0.2em] transition-all rounded-xs flex items-center justify-center gap-1.5 ${
                        activeVideoType === 'trailer'
                          ? 'bg-brand-dark text-white shadow-sm'
                          : 'text-brand-dark/60 hover:text-brand-dark hover:bg-black/5'
                      }`}
                    >
                      <Film size={13} />
                      Trailer
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveVideoType('full')}
                      className={`flex-1 py-2 px-3 text-[11px] md:text-xs font-semibold uppercase tracking-[0.2em] transition-all rounded-xs flex items-center justify-center gap-1.5 ${
                        activeVideoType === 'full'
                          ? 'bg-brand-dark text-white shadow-sm'
                          : 'text-brand-dark/60 hover:text-brand-dark hover:bg-black/5'
                      }`}
                    >
                      <Play size={13} fill="currentColor" />
                      Full Film
                    </button>
                  </div>
                )}
              </div>

              {/* ── RIGHT COLUMN: EDITORIAL CONTENT ── */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-5 flex flex-col justify-center space-y-6"
              >
                {/* Header Title */}
                <div>
                  <p className="text-brand-gold text-xs uppercase tracking-[0.35em] mb-2 font-medium">
                    Wedding Film
                  </p>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-bold tracking-[0.06em] uppercase text-brand-dark leading-none">
                    {project.title}
                  </h1>
                </div>

                {/* Location Info */}
                {project.location && (
                  <div className="pt-4 border-t border-black/10">
                    <p className="text-xs uppercase tracking-[0.3em] text-brand-gold font-medium mb-1">
                      Location
                    </p>
                    <h2 className="text-xl lg:text-2xl font-display font-bold text-brand-dark uppercase">
                      {project.location.name}
                    </h2>
                    <p className="text-xs uppercase tracking-[0.2em] text-brand-dark/60 font-light mb-3">
                      {project.location.city}
                    </p>
                    {project.location.description && (
                      <p className="text-brand-dark/75 text-sm leading-relaxed font-light">
                        {project.location.description}
                      </p>
                    )}
                  </div>
                )}

                {/* Kind Words Quote */}
                {project.quote && (
                  <div className="pt-4 border-t border-black/10 relative">
                    <p className="text-xs uppercase tracking-[0.3em] text-brand-gold font-medium mb-2 flex items-center gap-1.5">
                      <Quote size={14} className="text-brand-gold/60" /> Kind Words
                    </p>
                    <blockquote className="font-display text-base lg:text-lg italic font-light text-brand-dark leading-relaxed">
                      "{project.quote}"
                    </blockquote>
                  </div>
                )}

                {/* Next Story Quick Link */}
                <div className="pt-4 border-t border-black/10 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.25em] text-brand-dark/40 font-medium">
                    Next Story
                  </span>
                  <Link
                    to={`/wedding/${nextProject.slug}`}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-brand-dark hover:text-brand-gold transition-colors duration-300 group"
                  >
                    <span>{nextProject.title}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      {/* ── FOOTER ── */}
      <footer className="border-t border-black/[0.06] py-12 bg-white">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/">
            <img
              src={ASSETS.logoBlack}
              alt="Tolya Films"
              className="h-9 w-auto object-contain opacity-50 hover:opacity-80 transition-opacity duration-300"
            />
          </Link>
          <p className="text-brand-dark/40 text-xs tracking-widest uppercase text-center">
            © {new Date().getFullYear()} Tolya Films · Mannheim
          </p>
        </div>
      </footer>
    </div>
  );
};

export default WeddingProject;
