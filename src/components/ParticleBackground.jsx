import React from 'react';
import './ParticleBackground.css';

const ParticleBackground = () => {
  return (
    <div className="particle-background">
      <div className="particles-container">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              '--delay': `${Math.random() * 10}s`,
              '--duration': `${15 + Math.random() * 20}s`,
              '--size': `${2 + Math.random() * 6}px`,
              '--left': `${Math.random() * 100}%`,
              '--opacity': Math.random() * 0.8 + 0.2,
              '--color': `hsl(${200 + Math.random() * 60}, 70%, 60%)`
            }}
          />
        ))}
      </div>
      
      {/* Círculos flotantes grandes */}
      <div className="floating-circles">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
        <div className="circle circle-4"></div>
      </div>
      
      {/* Efectos de luz */}
      <div className="light-effects">
        <div className="light-beam light-beam-1"></div>
        <div className="light-beam light-beam-2"></div>
        <div className="light-beam light-beam-3"></div>
      </div>
      
      {/* Grid animado */}
      <div className="animated-grid">
        <div className="grid-line horizontal" style={{'--delay': '0s'}}></div>
        <div className="grid-line horizontal" style={{'--delay': '1s'}}></div>
        <div className="grid-line horizontal" style={{'--delay': '2s'}}></div>
        <div className="grid-line vertical" style={{'--delay': '0.5s'}}></div>
        <div className="grid-line vertical" style={{'--delay': '1.5s'}}></div>
      </div>
    </div>
  );
};

export default ParticleBackground;
