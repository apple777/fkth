'use client';

import { useState, useCallback } from 'react';
import Map, { Marker, Popup, NavigationControl, FullscreenControl } from 'react-map-gl';
import type { MapPOI } from '@/lib/schemas/content';
import 'mapbox-gl/dist/mapbox-gl.css';

interface InteractiveMapProps {
  pois: MapPOI[];
  locale: 'he' | 'en';
  mapboxToken: string;
}

export default function InteractiveMap({ pois, locale, mapboxToken }: InteractiveMapProps) {
  const [viewState, setViewState] = useState({
    longitude: 35.2137,
    latitude: 31.7683,
    zoom: 13
  });
  const [selectedPoi, setSelectedPoi] = useState<MapPOI | null>(null);

  const t = (he: string, en: string) => locale === 'he' ? he : en;

  const onMarkerClick = useCallback((poi: MapPOI) => {
    setSelectedPoi(poi);
    setViewState({
      longitude: poi.coordinates[0],
      latitude: poi.coordinates[1],
      zoom: 15
    });
  }, []);

  return (
    <div className="interactive-map-container">
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapboxAccessToken={mapboxToken}
        style={{ width: '100%', height: '600px' }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        attributionControl={true}
      >
        <NavigationControl position="top-right" />
        <FullscreenControl position="top-right" />

        {pois.map((poi) => (
          <Marker
            key={poi.id}
            longitude={poi.coordinates[0]}
            latitude={poi.coordinates[1]}
            anchor="bottom"
            onClick={() => onMarkerClick(poi)}
          >
            <div className="custom-marker">
              <div className="marker-pin">📍</div>
            </div>
          </Marker>
        ))}

        {selectedPoi && (
          <Popup
            longitude={selectedPoi.coordinates[0]}
            latitude={selectedPoi.coordinates[1]}
            anchor="top"
            onClose={() => setSelectedPoi(null)}
            closeButton={true}
            closeOnClick={false}
          >
            <div className="poi-popup">
              <h3>{selectedPoi.stone_title[locale]}</h3>
              <p className="vr-title">
                <strong>VR:</strong> {selectedPoi.vr_title[locale]}
              </p>
              <div className="popup-actions">
                <a 
                  href={selectedPoi.vr_360_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="vr-btn"
                >
                  {t('צפה ב-VR 360°', 'View VR 360°')}
                </a>
                <a 
                  href={`/${locale}/map/${selectedPoi.id}`}
                  className="details-btn"
                >
                  {t('פרטים נוספים', 'More details')}
                </a>
              </div>
            </div>
          </Popup>
        )}
      </Map>

      <div className="poi-list">
        <h3>{t('נקודות עניין', 'Points of Interest')}</h3>
        <ul>
          {pois.map((poi) => (
            <li key={poi.id}>
              <button 
                onClick={() => onMarkerClick(poi)}
                className={selectedPoi?.id === poi.id ? 'active' : ''}
              >
                📍 {poi.stone_title[locale]}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

