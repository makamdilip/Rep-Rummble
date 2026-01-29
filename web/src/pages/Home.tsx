import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/hero-illustration.svg';
import reportPreview from '../assets/report-preview.svg';

export default function Home() {
  return (
    <>
      <section className="hero hero-stage">
        <div className="hero-decor">
          <span className="float-item item-watch" />
          <span className="float-item item-camera" />
          <span className="float-item item-weight" />
          <span className="float-item item-badge" />
        </div>
        <div className="hero-copy">
          <div className="hero-chip">Fitness + Nutrition Platform</div>
          <h1>Build a healthier life with one connected membership.</h1>
          <p>
            Rep Rumble keeps workouts, meals, recovery, and health insights in
            one place. Start on mobile, share progress with your care team, and
            keep your goals on track.
          </p>
          <div className="hero-links">
            <Link className="brutalist-btn" to="/signup">
              Start Free Trial
            </Link>
          </div>
          <div className="hero-subtext">
            Start free in minutes. Upgrade anytime from your dashboard.
          </div>
        </div>
        <div className="hero-visual tilt-card">
          <img src={heroImage} alt="Rep Rumble preview" />
          <div className="hero-visual-meta">
            <div className="status-pill">Live sync</div>
            <div className="preview-grid">
              <div>
                <h4>Meals</h4>
                <p>2 logged · 1,420 kcal</p>
              </div>
              <div>
                <h4>Workout</h4>
                <p>45 min · Strength</p>
              </div>
              <div>
                <h4>Protein</h4>
                <p>118g of 140g goal</p>
              </div>
              <div>
                <h4>Recovery</h4>
                <p>7h 40m sleep</p>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-wave" />
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Everything connected in one dashboard</h2>
          <p>High-level highlights. Explore each page for full details.</p>
        </div>
        <div className="bento-grid">
          <article className="bento-card glass span-2 animated-card">
            <h3>Meal intelligence</h3>
            <p>Track macros, micros, and smart portions with AI support.</p>
            <div className="bento-actions">
              <Link className="ghost-btn" to="/services">
                Nutrition Services
              </Link>
            </div>
          </article>
          <article className="bento-card brutal animated-card">
            <h3>Workout performance</h3>
            <p>Volume, load, and cardio insights personalized for goals.</p>
            <div className="bento-badge">Analytics</div>
          </article>
          <article className="bento-card glass animated-card">
            <h3>Wearable sync</h3>
            <p>Designed to connect with the devices you already use.</p>
            <div className="orb" />
          </article>
          <article className="bento-card span-2 animated-card">
            <div className="bento-media">
              <img src={reportPreview} alt="Report preview" />
            </div>
            <div>
              <h3>Doctor-ready reports</h3>
              <p>Monthly, yearly, and historical exports for your care team.</p>
            </div>
          </article>
          <article className="bento-card glass animated-card">
            <h3>Community streaks</h3>
            <p>Challenges, points, and accountability in one feed.</p>
          </article>
          <article className="bento-card animated-card">
            <h3>Health notes</h3>
            <p>Log symptoms, injuries, and recovery notes securely.</p>
          </article>
        </div>
      </section>

      <section className="section split">
        <div>
          <h2>Made for mobile first</h2>
          <p>
            Your complete experience lives on the phone: meals, workouts,
            progress, and wearable sync. The web stays focused on explaining the
            product and subscription options.
          </p>
          <div className="checklist">
            <span>Meal logging with nutrition</span>
            <span>Custom plans for weight goals</span>
            <span>Exportable health reports</span>
            <span>Secure data storage</span>
          </div>
        </div>
        <div className="media-card">
          <div className="media-layer" />
          <div className="media-content">
            <span className="media-title">Rep Rumble Mobile</span>
            <p>Track progress, meals, and recovery in one place.</p>
          </div>
        </div>
      </section>

      <section className="section cta">
        <div>
          <h2>Ready to start your transformation?</h2>
          <p>Pick a plan and start building consistent habits.</p>
        </div>
        <div className="cta-actions">
          <Link className="solid-btn" to="/plans">
            Start Free Trial
          </Link>
          <Link className="ghost-btn" to="/services">
            Explore Services
          </Link>
        </div>
      </section>
    </>
  );
}
