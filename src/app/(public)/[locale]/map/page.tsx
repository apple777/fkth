import InteractiveMap from '@/components/InteractiveMap';
import type { MapPOI } from '@/lib/schemas/content';

export const revalidate = 60;

async function getMapPOIs(): Promise<MapPOI[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/map`, { 
      next: { revalidate: 60 },
      cache: 'force-cache'
    });
    
    if (!res.ok) {
      console.error('Failed to fetch map POIs');
      return [];
    }
    
    const json = await res.json();
    return json.success ? json.data : [];
  } catch (error) {
    console.error('Error fetching map POIs:', error);
    return [];
  }
}

export default async function MapPage({ 
  params 
}: { 
  params: { locale: 'he' | 'en' } 
}) {
  const pois = await getMapPOIs();
  const t = (he: string, en: string) => params.locale === 'he' ? he : en;
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

  if (!mapboxToken) {
    return (
      <section className="map-page">
        <div className="error-state">
          <h1>{t('שגיאה בהגדרות', 'Configuration Error')}</h1>
          <p>{t('חסר מפתח Mapbox', 'Mapbox token is not configured')}</p>
          <p><code>NEXT_PUBLIC_MAPBOX_TOKEN</code></p>
        </div>
      </section>
    );
  }

  return (
    <section className="map-page" aria-labelledby="map-heading">
      <header className="page-header">
        <h1 id="map-heading">{t('מפת ירושלים ההיסטורית', 'Historical Jerusalem Map')}</h1>
        <p>
          {t(
            'חקרו מקומות היסטוריים בירושלים עם סיורי VR 360°',
            'Explore historical locations in Jerusalem with VR 360° tours'
          )}
        </p>
      </header>

      {pois.length === 0 ? (
        <div className="empty-state">
          <p>{t('אין נקודות עניין להצגה כרגע', 'No points of interest available yet')}</p>
          <a href={`/${params.locale}`}>{t('חזרה לדף הבית', 'Back to home')}</a>
        </div>
      ) : (
        <InteractiveMap pois={pois} locale={params.locale} mapboxToken={mapboxToken} />
      )}
    </section>
  );
}

