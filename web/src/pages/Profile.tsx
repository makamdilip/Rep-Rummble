import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Profile() {
  const wearableTags = ['Apple Watch', 'Oura Ring', 'Garmin Scale'];
  const prefTags = ['High protein', 'Low sugar', 'No dairy'];
  const healthTags = ['Knee recovery', 'Iron support', 'Stress management'];
  const deviceCatalog = ['Apple Watch', 'Oura Ring', 'Garmin', 'Whoop', 'Fitbit', 'Polar'];

  const [avatar, setAvatar] = useState<string | null>(null);
  const [profile, setProfile] = useState({
    name: 'Alex Rivera',
    email: 'alex@reprummble.test',
    goal: 'Lose 6 kg in 8 weeks',
    recovery: 'Sleep-first + mobility',
  });
  const [devices, setDevices] = useState([
    { name: 'Apple Watch', status: 'Live', lastSync: '2m ago' },
    { name: 'Oura Ring', status: 'Live', lastSync: '5m ago' },
  ]);
  const [newDevice, setNewDevice] = useState(deviceCatalog[0]);
  const deviceOptions = useMemo(
    () => deviceCatalog.filter((d) => !devices.some((x) => x.name === d)),
    [deviceCatalog, devices]
  );

  const handleAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatar(url);
  };

  const handleProfileChange = (key: keyof typeof profile, value: string) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddDevice = () => {
    if (!newDevice) return;
    setDevices((prev) => [...prev, { name: newDevice, status: 'Live', lastSync: 'Just now' }]);
  };

  const handleRemoveDevice = (name: string) => {
    setDevices((prev) => prev.filter((d) => d.name !== name));
  };

  return (
    <section className="section split page-section profile-page" data-reveal>
      <div>
        <h2>Your profile is the control center</h2>
        <p>
          Manage goals, health notes, nutrition preferences, and wearable data
          from one place.
        </p>
        <div className="checklist" data-stagger>
          <span>Weight loss or weight gain paths</span>
          <span>Meal preferences and allergies</span>
          <span>Health issues & doctor notes</span>
          <span>Progress history and snapshots</span>
        </div>
        <div className="profile-insights" data-stagger>
          <div>
            <strong>Next check-in</strong>
            <span>Feb 8, 2026 · Coach review</span>
          </div>
          <div>
            <strong>Membership</strong>
            <span>Pro plan · Monthly billing</span>
          </div>
          <div>
            <strong>Connected wearables</strong>
            <span>Apple Watch, Oura Ring, Garmin Scale</span>
          </div>
        </div>
        <div className="page-actions" data-stagger>
          <Link className="solid-btn" to="/reports">
            View Reports
          </Link>
          <Link className="ghost-btn" to="/services">
            Explore Services
          </Link>
        </div>
      </div>
      <div className="profile-stack">
        <div className="profile-card" data-reveal>
          <div className="profile-row">
            <div>
              <h4>Profile Signal</h4>
              <p>Weight loss · 8 week cycle</p>
            </div>
            <span className="pill">Adaptive</span>
          </div>
          <div className="profile-metrics">
            <div>
              <h3>74 kg</h3>
              <p>Current</p>
            </div>
            <div>
              <h3>68 kg</h3>
              <p>Target</p>
            </div>
            <div>
              <h3>2.1k</h3>
              <p>Daily kcal</p>
            </div>
          </div>
          <div className="profile-progress">
            <span>Progress</span>
            <div className="progress-track">
              <div className="progress-fill" />
            </div>
          </div>
        </div>

        <div className="profile-card profile-details" data-reveal>
          <div className="profile-row">
            <div>
              <h4>Member profile</h4>
              <p>Pro member · Joined Feb 2025</p>
            </div>
            <span className="pill">Active</span>
          </div>
          <div className="profile-detail-grid">
            <div>
              <span className="detail-label">Name</span>
              <strong className="detail-value">Alex Rivera</strong>
            </div>
            <div>
              <span className="detail-label">Email</span>
              <strong className="detail-value">alex@reprummble.test</strong>
            </div>
            <div>
              <span className="detail-label">Goal focus</span>
              <strong className="detail-value">Lose 6 kg in 8 weeks</strong>
            </div>
            <div>
              <span className="detail-label">Recovery plan</span>
              <strong className="detail-value">Sleep-first + mobility</strong>
            </div>
          </div>
          <div>
            <span className="detail-label">Preferences</span>
            <div className="detail-tags">
              {prefTags.map((t) => (
                <span className="tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div>
            <span className="detail-label">Health notes</span>
            <div className="detail-tags">
              {healthTags.map((t) => (
                <span className="tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div>
            <span className="detail-label">Connected wearables</span>
            <div className="detail-tags">
              {wearableTags.map((t) => (
                <span className="tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="settings-card" data-reveal>
          <div className="settings-header">
            <h4>Profile settings</h4>
            <span className="pill">Local preview</span>
          </div>
          <div className="settings-grid">
            <div className="avatar-uploader">
              <div className="avatar-preview">{avatar ? <img src={avatar} alt="Avatar" /> : <span>RR</span>}</div>
              <label className="ghost-btn upload-btn">
                Change photo
                <input type="file" accept="image/*" onChange={handleAvatar} />
              </label>
            </div>
            <div className="settings-fields">
              <label className="field-label">
                Name
                <input
                  className="field-input"
                  value={profile.name}
                  onChange={(e) => handleProfileChange('name', e.target.value)}
                />
              </label>
              <label className="field-label">
                Email
                <input
                  className="field-input"
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleProfileChange('email', e.target.value)}
                />
              </label>
              <label className="field-label">
                Goal
                <input
                  className="field-input"
                  value={profile.goal}
                  onChange={(e) => handleProfileChange('goal', e.target.value)}
                />
              </label>
              <label className="field-label">
                Recovery plan
                <input
                  className="field-input"
                  value={profile.recovery}
                  onChange={(e) => handleProfileChange('recovery', e.target.value)}
                />
              </label>
            </div>
          </div>
        </div>

        <div className="settings-card" data-reveal>
          <div className="settings-header">
            <h4>Devices & wearables</h4>
            <span className="pill">Live sync</span>
          </div>
          <div className="device-manage">
            <div className="device-add">
              <label className="field-label">
                Add wearable
                <select
                  className="field-input"
                  value={newDevice}
                  onChange={(e) => setNewDevice(e.target.value)}
                  disabled={!deviceOptions.length}
                >
                  {deviceOptions.length === 0 ? (
                    <option>No more devices</option>
                  ) : (
                    deviceOptions.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))
                  )}
                </select>
              </label>
              <button className="solid-btn" type="button" onClick={handleAddDevice} disabled={!deviceOptions.length}>
                Add device
              </button>
            </div>
            <div className="device-list">
              {devices.map((d) => (
                <div className="device-row" key={d.name}>
                  <div>
                    <strong>{d.name}</strong>
                    <p className="muted">Status: {d.status} · Last sync {d.lastSync}</p>
                  </div>
                  <button className="ghost-btn" type="button" onClick={() => handleRemoveDevice(d.name)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
