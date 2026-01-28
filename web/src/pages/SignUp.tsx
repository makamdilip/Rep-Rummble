import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type AuthStatus = 'idle' | 'loading' | 'success' | 'error';

export default function SignUp() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<AuthStatus>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, displayName }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || 'Registration failed');
      }

      setStatus('success');
      setMessage('Account created successfully.');
      setDisplayName('');
      setEmail('');
      setPassword('');
    } catch (error: any) {
      setStatus('error');
      setMessage(error?.message || 'Registration failed.');
    }
  };

  return (
    <section className="section page-section auth-page">
      <div className="section-head">
        <h2>Sign up</h2>
        <p>Create your Rep Rumble account.</p>
      </div>

      <form className="form-card" onSubmit={handleSubmit}>
        <label className="field-label">
          Display name
          <input
            className="field-input"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
        </label>
        <label className="field-label">
          Email
          <input
            className="field-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="field-label">
          Password
          <input
            className="field-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className="solid-btn" type="submit" disabled={status === 'loading'}>
          Create Account
        </button>
        {message && (
          <div className={status === 'error' ? 'form-error' : 'form-success'}>
            {message}
          </div>
        )}
        <p className="form-hint">
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>
      </form>
    </section>
  );
}
