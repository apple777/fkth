import PhotoGallery from '@/components/PhotoGallery';
import type { Collection } from '@/lib/schemas/content';

export const revalidate = 60;

async function getCollection(id: string): Promise<Collection | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/collections/${id}`, { 
      next: { revalidate: 60 },
      cache: 'force-cache'
    });
    
    if (!res.ok) return null;
    
    const json = await res.json();
    return json.success ? json.data : null;
  } catch (error) {
    console.error('Error fetching collection:', error);
    return null;
  }
}

export default async function CollectionDetailPage({ 
  params 
}: { 
  params: { locale: 'he' | 'en'; id: string } 
}) {
  const collection = await getCollection(params.id);
  const t = (he: string, en: string) => params.locale === 'he' ? he : en;

  if (!collection) {
    return (
      <section className="collection-detail">
        <h1>{t('אוסף לא נמצא', 'Collection not found')}</h1>
        <a href={`/${params.locale}/gallery`}>{t('חזרה לגלריה', 'Back to gallery')}</a>
      </section>
    );
  }

  // Convert film references to photo format
  const photos = collection.film_item_references.map((ref, idx) => ({
    url: typeof ref === 'string' ? ref : `https://via.placeholder.com/1200x900?text=Photo+${ref}`,
    thumbnail: typeof ref === 'string' ? ref : `https://via.placeholder.com/400x300?text=Photo+${ref}`,
    title: `${collection.title[params.locale]} - ${idx + 1}`,
    year: collection.years_range,
    description: t(
      `תמונה ${idx + 1} מתוך אוסף ${collection.title[params.locale]}`,
      `Photo ${idx + 1} from ${collection.title[params.locale]} collection`
    )
  }));

  return (
    <section className="collection-detail" aria-labelledby="collection-heading">
      <nav className="breadcrumb">
        <a href={`/${params.locale}`}>{t('בית', 'Home')}</a> 
        <span> / </span>
        <a href={`/${params.locale}/gallery`}>{t('גלריה', 'Gallery')}</a>
        <span> / </span>
        <span>{collection.title[params.locale]}</span>
      </nav>

      <header className="page-header">
        <h1 id="collection-heading">{collection.title[params.locale]}</h1>
        <div className="collection-meta">
          <span className="years-badge">{collection.years_range}</span>
          <span className="item-count">
            {collection.film_item_references.length} {t('תמונות', 'photos')}
          </span>
        </div>
      </header>

      <PhotoGallery 
        photos={photos} 
        columns={3}
      />

      <div className="actions">
        <a href={`/${params.locale}/gallery`} className="btn-back">
          {t('← חזרה לגלריה', '← Back to gallery')}
        </a>
      </div>
    </section>
  );
}

