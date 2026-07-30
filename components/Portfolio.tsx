import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { WEDDING_PORTFOLIO_ITEMS } from '../types';
import VideoModal from './VideoModal';

const Portfolio: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleItemClick = (item: (typeof WEDDING_PORTFOLIO_ITEMS)[0]) => {
    if (item.slug) {
      navigate(`/wedding/${item.slug}`);
    } else {
      setSelectedVideo(item.videoId);
    }
  };

  return (
    <section id="portfolio" className="py-12 md:py-32 bg-brand-light relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-widest text-brand-dark mb-6">
            Portfolio
          </h2>
          <div className="h-1 w-24 bg-brand-gold mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WEDDING_PORTFOLIO_ITEMS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative ${item.aspectRatio || 'aspect-video'} bg-brand-gray cursor-pointer overflow-hidden rounded-sm ${index === 0 ? 'col-span-1 md:col-span-2 lg:col-span-3' : ''}`}
              onClick={() => handleItemClick(item)}
            >
              {/* Thumbnail */}
              <img
                src={item.thumbnail || `https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-all duration-500 flex flex-col justify-between p-6">
                <div className="flex justify-end">
                  <div className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center bg-white/20 backdrop-blur-md transform scale-90 group-hover:scale-100 transition-all duration-500 shadow-xl">
                    <Play fill="white" className="text-white ml-0.5" size={22} />
                  </div>
                </div>
                <div>
                  <p className="text-brand-gold text-[10px] uppercase tracking-[0.3em] font-medium mb-1">
                    Wedding Film
                  </p>
                  <h3 className="text-white font-display text-xl md:text-2xl font-bold uppercase tracking-wider">
                    {item.title}
                  </h3>
                  {item.location && (
                    <p className="text-white/70 text-xs tracking-widest uppercase font-light mt-0.5">
                      {item.location.name} · {item.location.city}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <VideoModal videoId={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </section>
  );
};

export default Portfolio;