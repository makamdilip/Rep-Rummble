import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { FaApple, FaFacebookF } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export default function Layout() {
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [authMessage, setAuthMessage] = useState('');
  const [authStatus, setAuthStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [footerVisible, setFooterVisible] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const profileRef = useRef<HTMLDivElement>(null);
  const lastScroll = useRef(0);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    setTransitioning(true);
    const timeout = window.setTimeout(() => setTransitioning(false), 750);
    return () => window.clearTimeout(timeout);
  }, [location.pathname]);

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

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const nearTop = scrollY <= 20;
      const nearBottom = scrollY >= Math.max(0, maxScroll - 20);
      const scrollingDown = scrollY > lastScroll.current;

      if (nearTop) {
        setHeaderVisible(true);
      } else if (scrollingDown) {
        setHeaderVisible(false);
      }

      if (nearBottom) {
        setFooterVisible(true);
      } else if (!scrollingDown) {
        setFooterVisible(false);
      }

      lastScroll.current = scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal], [data-stagger]'));
    if (!nodes.length) return;

    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [location.pathname]);

  const handleAuthSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setAuthStatus('loading');
    setAuthMessage('');

    try {
      if (authMode === 'signup' && !formData.name.trim()) {
        setAuthStatus('error');
        setAuthMessage('Please enter your name to continue.');
        return;
      }
      if (!formData.email.trim() || !formData.password.trim()) {
        setAuthStatus('error');
        setAuthMessage('Please enter your email and password.');
        return;
      }

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
      setAuthOpen(false);
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

  const handleProfileClick = () => {
    if (isLoggedIn) {
      setProfileOpen((prev) => !prev);
    } else {
      setProfileOpen(false);
      setAuthOpen(true);
    }
  };

  return (
    <div className="marketing-page">
      <div className={`route-transition${transitioning ? ' active' : ''}`} aria-hidden="true">
        <span />
        <span />
      </div>
      <header className={`marketing-header${headerVisible ? '' : ' hidden'}`}>
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
          <button className="profile-button icon-only" onClick={handleProfileClick} aria-label="Open profile">
            <span className="avatar">RR</span>
          </button>
          {profileOpen && isLoggedIn && (
            <div className="profile-popover menu-only">
              <div className="popover-column">
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

      {authOpen && !isLoggedIn && (
        <div className="auth-modal" onClick={() => setAuthOpen(false)}>
          <div className="auth-card" onClick={(event) => event.stopPropagation()}>
            <div className="auth-card-header">
              <div>
                <h2>Welcome back</h2>
                <p>Sign in or create a new account in seconds.</p>
              </div>
              <button className="icon-close" type="button" onClick={() => setAuthOpen(false)} aria-label="Close">
                ×
              </button>
            </div>
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
            <form className="popover-form compact" onSubmit={handleAuthSubmit} noValidate>
              {authMode === 'signup' && (
                <label className="field-label">
                  Name
                  <input
                    className="field-input"
                    value={formData.name}
                    onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
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
                />
              </label>
              <label className="field-label">
                Password
                <input
                  className="field-input"
                  type="password"
                  value={formData.password}
                  onChange={(event) => setFormData((prev) => ({ ...prev, password: event.target.value }))}
                />
              </label>
              <button className="solid-btn" type="submit" disabled={authStatus === 'loading'}>
                {authMode === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
              {authMessage && (
                <div className={authStatus === 'error' ? 'form-error' : 'form-success'}>{authMessage}</div>
              )}
            </form>
            <div className="social-buttons">
              <a className="social-btn google" href="/api/auth/oauth/google">
                <svg
                  className="social-icon google-multi"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.2 0 5.4 1.4 6.7 2.6l4.9-4.9C32.6 4.4 28.8 2.5 24 2.5 14.9 2.5 7.1 7.9 3.4 15.7l5.8 4.5C11.4 13.6 17.2 9.5 24 9.5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.5 24.5c0-1.6-.1-2.8-.4-4.1H24v7.8h12.7c-.3 2-1.6 5-4.6 7.1l5.7 4.4c3.4-3.1 5.7-7.8 5.7-15.2z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M9.2 28.2c-.5-1.4-.8-2.9-.8-4.7s.3-3.3.8-4.7l-5.8-4.5C1.9 16.7 1 20.1 1 23.5s.9 6.8 2.4 9.7l5.8-4.5z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 44.5c6.5 0 12-2.1 16-5.8l-5.7-4.4c-1.5 1-3.5 1.8-10.3 1.8-6.7 0-12.4-4.1-14.4-9.8l-5.8 4.5C7.1 39.1 14.9 44.5 24 44.5z"
                  />
                </svg>
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
        </div>
      )}

      <main className="page" key={location.pathname}>
        <Outlet />
      </main>

      <Link className="fab" to="/signup" aria-label="Create account">
        +
      </Link>

      <footer className={`marketing-footer${footerVisible ? '' : ' hidden'}`}>
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
