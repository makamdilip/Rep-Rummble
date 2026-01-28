import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { FaApple, FaFacebookF, FaGoogle } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export default function Layout() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [authMessage, setAuthMessage] = useState('');
  const [authStatus, setAuthStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!profileRef.current) return;
      if (!profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };

    if (profileOpen) {
      document.addEventListener('mousedown', handleClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [profileOpen]);

  const handleAuthSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setAuthStatus('loading');
    setAuthMessage('');

    try {
      const endpoint = authMode === 'signin' ? '/api/auth/login' : '/api/auth/register';
      const payload =
        authMode === 'signin'
          ? { email: formData.email, password: formData.password }
          : { email: formData.email, password: formData.password, displayName: formData.name };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || 'Unable to sign in');
      }

      setAuthStatus('success');
      setAuthMessage(authMode === 'signin' ? 'Signed in successfully.' : 'Account created.');
      setIsLoggedIn(true);
      setFormData({ name: '', email: '', password: '' });
    } catch (error: any) {
      setAuthStatus('error');
      setAuthMessage(error?.message || 'Something went wrong.');
    }
  };

  const handleAuthModeChange = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setAuthMessage('');
    setAuthStatus('idle');
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setAuthMode('signin');
    setAuthMessage('');
    setAuthStatus('idle');
  };

  return (
    <div className="marketing-page">
      <header className="marketing-header">
        <Link to="/" className="brand brand-link">
          <span className="brand-mark">RR</span>
          <span className="brand-name">Rep Rumble</span>
        </Link>
        <nav className="marketing-nav">
          <NavLink to="/services" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            Services
          </NavLink>
          <NavLink to="/plans" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            Plans
          </NavLink>
          <NavLink to="/faq" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            FAQ
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            Contact Us
          </NavLink>
        </nav>
        <div className="profile-shell" ref={profileRef}>
          <button className="profile-button" onClick={() => setProfileOpen((prev) => !prev)}>
            <span className="avatar">RR</span>
            <span>Profile</span>
          </button>
          {profileOpen && (
            <div className="profile-popover">
              <div className="popover-column">
                <div className="popover-tabs">
                  <button
                    className={`tab-chip${authMode === 'signin' ? ' active' : ''}`}
                    onClick={() => handleAuthModeChange('signin')}
                  >
                    Sign In
                  </button>
                  <button
                    className={`tab-chip${authMode === 'signup' ? ' active' : ''}`}
                    onClick={() => handleAuthModeChange('signup')}
                  >
                    Sign Up
                  </button>
                </div>

                <form className="popover-form" onSubmit={handleAuthSubmit}>
                  {authMode === 'signup' && (
                    <label className="field-label">
                      Name
                      <input
                        className="field-input"
                        value={formData.name}
                        onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                        required
                      />
                    </label>
                  )}
                  <label className="field-label">
                    Email
                    <input
                      className="field-input"
                      type="email"
                      value={formData.email}
                      onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                      required
                    />
                  </label>
                  <label className="field-label">
                    Password
                    <input
                      className="field-input"
                      type="password"
                      value={formData.password}
                      onChange={(event) => setFormData((prev) => ({ ...prev, password: event.target.value }))}
                      required
                    />
                  </label>
                  <button className="solid-btn" type="submit" disabled={authStatus === 'loading'}>
                    {authMode === 'signin' ? 'Sign In' : 'Create Account'}
                  </button>
                  {authMessage && (
                    <div className={authStatus === 'error' ? 'form-error' : 'form-success'}>
                      {authMessage}
                    </div>
                  )}
                </form>

                <div className="social-buttons">
                  <a className="social-btn google" href="/api/auth/oauth/google">
                    <FaGoogle className="social-icon" />
                    <span className="sr-only">Continue with Google</span>
                  </a>
                  <a className="social-btn apple" href="/api/auth/oauth/apple">
                    <FaApple className="social-icon" />
                    <span className="sr-only">Continue with Apple</span>
                  </a>
                  <a className="social-btn facebook" href="/api/auth/oauth/facebook">
                    <FaFacebookF className="social-icon" />
                    <span className="sr-only">Continue with Facebook</span>
                  </a>
                  <a className="social-btn twitter" href="/api/auth/oauth/twitter">
                    <FaXTwitter className="social-icon" />
                    <span className="sr-only">Continue with Twitter</span>
                  </a>
                </div>
              </div>

              <div className="popover-column menu-column">
                <div className="menu-card">
                  <div className="menu-header">
                    <span className="avatar large">RR</span>
                    <div>
                      <div className="menu-title">Your account</div>
                      <div className="menu-sub">rep@rumble.app</div>
                    </div>
                  </div>
                  <div className="menu-list">
                    <Link to="/analytics">Analytics</Link>
                    <Link to="/reports">Reports</Link>
                    <Link to="/referral">Refer</Link>
                    <Link to="/payment">Payment</Link>
                    <Link to="/profile">Settings</Link>
                    <button className="menu-signout" type="button" onClick={handleSignOut}>
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="page">
        <Outlet />
      </main>

      <Link className="fab" to="/signup" aria-label="Create account">
        +
      </Link>

      <footer className="marketing-footer">
        <span>(c) 2026 Rep Rumble</span>
        <div>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/support">Support</Link>
        </div>
      </footer>
    </div>
  );
}
