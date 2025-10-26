import PhotoGallery from '@/components/PhotoGallery';
import type { Collection } from '@/lib/schemas/content';

export const revalidate = 60;

async function getCollections(): Promise<Collection[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/collections`, { 
      next: { revalidate: 60 },
      cache: 'force-cache'
    });
    
    if (!res.ok) {
      console.error('Failed to fetch collections');
      return [];
    }
    
    const json = await res.json();
    return json.success ? json.data : [];
  } catch (error) {
    console.error('Error fetching collections:', error);
    return [];
  }
}

export default async function GalleryPage({ 
  params 
}: { 
  params: { locale: 'he' | 'en' } 
}) {
  const collections = await getCollections();
  const t = (he: string, en: string) => params.locale === 'he' ? he : en;

  // Convert collections to photo format
  // In real implementation, you'd fetch actual photo URLs from film_item_references
  const samplePhotos = collections.flatMap(collection => 
    collection.film_item_references.slice(0, 3).map((ref, idx) => ({
      url: typeof ref === 'string' ? ref : `https://via.placeholder.com/800x600?text=Photo+${ref}`,
      thumbnail: typeof ref === 'string' ? ref : `https://via.placeholder.com/400x300?text=Photo+${ref}`,
      title: `${collection.title[params.locale]} - ${idx + 1}`,
      year: collection.years_range,
      description: `From ${collection.title[params.locale]} collection`
    }))
  );

  return (
    <section className="gallery-page" aria-labelledby="gallery-heading">
      <header className="page-header">
        <h1 id="gallery-heading">{t('גלריית תמונות', 'Photo Gallery')}</h1>
        <p>
          {t(
            'אוסף תמונות היסטוריות מירושלים, 1884–1959',
            'Historical photographs from Jerusalem, 1884–1959'
          )}
        </p>
      </header>

      {collections.length === 0 ? (
        <div className="empty-state">
          <p>{t('אין אוספים להצגה כרגע', 'No collections available yet')}</p>
          <a href={`/${params.locale}`}>{t('חזרה לדף הבית', 'Back to home')}</a>
        </div>
      ) : (
        <>
          <div className="collections-list">
            {collections.map((collection) => (
              <div key={collection.collection_id} className="collection-section">
                <div className="collection-header">
                  <h2>{collection.title[params.locale]}</h2>
                  <span className="years-badge">{collection.years_range}</span>
                  <p className="item-count">
                    {collection.film_item_references.length} {t('פריטים', 'items')}
                  </p>
                </div>
                <a 
                  href={`/${params.locale}/gallery/${collection.collection_id}`}
                  className="view-collection-btn"
                >
                  {t('צפה באוסף המלא', 'View full collection')} →
                </a>
              </div>
            ))}
          </div>

          {samplePhotos.length > 0 && (
            <div className="sample-gallery">
              <h2 className="section-title">{t('תמונות נבחרות', 'Featured Photos')}</h2>
              <PhotoGallery photos={samplePhotos} columns={4} />
            </div>
          )}
        </>
      )}
    </section>
  );
}

