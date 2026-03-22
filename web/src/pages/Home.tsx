import React from 'react';
import { Link } from 'react-router-dom';
import { AppStoreButton, GooglePlayButton } from '../components/base/buttons/app-store-buttons-outline';

const FEATURES = [
  {
    icon: '🏋️',
    title: 'Personalized Training Plans',
    desc: 'AI-built programs that adapt to your schedule, gear, and goals. Whether you train 3 days or 6 — your plan fits.',
  },
  {
    icon: '🥗',
    title: 'Smart Nutrition Tracking',
    desc: 'Log meals in seconds, hit macro targets, and get smart swaps when you fall short. No calorie obsession — just clarity.',
  },
  {
    icon: '💤',
    title: 'Recovery & Readiness',
    desc: 'Sleep quality, HRV, and resting HR feed into a daily readiness score so you always know when to push and when to rest.',
  },
  {
    icon: '⌚',
    title: 'Wearable Sync',
    desc: 'Apple Watch, Oura, Garmin, Whoop — data flows automatically into your dashboard without manual entry.',
  },
  {
    icon: '📊',
    title: 'Actionable Analytics',
    desc: 'Weekly insights connect your habits to results. See exactly what drove progress — and what held it back.',
  },
  {
    icon: '🏆',
    title: 'Challenges & Community',
    desc: '30-day challenges, leaderboards, and coach nudges to keep momentum when motivation fades.',
  },
];

const STEPS = [
  {
    num: '01',
    title: 'Tell us your goals',
    desc: 'Quick onboarding covers your schedule, gear, fitness level, and what you actually want to achieve.',
  },
  {
    num: '02',
    title: 'Get your plan',
    desc: 'Reprummble builds a personalised training + nutrition plan the same day. Connect wearables to enrich your data instantly.',
  },
  {
    num: '03',
    title: 'Track, adapt, progress',
    desc: 'Log workouts, meals, and sleep. Your plan updates as you improve — no restarting from scratch.',
  },
];

const TESTIMONIALS = [
  {
    quote: 'I hit a 10 kg PR in 12 weeks and still felt rested. The recovery scores kept me honest.',
    name: 'Maya T.',
    role: 'Powerlifter · 28',
    initials: 'MT',
  },
  {
    quote: 'Meal logging used to feel like homework. Now it takes 30 seconds and I finally understand my energy dips.',
    name: 'Alex R.',
    role: 'Remote worker · 34',
    initials: 'AR',
  },
  {
    quote: 'The 30-day challenge made me train on days I would have skipped. Accountability without the guilt.',
    name: 'Jorge M.',
    role: 'Amateur runner · 41',
    initials: 'JM',
  },
];

const STATS = [
  { value: '75k+', label: 'Workouts completed' },
  { value: '18k+', label: 'Active members' },
  { value: '4.8★', label: 'Average rating' },
  { value: '91%', label: 'of members stay consistent in month 2' },
];

const WEARABLES = [
  { name: 'Apple Watch', icon: '⌚' },
  { name: 'Oura Ring', icon: '💍' },
  { name: 'Garmin', icon: '🗺️' },
  { name: 'Whoop', icon: '📟' },
  { name: 'Fitbit', icon: '⌚' },
  { name: 'Polar', icon: '❤️' },
];

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="hero hero-stage" data-reveal>
        <div className="hero-decor">
          <span className="float-item item-weight" />
          <span className="float-item item-badge" />
        </div>
        <div className="hero-copy">
          <div className="hero-eyebrow">
            <span className="pill pill-green">All-in-one fitness platform</span>
          </div>
          <h1>Train smarter.<br />Recover faster.<br />Live stronger.</h1>
          <p>
            Reprummble connects your workouts, nutrition, sleep, and wearables
            into one adaptive plan that gets better as you do. No guesswork —
            just progress.
          </p>
          <div className="hero-links">
            <Link className="brutalist-btn" to="/?auth=signup">
              Start Free — No Card Needed
            </Link>
            <Link className="ghost-btn" to="/plans">
              See Plans
            </Link>
          </div>
          <div className="hero-trust-row">
            <div className="hero-trust-item">
              <strong>18k+</strong>
              <span>active members</span>
            </div>
            <div className="hero-trust-divider" />
            <div className="hero-trust-item">
              <strong>4.8★</strong>
              <span>member rating</span>
            </div>
            <div className="hero-trust-divider" />
            <div className="hero-trust-item">
              <strong>Free trial</strong>
              <span>cancel anytime</span>
            </div>
          </div>
        </div>

        <div className="hero-visual tilt-card">
          <div className="hero-dashboard-card">
            <div className="hdc-header">
              <div>
                <span className="pill pill-green">Today</span>
                <p className="hdc-name">Good morning, Alex 👋</p>
              </div>
              <div className="hdc-score">
                <span className="hdc-score-val">92</span>
                <span className="hdc-score-label">Readiness</span>
              </div>
            </div>
            <div className="hdc-metrics">
              <div className="hdc-metric">
                <span className="hdc-metric-icon">💤</span>
                <div>
                  <strong>7h 34m</strong>
                  <small>Sleep</small>
                </div>
              </div>
              <div className="hdc-metric">
                <span className="hdc-metric-icon">❤️</span>
                <div>
                  <strong>54 bpm</strong>
                  <small>Resting HR</small>
                </div>
              </div>
              <div className="hdc-metric">
                <span className="hdc-metric-icon">⚡</span>
                <div>
                  <strong>78 ms</strong>
                  <small>HRV</small>
                </div>
              </div>
            </div>
            <div className="hdc-workout">
              <div className="hdc-workout-info">
                <strong>Today's session</strong>
                <span className="muted">Upper body · 45 min</span>
              </div>
              <span className="solid-chip">Start</span>
            </div>
            <div className="hdc-macro-bar">
              <div className="hdc-macro-label">
                <span>Macros today</span>
                <span className="muted">1,840 / 2,400 kcal</span>
              </div>
              <div className="hdc-bar-track">
                <div className="hdc-bar-fill" style={{ width: '76%' }} />
              </div>
            </div>
          </div>
        </div>

        <div className="hero-wave" />
      </section>

      {/* ── WEARABLES TRUST BAR ── */}
      <section className="section wearable-bar" data-reveal>
        <p className="wearable-bar-label">Works with your devices</p>
        <div className="wearable-list">
          {WEARABLES.map((w) => (
            <div className="wearable-chip" key={w.name}>
              <span>{w.icon}</span>
              <span>{w.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="section" data-reveal>
        <div className="section-head">
          <span className="pill">Everything you need</span>
          <h2>One app. Every pillar of your health.</h2>
          <p>
            Most apps do one thing. Reprummble connects training, nutrition,
            recovery, and analytics so they work together — not in silos.
          </p>
        </div>
        <div className="feature-grid" data-stagger>
          {FEATURES.map((f) => (
            <div className="feature-card" key={f.title}>
              <span className="feature-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section how-it-works" data-reveal>
        <div className="section-head">
          <span className="pill">Simple by design</span>
          <h2>Up and running in under 5 minutes</h2>
          <p>
            No complicated setup. Tell us your goals, get your plan, and start
            moving today.
          </p>
        </div>
        <div className="steps-grid" data-stagger>
          {STEPS.map((s) => (
            <div className="step-card" key={s.num}>
              <div className="step-num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="section" data-reveal>
        <div className="section-head">
          <span className="pill">Proof in numbers</span>
          <h2>Real people. Real momentum.</h2>
        </div>
        <div className="stats-grid stats-grid-home" data-stagger>
          {STATS.map((s) => (
            <article className="stat-card animated-card" key={s.label}>
              <h3 className="stat-value">{s.value}</h3>
              <p className="stat-label">{s.label}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section" data-reveal>
        <div className="section-head">
          <span className="pill">Members love it</span>
          <h2>Small wins that compound</h2>
          <p>See how real members built consistency with Reprummble.</p>
        </div>
        <div className="testimonial-grid" data-stagger>
          {TESTIMONIALS.map((t) => (
            <div className="testimonial-card" key={t.name}>
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-quote">"{t.quote}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.initials}</div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PLANS PREVIEW ── */}
      <section className="section plans-preview" data-reveal>
        <div className="plans-preview-inner">
          <div className="plans-preview-copy">
            <span className="pill">Pricing</span>
            <h2>Start free. Upgrade when you're ready.</h2>
            <p>
              Every plan includes a free trial. No credit card required to start.
              Cancel or change anytime.
            </p>
            <div className="plans-bullets">
              <div className="plans-bullet">✓ Full training plan access</div>
              <div className="plans-bullet">✓ Nutrition tracking + smart swaps</div>
              <div className="plans-bullet">✓ Recovery readiness score daily</div>
              <div className="plans-bullet">✓ Wearable sync (all devices)</div>
              <div className="plans-bullet">✓ 30-day challenges + community</div>
            </div>
            <div className="plans-preview-actions">
              <Link className="solid-btn" to="/?auth=signup">Start Free Trial</Link>
              <Link className="ghost-btn" to="/plans">Compare Plans</Link>
            </div>
          </div>
          <div className="plans-preview-card">
            <div className="ppc-row">
              <div className="ppc-plan">
                <span className="ppc-name">Starter</span>
                <span className="ppc-price">Free</span>
                <span className="muted">Forever free</span>
              </div>
              <div className="ppc-plan featured">
                <span className="pill pill-green">Most popular</span>
                <span className="ppc-name">Pro</span>
                <span className="ppc-price">$9<small>/mo</small></span>
                <span className="muted">Billed monthly</span>
              </div>
              <div className="ppc-plan">
                <span className="ppc-name">Elite</span>
                <span className="ppc-price">$19<small>/mo</small></span>
                <span className="muted">+ Coach access</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── APP DOWNLOAD ── */}
      <section className="section app-download" data-reveal>
        <div className="download-band">
          <div className="download-copy">
            <span className="download-chip">iOS & Android — Coming Soon</span>
            <h2>Take your momentum everywhere</h2>
            <p>
              Log a meal between meetings. Check your recovery score before
              training. Get nudged when challenges are live. All from your pocket.
            </p>
            <div className="store-buttons">
              <AppStoreButton size="lg" />
              <GooglePlayButton size="lg" />
            </div>
            <div className="download-meta">
              <span>Sign up on web now — mobile app notifies you at launch.</span>
            </div>
          </div>
          <div className="download-visual">
            <div className="ios-phone primary">
              <div className="ios-notch" />
              <div className="ios-screen">
                <div className="ios-app-header">
                  <div>
                    <span className="ios-app-title">Reprummble</span>
                    <span className="ios-app-pill">Live sync</span>
                  </div>
                  <span className="ios-avatar">RR</span>
                </div>
                <div className="ios-hero-card">
                  <h4>Readiness: 92 — Go train.</h4>
                  <p>Sleep restored. HRV stable. Green-light for strength today.</p>
                  <span className="ios-cta">Start Session</span>
                </div>
              </div>
            </div>
            <div className="download-glow one" />
            <div className="download-glow two" />
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="section cta-final" data-reveal>
        <div className="cta-final-inner">
          <span className="pill">Join 18,000+ members</span>
          <h2>Your next PR starts today.</h2>
          <p>
            Free trial. No credit card. Cancel anytime. Everything you need to
            train, eat, and recover like a pro — in one place.
          </p>
          <div className="cta-actions">
            <Link className="solid-btn cta-big" to="/?auth=signup">
              Start Free Trial
            </Link>
            <Link className="ghost-btn" to="/services">
              Explore Features
            </Link>
          </div>
          <p className="cta-fine">Already have an account? <Link to="/?auth=signin" className="cta-link">Sign in →</Link></p>
        </div>
      </section>
    </>
  );
}
