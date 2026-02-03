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
          <div className="price-card-head">
            <h3>Starter</h3>
            <div className="price-row">
              <p className="price">$0</p>
              <span className="price-cycle">/month</span>
            </div>
            <p className="price-desc">Essentials to explore the platform.</p>
          </div>
          <ul className="price-features">
            <li>Basic meal logging</li>
            <li>Habit streaks</li>
            <li>Weekly insights</li>
          </ul>
          <div className="price-card-footer">
            <Link className="ghost-btn" to="/?auth=signup">
              Get Starter
            </Link>
          </div>
        </div>
        <div className="price-card featured">
          <div className="badge">Most Popular</div>
          <div className="price-card-head">
            <h3>Pro</h3>
            <div className="price-row">
              <p className="price">$14</p>
              <span className="price-cycle">/month</span>
            </div>
            <p className="price-desc">Advanced nutrition + training.</p>
          </div>
          <ul className="price-features">
            <li>AI meal analysis</li>
            <li>Custom meal plans</li>
            <li>Workout programming</li>
            <li>Community challenges</li>
          </ul>
          <div className="price-card-footer">
            <Link className="solid-btn" to="/?auth=signup">
              Start Pro
            </Link>
          </div>
        </div>
        <div className="price-card">
          <div className="price-card-head">
            <h3>Elite</h3>
            <div className="price-row">
              <p className="price">$29</p>
              <span className="price-cycle">/month</span>
            </div>
            <p className="price-desc">High-touch coaching + analytics.</p>
          </div>
          <ul className="price-features">
            <li>Coach check-ins</li>
            <li>Recovery insights</li>
            <li>Priority support</li>
            <li>Wearable sync</li>
          </ul>
          <div className="price-card-footer">
            <Link className="ghost-btn" to="/?auth=signup">
              Go Elite
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
