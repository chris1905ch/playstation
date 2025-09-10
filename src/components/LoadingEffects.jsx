import React from 'react';
import './LoadingEffects.css';

const LoadingSpinner = ({ size = 'medium', color = 'blue' }) => {
  return (
    <div className={`loading-spinner ${size} ${color}`}>
      <div className="spinner-ring"></div>
      <div className="spinner-ring"></div>
      <div className="spinner-ring"></div>
    </div>
  );
};

const LoadingDots = () => {
  return (
    <div className="loading-dots">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );
};

const LoadingWave = () => {
  return (
    <div className="loading-wave">
      <div className="wave-bar"></div>
      <div className="wave-bar"></div>
      <div className="wave-bar"></div>
      <div className="wave-bar"></div>
      <div className="wave-bar"></div>
    </div>
  );
};

const LoadingPulse = ({ text = "Cargando..." }) => {
  return (
    <div className="loading-pulse">
      <div className="pulse-circle"></div>
      <div className="pulse-text">{text}</div>
    </div>
  );
};

const ProgressBar = ({ progress = 0, animated = true, showPercentage = true }) => {
  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div 
          className={`progress-fill ${animated ? 'animated' : ''}`}
          style={{ width: `${progress}%` }}
        >
          <div className="progress-glow"></div>
        </div>
      </div>
      {showPercentage && (
        <div className="progress-text">{Math.round(progress)}%</div>
      )}
    </div>
  );
};

const SkeletonLoader = ({ width = '100%', height = '20px', borderRadius = '4px' }) => {
  return (
    <div 
      className="skeleton-loader"
      style={{ 
        width, 
        height, 
        borderRadius 
      }}
    >
      <div className="skeleton-shimmer"></div>
    </div>
  );
};

const CardSkeleton = () => {
  return (
    <div className="card-skeleton">
      <SkeletonLoader height="200px" borderRadius="12px" />
      <div className="skeleton-content">
        <SkeletonLoader height="24px" width="80%" />
        <SkeletonLoader height="16px" width="60%" />
        <SkeletonLoader height="16px" width="40%" />
      </div>
    </div>
  );
};

export {
  LoadingSpinner,
  LoadingDots,
  LoadingWave,
  LoadingPulse,
  ProgressBar,
  SkeletonLoader,
  CardSkeleton
};
