'use client';

import { useEffect, useState } from 'react';
import type { Collection } from '@/lib/schemas/content';

export default function CollectionsManager() {
  const [collections, setCollections] = useState<(Collection & { _id?: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollections();
  }, []);

  async function fetchCollections() {
    try {
      const res = await fetch('/api/collections');
      const json = await res.json();
      if (json.success) {
        setCollections(json.data);
      } else {
        setError(json.error);
      }
    } catch (err) {
      setError('Failed to load collections');
    } finally {
      setLoading(false);
    }
  }

  async function deleteCollection(id: string) {
    if (!confirm('Are you sure you want to delete this collection?')) return;
    
    try {
      const res = await fetch(`/api/collections/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setCollections(collections.filter(c => c.collection_id !== id));
      } else {
        alert('Error: ' + json.error);
      }
    } catch (err) {
      alert('Failed to delete collection');
    }
  }

  if (loading) return <div>Loading collections...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="collections-manager">
      <div className="header-actions">
        <h1>Collections Manager</h1>
        <a href="/admin/collections/new" className="btn-primary">+ Add New Collection</a>
      </div>

      {collections.length === 0 ? (
        <p>No collections found. Create one to get started!</p>
      ) : (
        <div className="collections-list">
          {collections.map((collection) => (
            <div key={collection.collection_id} className="collection-card">
              <div className="collection-header">
                <h3>{collection.title.en || collection.title.he}</h3>
                <span className="years-badge">{collection.years_range}</span>
              </div>
              <p className="collection-meta">
                ID: {collection.collection_id} • 
                {collection.film_item_references.length} items
              </p>
              <div className="collection-actions">
                <a href={`/admin/collections/${collection.collection_id}`} className="btn-secondary">
                  Edit
                </a>
                <button 
                  onClick={() => deleteCollection(collection.collection_id)} 
                  className="btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

