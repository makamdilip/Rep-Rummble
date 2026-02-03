import React, { useState } from 'react';

export default function Referral() {
  const [copied, setCopied] = useState(false);
  const link = 'https://reprumble.com/invite/you';
  const stats = [
    { label: 'Reward balance', value: '2 free months', sub: '1 invite away from next unlock' },
    { label: 'Total invites', value: '8 friends', sub: '6 activated · 2 pending' },
    { label: 'Conversion rate', value: '75%', sub: 'Benchmarks higher than avg' },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="section page-section" data-reveal>
      <div className="section-head">
        <h2>Referral rewards</h2>
        <p>Invite friends and unlock free months and exclusive perks.</p>
      </div>

      <div className="referral-stats" data-stagger>
        {stats.map((s) => (
          <div className="stat-card" key={s.label}>
            <span>{s.label}</span>
            <strong>{s.value}</strong>
            <small>{s.sub}</small>
          </div>
        ))}
      </div>

      <div className="referral-grid" data-reveal>
        <div className="referral-card">
          <div>
            <h3>Share your link</h3>
            <p>Each referral boosts your points and unlocks discounts.</p>
          </div>
          <div className="referral-action" data-stagger>
            <input type="text" value={link} readOnly placeholder="Your referral link" />
            <button className="ghost-btn" onClick={handleCopy}>
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
        <div className="referral-steps">
          <h3>How it works</h3>
          <div className="referral-step">
            <strong>1. Share</strong>
            <span>Send your invite link to teammates or friends.</span>
          </div>
          <div className="referral-step">
            <strong>2. Activate</strong>
            <span>They start a plan, you earn points instantly.</span>
          </div>
          <div className="referral-step">
            <strong>3. Redeem</strong>
            <span>Apply free months or premium add-ons.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
