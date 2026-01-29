import React from 'react';
import { Link } from 'react-router-dom';

export default function Support() {
  return (
    <section className="section page-section" data-reveal>
      <div className="section-head">
        <h2>Support</h2>
        <p>Need help? We are here for you.</p>
      </div>
      <div className="info-card" data-reveal>
        <p>Email us at support@reprumble.com or visit the FAQ in the app.</p>
      </div>
      <div className="page-actions" data-stagger>
        <Link className="solid-btn" to="/services">
          Explore Services
        </Link>
      </div>
    </section>
  );
}
