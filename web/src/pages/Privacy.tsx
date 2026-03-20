import React, { useState } from 'react';

interface PolicySection {
  id: string;
  title: string;
  icon: string;
  summary: string;
  details: React.ReactNode;
}

const policySections: PolicySection[] = [
  {
    id: 'intro',
    title: 'Introduction',
    icon: '👋',
    summary: 'Our commitment to protecting your privacy',
    details: (
      <>
        <p>
          Rep Rummble ("we," "our," or "us") is committed to protecting your privacy.
          This Privacy Policy explains how we collect, use, disclose, and safeguard your
          information when you use our mobile application and website.
        </p>
        <p>
          We believe in transparency and want you to understand exactly how your data
          is handled. If you have any questions, our support team is always ready to help.
        </p>
      </>
    ),
  },
  {
    id: 'collect',
    title: 'What We Collect',
    icon: '📋',
    summary: 'Personal info, health data, and technical details',
    details: (
      <>
        <h4>Personal Information</h4>
        <ul>
          <li>Name and email when you sign up</li>
          <li>Profile details you choose to add</li>
          <li>Payment info for premium plans</li>
        </ul>
        <h4>Health & Fitness Data</h4>
        <ul>
          <li>Meal logs and food photos</li>
          <li>Workout and exercise data</li>
          <li>Body metrics (weight, measurements)</li>
          <li>Wearable device data</li>
        </ul>
        <h4>Technical Data</h4>
        <ul>
          <li>Device type and OS</li>
          <li>App usage patterns</li>
          <li>Analytics for improvement</li>
        </ul>
      </>
    ),
  },
  {
    id: 'use',
    title: 'How We Use It',
    icon: '⚙️',
    summary: 'Personalization, AI insights, and service improvement',
    details: (
      <>
        <p>We use your information to:</p>
        <ul>
          <li><strong>Personalize your experience</strong> — Tailor recommendations to your goals</li>
          <li><strong>Power AI insights</strong> — Generate nutrition and fitness analysis</li>
          <li><strong>Create health reports</strong> — Shareable summaries for healthcare providers</li>
          <li><strong>Process payments</strong> — Manage your subscription securely</li>
          <li><strong>Send updates</strong> — Important notifications about your account</li>
          <li><strong>Improve the app</strong> — Analytics help us build better features</li>
          <li><strong>Provide support</strong> — Help you when you need it</li>
        </ul>
      </>
    ),
  },
  {
    id: 'sharing',
    title: 'Data Sharing',
    icon: '🔒',
    summary: 'We never sell your data. Period.',
    details: (
      <>
        <p className="highlight-box">
          <strong>We do not sell your personal or health data. Ever.</strong>
        </p>
        <p>We only share information when:</p>
        <ul>
          <li><strong>You ask us to</strong> — Like sharing reports with your doctor</li>
          <li><strong>Service providers need it</strong> — Payment processors, cloud hosting (with strict contracts)</li>
          <li><strong>Law requires it</strong> — Legal obligations or protecting our rights</li>
          <li><strong>Business changes</strong> — Merger or acquisition (you'll be notified)</li>
        </ul>
      </>
    ),
  },
  {
    id: 'security',
    title: 'Security',
    icon: '🛡️',
    summary: 'Industry-standard protection for your data',
    details: (
      <>
        <p>We take security seriously with:</p>
        <ul>
          <li><strong>Encryption</strong> — Data protected in transit and at rest</li>
          <li><strong>Access controls</strong> — Only authorized personnel can access data</li>
          <li><strong>Regular audits</strong> — Security testing and monitoring</li>
          <li><strong>Secure infrastructure</strong> — Trusted cloud providers</li>
        </ul>
        <p>
          While no system is 100% secure, we continuously work to protect your information
          using industry best practices.
        </p>
      </>
    ),
  },
  {
    id: 'rights',
    title: 'Your Rights',
    icon: '✨',
    summary: 'Access, correct, delete, or export your data anytime',
    details: (
      <>
        <p>You have full control over your data:</p>
        <ul>
          <li><strong>Access</strong> — Request a copy of your data</li>
          <li><strong>Correct</strong> — Update any inaccurate information</li>
          <li><strong>Delete</strong> — Remove your account and all data</li>
          <li><strong>Export</strong> — Download your data in a portable format</li>
          <li><strong>Opt-out</strong> — Unsubscribe from marketing emails</li>
        </ul>
        <p>
          To exercise any of these rights, use the in-app chat or email us at
          privacy@reprummble.com.
        </p>
      </>
    ),
  },
  {
    id: 'retention',
    title: 'Data Retention',
    icon: '🗄️',
    summary: 'Kept while active, deleted within 30 days of account closure',
    details: (
      <>
        <p>
          We keep your data for as long as your account is active or as needed to
          provide the service.
        </p>
        <p>
          When you delete your account, we remove your personal data within 30 days,
          except where we're legally required to keep it longer.
        </p>
      </>
    ),
  },
  {
    id: 'thirdparty',
    title: 'Third-Party Apps',
    icon: '🔗',
    summary: 'Optional integrations with wearables and health apps',
    details: (
      <>
        <p>
          You can connect Rep Rummble with third-party services like fitness wearables
          and health apps. These integrations are:
        </p>
        <ul>
          <li><strong>Optional</strong> — You choose what to connect</li>
          <li><strong>Permission-based</strong> — We only access what you authorize</li>
          <li><strong>Independent</strong> — They have their own privacy policies</li>
        </ul>
        <p>
          We recommend reviewing the privacy policies of any third-party services you connect.
        </p>
      </>
    ),
  },
  {
    id: 'children',
    title: 'Age Requirement',
    icon: '🔞',
    summary: 'Service is for users 16 and older',
    details: (
      <>
        <p>
          Rep Rummble is not intended for users under 16 years of age.
        </p>
        <p>
          We do not knowingly collect personal information from children. If you believe
          we have collected information from a child, please contact us immediately and
          we will delete it.
        </p>
      </>
    ),
  },
  {
    id: 'changes',
    title: 'Policy Updates',
    icon: '📝',
    summary: "We'll notify you of any significant changes",
    details: (
      <>
        <p>
          We may update this Privacy Policy from time to time. When we make significant
          changes:
        </p>
        <ul>
          <li>We'll post the updated policy here</li>
          <li>We'll update the "Last updated" date</li>
          <li>For major changes, we'll notify you via email or in-app</li>
        </ul>
        <p>
          Continued use of the service after changes means you accept the updated policy.
        </p>
      </>
    ),
  },
  {
    id: 'contact',
    title: 'Contact Us',
    icon: '💬',
    summary: 'Questions? We are here to help',
    details: (
      <>
        <p>
          Have questions about this Privacy Policy or how we handle your data?
        </p>
        <ul>
          <li><strong>In-app chat</strong> — Fastest way to reach us</li>
          <li><strong>Email</strong> — privacy@reprummble.com</li>
        </ul>
        <p>We typically respond within 24-48 hours.</p>
      </>
    ),
  },
];

export default function Privacy() {
  const [selectedSection, setSelectedSection] = useState<PolicySection | null>(null);

  const closeModal = () => setSelectedSection(null);

  return (
    <section className="section page-section legal-page-modern">
      <div className="section-head">
        <h1>Privacy Policy</h1>
        <p>Last updated: February 2025</p>
        <p className="legal-subtitle">Click any topic to learn more</p>
      </div>

      <div className="legal-grid">
        {policySections.map((section) => (
          <button
            key={section.id}
            className="legal-card"
            onClick={() => setSelectedSection(section)}
          >
            <span className="legal-card-icon">{section.icon}</span>
            <h3>{section.title}</h3>
            <p>{section.summary}</p>
          </button>
        ))}
      </div>

      {selectedSection && (
        <div className="legal-modal-overlay" onClick={closeModal}>
          <div className="legal-modal" onClick={(e) => e.stopPropagation()}>
            <div className="legal-modal-header">
              <span className="legal-modal-icon">{selectedSection.icon}</span>
              <h2>{selectedSection.title}</h2>
              <button className="legal-modal-close" onClick={closeModal} aria-label="Close">
                ×
              </button>
            </div>
            <div className="legal-modal-content">
              {selectedSection.details}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
