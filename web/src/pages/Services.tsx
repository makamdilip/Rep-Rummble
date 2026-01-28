import React from 'react';
import { Link } from 'react-router-dom';

export default function Services() {
  return (
    <section className="section page-section">
      <div className="section-head">
        <h2>Services built for real results</h2>
        <p>
          Rep Rumble combines nutrition, training, recovery, and accountability
          into one platform.
        </p>
      </div>

      <div className="card-grid">
        <div className="info-card">
          <h3>Nutrition coaching</h3>
          <p>Macro and micronutrient tracking, meal suggestions, and smart swaps.</p>
        </div>
        <div className="info-card">
          <h3>Workout programming</h3>
          <p>Adaptive routines for strength, endurance, and body recomposition.</p>
        </div>
        <div className="info-card">
          <h3>Recovery + readiness</h3>
          <p>Sleep, stress, and activity signals to prevent burnout.</p>
        </div>
        <div className="info-card">
          <h3>Community motivation</h3>
          <p>Challenges, streaks, and leaderboards to keep you consistent.</p>
        </div>
        <div className="info-card">
          <h3>Doctor-ready reports</h3>
          <p>Export monthly, yearly, and historical reports for professionals.</p>
        </div>
        <div className="info-card">
          <h3>Personalized goals</h3>
          <p>Weight loss, weight gain, maintenance, and athletic targets.</p>
        </div>
      </div>

      <div className="accordion">
        <details className="accordion-item" open>
          <summary>How fast can I start?</summary>
          <p>Create an account and you can log meals or workouts in minutes.</p>
        </details>
        <details className="accordion-item">
          <summary>Can I share reports with my doctor?</summary>
          <p>Yes. Reports export in monthly, yearly, or historical formats.</p>
        </details>
        <details className="accordion-item">
          <summary>Do you support wearables?</summary>
          <p>Rep Rumble is designed to sync with major devices and platforms.</p>
        </details>
        <details className="accordion-item">
          <summary>Is it good for weight loss and weight gain?</summary>
          <p>Yes. Plans adapt based on your goal, intake, and training load.</p>
        </details>
      </div>

      <div className="page-actions">
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
