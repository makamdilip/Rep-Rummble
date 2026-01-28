import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="section page-section">
      <div className="section-head">
        <h2>Page not found</h2>
        <p>The page you are looking for does not exist.</p>
      </div>
      <div className="page-actions">
        <Link className="solid-btn" to="/">
          Back to Home
        </Link>
      </div>
    </section>
  );
}
