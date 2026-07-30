import React from 'react';

export interface PortfolioItem {
  id: string;
  title: string;
  videoId: string; // YouTube ID
  thumbnail?: string;
  aspectRatio?: string; // e.g. 'aspect-[21/9]'
  slug?: string;
  hasDedicatedPage?: boolean;
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
  { id: '8', title: 'KERSTIN & FREDDY', videoId: 'mnHxcdehFlo', aspectRatio: 'aspect-video', thumbnail: rikeJonathanCover, slug: 'kerstin-freddy', hasDedicatedPage: true },
  { id: '7', title: 'RIKE & JONATHAN', videoId: 'mnHxcdehFlo', aspectRatio: 'aspect-video', thumbnail: rikeJonathanCover },
  { id: '6', title: 'GEMMA & TIMO', videoId: 'YdLQ3CAjlpQ', aspectRatio: 'aspect-video', thumbnail: gemmaTimoCover },
  { id: '1', title: 'Cinematic Portrait', videoId: 'ln-P6GUBLPo', thumbnail: cinematicPortraitCover },
  { id: '2', title: 'Event Highlight', videoId: 'dVGzZKFKxN0', thumbnail: eventHighlightCover },
];

export const DOCUMENTARY_PORTFOLIO_ITEMS: PortfolioItem[] = [
  { id: '3', title: 'Showreel 2025', videoId: 'jMFLPuGl71I', thumbnail: musicVideoCover },
  { id: '4', title: 'Bridge', videoId: 'SskIWKbsVss', thumbnail: commercialCover },
  { id: '5', title: 'Becoming Dr. Marvin Knapp', videoId: 'zyquMe78knA', thumbnail: documentaryCover },
];

export const KERSTIN_FREDDY_DATA = {
  title: 'KERSTIN & FREDDY',
  subtitle: 'A Wedding at Morrhof',
  coverImage: rikeJonathanCover,
  highlightVideoId: 'mnHxcdehFlo', // Trailer / Highlight Film
  fullFilmVideoId: 'YdLQ3CAjlpQ',    // Full Wedding Film
  location: {
    name: 'Morrhof',
    region: 'Großkarlbach, Rheinland-Pfalz, Germany',
    description: 'Der Morrhof gehört zu den exklusivsten Hochzeitslocations Deutschlands. Umgeben von Weinbergen im Herzen der Pfalz verbindet das historische Anwesen mediterrane Architektur, elegante Gärten und eine außergewöhnliche Atmosphäre – der perfekte Ort für luxuriöse und stilvolle Hochzeiten.'
  },
  quote: 'Tolya, you did a WONDERFUL job – we love it so much and we will watch it SO SO often!! Thank you so, so much for capturing our day in such a loving, detailed way! I really love all the sequences you chose and the final result is just amazing!!'
};