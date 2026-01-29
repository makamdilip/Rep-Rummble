import React from 'react';
import { Link } from 'react-router-dom';

export default function Plans() {
  return (
    <section className="section page-section" data-reveal>
      <div className="section-head">
        <h2>Subscription plans</h2>
        <p>Choose a plan that matches your goals.</p>
      </div>
      <div className="pricing-grid" data-stagger>
        <div className="price-card">
          <h3>Starter</h3>
          <p className="price">$0</p>
          <p className="price-desc">Essentials to explore the platform.</p>
          <ul>
            <li>Basic meal logging</li>
            <li>Habit streaks</li>
            <li>Weekly insights</li>
          </ul>
          <Link className="ghost-btn" to="/signup">
            Get Starter
          </Link>
        </div>
        <div className="price-card featured">
          <div className="badge">Most Popular</div>
          <h3>Pro</h3>
          <p className="price">$14</p>
          <p className="price-desc">Advanced nutrition + training.</p>
          <ul>
            <li>AI meal analysis</li>
            <li>Custom meal plans</li>
            <li>Workout programming</li>
            <li>Community challenges</li>
          </ul>
          <Link className="solid-btn" to="/signup">
            Start Pro
          </Link>
        </div>
        <div className="price-card">
          <h3>Elite</h3>
          <p className="price">$29</p>
          <p className="price-desc">High-touch coaching + analytics.</p>
          <ul>
            <li>Coach check-ins</li>
            <li>Recovery insights</li>
            <li>Priority support</li>
            <li>Wearable sync</li>
          </ul>
          <Link className="ghost-btn" to="/signup">
            Go Elite
          </Link>
        </div>
      </div>
    </section>
  );
}
