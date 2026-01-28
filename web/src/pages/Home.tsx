import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/hero-illustration.svg';
import reportPreview from '../assets/report-preview.svg';

type LeadStatus = 'idle' | 'loading' | 'success' | 'error';

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<LeadStatus>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email) return;
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'homepage' }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || 'Unable to submit');
      }

      setStatus('success');
      setMessage(data?.message || 'Thanks! We will reach out soon.');
      setEmail('');
    } catch (error: any) {
      setStatus('error');
      setMessage(error?.message || 'Something went wrong.');
    }
  };

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
          <form onSubmit={handleSubmit} className="hero-form">
            <input
              type="email"
              placeholder="you@reprumble.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="hero-input"
            />
            <button type="submit" className="solid-btn" disabled={status === 'loading'}>
              Get Early Access
            </button>
          </form>
          {message && (
            <div className={status === 'error' ? 'form-error' : 'form-success'}>
              {message}
            </div>
          )}
          <div className="hero-meta">
            <span>14-day free trial</span>
            <span>Cancel anytime</span>
            <span>Mobile + Web</span>
          </div>
          <div className="hero-links">
            <Link className="brutalist-btn" to="/signup">
              Start Free Trial
            </Link>
            <Link className="ghost-btn" to="/reports">
              See Reports
            </Link>
          </div>
        </div>
        <div className="hero-visual tilt-card">
          <img src={heroImage} alt="Rep Rumble preview" />
          <div className="hero-visual-meta">
            <span className="status-pill">Live sync</span>
            <p>Daily progress, nutrition, and training snapshots.</p>
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
