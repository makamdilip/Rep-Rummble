import React, { useState } from 'react';
import reportPreview from '../assets/report-preview.svg';

type DownloadState = 'idle' | 'loading' | 'success' | 'error';

export default function Reports() {
  const [status, setStatus] = useState<DownloadState>('idle');
  const [message, setMessage] = useState('');

  const downloadReport = async (period: 'monthly' | 'yearly' | 'historical') => {
    setStatus('loading');
    setMessage('');
    try {
      const response = await fetch(`/api/reports/sample?period=${period}`);
      if (!response.ok) {
        throw new Error('Unable to download report');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `rep-rumble-${period}-report.csv`;
      link.click();
      window.URL.revokeObjectURL(url);

      setStatus('success');
      setMessage('Report downloaded successfully.');
    } catch (error: any) {
      setStatus('error');
      setMessage(error?.message || 'Download failed.');
    }
  };

  return (
    <section className="section page-section">
      <div className="section-head">
        <h2>Reports for doctors and coaches</h2>
        <p>
          Download monthly, yearly, or historical reports with meals, workouts,
          health notes, and trends.
        </p>
      </div>

      <div className="tabs">
        <input type="radio" id="tab-monthly" name="report-tabs" defaultChecked />
        <input type="radio" id="tab-yearly" name="report-tabs" />
        <input type="radio" id="tab-historical" name="report-tabs" />
        <div className="tab-labels">
          <label htmlFor="tab-monthly">Monthly</label>
          <label htmlFor="tab-yearly">Yearly</label>
          <label htmlFor="tab-historical">Historical</label>
        </div>
        <div className="tab-panels">
          <div className="tab-panel panel-monthly">
            <h4>Monthly insight</h4>
            <p>See nutrition and training trends for the last 30 days.</p>
          </div>
          <div className="tab-panel panel-yearly">
            <h4>Yearly insight</h4>
            <p>Track long-term changes in weight, activity, and wellness.</p>
          </div>
          <div className="tab-panel panel-historical">
            <h4>Historical insight</h4>
            <p>All-time data for deep medical or coaching review.</p>
          </div>
        </div>
      </div>

      <div className="split">
        <div className="report-card">
          <div className="report-header">
            <h4>Report Center</h4>
            <span className="pill">Ready</span>
          </div>
          <div className="report-list">
            <div className="report-row">
              <span>Monthly Summary</span>
              <button className="ghost-btn" onClick={() => downloadReport('monthly')}>
                Download
              </button>
            </div>
            <div className="report-row">
              <span>Yearly Trends</span>
              <button className="ghost-btn" onClick={() => downloadReport('yearly')}>
                Download
              </button>
            </div>
            <div className="report-row">
              <span>All-time History</span>
              <button className="ghost-btn" onClick={() => downloadReport('historical')}>
                Download
              </button>
            </div>
          </div>
          <div className="report-footer">
            PDF and CSV exports, ready for clinical review.
          </div>
          {message && (
            <div className={status === 'error' ? 'form-error' : 'form-success'}>
              {message}
            </div>
          )}
        </div>
        <div className="report-preview">
          <img src={reportPreview} alt="Report preview" />
        </div>
      </div>
    </section>
  );
}
