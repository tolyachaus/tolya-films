import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Instagram, Facebook, Youtube } from 'lucide-react';
import { ASSETS, SOCIAL_LINKS, DOCUMENTARY_PORTFOLIO_ITEMS } from '../../types';
import VideoModal from '../VideoModal';
import { useLanguage } from '../../src/context/LanguageContext';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const Documentary: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-brand-light text-brand-dark flex flex-col justify-between">
      <div>
        {/* ── HERO ── */}
        <section className="relative pt-28 md:pt-36 pb-12 md:pb-16 overflow-hidden border-b border-black/[0.04]">
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
                  {t.docPage.subtitle}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── INTRO ── */}
        <section className="py-16 md:py-20 bg-white border-b border-black/[0.06]">
          <div className="container mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="max-w-2xl"
            >
              <p className="text-brand-dark/70 text-lg md:text-xl font-light leading-relaxed tracking-wide">
                {t.docPage.intro}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── WORKS GRID ── */}
        <section className="py-20 md:py-28 bg-brand-light">
          <div className="container mx-auto px-6 md:px-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
            >
              {DOCUMENTARY_PORTFOLIO_ITEMS.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className="group relative cursor-pointer flex flex-col"
                  onClick={() => setSelectedVideo(item.videoId)}
                >
                  {/* Aspect ratio container */}
                  <div className="relative overflow-hidden bg-gray-150 shadow-md aspect-video mb-5 border border-black/[0.03]">
                    {/* Thumbnail */}
                    <img
                      src={item.thumbnail || `https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-500 flex flex-col items-center justify-center">
                      <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center bg-white/30 backdrop-blur-md transform scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 shadow-xl">
                        <Play fill="white" className="text-white ml-1 drop-shadow-md" size={32} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
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
            © {new Date().getFullYear()} Tolya Films · {t.footer.copyright}
          </p>
        </div>
      </footer>

      {/* Video Modal portal */}
      <VideoModal videoId={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </div>
  );
};

export default Documentary;
