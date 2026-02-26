import React from 'react';

export interface PortfolioItem {
  id: string;
  title: string;
  videoId: string; // YouTube ID
  thumbnail?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
}

// Assuming assets might be HTTP, we will try to force HTTPS or handle errors gracefully in UI
export const ASSETS = {
  logoWhite: 'https://tolyafilms.com/wp-content/uploads/2025/06/logo_tolya_films_white.png',
  logoBlack: 'https://tolyafilms.com/wp-content/uploads/2025/06/logo_tolya_films_black.png',
  profilePhoto: 'https://tolyafilms.com/wp-content/uploads/2025/10/DSC01515-3-scaled.jpg',
  showreel: 'https://tolyafilms.com/wp-content/uploads/2025/11/schowreel_2025_HDV1.mp4',
};

export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/tolya.films?igsh=czlzaTZyYmdtZGRr&utm_source=qr',
  facebook: 'https://www.facebook.com/people/Tolyafilms/61582845653575',
  youtube: 'https://www.youtube.com/channel/UCNp-b0u-fkjNH0QFdE49m6w',
  email: 'tolya.films@gmail.com'
};

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  { id: '1', title: 'Cinematic Portrait', videoId: 'ln-P6GUBLPo' },
  { id: '2', title: 'Event Highlight', videoId: 'dVGzZKFKxN0' },
  { id: '3', title: 'Music Video', videoId: 'jMFLPuGl71I' },
  { id: '4', title: 'Commercial', videoId: 'SskIWKbsVss' },
  { id: '5', title: 'Documentary', videoId: 'zyquMe78knA' },
];