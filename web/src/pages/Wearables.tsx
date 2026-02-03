import React from 'react';

export default function Wearables() {
  const devices = [
    { name: 'Apple Watch', status: 'Live', lastSync: '2m ago' },
    { name: 'Oura Ring', status: 'Live', lastSync: '5m ago' },
    { name: 'Garmin Scale', status: 'Queued', lastSync: '12m ago' },
    { name: 'Whoop', status: 'Paused', lastSync: '1d ago' },
  ];

  const metrics = [
    'Sleep stages',
    'Resting HR',
    'HRV',
    'Steps + activity',
    'Workouts',
    'Weight + body fat',
  ];

  return (
    <section className="section page-section" data-reveal>
      <div className="section-head">
        <h2>Wearables ready</h2>
        <p>
          Connect the devices you already use and keep data flowing across
          sleep, activity, recovery, and composition.
        </p>
      </div>

      <div className="device-grid" data-stagger>
        {devices.map((d) => (
          <div className="device-card" key={d.name}>
            <div className="device-row">
              <strong>{d.name}</strong>
              <span className={`pill ${d.status === 'Live' ? 'pill-live' : d.status === 'Queued' ? 'pill-queued' : ''}`}>
                {d.status}
              </span>
            </div>
            <small className="muted">Last sync · {d.lastSync}</small>
          </div>
        ))}
      </div>

      <div className="info-card" data-reveal>
        <h3>What we sync</h3>
        <p>Data ingested in real time and routed into analytics and reports.</p>
        <div className="detail-tags">
          {metrics.map((m) => (
            <span className="tag" key={m}>
              {m}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

