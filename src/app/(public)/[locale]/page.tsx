export const revalidate = 60;

export default function HomePage({ params }: { params: { locale: 'he' | 'en' } }) {
  const t = (he: string, en: string) => (params.locale === 'he' ? he : en);
  return (
    <section className="home-page" aria-labelledby="home-heading">
      <div className="hero">
        <h1 id="home-heading">{t('בין קוק והחבצלת', 'Between Kook and Havazelet')}</h1>
        <p className="tagline">
          {t('מסע אינטראקטיבי דרך ירושלים ההיסטורית, 1884–1959', `An interactive journey through Jerusalem's history, 1884-1959`)}
        </p>
      </div>

      <div className="features">
        <a href={`/${params.locale}/timeline`} className="feature-card">
          <div className="feature-icon">📅</div>
          <h2>{t('ציר הזמן', 'Timeline')}</h2>
          <p>{t('עיינו באירועים היסטוריים עם תמונות ומדיה', 'Explore historical events with photos and media')}</p>
        </a>

        <a href={`/${params.locale}/map`} className="feature-card">
          <div className="feature-icon">🗺️</div>
          <h2>{t('מפה אינטראקטיבית', 'Interactive Map')}</h2>
          <p>{t('גלו מקומות היסטוריים עם סיורי VR', 'Discover historical places with VR tours')}</p>
        </a>

        <a href={`/${params.locale}/gallery`} className="feature-card">
          <div className="feature-icon">📸</div>
          <h2>{t('גלריה', 'Gallery')}</h2>
          <p>{t('צפו באוספי תמונות ארכיוניות', 'View archival photo collections')}</p>
        </a>
      </div>

      <div className="admin-link">
        <a href="/admin">{t('ניהול', 'Admin')}</a>
      </div>
    </section>
  );
}
