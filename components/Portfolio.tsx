import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { PORTFOLIO_ITEMS } from '../types';
import VideoModal from './VideoModal';

const Portfolio: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-brand-light relative z-10">
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
          {PORTFOLIO_ITEMS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-video bg-brand-gray cursor-pointer overflow-hidden rounded-sm"
              onClick={() => setSelectedVideo(item.videoId)}
            >
              {/* Thumbnail */}
              <img
                src={`https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-all duration-500 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center bg-white/30 backdrop-blur-md transform scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 shadow-xl">
                  <Play fill="white" className="text-white ml-1 drop-shadow-md" size={32} />
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