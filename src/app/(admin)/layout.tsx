import '@/styles/globals.css';
import type { ReactNode } from 'react';

export const dynamic = 'force-dynamic';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body>
        <header className="header">
          <div className="container" role="navigation" aria-label="Admin">
            <strong>Admin Studio</strong>
          </div>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
