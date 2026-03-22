import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';
import api from '../config/api';

const GOAL_OPTIONS = ['Weight loss', 'Muscle gain', 'Improve endurance', 'Maintain weight', 'General fitness', 'Injury recovery'];
const ACTIVITY_OPTIONS = ['Sedentary', 'Lightly active', 'Moderately active', 'Very active', 'Athlete'];
const DEVICE_CATALOG = ['Apple Watch', 'Oura Ring', 'Garmin', 'Whoop', 'Fitbit', 'Polar'];
const DIET_OPTIONS = ['High protein', 'Low sugar', 'No dairy', 'No gluten', 'Vegan', 'Vegetarian', 'Keto', 'Halal', 'Kosher'];
const NOTIFICATION_KEYS = [
  { key: 'workout_reminders', label: 'Workout reminders', desc: 'Daily nudges to complete your session' },
  { key: 'weekly_reports', label: 'Weekly progress report', desc: 'Summary of your week every Sunday' },
  { key: 'challenge_updates', label: 'Challenge updates', desc: 'Alerts when challenges start or end' },
  { key: 'recovery_alerts', label: 'Recovery alerts', desc: 'Flagged when readiness is low' },
  { key: 'marketing', label: 'Tips & product news', desc: 'Occasional updates and feature announcements' },
];

type SaveStatus = 'idle' | 'loading' | 'success' | 'error';

export default function Profile() {
  const navigate = useNavigate();

  // Profile state
  const [avatar, setAvatar] = useState<string | null>(null);
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [profileStatus, setProfileStatus] = useState<SaveStatus>('idle');

  // Password reset state
  const [passwordStatus, setPasswordStatus] = useState<'idle' | 'sent' | 'error'>('idle');

  // Goals & preferences
  const [goal, setGoal] = useState('');
  const [activity, setActivity] = useState('');
  const [diets, setDiets] = useState<string[]>([]);
  const [goalsStatus, setGoalsStatus] = useState<SaveStatus>('idle');

  // Notifications
  const [notifications, setNotifications] = useState<Record<string, boolean>>({
    workout_reminders: true,
    weekly_reports: true,
    challenge_updates: true,
    recovery_alerts: true,
    marketing: false,
  });
  const [notifStatus, setNotifStatus] = useState<SaveStatus>('idle');

  // Devices
  const [devices, setDevices] = useState<{ name: string; lastSync: string }[]>([]);
  const [newDevice, setNewDevice] = useState('');

  // Delete account modal
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [deleteReason, setDeleteReason] = useState('');
  const [deleteStatus, setDeleteStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      const meta = user.user_metadata || {};
      setProfile({
        name: meta.displayName || meta.full_name || '',
        email: user.email || '',
      });
      setGoal(meta.goal || '');
      setActivity(meta.activity || '');
      setDiets(meta.diets || []);
      setNotifications((prev) => ({ ...prev, ...(meta.notifications || {}) }));
      setDevices(meta.devices || []);
    });
  }, []);

  // ── Profile save ──────────────────────────────────────────
  const handleProfileSave = async () => {
    setProfileStatus('loading');
    const result = await api.auth.updateProfile({ displayName: profile.name });
    setProfileStatus(result.error ? 'error' : 'success');
    setTimeout(() => setProfileStatus('idle'), 2500);
  };

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAvatar(URL.createObjectURL(file));
  };

  // ── Password reset ────────────────────────────────────────
  const handlePasswordReset = async () => {
    setPasswordStatus('idle');
    const { error } = await supabase.auth.resetPasswordForEmail(profile.email, {
      redirectTo: `${window.location.origin}/auth/callback`,
    });
    setPasswordStatus(error ? 'error' : 'sent');
  };

  // ── Goals save ───────────────────────────────────────────
  const handleGoalsSave = async () => {
    setGoalsStatus('loading');
    const result = await api.auth.updateProfile({ displayName: profile.name } as any);
    // Store in Supabase user_metadata via updateUser
    const { error } = await supabase.auth.updateUser({
      data: { goal, activity, diets },
    });
    setGoalsStatus(error || result.error ? 'error' : 'success');
    setTimeout(() => setGoalsStatus('idle'), 2500);
  };

  const toggleDiet = (tag: string) => {
    setDiets((prev) => prev.includes(tag) ? prev.filter((d) => d !== tag) : [...prev, tag]);
  };

  // ── Notifications save ────────────────────────────────────
  const handleNotifSave = async () => {
    setNotifStatus('loading');
    const { error } = await supabase.auth.updateUser({ data: { notifications } });
    setNotifStatus(error ? 'error' : 'success');
    setTimeout(() => setNotifStatus('idle'), 2500);
  };

  // ── Devices ───────────────────────────────────────────────
  const availableDevices = DEVICE_CATALOG.filter((d) => !devices.some((x) => x.name === d));

  const handleAddDevice = async () => {
    if (!newDevice) return;
    const updated = [...devices, { name: newDevice, lastSync: 'Just now' }];
    setDevices(updated);
    setNewDevice('');
    await supabase.auth.updateUser({ data: { devices: updated } });
  };

  const handleRemoveDevice = async (name: string) => {
    const updated = devices.filter((d) => d.name !== name);
    setDevices(updated);
    await supabase.auth.updateUser({ data: { devices: updated } });
  };

  // ── Delete account ────────────────────────────────────────
  const handleDeleteAccount = async () => {
    if (deleteConfirm !== profile.email) return;
    setDeleteStatus('loading');
    const result = await api.auth.deleteAccount();
    if (result.error) {
      setDeleteStatus('error');
      return;
    }
    await supabase.auth.signOut();
    navigate('/', { replace: true });
  };

  const initials = profile.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() || 'RR';

  return (
    <div className="settings-page" data-reveal>
      <div className="settings-header-bar">
        <div>
          <h1 className="settings-title">Settings</h1>
          <p className="settings-subtitle">Manage your account, preferences, and data.</p>
        </div>
      </div>

      {/* ── PROFILE ─────────────────────────────────────── */}
      <section className="settings-section" id="profile">
        <div className="settings-section-label">
          <span className="settings-section-icon">👤</span>
          <div>
            <h2>Profile</h2>
            <p>Your display name and avatar.</p>
          </div>
        </div>
        <div className="settings-section-body">
          <div className="avatar-row">
            <div className="avatar-preview-lg">
              {avatar ? <img src={avatar} alt="Avatar" /> : <span>{initials}</span>}
            </div>
            <div>
              <label className="ghost-btn upload-btn" style={{ cursor: 'pointer' }}>
                Change photo
                <input type="file" accept="image/*" onChange={handleAvatar} style={{ display: 'none' }} />
              </label>
              <p className="settings-hint">JPG or PNG. Max 2 MB.</p>
            </div>
          </div>
          <div className="settings-fields">
            <label className="field-label">
              Display name
              <input
                className="field-input"
                value={profile.name}
                onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                placeholder="Your name"
              />
            </label>
            <label className="field-label">
              Email address
              <input className="field-input" type="email" value={profile.email} readOnly />
              <span className="settings-hint">Email cannot be changed here. Contact support to update it.</span>
            </label>
          </div>
          <div className="settings-actions">
            <button className="solid-btn" onClick={handleProfileSave} disabled={profileStatus === 'loading'}>
              {profileStatus === 'loading' ? 'Saving…' : profileStatus === 'success' ? '✓ Saved' : 'Save profile'}
            </button>
            {profileStatus === 'error' && <span className="form-error">Save failed. Try again.</span>}
          </div>
        </div>
      </section>

      {/* ── SECURITY ─────────────────────────────────────── */}
      <section className="settings-section" id="security">
        <div className="settings-section-label">
          <span className="settings-section-icon">🔐</span>
          <div>
            <h2>Security</h2>
            <p>Password and sign-in methods.</p>
          </div>
        </div>
        <div className="settings-section-body">
          <div className="settings-row">
            <div>
              <strong>Password</strong>
              <p className="settings-hint">We'll send a reset link to {profile.email || 'your email'}.</p>
            </div>
            <button className="ghost-btn" onClick={handlePasswordReset}>
              Send reset email
            </button>
          </div>
          {passwordStatus === 'sent' && (
            <p className="form-success">Reset email sent — check your inbox.</p>
          )}
          {passwordStatus === 'error' && (
            <p className="form-error">Failed to send. Try again.</p>
          )}
          <hr className="settings-divider" />
          <div className="settings-row">
            <div>
              <strong>Sign-in providers</strong>
              <p className="settings-hint">Connected OAuth accounts are managed via the provider's settings.</p>
            </div>
            <div className="provider-chips">
              <span className="provider-chip">Google</span>
              <span className="provider-chip">Apple</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── GOALS & PREFERENCES ──────────────────────────── */}
      <section className="settings-section" id="goals">
        <div className="settings-section-label">
          <span className="settings-section-icon">🎯</span>
          <div>
            <h2>Goals & preferences</h2>
            <p>Personalises your training and nutrition plan.</p>
          </div>
        </div>
        <div className="settings-section-body">
          <div className="settings-fields">
            <label className="field-label">
              Primary goal
              <select className="field-input" value={goal} onChange={(e) => setGoal(e.target.value)}>
                <option value="">Select a goal</option>
                {GOAL_OPTIONS.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </label>
            <label className="field-label">
              Activity level
              <select className="field-input" value={activity} onChange={(e) => setActivity(e.target.value)}>
                <option value="">Select activity level</option>
                {ACTIVITY_OPTIONS.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </label>
          </div>
          <div>
            <p className="field-label" style={{ marginBottom: 10 }}>Dietary preferences</p>
            <div className="tag-picker">
              {DIET_OPTIONS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className={`tag-pick-btn${diets.includes(tag) ? ' selected' : ''}`}
                  onClick={() => toggleDiet(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          <div className="settings-actions">
            <button className="solid-btn" onClick={handleGoalsSave} disabled={goalsStatus === 'loading'}>
              {goalsStatus === 'loading' ? 'Saving…' : goalsStatus === 'success' ? '✓ Saved' : 'Save goals'}
            </button>
            {goalsStatus === 'error' && <span className="form-error">Save failed. Try again.</span>}
          </div>
        </div>
      </section>

      {/* ── NOTIFICATIONS ────────────────────────────────── */}
      <section className="settings-section" id="notifications">
        <div className="settings-section-label">
          <span className="settings-section-icon">🔔</span>
          <div>
            <h2>Notifications</h2>
            <p>Choose which emails you receive from us.</p>
          </div>
        </div>
        <div className="settings-section-body">
          <div className="notif-list">
            {NOTIFICATION_KEYS.map(({ key, label, desc }) => (
              <div className="notif-row" key={key}>
                <div>
                  <strong>{label}</strong>
                  <p className="settings-hint">{desc}</p>
                </div>
                <button
                  type="button"
                  className={`toggle-btn${notifications[key] ? ' on' : ''}`}
                  onClick={() => setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))}
                  aria-label={notifications[key] ? 'Turn off' : 'Turn on'}
                >
                  <span className="toggle-knob" />
                </button>
              </div>
            ))}
          </div>
          <div className="settings-actions">
            <button className="solid-btn" onClick={handleNotifSave} disabled={notifStatus === 'loading'}>
              {notifStatus === 'loading' ? 'Saving…' : notifStatus === 'success' ? '✓ Saved' : 'Save preferences'}
            </button>
            {notifStatus === 'error' && <span className="form-error">Save failed. Try again.</span>}
          </div>
        </div>
      </section>

      {/* ── CONNECTED DEVICES ────────────────────────────── */}
      <section className="settings-section" id="devices">
        <div className="settings-section-label">
          <span className="settings-section-icon">⌚</span>
          <div>
            <h2>Connected devices</h2>
            <p>Wearables that sync data into your dashboard.</p>
          </div>
        </div>
        <div className="settings-section-body">
          {devices.length > 0 && (
            <div className="device-list">
              {devices.map((d) => (
                <div className="device-row-settings" key={d.name}>
                  <div className="device-icon-wrap">⌚</div>
                  <div className="device-info">
                    <strong>{d.name}</strong>
                    <span className="settings-hint">Last sync: {d.lastSync}</span>
                  </div>
                  <button className="remove-btn" type="button" onClick={() => handleRemoveDevice(d.name)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
          {availableDevices.length > 0 && (
            <div className="device-add-row">
              <select className="field-input" value={newDevice} onChange={(e) => setNewDevice(e.target.value)}>
                <option value="">Select a device to add</option>
                {availableDevices.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
              <button className="solid-btn" type="button" onClick={handleAddDevice} disabled={!newDevice}>
                Add device
              </button>
            </div>
          )}
          {availableDevices.length === 0 && devices.length === 0 && (
            <p className="settings-hint">No devices added yet. Select one above to connect.</p>
          )}
        </div>
      </section>

      {/* ── PRIVACY & DATA ───────────────────────────────── */}
      <section className="settings-section" id="privacy">
        <div className="settings-section-label">
          <span className="settings-section-icon">🔒</span>
          <div>
            <h2>Privacy & data</h2>
            <p>Your data rights and how we use your information.</p>
          </div>
        </div>
        <div className="settings-section-body">
          <div className="settings-row">
            <div>
              <strong>Privacy Policy</strong>
              <p className="settings-hint">How we collect, use, and protect your data.</p>
            </div>
            <a className="ghost-btn" href="/privacy" target="_blank" rel="noopener noreferrer">
              View policy →
            </a>
          </div>
          <hr className="settings-divider" />
          <div className="settings-row">
            <div>
              <strong>Request data export</strong>
              <p className="settings-hint">Download a copy of all data we hold about you (GDPR Article 20).</p>
            </div>
            <a className="ghost-btn" href="/contact">
              Contact support →
            </a>
          </div>
          <hr className="settings-divider" />
          <div className="settings-row">
            <div>
              <strong>Terms of Service</strong>
              <p className="settings-hint">The rules governing use of Reprummble.</p>
            </div>
            <a className="ghost-btn" href="/terms" target="_blank" rel="noopener noreferrer">
              View terms →
            </a>
          </div>
        </div>
      </section>

      {/* ── DANGER ZONE ──────────────────────────────────── */}
      <section className="settings-section danger-section" id="danger">
        <div className="settings-section-label">
          <span className="settings-section-icon">⚠️</span>
          <div>
            <h2>Danger zone</h2>
            <p>Irreversible actions. Proceed with care.</p>
          </div>
        </div>
        <div className="settings-section-body">
          <div className="settings-row">
            <div>
              <strong>Delete my account</strong>
              <p className="settings-hint">
                Permanently deletes your account, all health data, workout logs, meal
                history, and personal information. This cannot be undone.
              </p>
            </div>
            <button className="danger-btn" type="button" onClick={() => setDeleteOpen(true)}>
              Delete account
            </button>
          </div>
        </div>
      </section>

      {/* ── DELETE CONFIRMATION MODAL ─────────────────────── */}
      {deleteOpen && (
        <div className="modal-overlay" onClick={() => { setDeleteOpen(false); setDeleteConfirm(''); setDeleteReason(''); setDeleteStatus('idle'); }}>
          <div className="modal-card danger-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-icon">⚠️</span>
              <h2>Delete your account</h2>
              <button className="icon-close" onClick={() => { setDeleteOpen(false); setDeleteConfirm(''); setDeleteReason(''); setDeleteStatus('idle'); }}>×</button>
            </div>
            <div className="modal-body">
              <div className="danger-warning-box">
                <p><strong>This action is permanent and cannot be undone.</strong></p>
                <p>The following will be deleted immediately:</p>
                <ul>
                  <li>Your account and login credentials</li>
                  <li>All workout logs and training plans</li>
                  <li>All meal entries and nutrition history</li>
                  <li>All body metrics and progress data</li>
                  <li>All wearable sync data and reports</li>
                </ul>
              </div>

              <label className="field-label">
                Why are you leaving? <span className="settings-hint">(optional)</span>
                <select className="field-input" value={deleteReason} onChange={(e) => setDeleteReason(e.target.value)}>
                  <option value="">Select a reason</option>
                  <option value="not_using">I don't use it anymore</option>
                  <option value="missing_features">Missing features I need</option>
                  <option value="too_expensive">Too expensive</option>
                  <option value="privacy">Privacy concerns</option>
                  <option value="switching">Switching to another app</option>
                  <option value="other">Other</option>
                </select>
              </label>

              <label className="field-label">
                Type your email address to confirm
                <input
                  className="field-input"
                  type="email"
                  placeholder={profile.email}
                  value={deleteConfirm}
                  onChange={(e) => setDeleteConfirm(e.target.value)}
                  autoComplete="off"
                />
                <span className="settings-hint">Enter: <strong>{profile.email}</strong></span>
              </label>

              {deleteStatus === 'error' && (
                <p className="form-error">Failed to delete account. Please try again or contact support.</p>
              )}
            </div>
            <div className="modal-footer">
              <button className="ghost-btn" type="button" onClick={() => { setDeleteOpen(false); setDeleteConfirm(''); setDeleteReason(''); setDeleteStatus('idle'); }}>
                Cancel
              </button>
              <button
                className="danger-btn"
                type="button"
                onClick={handleDeleteAccount}
                disabled={deleteConfirm !== profile.email || deleteStatus === 'loading'}
              >
                {deleteStatus === 'loading' ? 'Deleting…' : 'Permanently delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
