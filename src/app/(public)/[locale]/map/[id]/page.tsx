import type { MapPOI } from '@/lib/schemas/content';

export const revalidate = 60;

async function getMapPOI(id: string): Promise<MapPOI | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/map/${id}`, { 
      next: { revalidate: 60 },
      cache: 'force-cache'
    });
    
    if (!res.ok) return null;
    
    const json = await res.json();
    return json.success ? json.data : null;
  } catch (error) {
    console.error('Error fetching POI:', error);
    return null;
  }
}

export default async function POIDetailPage({ 
  params 
}: { 
  params: { locale: 'he' | 'en'; id: string } 
}) {
  const poi = await getMapPOI(params.id);
  const t = (he: string, en: string) => params.locale === 'he' ? he : en;

  if (!poi) {
    return (
      <section className="poi-detail">
        <h1>{t('נקודת העניין לא נמצאה', 'Point of Interest not found')}</h1>
        <a href={`/${params.locale}/map`}>{t('חזרה למפה', 'Back to map')}</a>
      </section>
    );
  }

  return (
    <section className="poi-detail" aria-labelledby="poi-heading">
      <nav className="breadcrumb">
        <a href={`/${params.locale}`}>{t('בית', 'Home')}</a> 
        <span> / </span>
        <a href={`/${params.locale}/map`}>{t('מפה', 'Map')}</a>
        <span> / </span>
        <span>{poi.stone_title[params.locale]}</span>
      </nav>

      <article>
        <h1 id="poi-heading">{poi.stone_title[params.locale]}</h1>
        
        <div className="poi-info">
          <div className="info-card">
            <h2>{t('מיקום', 'Location')}</h2>
            <p>
              📍 {t('קו אורך', 'Longitude')}: {poi.coordinates[0].toFixed(6)}<br/>
              📍 {t('קו רוחב', 'Latitude')}: {poi.coordinates[1].toFixed(6)}
            </p>
          </div>

          <div className="info-card vr-section">
            <h2>{poi.vr_title[params.locale]}</h2>
            <a 
              href={poi.vr_360_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="vr-link"
            >
              {t('פתח סיור VR 360°', 'Open VR 360° Tour')} 🔗
            </a>
            
            {poi.vr_hotspot && (
              <div className="hotspot-info">
                <h3>{t('נקודת עניין חמה', 'Hotspot')}</h3>
                <p>{poi.vr_hotspot.hotspot_title[params.locale]}</p>
                {poi.vr_hotspot.hotspot_img_url && (
                  <img 
                    src={poi.vr_hotspot.hotspot_img_url} 
                    alt={poi.vr_hotspot.hotspot_title[params.locale]}
                    className="hotspot-img"
                  />
                )}
              </div>
            )}
          </div>
        </div>

        <div className="actions">
          <a href={`/${params.locale}/map`} className="btn-back">
            {t('← חזרה למפה', '← Back to map')}
          </a>
        </div>
      </article>
    </section>
  );
}

