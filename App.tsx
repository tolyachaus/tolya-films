import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Documentary from './components/pages/Documentary';
import WeddingProject from './components/pages/WeddingProject';
import MediaRelease from './components/pages/MediaRelease';
import CookieBanner from './components/CookieBanner';
import { trackPageView } from './src/config/analytics';
import { LanguageProvider } from './src/context/LanguageContext';

const RouteTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
};

function App() {
  return (
    <LanguageProvider>
      <HashRouter>
        {/* Full-Website Cinematic 35mm Film Grain Overlay */}
        <div id="cinematic-grain-overlay" aria-hidden="true" />
        <RouteTracker />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/documentary" element={<Documentary />} />
          <Route path="/wedding/:slug" element={<WeddingProject />} />
          <Route path="/release" element={<MediaRelease />} />
          <Route path="/release/en" element={<MediaRelease />} />
          <Route path="/release-en" element={<MediaRelease />} />
          <Route path="/media-release" element={<MediaRelease />} />
          <Route path="/media-release-en" element={<MediaRelease />} />
        </Routes>
        <CookieBanner />
      </HashRouter>
    </LanguageProvider>
  );
}

export default App;