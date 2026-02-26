import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { PORTFOLIO_ITEMS } from '../types';
import VideoModal from './VideoModal';

const Portfolio: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-brand-dark relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-widest mb-4">
            Portfolio
          </h2>
          <div className="h-1 w-24 bg-white mx-auto"></div>
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
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full border border-white/50 flex items-center justify-center bg-white/10 backdrop-blur-sm transform scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500">
                    <Play fill="white" className="text-white ml-1" size={24} />
                </div>
                <h3 className="absolute bottom-6 left-6 text-xl font-bold tracking-wider opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    {item.title}
                </h3>
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