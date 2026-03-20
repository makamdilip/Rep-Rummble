import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/hero-illustration.svg';
import reportPreview from '../assets/report-preview.svg';
import { AppStoreButton, GooglePlayButton } from '../components/base/buttons/app-store-buttons-outline';

export default function Home() {
  return (
    <>
      <section className="hero hero-stage" data-reveal>
        <div className="hero-decor">
          <span className="float-item item-weight" />
          <span className="float-item item-badge" />
        </div>
        <div className="hero-copy">
          <h1>Turn sweat into momentum — train smarter, live stronger.</h1>
          <p>
            Reprummble turns your workouts, meals, and recovery into a single
            plan that adapts as you get better. Start small. See real results.
          </p>
          <div className="hero-links">
            <Link className="brutalist-btn" to="/?auth=signup">
              Start Free Trial
            </Link>
            <Link className="ghost-btn" to="/plans">
              Pick a Plan
            </Link>
          </div>
          <div className="hero-subtext">
            Join thousands who built consistency — challenges, coaches, and data
            to keep you moving.
          </div>
        </div>
        <div className="hero-visual tilt-card">
          <img src={heroImage} alt="Reprummble preview" />
          <div className="hero-visual-meta">
            <div className="status-pill">30-day challenge</div>
            <div className="preview-grid">
              <div>
                <h4>Consistency</h4>
                <p>+42% weekly activity</p>
              </div>
              <div>
                <h4>Strength</h4>
                <p>Avg +6 kg squat progress</p>
              </div>
              <div>
                <h4>Recovery</h4>
                <p>Better sleep & reduced soreness</p>
              </div>
              <div>
                <h4>Nutrition</h4>
                <p>Smart targets, easy swaps</p>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-wave" />
      </section>

      <section className="section" data-reveal>
        <div className="section-head">
          <h2>What we do — simple, focused, effective</h2>
          <p>
            Tools that create momentum: plans, reminders, recovery, and
            community.
          </p>
        </div>
        <div className="card-grid" data-stagger>
          <div className="info-card">
            <h3>Personalized plans</h3>
            <p>Goals-first programming that fits your schedule and gear.</p>
          </div>
          <div className="info-card">
            <h3>Daily momentum</h3>
            <p>Short, clear tasks every day so progress becomes automatic.</p>
          </div>
          <div className="info-card">
            <h3>Recovery-first</h3>
            <p>
              Sleep, readiness, and load management so you progress without
              pain.
            </p>
          </div>
          <div className="info-card">
            <h3>Community & challenges</h3>
            <p>
              Friendly leaderboards, small-group challenges, and coach nudges.
            </p>
          </div>
        </div>
      </section>

      <section className="section" data-reveal>
        <div className="section-head">
          <h2>Proof in the numbers</h2>
          <p>Real people. Real momentum.</p>
        </div>
        <div className="stats-grid" data-stagger>
          <article className="stat-card animated-card">
            <div className="stat-icon">💪</div>
            <h3 className="stat-value">75k+</h3>
            <p className="stat-label">Workouts completed</p>
          </article>
          <article className="stat-card animated-card">
            <div className="stat-icon">👥</div>
            <h3 className="stat-value">18k+</h3>
            <p className="stat-label">Active members</p>
          </article>
          <article className="stat-card animated-card">
            <div className="stat-icon">📈</div>
            <h3 className="stat-value">Avg +5%</h3>
            <p className="stat-label">Weekly consistency increase</p>
          </article>
          <article className="stat-card featured animated-card">
            <div className="stat-icon">📋</div>
            <div>
              <h3>Doctor-ready reports</h3>
              <p>Share progress simply with professionals and coaches.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="section split" data-reveal>
        <div>
          <h2>Real stories, small wins</h2>
          <p>
            Quick wins keep you curious. See how small habits stacked into big
            changes for members just like you.
          </p>
          <div className="testimonials">
            <blockquote className="testimonial">
              “I hit a 10kg PR in 12 weeks — and still feel rested.”
              <cite>— Maya, 28</cite>
            </blockquote>
            <blockquote className="testimonial">
              “Logging meals became simple; my energy stayed steady all day.”
              <cite>— Alex, 34</cite>
            </blockquote>
            <blockquote className="testimonial">
              “Challenges made training fun again. I stayed consistent.”
              <cite>— Jorge, 41</cite>
            </blockquote>
          </div>
        </div>
        <div className="device-stage">
          <div className="device-glow" />
          <div className="phone-shell">
            <div className="phone-notch" />
            <div className="phone-screen ios">
              <div className="phone-header">
                <div className="phone-title-group">
                  <span className="phone-title">Reprummble Mobile</span>
                  <span className="phone-pill">Live sync</span>
                </div>
                <span className="phone-avatar">RR</span>
              </div>
              <div className="phone-home">
                <div className="phone-hero-card">
                  <h4>Start with one small win</h4>
                  <p>Log a meal, finish today’s workout, and celebrate.</p>
                  <span className="phone-cta">Start Free Trial</span>
                </div>
              </div>
              <div className="phone-footer">Stay curious. Start today.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section app-download" data-reveal>
        <div className="download-band">
          <div className="download-copy">
            <span className="download-chip">iOS & Android</span>
            <h2>Take your momentum everywhere</h2>
            <p>
              Log fast, follow daily guidance, and track progress that matters.
            </p>
            <div className="store-buttons">
              <AppStoreButton size="lg" />
              <GooglePlayButton size="lg" />
            </div>
            <div className="download-meta">
              <span>Start free — cancel anytime.</span>
              <span>Challenges, coaching, and reports included.</span>
            </div>
          </div>
          <div className="download-visual">
            <div className="ios-phone primary">
              <div className="ios-notch" />
              <div className="ios-screen">
                <div className="ios-app-header">
                  <div>
                    <span className="ios-app-title">Reprummble Mobile</span>
                    <span className="ios-app-pill">Live sync</span>
                  </div>
                  <span className="ios-avatar">RR</span>
                </div>
                <div className="ios-hero-card">
                  <h4>Build a healthier life</h4>
                  <p>
                    Meals, workouts, recovery, and insights in one membership.
                  </p>
                  <span className="ios-cta">Start Free Trial</span>
                </div>
              </div>
            </div>
            <div className="download-glow one" />
            <div className="download-glow two" />
          </div>
        </div>
      </section>

      <section className="section cta" data-reveal>
        <div>
          <h2>Ready to try Reprummble?</h2>
          <p>Start with a free trial and join the 30-day challenge.</p>
        </div>
        <div className="cta-actions">
          <Link className="solid-btn" to="/?auth=signup">
            Start Free Trial
          </Link>
          <Link className="ghost-btn" to="/plans">
            See Plans
          </Link>
        </div>
      </section>
    </>
  );
}

