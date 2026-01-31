import React from 'react';
import { Link } from 'react-router-dom';

export default function Services() {
  return (
    <section className="section page-section" data-reveal>
      <div className="section-head">
        <h2>Services built for real results</h2>
        <p>
          Rep Rummble combines nutrition, training, recovery, and accountability
          into one platform.
        </p>
      </div>

      <div className="split" data-stagger>
        <div>
          <span className="pill">Integrated coaching</span>
          <h3>One plan, always in sync.</h3>
          <p>
            Nutrition, training, recovery, and accountability move together so you
            always know your next best step.
          </p>
          <div className="checklist">
            <span>Daily targets that respond to your week</span>
            <span>Smarter training blocks for strength and endurance</span>
            <span>Recovery signals to prevent burnout</span>
            <span>Accountability that keeps you consistent</span>
          </div>
        </div>
        <div className="media-card">
          <div className="media-layer" />
          <div className="media-content">
            <span className="media-title">Weekly momentum</span>
            <p>Your dashboard blends meals, workouts, and readiness into one story.</p>
            <div className="preview-grid">
              <div>
                <h4>Meals</h4>
                <p>3 logged · 1,620 kcal</p>
              </div>
              <div>
                <h4>Training</h4>
                <p>4 sessions · Strength focus</p>
              </div>
              <div>
                <h4>Recovery</h4>
                <p>7h 28m sleep avg</p>
              </div>
              <div>
                <h4>Streak</h4>
                <p>12 days · On track</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bento-grid" data-stagger>
        <article className="bento-card span-2 animated-card">
          <div className="bento-badge">Nutrition</div>
          <h3>Nutrition coaching</h3>
          <p>Macro and micronutrient tracking, meal suggestions, and smart swaps.</p>
        </article>
        <article className="bento-card brutal animated-card">
          <h3>Workout programming</h3>
          <p>Adaptive routines for strength, endurance, and body recomposition.</p>
          <div className="bento-badge">Training</div>
        </article>
        <article className="bento-card glass animated-card">
          <h3>Recovery + readiness</h3>
          <p>Sleep, stress, and activity signals to prevent burnout.</p>
          <div className="orb" />
        </article>
        <article className="bento-card animated-card">
          <h3>Community motivation</h3>
          <p>Challenges, streaks, and leaderboards to keep you consistent.</p>
          <span className="status-pill">Accountability</span>
        </article>
        <article className="bento-card span-2 animated-card">
          <div className="bento-badge">Clinician-ready</div>
          <h3>Doctor-ready reports</h3>
          <p>Export monthly, yearly, and historical reports for professionals.</p>
        </article>
        <article className="bento-card glass animated-card">
          <h3>Personalized goals</h3>
          <p>Weight loss, weight gain, maintenance, and athletic targets.</p>
          <div className="bento-actions">
            <span className="pill">Goal-driven</span>
          </div>
        </article>
      </div>

      <div className="card-grid" data-stagger>
        <div className="info-card">
          <h3>Assess</h3>
          <p>Baseline goals, schedule, and preferences guide every recommendation.</p>
        </div>
        <div className="info-card">
          <h3>Act</h3>
          <p>Daily coaching for meals, workouts, and recovery keeps momentum high.</p>
        </div>
        <div className="info-card">
          <h3>Adapt</h3>
          <p>Weekly adjustments respond to progress, readiness, and real life.</p>
        </div>
      </div>

      <div className="page-actions" data-stagger>
        <Link className="solid-btn" to="/plans">
          View Plans
        </Link>
      </div>
    </section>
  );
}

