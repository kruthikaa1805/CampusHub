import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative bg-blue text-gray-900 overflow-hidden">
  
      <div 
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      ></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-32 text-center">
       
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
          Every club. <br className="hidden md:block"/> Every event. <span className="text-blue-600 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">One pulse.</span>
        </h1>
        <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          The central nervous system for your college experience. Discover technical societies, cultural events, and everything happening right now.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/events" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors shadow-sm">
            Explore Events
          </Link>
          <Link to="/clubs" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors shadow-sm">
            
            Browse Clubs
          </Link>
        </div>
      </div>

    </div>
  );
};

export default Hero;