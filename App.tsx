import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Documentary from './components/pages/Documentary';

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/documentary" element={<Documentary />} />
      </Routes>
    </HashRouter>
  );
}

export default App;