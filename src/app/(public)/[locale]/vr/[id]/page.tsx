import VRViewer from '@/components/VRViewer';
import type { MapPOI } from '@/lib/schemas/content';

export const revalidate = 60;

async function getVRLocation(id: string): Promise<MapPOI | null> {
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
    console.error('Error fetching VR location:', error);
    return null;
  }
}

export default async function VRPage({ 
  params 
}: { 
  params: { locale: 'he' | 'en'; id: string } 
}) {
  const location = await getVRLocation(params.id);
  const t = (he: string, en: string) => params.locale === 'he' ? he : en;

  if (!location) {
    return (
      <section className="vr-page">
        <h1>{t('מיקום VR לא נמצא', 'VR location not found')}</h1>
        <a href={`/${params.locale}/map`}>{t('חזרה למפה', 'Back to map')}</a>
      </section>
    );
  }

  const hotspots = location.vr_hotspot ? [{
    title: location.vr_hotspot.hotspot_title[params.locale],
    imageUrl: location.vr_hotspot.hotspot_img_url,
    position: { x: 0.5, y: 0.5 } // Center position as example
  }] : [];

  return (
    <section className="vr-page" aria-labelledby="vr-heading">
      <nav className="breadcrumb">
        <a href={`/${params.locale}`}>{t('בית', 'Home')}</a> 
        <span> / </span>
        <a href={`/${params.locale}/map`}>{t('מפה', 'Map')}</a>
        <span> / </span>
        <span>{t('VR', 'VR')}</span>
      </nav>

      <header className="page-header">
        <h1 id="vr-heading">{location.vr_title[params.locale]}</h1>
        <p className="location-name">📍 {location.stone_title[params.locale]}</p>
      </header>

      <VRViewer
        panoramaUrl={location.vr_360_url}
        title={location.vr_title[params.locale]}
        hotspots={hotspots}
        autoRotate={true}
      />

      <div className="vr-info">
        <h2>{t('אודות המיקום', 'About this location')}</h2>
        <p>{location.stone_title[params.locale]}</p>
        <p className="coordinates">
          {t('קואורדינטות', 'Coordinates')}: {location.coordinates[1].toFixed(4)}, {location.coordinates[0].toFixed(4)}
        </p>
      </div>

      <div className="actions">
        <a href={`/${params.locale}/map/${params.id}`} className="btn-secondary">
          {t('פרטי המיקום', 'Location details')}
        </a>
        <a href={`/${params.locale}/map`} className="btn-back">
          {t('← חזרה למפה', '← Back to map')}
        </a>
      </div>
    </section>
  );
}

