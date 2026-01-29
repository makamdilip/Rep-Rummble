import React from 'react';
import { Link } from 'react-router-dom';

export default function Analytics() {
  return (
    <section className="section page-section" data-reveal>
      <div className="section-head">
        <h2>Actionable analytics</h2>
        <p>
          From macros to recovery, Rep Rumble helps you understand what drives
          progress.
        </p>
      </div>

      <div className="analytics-grid" data-stagger>
        <div className="analytics-card">
          <h3>Nutrition balance</h3>
          <p>Track calories, macros, hydration, and micronutrients.</p>
          <span className="pill">Nutrition</span>
        </div>
        <div className="analytics-card">
          <h3>Workout performance</h3>
          <p>Volume, load, tempo, and cardio intensity insights.</p>
          <span className="pill">Training</span>
        </div>
        <div className="analytics-card">
          <h3>Recovery readiness</h3>
          <p>Sleep, resting heart rate, and stress trends in one view.</p>
          <span className="pill">Recovery</span>
        </div>
        <div className="analytics-card">
          <h3>Health logging</h3>
          <p>Capture symptoms, injuries, and notes for your doctor.</p>
          <span className="pill">Health</span>
        </div>
      </div>

      <div className="chart-grid" data-stagger>
        <div className="chart-card animated-card">
          <div className="chart-header">
            <h4>Weekly training load</h4>
            <span>Auto-updated</span>
          </div>
          <div className="chart-bars">
            <span style={{ '--bar-height': '60%' } as React.CSSProperties} />
            <span style={{ '--bar-height': '82%' } as React.CSSProperties} />
            <span style={{ '--bar-height': '54%' } as React.CSSProperties} />
            <span style={{ '--bar-height': '72%' } as React.CSSProperties} />
            <span style={{ '--bar-height': '90%' } as React.CSSProperties} />
            <span style={{ '--bar-height': '66%' } as React.CSSProperties} />
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
              <span>Carbs 40%</span>
              <span>Fat 25%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="skeleton-grid" data-stagger>
        <div className="skeleton-card">
          <div className="skeleton-line wide" />
          <div className="skeleton-line" />
          <div className="skeleton-line" />
        </div>
        <div className="skeleton-card">
          <div className="skeleton-line wide" />
          <div className="skeleton-line" />
          <div className="skeleton-line" />
        </div>
        <div className="skeleton-card">
          <div className="skeleton-line wide" />
          <div className="skeleton-line" />
          <div className="skeleton-line" />
        </div>
      </div>

      <div className="page-actions" data-stagger>
        <Link className="solid-btn" to="/reports">
          Export Reports
        </Link>
        <Link className="ghost-btn" to="/plans">
          Compare Plans
        </Link>
      </div>
    </section>
  );
}
