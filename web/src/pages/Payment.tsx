import React from 'react';
import { Link } from 'react-router-dom';

export default function Payment() {
  return (
    <section className="section split page-section" data-reveal>
      <div>
        <h2>Secure payments</h2>
        <p>
          All payments are encrypted and PCI-ready. Pay with cards, wallets, or
          local payment methods.
        </p>
        <div className="payment-row" data-stagger>
          <span>Visa</span>
          <span>Mastercard</span>
          <span>Apple Pay</span>
          <span>Google Pay</span>
        </div>
        <div className="page-actions" data-stagger>
          <Link className="solid-btn" to="/plans">
            Choose a Plan
          </Link>
          <Link className="ghost-btn" to="/signup">
            Create Account
          </Link>
        </div>
      </div>
      <div className="payment-card" data-reveal>
        <h4>Checkout Preview</h4>
        <div className="checkout-item">
          <span>Pro Plan</span>
          <span>$14/mo</span>
        </div>
        <div className="checkout-item muted">
          <span>Discount</span>
          <span>- $2</span>
        </div>
        <div className="checkout-total">
          <span>Total today</span>
          <span>$12</span>
        </div>
        <Link className="solid-btn full" to="/signup">
          Continue to Signup
        </Link>
      </div>
    </section>
  );
}
