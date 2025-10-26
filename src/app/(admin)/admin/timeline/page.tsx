'use client';

import { useEffect, useState } from 'react';
import type { CarouselItem } from '@/lib/schemas/content';

export default function TimelineManager() {
  const [items, setItems] = useState<(CarouselItem & { _id?: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    try {
      const res = await fetch('/api/timeline');
      const json = await res.json();
      if (json.success) {
        setItems(json.data);
      } else {
        setError(json.error);
      }
    } catch (err) {
      setError('Failed to load timeline items');
    } finally {
      setLoading(false);
    }
  }

  async function deleteItem(id: string) {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      const res = await fetch(`/api/timeline/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setItems(items.filter(item => item._id !== id));
      } else {
        alert('Error: ' + json.error);
      }
    } catch (err) {
      alert('Failed to delete item');
    }
  }

  if (loading) return <div>Loading timeline items...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="timeline-manager">
      <div className="header-actions">
        <h1>Timeline Manager</h1>
        <a href="/admin/timeline/new" className="btn-primary">+ Add New Item</a>
      </div>

      {items.length === 0 ? (
        <p>No timeline items found. Create one to get started!</p>
      ) : (
        <div className="items-list">
          {items.map((item) => (
            <div key={item._id} className="item-card">
              <div className="item-header">
                <h3>
                  {item.title_default.en || item.title_default.he}
                  <span className="years-badge">{item.years_range}</span>
                </h3>
              </div>
              <div className="item-meta">
                <p>ID: {item.id}</p>
                {item.image_assets?.url_thumb && (
                  <img src={item.image_assets.url_thumb} alt="" className="thumb" />
                )}
              </div>
              <div className="item-actions">
                <a href={`/admin/timeline/${item._id}`} className="btn-secondary">Edit</a>
                <button onClick={() => deleteItem(item._id!)} className="btn-danger">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

