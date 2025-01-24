import React from 'react';

const Header = () => (
  <header className="p-4 bg-black/50 border-b border-blue-400/20">
    <div className="max-w-4xl mx-auto flex items-center justify-between">
      <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
        Tech Titans
      </h1>
      <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400 hover:text-cyan-400 transition-colors">
        Made on ZAPT
      </a>
    </div>
  </header>
);

export default Header;