import '@/styles/globals.css';
import type { ReactNode } from 'react';

export async function generateStaticParams() {
  return [{ locale: 'he' }, { locale: 'en' }];
}

export default function RootLayout({
  children,
  params
}: {
  children: ReactNode;
  params: { locale: 'he' | 'en' };
}) {
  const isRTL = params.locale === 'he';
  return (
    <html lang={params.locale} dir={isRTL ? 'rtl' : 'ltr'}>
      <body>
        <header className="header">
          <div className="container">
            <div className="header-content" role="navigation" aria-label="Primary">
              <div className="logo">
                <a href={`/${params.locale}`}>Between Kook and Havazelet</a>
                <span className="subtitle">
                  {params.locale === 'he' ? 'ארכיון היסטורי' : 'Historical Archive'}
                </span>
              </div>
              <nav className="main-nav">
                <a href={`/${params.locale}`}>{params.locale === 'he' ? 'בית' : 'Home'}</a>
                <a href={`/${params.locale}/timeline`}>{params.locale === 'he' ? 'ציר זמן' : 'Timeline'}</a>
                <a href={`/${params.locale}/map`}>{params.locale === 'he' ? 'מפה' : 'Map'}</a>
                <a href={`/${params.locale}/gallery`}>{params.locale === 'he' ? 'גלריה' : 'Gallery'}</a>
                <div className="lang-switcher">
                  <a href={`/${params.locale === 'he' ? 'en' : 'he'}`} className="lang-link">
                    {params.locale === 'he' ? 'EN' : 'עב'}
                  </a>
                  <a href={`/${params.locale === 'he' ? 'admin' : 'admin'}`} className="lang-link">
                    {params.locale === 'he' ? 'Admin' : 'ניהול'}
                  </a>
                </div>
              </nav>
            </div>
          </div>
        </header>
        <main className="container">{children}</main>
        <footer className="footer">
          <div className="container">
            <p>&copy; {new Date().getFullYear()} Between Kook and Havazelet. {params.locale === 'he' ? 'כל הזכויות שמורות.' : 'All rights reserved.'}</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
