import React, { useState } from 'react';

export default function Referral() {
  const [copied, setCopied] = useState(false);
  const link = 'https://reprumble.com/invite/you';

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
    <section className="section page-section">
      <div className="section-head">
        <h2>Referral rewards</h2>
        <p>Invite friends and unlock free months and exclusive perks.</p>
      </div>

      <div className="referral-card">
        <div>
          <h3>Share your link</h3>
          <p>Each referral boosts your points and unlocks discounts.</p>
        </div>
        <div className="referral-action">
          <input type="text" value={link} readOnly />
          <button className="ghost-btn" onClick={handleCopy}>
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
    </section>
  );
}
