import React from 'react';
import { Link } from 'react-router-dom';

export default function Support() {
  return (
    <section className="section page-section">
      <div className="section-head">
        <h2>Support</h2>
        <p>Need help? We are here for you.</p>
      </div>
      <div className="info-card">
        <p>Email us at support@reprumble.com or visit the FAQ in the app.</p>
      </div>
      <div className="page-actions">
        <Link className="solid-btn" to="/services">
          Explore Services
        </Link>
      </div>
    </section>
  );
}
