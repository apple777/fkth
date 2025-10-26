export const dynamic = 'force-dynamic';

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p>Welcome to the Between Kook and Havazelet admin studio.</p>
      
      <nav className="admin-nav">
        <ul>
          <li>
            <a href="/admin/timeline" className="admin-card">
              <h2>📅 Timeline Manager</h2>
              <p>Manage carousel items and historical timeline entries</p>
            </a>
          </li>
          <li>
            <a href="/admin/map" className="admin-card">
              <h2>🗺️ Map POIs</h2>
              <p>Manage map points of interest and VR locations</p>
            </a>
          </li>
          <li>
            <a href="/admin/collections" className="admin-card">
              <h2>📚 Collections</h2>
              <p>Manage photo and film collections</p>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

