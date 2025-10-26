'use client';

import { useEffect, useState } from 'react';
import type { MapPOI } from '@/lib/schemas/content';

export default function MapManager() {
  const [pois, setPois] = useState<(MapPOI & { _id?: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPois();
  }, []);

  async function fetchPois() {
    try {
      const res = await fetch('/api/map');
      const json = await res.json();
      if (json.success) {
        setPois(json.data);
      } else {
        setError(json.error);
      }
    } catch (err) {
      setError('Failed to load map POIs');
    } finally {
      setLoading(false);
    }
  }

  async function deletePoi(id: string) {
    if (!confirm('Are you sure you want to delete this POI?')) return;
    
    try {
      const res = await fetch(`/api/map/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setPois(pois.filter(poi => poi.id !== id));
      } else {
        alert('Error: ' + json.error);
      }
    } catch (err) {
      alert('Failed to delete POI');
    }
  }

  if (loading) return <div>Loading map POIs...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="map-manager">
      <div className="header-actions">
        <h1>Map POIs Manager</h1>
        <a href="/admin/map/new" className="btn-primary">+ Add New POI</a>
      </div>

      {pois.length === 0 ? (
        <p>No map POIs found. Create one to get started!</p>
      ) : (
        <div className="pois-list">
          {pois.map((poi) => (
            <div key={poi.id} className="poi-card">
              <div className="poi-header">
                <h3>{poi.stone_title.en || poi.stone_title.he}</h3>
                <span className="coords">
                  📍 {poi.coordinates[1].toFixed(4)}, {poi.coordinates[0].toFixed(4)}
                </span>
              </div>
              <p className="poi-meta">ID: {poi.id}</p>
              <p className="vr-info">VR: {poi.vr_title.en || poi.vr_title.he}</p>
              <div className="poi-actions">
                <a href={`/admin/map/${poi.id}`} className="btn-secondary">Edit</a>
                <button onClick={() => deletePoi(poi.id)} className="btn-danger">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

