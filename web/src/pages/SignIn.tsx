import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type AuthStatus = 'idle' | 'loading' | 'success' | 'error';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<AuthStatus>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || 'Login failed');
      }

      setStatus('success');
      setMessage('Signed in successfully.');
    } catch (error: any) {
      setStatus('error');
      setMessage(error?.message || 'Login failed.');
    }
  };

  return (
    <section className="section page-section auth-page" data-reveal>
      <div className="section-head">
        <h2>Sign in</h2>
        <p>Access your Rep Rumble account.</p>
      </div>

      <form className="form-card" data-reveal onSubmit={handleSubmit}>
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
          Sign In
        </button>
        {message && (
          <div className={status === 'error' ? 'form-error' : 'form-success'}>
            {message}
          </div>
        )}
        <p className="form-hint">
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </form>
    </section>
  );
}
