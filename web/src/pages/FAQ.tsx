import React from 'react';

export default function FAQ() {
  return (
    <section className="section page-section" data-reveal>
      <div className="section-head">
        <h2>Frequently asked questions</h2>
        <p>Quick answers about plans, reports, and device support.</p>
      </div>

      <div className="accordion" data-stagger>
        <details className="accordion-item" open>
          <summary>How fast can I start?</summary>
          <p>Create an account and start logging meals or workouts in minutes.</p>
        </details>
        <details className="accordion-item">
          <summary>Can I export reports for doctors?</summary>
          <p>Yes. Reports export monthly, yearly, and historical summaries.</p>
        </details>
        <details className="accordion-item">
          <summary>Does it support wearables?</summary>
          <p>Rep Rumble is built to sync with major wearable platforms.</p>
        </details>
        <details className="accordion-item">
          <summary>Is it good for weight loss and weight gain?</summary>
          <p>Plans adapt based on your goal, intake, and training load.</p>
        </details>
        <details className="accordion-item">
          <summary>Can I share data with a coach?</summary>
          <p>Yes. Reports and exports can be shared with your care team.</p>
        </details>
      </div>
    </section>
  );
}
