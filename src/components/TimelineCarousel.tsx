'use client';

import { useState, useRef, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import type { CarouselItem } from '@/lib/schemas/content';

interface TimelineCarouselProps {
  items: CarouselItem[];
  locale: 'he' | 'en';
}

export default function TimelineCarousel({ items, locale }: TimelineCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentItem = items[currentIndex];

  const t = (he: string, en: string) => locale === 'he' ? he : en;

  useEffect(() => {
    // Pause audio when changing items
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  }, [currentIndex]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (!currentItem) {
    return <div>{t('לא נמצאו פריטים', 'No items found')}</div>;
  }

  return (
    <div className="timeline-carousel">
      <div className="carousel-header">
        <h2>{currentItem.title_default[locale]}</h2>
        <span className="years-badge">{currentItem.years_range}</span>
      </div>

      <div className="carousel-main">
        <button 
          className="nav-btn prev" 
          onClick={goToPrev}
          aria-label={t('קודם', 'Previous')}
        >
          ‹
        </button>

        <div className="carousel-content">
          <div className="image-container">
            <LazyLoadImage
              src={currentItem.image_assets.url_large}
              alt={currentItem.image_assets.alt_text.en}
              effect="blur"
              className="main-image"
            />
          </div>

          {currentItem.media_assets.voiceover_url && (
            <div className="audio-controls">
              <button onClick={toggleAudio} className="audio-btn">
                {isPlaying ? '⏸️ Pause' : '▶️ Play Audio'}
              </button>
              <audio ref={audioRef} src={currentItem.media_assets.voiceover_url} />
            </div>
          )}

          {currentItem.media_assets.video_url && (
            <div className="video-container">
              <video controls src={currentItem.media_assets.video_url} />
            </div>
          )}
        </div>

        <button 
          className="nav-btn next" 
          onClick={goToNext}
          aria-label={t('הבא', 'Next')}
        >
          ›
        </button>
      </div>

      <div className="carousel-footer">
        <div className="progress-dots">
          {items.map((_, idx) => (
            <button
              key={idx}
              className={`dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`${t('עבור לפריט', 'Go to item')} ${idx + 1}`}
            />
          ))}
        </div>
        <p className="item-counter">
          {currentIndex + 1} / {items.length}
        </p>
      </div>

      {currentItem.related_photos_array.length > 0 && (
        <div className="related-photos">
          <h3>{t('תמונות קשורות', 'Related Photos')}</h3>
          <div className="photos-grid">
            {currentItem.related_photos_array.map((url, idx) => (
              <LazyLoadImage
                key={idx}
                src={url}
                alt={`${t('תמונה קשורה', 'Related photo')} ${idx + 1}`}
                effect="blur"
                className="related-photo"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

