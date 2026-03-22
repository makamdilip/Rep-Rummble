import React, { useEffect, useState } from 'react';
import { supabase } from '../config/supabase';

export default function Referral() {
  const [copied, setCopied] = useState(false);
  const [inviteLink, setInviteLink] = useState('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        const code = user.id.slice(0, 8);
        setInviteLink(`https://reprummble.com/invite/${code}`);
      } else {
        setInviteLink('https://reprummble.com/invite/you');
      }
    });
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
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

      <div className="referral-grid" data-reveal>
        <div className="referral-card">
          <div>
            <h3>Share your link</h3>
            <p>Each referral boosts your points and unlocks discounts.</p>
          </div>
          <div className="referral-action" data-stagger>
            <input type="text" value={inviteLink} readOnly placeholder="Loading your referral link..." />
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
