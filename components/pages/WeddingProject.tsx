import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Quote, ArrowRight, Play, Film, X, Maximize2, Camera } from 'lucide-react';
import { ASSETS, SOCIAL_LINKS, WEDDING_PORTFOLIO_ITEMS } from '../../types';
import { useLanguage } from '../../src/context/LanguageContext';

const WeddingProject: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeVideoType, setActiveVideoType] = useState<'trailer' | 'full'>('trailer');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

  const handleVideoTypeChange = (type: 'trailer' | 'full') => {
    setActiveVideoType(type);
  };

  return (
    <div className="min-h-screen bg-brand-light text-brand-dark flex flex-col justify-between selection:bg-brand-dark selection:text-brand-light">
      <div>
        {/* ── DESKTOP SPLIT & MOBILE STACKED MAIN CONTAINER ── */}
        <section className="pt-28 md:pt-32 pb-12">
          <div className="container mx-auto px-6 md:px-12">
            {/* Top Back Link */}
            <div className="mb-6">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-brand-dark/50 hover:text-brand-dark transition-colors duration-300 text-xs uppercase tracking-[0.25em] group"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
                {t.weddingProject.backToPortfolio}
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
                    src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&playsinline=1&enablejsapi=1&rel=0&modestbranding=1`}
                    title={`${project.title} - Wedding Film`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-none"
                  />
                </motion.div>

                {/* Video Version Toggle Button (If Full Film Exists) */}
                {project.fullVideoId && (
                  <div className="flex items-center justify-between bg-white/80 backdrop-blur-md p-1.5 rounded-sm border border-black/10 shadow-sm">
                    <button
                      type="button"
                      onClick={() => handleVideoTypeChange('trailer')}
                      className={`flex-1 py-2 px-3 text-[11px] md:text-xs font-semibold uppercase tracking-[0.2em] transition-all rounded-xs flex items-center justify-center gap-1.5 ${
                        activeVideoType === 'trailer'
                          ? 'bg-brand-dark text-white shadow-sm'
                          : 'text-brand-dark/60 hover:text-brand-dark hover:bg-black/5'
                      }`}
                    >
                      <Film size={13} />
                      {t.weddingProject.trailerBtn}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleVideoTypeChange('full')}
                      className={`flex-1 py-2 px-3 text-[11px] md:text-xs font-semibold uppercase tracking-[0.2em] transition-all rounded-xs flex items-center justify-center gap-1.5 ${
                        activeVideoType === 'full'
                          ? 'bg-brand-dark text-white shadow-sm'
                          : 'text-brand-dark/60 hover:text-brand-dark hover:bg-black/5'
                      }`}
                    >
                      <Play size={13} fill="currentColor" />
                      {t.weddingProject.fullFilmBtn}
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
                    {t.weddingProject.filmType}
                  </p>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-[0.05em] uppercase text-brand-dark leading-tight">
                    {project.title}
                  </h1>
                </div>

                {/* Location Info */}
                {project.location && (
                  <div className="pt-4 border-t border-black/10">
                    <p className="text-xs uppercase tracking-[0.3em] text-brand-gold font-medium mb-1">
                      {t.weddingProject.locationLabel}
                    </p>
                    <h2 className="text-base lg:text-lg font-display font-bold text-brand-dark uppercase tracking-wider">
                      {project.location.name}
                    </h2>
                    <p className="text-xs uppercase tracking-[0.2em] text-brand-dark/60 font-light">
                      {project.location.city}
                    </p>
                  </div>
                )}

                {/* Kind Words Quote */}
                {project.quote && (
                  <div className="pt-4 border-t border-black/10 relative">
                    <p className="text-xs uppercase tracking-[0.3em] text-brand-gold font-medium mb-2 flex items-center gap-1.5">
                      <Quote size={14} className="text-brand-gold/60" /> {t.weddingProject.kindWordsLabel}
                    </p>
                    <blockquote className="font-display text-base lg:text-lg italic font-light text-brand-dark leading-relaxed">
                      "{project.quote}"
                    </blockquote>
                  </div>
                )}

                {/* Next Story Quick Link */}
                <div className="pt-4 border-t border-black/10 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.25em] text-brand-dark/40 font-medium">
                    {t.weddingProject.nextProject}
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

        {/* ── CINEMATIC FILM STILLS GALLERY (IF PRESENT) ── */}
        {project.stills && project.stills.length > 0 && (
          <section className="py-16 bg-white border-t border-black/5">
            <div className="container mx-auto px-6 md:px-12">
              <div className="text-center mb-10">
                <p className="text-brand-gold text-xs uppercase tracking-[0.35em] mb-2 font-medium flex items-center justify-center gap-2">
                  <Camera size={14} />
                  <span>Stills aus dem Film</span>
                </p>
                <h3 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-wider text-brand-dark">
                  Cinematic Moments
                </h3>
              </div>

              {/* 35mm Filmstrip / Grid Display */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {project.stills.map((stillUrl, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    onClick={() => setSelectedImage(stillUrl)}
                    className="group relative aspect-video bg-black rounded-xs overflow-hidden shadow-lg border border-black/10 cursor-pointer"
                  >
                    <img
                      src={stillUrl}
                      alt={`${project.title} - Film Still ${index + 1}`}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 brightness-95 group-hover:brightness-105"
                    />
                    {/* Dark gradient & zoom icon on hover */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/40 shadow-xl transform scale-75 group-hover:scale-100 transition-all duration-300">
                        <Maximize2 size={18} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* ── LIGHTBOX MODAL ── */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 cursor-zoom-out"
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors bg-white/10 p-3 rounded-full backdrop-blur-md z-10"
              aria-label="Close image lightbox"
            >
              <X size={24} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage}
              alt="Cinematic Film Still"
              className="max-w-full max-h-[90vh] object-contain rounded-xs shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

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
