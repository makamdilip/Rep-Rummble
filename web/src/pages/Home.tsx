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
          <span className="float-item item-watch" />
          <span className="float-item item-camera" />
          <span className="float-item item-weight" />
          <span className="float-item item-badge" />
        </div>
        <div className="hero-copy">
          <h1>Your all-in-one membership for nutrition, training, and recovery.</h1>
          <p>
            Rep Rummble keeps meals, workouts, recovery, and progress insights
            connected in one adaptive plan. Start on mobile, connect your
            wearables, and share your progress with your care team anytime.
          </p>
          <div className="hero-links">
            <Link className="brutalist-btn" to="/?auth=signup">
              Start Free Trial
            </Link>
            <Link className="ghost-btn" to="/plans">
              See Plans & Pricing
            </Link>
          </div>
          <div className="hero-subtext">
            Start free in minutes. Upgrade anytime from your dashboard.
          </div>
        </div>
        <div className="hero-visual tilt-card">
          <img src={heroImage} alt="Rep Rummble preview" />
          <div className="hero-visual-meta">
            <div className="status-pill">Live sync</div>
            <div className="preview-grid">
              <div>
                <h4>Meals</h4>
                <p>3 logged · 1,620 kcal</p>
              </div>
              <div>
                <h4>Workout</h4>
                <p>52 min · Strength</p>
              </div>
              <div>
                <h4>Protein</h4>
                <p>132g of 150g goal</p>
              </div>
              <div>
                <h4>Recovery</h4>
                <p>7h 25m sleep</p>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-wave" />
      </section>

      <section className="section" data-reveal>
        <div className="section-head">
          <h2>Membership that moves with your life</h2>
          <p>More than tracking. Rep Rummble builds a plan that adapts as you do.</p>
        </div>
        <div className="card-grid" data-stagger>
          <div className="info-card">
            <h3>Personalized weekly plan</h3>
            <p>Adaptive workouts and nutrition targets built around your goals.</p>
          </div>
          <div className="info-card">
            <h3>Real-time accountability</h3>
            <p>Streaks, reminders, and progress nudges that keep you consistent.</p>
          </div>
          <div className="info-card">
            <h3>Recovery-aware coaching</h3>
            <p>Sleep and readiness insights that prevent overtraining and burnout.</p>
          </div>
          <div className="info-card">
            <h3>Care-team visibility</h3>
            <p>Export reports that summarize your trends in minutes.</p>
          </div>
        </div>
      </section>

      <section className="section" data-reveal>
        <div className="section-head">
          <h2>Everything included with membership</h2>
          <p>All the tools you need to stay consistent and keep improving.</p>
        </div>
        <div className="bento-grid" data-stagger>
          <article className="bento-card glass span-2 animated-card">
            <h3>Meal intelligence</h3>
            <p>Track macros, micros, and smart portions with guided swaps.</p>
            <div className="bento-actions">
              <Link className="ghost-btn" to="/services">
                Nutrition Services
              </Link>
            </div>
          </article>
          <article className="bento-card brutal animated-card">
            <h3>Training intelligence</h3>
            <p>Volume, load, and cardio insights tailored to your goal.</p>
            <div className="bento-badge">Performance</div>
          </article>
          <article className="bento-card glass animated-card">
            <h3>Wearable sync</h3>
            <p>Connect the devices you already use for sleep and activity.</p>
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
            <h3>Community momentum</h3>
            <p>Challenges, points, and accountability in one feed.</p>
          </article>
          <article className="bento-card animated-card">
            <h3>Health notes</h3>
            <p>Log symptoms, injuries, and recovery notes securely.</p>
          </article>
        </div>
      </section>

      <section className="section split" data-reveal>
        <div>
          <h2>Designed for busy schedules</h2>
          <p>
            Log meals in seconds, follow the workout of the day, and get
            reminders when it matters. The membership stays lightweight so you
            can be consistent without the overwhelm.
          </p>
          <div className="checklist">
            <span>Meal logging with guided nutrition</span>
            <span>Weekly training blocks that evolve</span>
            <span>Recovery-aware day planning</span>
            <span>Exportable health reports</span>
          </div>
        </div>
        <div className="device-stage">
          <div className="device-glow" />
          <div className="phone-shell">
            <div className="phone-notch" />
            <div className="phone-screen ios">
              <div className="phone-status">
                <span className="phone-time">9:41</span>
                <div className="phone-status-icons">
                  <span className="phone-signal" aria-hidden="true" />
                  <span className="phone-wifi" aria-hidden="true" />
                  <span className="phone-battery" aria-hidden="true">
                    <span className="phone-battery-fill" />
                  </span>
                </div>
              </div>
              <div className="phone-header">
                <div className="phone-title-group">
                  <span className="phone-title">Rep Rummble Mobile</span>
                  <span className="phone-pill">Live sync</span>
                </div>
                <span className="phone-avatar">RR</span>
              </div>
              <div className="phone-home">
                <div className="phone-hero-card">
                  <h4>Build a healthier life</h4>
                  <p>Meals, workouts, recovery, and insights in one membership.</p>
                  <span className="phone-cta">Start Free Trial</span>
                </div>
                <span className="phone-home-label">Home</span>
                <div className="phone-metrics">
                  <div>
                    <h4>Meals</h4>
                    <p>3 logged · 1,620 kcal</p>
                  </div>
                  <div>
                    <h4>Workout</h4>
                    <p>52 min · Strength</p>
                  </div>
                  <div>
                    <h4>Protein</h4>
                    <p>132g of 150g goal</p>
                  </div>
                  <div>
                    <h4>Recovery</h4>
                    <p>7h 25m sleep</p>
                  </div>
                </div>
              </div>
              <div className="phone-footer">
                Track progress, meals, and recovery in one smooth flow.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" data-reveal>
        <div className="section-head">
          <h2>How your membership works</h2>
          <p>Three steps to start seeing momentum in your first week.</p>
        </div>
        <div className="card-grid" data-stagger>
          <div className="info-card">
            <h3>Set your direction</h3>
            <p>Pick fat loss, lean muscle, or performance and we shape the plan.</p>
          </div>
          <div className="info-card">
            <h3>Get daily clarity</h3>
            <p>Meals, workouts, and reminders arrive right when you need them.</p>
          </div>
          <div className="info-card">
            <h3>Evolve each week</h3>
            <p>Weekly check-ins update targets based on your real progress.</p>
          </div>
        </div>
      </section>

      <section className="section app-download" data-reveal>
        <div className="download-band">
          <div className="download-copy">
            <span className="download-chip">iOS & Android</span>
            <h2>Take Rep Rummble with you</h2>
            <p>
              Your membership lives on mobile. Log meals, follow the workout of
              the day, and see recovery insights in one place.
            </p>
            <div className="store-buttons">
              <AppStoreButton size="lg" />
              <GooglePlayButton size="lg" />
            </div>
            <div className="download-meta">
              <span>Scan once, sync everywhere.</span>
              <span>Cancel anytime.</span>
            </div>
          </div>
          <div className="download-visual">
            <div className="ios-phone primary">
              <div className="ios-notch" />
              <div className="ios-status">
                <span>9:41</span>
                <div className="ios-icons">
                  <span className="ios-signal" />
                  <span className="ios-wifi" />
                  <span className="ios-battery">
                    <span className="ios-battery-fill" />
                  </span>
                </div>
              </div>
              <div className="ios-screen">
                <div className="ios-app-header">
                  <div>
                    <span className="ios-app-title">Rep Rummble Mobile</span>
                    <span className="ios-app-pill">Live sync</span>
                  </div>
                  <span className="ios-avatar">RR</span>
                </div>
                <span className="ios-home-label">Home</span>
                <div className="ios-hero-card">
                  <h4>Build a healthier life</h4>
                  <p>Meals, workouts, recovery, and insights in one membership.</p>
                  <span className="ios-cta">Start Free Trial</span>
                </div>
                <div className="ios-metrics">
                  <div>
                    <h5>Meals</h5>
                    <p>3 logged · 1,620 kcal</p>
                  </div>
                  <div>
                    <h5>Workout</h5>
                    <p>52 min · Strength</p>
                  </div>
                  <div>
                    <h5>Protein</h5>
                    <p>132g of 150g goal</p>
                  </div>
                  <div>
                    <h5>Recovery</h5>
                    <p>7h 25m sleep</p>
                  </div>
                </div>
                <div className="ios-footer">
                  Track progress, meals, and recovery in one smooth flow.
                </div>
              </div>
            </div>
            <div className="ios-phone ghost" aria-hidden="true">
              <div className="ios-notch" />
              <div className="ios-screen compact">
                <div className="ios-app-header">
                  <div>
                    <span className="ios-app-title">Home</span>
                    <span className="ios-app-pill">Today</span>
                  </div>
                </div>
                <div className="ios-mini">
                  <p>Workout complete · 52 min</p>
                  <p>Recovery score: 86</p>
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
          <h2>Ready to start your membership?</h2>
          <p>Pick a plan and start building consistent habits today.</p>
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

