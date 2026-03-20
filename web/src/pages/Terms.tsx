import React, { useState } from "react";

interface TermsSection {
  id: string;
  title: string;
  icon: string;
  summary: string;
  details: React.ReactNode;
}

const termsSections: TermsSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    icon: "✋",
    summary: "Agreement to our Terms of Service",
    details: (
      <>
        <p>
          By accessing or using Reprummble's mobile application and website
          (the "Service"), you agree to be bound by these Terms of Service. If
          you do not agree to these terms, please do not use the Service.
        </p>
        <p>
          These Terms form a legally binding agreement between you and Rep
          Rummble. If any provision is found to be unenforceable, the remaining
          provisions will continue in effect.
        </p>
      </>
    ),
  },
  {
    id: "service",
    title: "What We Provide",
    icon: "📱",
    summary: "Description of Reprummble services and features",
    details: (
      <>
        <p>
          Reprummble is a wellness platform that provides tools for tracking
          nutrition, workouts, and recovery. Our Service includes:
        </p>
        <ul>
          <li>
            <strong>AI-powered nutrition logging</strong> — Food recognition and
            tracking
          </li>
          <li>
            <strong>Workout tracking</strong> — Exercise planning and
            performance data
          </li>
          <li>
            <strong>Progress analytics</strong> — Streaks, achievements, and
            insights
          </li>
          <li>
            <strong>Health reports</strong> — Shareable summaries for healthcare
            providers
          </li>
          <li>
            <strong>Wearable integration</strong> — Sync with fitness devices
          </li>
          <li>
            <strong>Customer support</strong> — AI chat and live agent
            assistance
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "medical",
    title: "Medical Disclaimer",
    icon: "⚠️",
    summary: "Reprummble is not a medical service",
    details: (
      <>
        <div className="highlight-box">
          <p>
            <strong>
              Reprummble is not a medical service and does not provide medical
              advice, diagnosis, or treatment.
            </strong>
          </p>
        </div>
        <p>
          The information provided through our Service is for general
          informational and educational purposes only. Always consult with a
          qualified healthcare professional before making any changes to your
          diet, exercise routine, or health regimen.
        </p>
        <p>
          Nutritional information provided by our AI is an estimate and may not
          be accurate for all foods. Do not rely on this information for medical
          decisions, especially if you have allergies, diabetes, or other health
          conditions.
        </p>
        <p>
          <strong>
            We are not liable for any health issues that may arise from
            following information provided through the Service.
          </strong>
        </p>
      </>
    ),
  },
  {
    id: "account",
    title: "Account Registration",
    icon: "👤",
    summary: "Your account responsibilities and requirements",
    details: (
      <>
        <p>
          To use certain features, you must create an account. You agree to:
        </p>
        <ul>
          <li>Provide accurate and complete information</li>
          <li>Maintain the security of your account credentials</li>
          <li>Notify us immediately of any unauthorized access</li>
          <li>Be responsible for all activities under your account</li>
          <li>Use the Service only for lawful purposes</li>
        </ul>
        <p>
          <strong>Age Requirement:</strong> You must be at least 16 years old to
          create an account. Users under 18 should have parental consent. We do
          not knowingly allow children under 16 to use this service.
        </p>
      </>
    ),
  },
  {
    id: "payments",
    title: "Subscription & Payments",
    icon: "💳",
    summary: "Billing, trials, cancellations, and refunds",
    details: (
      <>
        <h4>Free Trial</h4>
        <p>
          New users may be eligible for a free trial period. After the trial
          ends, you will be charged the applicable subscription fee unless you
          cancel.
        </p>

        <h4>Subscription Plans</h4>
        <ul>
          <li>Monthly and annual subscription options are available</li>
          <li>Subscriptions automatically renew unless cancelled</li>
          <li>Prices are subject to change with 30 days' notice</li>
        </ul>

        <h4>Cancellation & Refunds</h4>
        <ul>
          <li>You may cancel your subscription at any time</li>
          <li>
            Cancellation takes effect at the end of the current billing period
          </li>
          <li>
            Refunds are provided in accordance with applicable app store
            policies
          </li>
          <li>No refunds for partial months or unused features</li>
        </ul>
      </>
    ),
  },
  {
    id: "content",
    title: "Your Content",
    icon: "🖼️",
    summary: "Your rights and responsibilities for uploaded content",
    details: (
      <>
        <p>
          You retain full ownership of content you upload (photos, logs, notes,
          personal data). By uploading content, you grant us a non-exclusive
          license to use it to provide and improve the Service.
        </p>
        <p>You agree not to upload content that:</p>
        <ul>
          <li>Violates any laws or third-party intellectual property rights</li>
          <li>Contains malware, spyware, or other harmful code</li>
          <li>Is offensive, inappropriate, defamatory, or misleading</li>
          <li>Harasses, threatens, or abuses others</li>
        </ul>
        <p>
          We have the right to remove any content that violates these Terms
          without notice.
        </p>
      </>
    ),
  },
  {
    id: "acceptable",
    title: "Acceptable Use Policy",
    icon: "🚫",
    summary: "What you agree not to do",
    details: (
      <>
        <p>You agree not to use the Service to:</p>
        <ul>
          <li>Violate any applicable laws or regulations</li>
          <li>Attempt to gain unauthorized access to our systems</li>
          <li>Interfere with, disrupt, or damage the Service</li>
          <li>Reverse engineer, decompile, or copy our software</li>
          <li>Use automated tools or bots without permission</li>
          <li>Impersonate others or misrepresent your identity</li>
          <li>Spam, phish, or engage in fraudulent activities</li>
          <li>Publicly disclose security vulnerabilities</li>
        </ul>
        <p>
          Violation of these policies may result in immediate suspension or
          termination of your account.
        </p>
      </>
    ),
  },
  {
    id: "ip",
    title: "Intellectual Property",
    icon: "©️",
    summary: "Our intellectual property rights",
    details: (
      <>
        <p>
          Reprummble, its name, logo, design, and all content, features, and
          functionality are owned by Reprummble and protected by intellectual
          property laws.
        </p>
        <p>You agree not to:</p>
        <ul>
          <li>Copy, modify, or adapt our software or content</li>
          <li>Distribute, sell, or create derivative works</li>
          <li>Use our trademarks or branding without permission</li>
          <li>Remove or alter copyright notices</li>
        </ul>
        <p>
          The Service is licensed to you "as-is" for personal, non-commercial
          use only.
        </p>
      </>
    ),
  },
  {
    id: "thirdparty",
    title: "Third-Party Services",
    icon: "🔗",
    summary: "External integrations and partners",
    details: (
      <>
        <p>
          Our Service may integrate with or link to third-party services
          (wearables, payment processors, health apps). These include:
        </p>
        <ul>
          <li>Apple Health, Google Fit, Fitbit, Oura Ring</li>
          <li>Payment processors (Stripe, etc.)</li>
          <li>Cloud hosting and analytics providers</li>
        </ul>
        <p>
          <strong>We are not responsible for:</strong>
        </p>
        <ul>
          <li>Content, accuracy, or availability of third-party services</li>
          <li>Their privacy practices or terms of service</li>
          <li>Any issues arising from their platforms</li>
        </ul>
        <p>
          Review their terms and privacy policies before connecting your
          accounts.
        </p>
      </>
    ),
  },
  {
    id: "warranties",
    title: "Disclaimers",
    icon: "⚡",
    summary: "What we do NOT guarantee",
    details: (
      <>
        <p className="highlight-box">
          <strong>
            THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND.
          </strong>
        </p>
        <p>We do not guarantee that:</p>
        <ul>
          <li>The Service will be uninterrupted or error-free</li>
          <li>The Service is completely secure from all threats</li>
          <li>AI estimates are always accurate</li>
          <li>All features will work with all devices</li>
        </ul>
        <p>
          Nutrition estimates, workout suggestions, and other AI recommendations
          are provided for informational purposes only and may contain errors.
          Never use them as a substitute for professional medical advice.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    icon: "⚖️",
    summary: "What we are not liable for",
    details: (
      <>
        <p>
          <strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW,</strong> Reprummble
          shall not be liable for:
        </p>
        <ul>
          <li>Indirect, incidental, or consequential damages</li>
          <li>Loss of profits, data, or use</li>
          <li>Any health issues from using the Service</li>
          <li>Third-party services or integrations</li>
        </ul>
        <p>
          Our total liability shall not exceed the fees you paid in the last 12
          months, if any. Some jurisdictions do not allow these limitations, so
          this may not apply to you.
        </p>
      </>
    ),
  },
  {
    id: "termination",
    title: "Termination",
    icon: "🛑",
    summary: "Account suspension and deletion",
    details: (
      <>
        <p>
          <strong>Termination by Us:</strong> We may suspend or terminate your
          account at any time for violation of these Terms or for any other
          reason at our discretion. We will provide notice when possible.
        </p>
        <p>
          <strong>Termination by You:</strong> You may delete your account at
          any time through the app settings or by contacting support.
        </p>
        <p>
          Upon termination, your access to the Service ends immediately. Your
          data will be deleted per our Privacy Policy.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to Terms",
    icon: "📋",
    summary: "How we update these Terms",
    details: (
      <>
        <p>
          We may update these Terms from time to time to reflect changes in law
          or our practices.
        </p>
        <p>When we make changes:</p>
        <ul>
          <li>We will update this page and the "Last updated" date</li>
          <li>For material changes, we'll notify you via email or in-app</li>
          <li>Your continued use means you accept the new Terms</li>
        </ul>
        <p>
          If you disagree with any changes, you may delete your account and stop
          using the Service.
        </p>
      </>
    ),
  },
  {
    id: "law",
    title: "Governing Law",
    icon: "⚖️",
    summary: "Legal jurisdiction and dispute resolution",
    details: (
      <>
        <p>
          These Terms are governed by the laws of the jurisdiction where Rep
          Rummble operates, without regard to conflict of law principles.
        </p>
        <p>
          Any disputes arising from these Terms or use of the Service shall be
          resolved through binding arbitration, except where prohibited by law.
        </p>
        <p>
          You agree to submit to the exclusive jurisdiction of the courts in
          that jurisdiction.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "Contact & Support",
    icon: "💬",
    summary: "How to reach us with questions",
    details: (
      <>
        <p>Have questions about these Terms? We are here to help.</p>
        <ul>
          <li>
            <strong>In-app chat</strong> — Fastest way to reach us
          </li>
          <li>
            <strong>Email</strong> — legal@reprummble.com
          </li>
          <li>
            <strong>Support Portal</strong> — For detailed help
          </li>
        </ul>
        <p>
          We typically respond within 24-48 hours. Your questions help us serve
          you better.
        </p>
      </>
    ),
  },
];

export default function Terms() {
  const [selectedSection, setSelectedSection] = useState<TermsSection | null>(
    null,
  );

  const closeModal = () => setSelectedSection(null);

  return (
    <section className="section page-section legal-page-modern">
      <div className="section-head">
        <h1>Terms of Service</h1>
        <p>Last updated: February 2025</p>
        <p className="legal-subtitle">Click any topic to learn more</p>
      </div>

      <div className="legal-grid">
        {termsSections.map((section) => (
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
              <button
                className="legal-modal-close"
                onClick={closeModal}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="legal-modal-content">{selectedSection.details}</div>
          </div>
        </div>
      )}
    </section>
  );
}
