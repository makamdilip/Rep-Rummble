import React from 'react';
import { Link } from 'react-router-dom';

export default function Analytics() {
  const kpis = [
    { label: 'Consistency score', value: '86%', change: '+6% vs last week' },
    { label: 'Avg recovery', value: '82', change: 'HRV steady · 7h 22m sleep' },
    { label: 'Training load', value: '6,240', change: '+12% volume · 4 sessions' },
    { label: 'Macro split', value: '35 / 40 / 25', change: 'Protein / Carbs / Fat' },
  ];

  const readiness = [
    { label: 'Sleep', value: '7h 22m', delta: '+18m' },
    { label: 'HRV', value: '78 ms', delta: 'Stable' },
    { label: 'Resting HR', value: '54 bpm', delta: '-2' },
    { label: 'Stress', value: 'Low', delta: 'Green' },
  ];

  const weeklyLoad = [62, 74, 54, 72, 90, 66];
  const macroSplit = [
    { label: 'Protein', value: 35 },
    { label: 'Carbs', value: 40 },
    { label: 'Fat', value: 25 },
  ];

  return (
    <section className="section page-section analytics-page" data-reveal>
      <div className="section-head">
        <h2>Actionable analytics</h2>
        <p>
          From macros to recovery, Rep Rummble helps you understand what drives
          progress.
        </p>
      </div>

      <div className="analytics-hero" data-reveal>
        <div className="analytics-hero-copy">
          <span className="pill">Performance view</span>
          <h3>Connect habits to results in one glance.</h3>
          <p>
            See how meals, workouts, and recovery move together. Weekly
            highlights show what changed, why it changed, and what to do next.
          </p>
          <div className="analytics-highlights">
            <div>
              <strong>Weekly training load</strong>
              <span>Auto-updated</span>
            </div>
            <div>
              <strong>Macro balance</strong>
              <span>Goal aligned</span>
            </div>
            <div>
              <strong>Recovery readiness</strong>
              <span>Sleep + stress</span>
            </div>
          </div>
          <div className="page-actions">
            <Link className="solid-btn" to="/reports">
              Export Reports
            </Link>
            <Link className="ghost-btn" to="/plans">
              Compare Plans
            </Link>
          </div>
        </div>
        <div className="analytics-hero-card" data-reveal>
          <div className="analytics-kpi">
            <span>Consistency score</span>
            <strong>86%</strong>
            <small>Up 6% vs last week</small>
          </div>
          <div className="analytics-kpi">
            <span>Recovery readiness</span>
            <strong>High</strong>
            <small>Sleep 7h 25m · HRV stable</small>
          </div>
          <div className="analytics-kpi">
            <span>Macro split</span>
            <strong>35 / 40 / 25</strong>
            <small>Protein · Carbs · Fat</small>
          </div>
        </div>
      </div>

      <div className="dashboard-grid" data-stagger>
        {kpis.map((item) => (
          <div className="kpi-card" key={item.label}>
            <span className="muted">{item.label}</span>
            <strong>{item.value}</strong>
            <small>{item.change}</small>
          </div>
        ))}
      </div>

      <div className="chart-grid" data-stagger>
        <div className="chart-card animated-card">
          <div className="chart-header">
            <h4>Weekly training load</h4>
            <span>Auto-updated</span>
          </div>
          <div className="chart-bars">
            {weeklyLoad.map((h, idx) => (
              <span key={idx} style={{ '--bar-height': `${h}%` } as React.CSSProperties} />
            ))}
          </div>
        </div>
        <div className="chart-card glass animated-card">
          <div className="chart-header">
            <h4>Macro balance</h4>
            <span>Goal aligned</span>
          </div>
          <div className="chart-ring">
            <div className="ring">
              <span>Protein 35%</span>
            </div>
            <div className="ring-labels">
              {macroSplit.map((m) => (
                <span key={m.label}>
                  {m.label} {m.value}%
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid" data-stagger>
        {readiness.map((item) => (
          <div className="kpi-card light" key={item.label}>
            <div className="kpi-row">
              <span className="muted">{item.label}</span>
              <span className="pill">Today</span>
            </div>
            <strong>{item.value}</strong>
            <small>{item.delta}</small>
          </div>
        ))}
      </div>

      <div className="insight-grid" data-stagger>
        <div className="insight-card">
          <h4>Weekly training load</h4>
          <p>Volume +12% with steady recovery. Keep intensity stable.</p>
          <span className="pill">Auto-updated</span>
        </div>
        <div className="insight-card">
          <h4>Macro balance</h4>
          <p>Protein on target. Nudge carbs higher on training days.</p>
          <span className="pill">Goal aligned</span>
        </div>
        <div className="insight-card">
          <h4>Recovery readiness</h4>
          <p>Sleep debt cleared. Green-light strength sessions tomorrow.</p>
          <span className="pill">Recovery</span>
        </div>
      </div>
    </section>
  );
}

