'use client';

import { useEffect, useRef, useState } from 'react';

interface Hotspot {
  title: string;
  imageUrl: string;
  position: { x: number; y: number }; // Position on the panorama (0-1 range)
}

interface VRViewerProps {
  panoramaUrl: string;
  title: string;
  hotspots?: Hotspot[];
  autoRotate?: boolean;
}

export default function VRViewer({ 
  panoramaUrl, 
  title, 
  hotspots = [],
  autoRotate = false
}: VRViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  useEffect(() => {
    // Simple auto-rotate effect
    if (autoRotate && !isDragging) {
      const interval = setInterval(() => {
        setRotation(prev => (prev + 0.1) % 360);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [autoRotate, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const deltaX = e.clientX - startX;
      setRotation(prev => (prev + deltaX * 0.5) % 360);
      setStartX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setError('Failed to load VR panorama');
  };

  return (
    <div className="vr-viewer" ref={containerRef}>
      <div className="vr-header">
        <h2>{title}</h2>
        <div className="vr-controls">
          <button 
            onClick={() => setRotation(0)}
            className="control-btn"
            title="Reset view"
          >
            🔄 Reset
          </button>
        </div>
      </div>

      <div 
        className="vr-panorama-container"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {isLoading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
            <p>Loading VR panorama...</p>
          </div>
        )}

        {error && (
          <div className="error-overlay">
            <p>❌ {error}</p>
          </div>
        )}

        <div 
          className="panorama"
          style={{
            backgroundImage: `url(${panoramaUrl})`,
            backgroundPositionX: `${rotation}px`,
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
        >
          <img 
            src={panoramaUrl} 
            alt={title}
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ display: 'none' }}
          />

          {hotspots.map((hotspot, idx) => (
            <button
              key={idx}
              className="hotspot-marker"
              style={{
                left: `${hotspot.position.x * 100}%`,
                top: `${hotspot.position.y * 100}%`
              }}
              onClick={() => setSelectedHotspot(hotspot)}
              title={hotspot.title}
            >
              <span className="hotspot-pulse"></span>
              ℹ️
            </button>
          ))}
        </div>

        {selectedHotspot && (
          <div className="hotspot-modal">
            <div className="modal-content">
              <button 
                className="close-btn"
                onClick={() => setSelectedHotspot(null)}
              >
                ✕
              </button>
              <h3>{selectedHotspot.title}</h3>
              <img 
                src={selectedHotspot.imageUrl} 
                alt={selectedHotspot.title}
                className="hotspot-image"
              />
            </div>
            <div 
              className="modal-backdrop"
              onClick={() => setSelectedHotspot(null)}
            />
          </div>
        )}
      </div>

      <div className="vr-instructions">
        <p>🖱️ Click and drag to rotate • 📱 Swipe on touch devices</p>
      </div>

      <style jsx>{`
        .vr-viewer {
          width: 100%;
          margin: 2rem 0;
        }
        .vr-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        .vr-header h2 {
          margin: 0;
          font-size: 1.5rem;
        }
        .vr-controls {
          display: flex;
          gap: 0.5rem;
        }
        .control-btn {
          padding: 0.5rem 1rem;
          background: #666;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.9rem;
        }
        .control-btn:hover {
          background: #444;
        }
        .vr-panorama-container {
          position: relative;
          width: 100%;
          height: 500px;
          background: #000;
          border-radius: 8px;
          overflow: hidden;
          user-select: none;
        }
        .panorama {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-repeat: repeat-x;
          background-position: center;
          position: relative;
          transition: background-position-x 0.1s linear;
        }
        .loading-overlay, .error-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.8);
          color: white;
          z-index: 10;
        }
        .spinner {
          width: 50px;
          height: 50px;
          border: 4px solid #333;
          border-top-color: #0070f3;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .hotspot-marker {
          position: absolute;
          transform: translate(-50%, -50%);
          width: 40px;
          height: 40px;
          background: rgba(0, 112, 243, 0.9);
          border: 2px solid white;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s;
          z-index: 5;
        }
        .hotspot-marker:hover {
          transform: translate(-50%, -50%) scale(1.2);
        }
        .hotspot-pulse {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 2px solid rgba(0, 112, 243, 0.6);
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .hotspot-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal-backdrop {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.7);
        }
        .modal-content {
          position: relative;
          background: white;
          padding: 2rem;
          border-radius: 8px;
          max-width: 600px;
          max-height: 80vh;
          overflow: auto;
          z-index: 1001;
        }
        .close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: #e00;
          color: white;
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .close-btn:hover {
          background: #c00;
        }
        .modal-content h3 {
          margin-top: 0;
          margin-bottom: 1rem;
        }
        .hotspot-image {
          width: 100%;
          border-radius: 4px;
        }
        .vr-instructions {
          text-align: center;
          margin-top: 1rem;
          color: #666;
        }
        .vr-instructions p {
          margin: 0;
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .vr-panorama-container {
            height: 300px;
          }
          .modal-content {
            margin: 1rem;
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}

