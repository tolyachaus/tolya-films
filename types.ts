import React from 'react';

export interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  videoId: string; // YouTube ID (Trailer / Primary)
  fullVideoId?: string; // Optional Full Wedding Film Video ID
  thumbnail?: string;
  aspectRatio?: string; // e.g. 'aspect-[21/9]'
  location?: {
    name: string;
    city: string;
    description?: string;
  };
  quote?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
}

// Assuming assets might be HTTP, we will try to force HTTPS or handle errors gracefully in UI
export const ASSETS = {
  logoWhite: '/logo-white.png',
  logoBlack: '/logo-black.png',
  profilePhoto: '/profile.jpg',
  showreel: '/wedding_showreel_V3.mp4',
};

export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/tolya.films?igsh=czlzaTZyYmdtZGRr&utm_source=qr',
  facebook: 'https://www.facebook.com/people/Tolyafilms/61582845653575',
  youtube: 'https://www.youtube.com/channel/UCNp-b0u-fkjNH0QFdE49m6w',
  email: 'tolya.films@gmail.com',
  phone: '+49 160 9652965',
  whatsapp: 'https://wa.me/4916096562965'
};

import rikeJonathanCover from './src/assets/rike_jonathan_cover.avif';
import gemmaTimoCover from './src/assets/thumbnails/YdLQ3CAjlpQ.jpg';
import cinematicPortraitCover from './src/assets/thumbnails/ln-P6GUBLPo.jpg';
import eventHighlightCover from './src/assets/thumbnails/dVGzZKFKxN0.jpg';
import musicVideoCover from './src/assets/thumbnails/jMFLPuGl71I.jpg';
import commercialCover from './src/assets/thumbnails/SskIWKbsVss.jpg';
import documentaryCover from './src/assets/thumbnails/zyquMe78knA.jpg';

export const WEDDING_PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: '7',
    slug: 'rike-jonathan',
    title: 'RIKE & JONATHAN',
    videoId: 'mnHxcdehFlo',
    aspectRatio: 'aspect-video',
    thumbnail: rikeJonathanCover,
    location: {
      name: 'Hotel Jagdschloss Kranichstein',
      city: 'Darmstadt, Germany'
    },
    quote: 'Tolyaaaaaaa, we finally got to watch it!!!! Its soooooooooooooooooooooooooooooooooooooooo good!!!! Wow wow wow wow wow!!!! Thank you so much for your amazing work!!!! We are really really happy with how everything turned out!'
  },
  {
    id: '8',
    slug: 'kerstin-freddy',
    title: 'KERSTIN & FREDDY',
    videoId: 'tQn4lPc3vjQ', // Trailer
    fullVideoId: 'ln-P6GUBLPo', // Full Film
    aspectRatio: 'aspect-video',
    thumbnail: 'https://img.youtube.com/vi/tQn4lPc3vjQ/maxresdefault.jpg',
    location: {
      name: 'Morrhof',
      city: 'Großkarlbach, Rheinland-Pfalz, Germany'
    },
    quote: 'Tolya, you did a WONDERFUL job – we love it so much and we will watch it SO SO often!! Thank you so, so much for capturing our day in such a loving, detailed way! I really love all the sequences you chose and the final result is just amazing!!'
  },
  {
    id: '6',
    slug: 'gemma-timo',
    title: 'GEMMA & TIMO',
    videoId: 'YdLQ3CAjlpQ',
    aspectRatio: 'aspect-video',
    thumbnail: gemmaTimoCover,
    location: {
      name: 'Schriesheim',
      city: 'Stadt in Deutschland'
    }
  },
  {
    id: '2',
    slug: 'pascal-michal',
    title: 'PASCAL & MICHAL',
    videoId: 'dVGzZKFKxN0',
    aspectRatio: 'aspect-video',
    thumbnail: eventHighlightCover,
    location: {
      name: 'Ladenburg',
      city: 'Deutschland'
    },
    quote: 'Wooow, THANK YOU SO MUCH!! I watched it together with Pascal yesterday and now again on my own and I have to cry every single time I watch it so beautiful!!'
  },
];

export const DOCUMENTARY_PORTFOLIO_ITEMS: PortfolioItem[] = [
  { id: '3', title: 'Showreel 2025', videoId: 'jMFLPuGl71I', thumbnail: musicVideoCover },
  { id: '4', title: 'Bridge', videoId: 'SskIWKbsVss', thumbnail: commercialCover },
  { id: '5', title: 'Becoming Dr. Marvin Knapp', videoId: 'zyquMe78knA', thumbnail: documentaryCover },
];