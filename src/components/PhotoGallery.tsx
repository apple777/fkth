'use client';

import { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface Photo {
  url: string;
  thumbnail?: string;
  title?: string;
  description?: string;
  year?: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
  title?: string;
  columns?: number;
}

export default function PhotoGallery({ 
  photos, 
  title,
  columns = 3 
}: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    // Load Fancybox dynamically
    if (typeof window !== 'undefined' && isLightboxOpen) {
      import('@fancyapps/ui').then(({ Fancybox }) => {
        Fancybox.bind('[data-fancybox="gallery"]', {
          Toolbar: {
            display: {
              left: ['infobar'],
              middle: [],
              right: ['close']
            }
          },
          Thumbs: {
            type: 'classic'
          }
        });
      });
    }
  }, [isLightboxOpen]);

  const openLightbox = (index: number) => {
    setSelectedPhoto(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
    setIsLightboxOpen(false);
  };

  const goToNext = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto((selectedPhoto + 1) % photos.length);
    }
  };

  const goToPrev = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto((selectedPhoto - 1 + photos.length) % photos.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, selectedPhoto]);

  if (photos.length === 0) {
    return (
      <div className="empty-gallery">
        <p>No photos available</p>
      </div>
    );
  }

  return (
    <div className="photo-gallery">
      {title && <h2 className="gallery-title">{title}</h2>}
      
      <div 
        className="gallery-grid"
        style={{ 
          gridTemplateColumns: `repeat(auto-fill, minmax(${300 / columns}px, 1fr))` 
        }}
      >
        {photos.map((photo, index) => (
          <div 
            key={index} 
            className="gallery-item"
            onClick={() => openLightbox(index)}
          >
            <a 
              href={photo.url}
              data-fancybox="gallery"
              data-caption={`${photo.title || ''} ${photo.year ? `(${photo.year})` : ''}`}
            >
              <LazyLoadImage
                src={photo.thumbnail || photo.url}
                alt={photo.title || `Photo ${index + 1}`}
                effect="blur"
                className="gallery-image"
                wrapperClassName="image-wrapper"
              />
              {(photo.title || photo.year) && (
                <div className="photo-caption">
                  {photo.title && <span className="photo-title">{photo.title}</span>}
                  {photo.year && <span className="photo-year">{photo.year}</span>}
                </div>
              )}
            </a>
          </div>
        ))}
      </div>

      {isLightboxOpen && selectedPhoto !== null && (
        <div className="custom-lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>✕</button>
          
          <button 
            className="lightbox-nav prev" 
            onClick={(e) => { e.stopPropagation(); goToPrev(); }}
          >
            ‹
          </button>

          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={photos[selectedPhoto].url} 
              alt={photos[selectedPhoto].title || `Photo ${selectedPhoto + 1}`}
              className="lightbox-image"
            />
            {(photos[selectedPhoto].title || photos[selectedPhoto].description) && (
              <div className="lightbox-info">
                {photos[selectedPhoto].title && (
                  <h3>{photos[selectedPhoto].title}</h3>
                )}
                {photos[selectedPhoto].year && (
                  <p className="photo-year-large">{photos[selectedPhoto].year}</p>
                )}
                {photos[selectedPhoto].description && (
                  <p>{photos[selectedPhoto].description}</p>
                )}
              </div>
            )}
          </div>

          <button 
            className="lightbox-nav next" 
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
          >
            ›
          </button>

          <div className="lightbox-counter">
            {selectedPhoto + 1} / {photos.length}
          </div>
        </div>
      )}

      <style jsx>{`
        .photo-gallery {
          width: 100%;
          padding: 2rem 0;
        }
        .gallery-title {
          font-size: 2rem;
          margin-bottom: 2rem;
          text-align: center;
        }
        .gallery-grid {
          display: grid;
          gap: 1rem;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        }
        .gallery-item {
          position: relative;
          overflow: hidden;
          border-radius: 8px;
          cursor: pointer;
          background: #f0f0f0;
          aspect-ratio: 4/3;
        }
        :global(.gallery-item .image-wrapper) {
          width: 100%;
          height: 100%;
        }
        :global(.gallery-image) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .gallery-item:hover :global(.gallery-image) {
          transform: scale(1.05);
        }
        .photo-caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0,0,0,0.8));
          color: white;
          padding: 2rem 1rem 1rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .gallery-item:hover .photo-caption {
          opacity: 1;
        }
        .photo-title {
          font-weight: 600;
        }
        .photo-year {
          font-size: 0.9rem;
          opacity: 0.9;
        }
        .custom-lightbox {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          padding: 2rem;
        }
        .lightbox-close {
          position: absolute;
          top: 2rem;
          right: 2rem;
          background: rgba(255,255,255,0.2);
          color: white;
          border: none;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          font-size: 2rem;
          cursor: pointer;
          z-index: 10002;
          transition: background 0.3s;
        }
        .lightbox-close:hover {
          background: rgba(255,255,255,0.3);
        }
        .lightbox-nav {
          position: absolute;
          background: rgba(255,255,255,0.2);
          color: white;
          border: none;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          font-size: 3rem;
          cursor: pointer;
          z-index: 10001;
          transition: background 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .lightbox-nav:hover {
          background: rgba(255,255,255,0.3);
        }
        .lightbox-nav.prev {
          left: 2rem;
        }
        .lightbox-nav.next {
          right: 2rem;
        }
        .lightbox-content {
          max-width: 90%;
          max-height: 90%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .lightbox-image {
          max-width: 100%;
          max-height: 70vh;
          object-fit: contain;
          border-radius: 4px;
        }
        .lightbox-info {
          background: rgba(0,0,0,0.8);
          color: white;
          padding: 1.5rem;
          margin-top: 1rem;
          border-radius: 4px;
          max-width: 600px;
        }
        .lightbox-info h3 {
          margin: 0 0 0.5rem 0;
          font-size: 1.5rem;
        }
        .photo-year-large {
          color: #ccc;
          font-size: 1rem;
          margin: 0.5rem 0;
        }
        .lightbox-info p {
          margin: 0.5rem 0 0;
        }
        .lightbox-counter {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255,255,255,0.2);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 1rem;
        }
        .empty-gallery {
          text-align: center;
          padding: 4rem 2rem;
          color: #666;
        }

        @media (max-width: 768px) {
          .gallery-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 0.5rem;
          }
          .lightbox-nav {
            width: 40px;
            height: 40px;
            font-size: 2rem;
          }
          .lightbox-nav.prev {
            left: 0.5rem;
          }
          .lightbox-nav.next {
            right: 0.5rem;
          }
          .lightbox-close {
            top: 1rem;
            right: 1rem;
            width: 40px;
            height: 40px;
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}

