import TimelineCarousel from '@/components/TimelineCarousel';
import type { CarouselItem } from '@/lib/schemas/content';

export const revalidate = 60;

async function getTimelineItems(): Promise<CarouselItem[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/timeline`, { 
      next: { revalidate: 60 },
      cache: 'force-cache'
    });
    
    if (!res.ok) {
      console.error('Failed to fetch timeline items');
      return [];
    }
    
    const json = await res.json();
    return json.success ? json.data : [];
  } catch (error) {
    console.error('Error fetching timeline:', error);
    return [];
  }
}

export default async function TimelinePage({ 
  params 
}: { 
  params: { locale: 'he' | 'en' } 
}) {
  const items = await getTimelineItems();
  const t = (he: string, en: string) => params.locale === 'he' ? he : en;

  return (
    <section className="timeline-page" aria-labelledby="timeline-heading">
      <header className="page-header">
        <h1 id="timeline-heading">{t('ציר הזמן', 'Timeline')}</h1>
        <p>
          {t(
            'מסע חזותי דרך ההיסטוריה של ירושלים, 1884–1959',
            'A visual journey through Jerusalem\'s history, 1884–1959'
          )}
        </p>
      </header>

      {items.length === 0 ? (
        <div className="empty-state">
          <p>{t('אין פריטים להצגה כרגע', 'No timeline items available yet')}</p>
          <a href={`/${params.locale}`}>{t('חזרה לדף הבית', 'Back to home')}</a>
        </div>
      ) : (
        <TimelineCarousel items={items} locale={params.locale} />
      )}
    </section>
  );
}

