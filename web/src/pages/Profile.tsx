import React from 'react';
import { Link } from 'react-router-dom';

export default function Profile() {
  return (
    <section className="section split page-section">
      <div>
        <h2>Your profile is the control center</h2>
        <p>
          Manage goals, health notes, nutrition preferences, and wearable data
          from one place.
        </p>
        <div className="checklist">
          <span>Weight loss or weight gain paths</span>
          <span>Meal preferences and allergies</span>
          <span>Health issues & doctor notes</span>
          <span>Progress history and snapshots</span>
        </div>
        <div className="page-actions">
          <Link className="solid-btn" to="/reports">
            View Reports
          </Link>
          <Link className="ghost-btn" to="/services">
            Explore Services
          </Link>
        </div>
      </div>
      <div className="profile-card">
        <div className="profile-row">
          <div>
            <h4>Profile Signal</h4>
            <p>Weight loss - 8 weeks</p>
          </div>
          <span className="pill">Adaptive</span>
        </div>
        <div className="profile-metrics">
          <div>
            <h3>74 kg</h3>
            <p>Current</p>
          </div>
          <div>
            <h3>68 kg</h3>
            <p>Target</p>
          </div>
          <div>
            <h3>2.1k</h3>
            <p>Daily kcal</p>
          </div>
        </div>
        <div className="profile-progress">
          <span>Progress</span>
          <div className="progress-track">
            <div className="progress-fill" />
          </div>
        </div>
      </div>
    </section>
  );
}
