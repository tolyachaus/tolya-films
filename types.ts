import React from 'react';

export interface PortfolioItem {
  id: string;
  title: string;
  videoId: string; // YouTube ID
  thumbnail?: string;
  aspectRatio?: string; // e.g. 'aspect-[21/9]'
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
  showreel: '/schowreel_2025_HDV1.mp4',
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

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  { id: '7', title: 'RIKE & JONATHAN', videoId: 'mnHxcdehFlo', aspectRatio: 'aspect-video', thumbnail: rikeJonathanCover },
  { id: '6', title: 'GEMMA & TIMO', videoId: 'YdLQ3CAjlpQ', aspectRatio: 'aspect-video', thumbnail: gemmaTimoCover },
  { id: '1', title: 'Cinematic Portrait', videoId: 'ln-P6GUBLPo', thumbnail: cinematicPortraitCover },
  { id: '2', title: 'Event Highlight', videoId: 'dVGzZKFKxN0', thumbnail: eventHighlightCover },
  { id: '3', title: 'Music Video', videoId: 'jMFLPuGl71I', thumbnail: musicVideoCover },
  { id: '4', title: 'Commercial', videoId: 'SskIWKbsVss', thumbnail: commercialCover },
  { id: '5', title: 'Documentary', videoId: 'zyquMe78knA', thumbnail: documentaryCover },
];