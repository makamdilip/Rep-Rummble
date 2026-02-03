import React from 'react';
import { Link } from 'react-router-dom';

export default function Payment() {
  const methods = ['Visa •••• 4242 (default)', 'Mastercard •••• 1021', 'Apple Pay', 'ACH debit'];
  const invoices = [
    { label: 'Jan 2026', amount: '$12', status: 'Paid' },
    { label: 'Dec 2025', amount: '$14', status: 'Paid' },
    { label: 'Nov 2025', amount: '$14', status: 'Paid' },
  ];

  return (
    <section className="section split page-section payment-page" data-reveal>
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
          <span>ACH</span>
          <span>Local wallets</span>
        </div>
        <div className="payment-notes" data-stagger>
          <div>
            <strong>PCI-compliant</strong>
            <span>Encrypted checkout with tokenized storage.</span>
          </div>
          <div>
            <strong>Flexible billing</strong>
            <span>Upgrade, pause, or cancel anytime in your dashboard.</span>
          </div>
          <div>
            <strong>Instant receipts</strong>
            <span>Invoice history for reimbursements and taxes.</span>
          </div>
        </div>
        <div className="page-actions" data-stagger>
          <Link className="solid-btn" to="/plans">
            Choose a Plan
          </Link>
          <Link className="ghost-btn" to="/?auth=signup">
            Create Account
          </Link>
        </div>

        <div className="payment-methods" data-stagger>
          <h4>Saved payment methods</h4>
          <ul>
            {methods.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
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
        <div className="checkout-item muted">
          <span>Next renewal</span>
          <span>Mar 1, 2026</span>
        </div>
        <div className="invoice-list">
          <h5>Recent invoices</h5>
          {invoices.map((inv) => (
            <div className="invoice-row" key={inv.label}>
              <span>{inv.label}</span>
              <span>{inv.amount}</span>
              <span className="pill">{inv.status}</span>
            </div>
          ))}
        </div>
        <Link className="solid-btn full" to="/?auth=signup">
          Continue to Signup
        </Link>
      </div>
    </section>
  );
}
