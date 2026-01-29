import React from 'react';
import { Link } from 'react-router-dom';

export default function Wearables() {
  return (
    <section className="section page-section" data-reveal>
      <div className="section-head">
        <h2>Wearables ready</h2>
        <p>
          Rep Rumble is designed to sync with all major wearables and smart
          fitness devices so your data always stays connected.
        </p>
      </div>

      <div className="card-grid" data-stagger>
        <div className="info-card">
          <h3>Unified health data</h3>
          <p>Pull activity, heart rate, sleep, and recovery into one dashboard.</p>
        </div>
        <div className="info-card">
          <h3>Automatic workout detection</h3>
          <p>Auto-log sessions and keep progress history intact.</p>
        </div>
        <div className="info-card">
          <h3>Multi-device support</h3>
          <p>Apple Watch, Fitbit, Whoop, Garmin, Oura, and Android watches.</p>
        </div>
      </div>

      <div className="page-actions" data-stagger>
        <Link className="solid-btn" to="/plans">
          View Plans
        </Link>
        <Link className="ghost-btn" to="/reports">
          See Reports
        </Link>
      </div>
    </section>
  );
}
