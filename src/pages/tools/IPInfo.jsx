import React, { useState, useEffect } from 'react';
import './IPInfo.css';

const IPInfo = () => {
  const [ipData, setIpData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchIPInfo();
  }, []);

  const fetchIPInfo = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/v1/my/ip');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setIpData(data);
    } catch (err) {
      setError('Failed to fetch IP information: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchIPInfo();
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      // Could add a toast notification here
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    });
  };

  return (
    <div className="ip-info">
      <div className="tool-header">
        <h1>IP Information</h1>
        <p>Get information about your current IP address</p>
      </div>

      <div className="ip-controls">
        <button onClick={handleRefresh} className="btn btn-refresh" disabled={loading}>
          {loading ? '🔄 Loading...' : '🔄 Refresh'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          {error}
        </div>
      )}

      {ipData && !loading && (
        <div className="ip-result">
          <div className="ip-card">
            <div className="ip-main">
              <h2>Your IP Address</h2>
              <div className="ip-address">
                <span className="ip-value">{ipData.ip}</span>
                <button
                  className="btn btn-copy"
                  onClick={() => copyToClipboard(ipData.ip)}
                  title="Copy IP address"
                >
                  📋
                </button>
              </div>
            </div>

            <div className="ip-details">
              <div className="detail-row">
                <span className="detail-label">Timestamp:</span>
                <span className="detail-value">{ipData.timestamp}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Date:</span>
                <span className="detail-value">{ipData.date}</span>
              </div>
            </div>
          </div>

          <div className="ip-info-note">
            <h3>About Your IP Address</h3>
            <ul>
              <li>This is your public IP address as seen by our server</li>
              <li>If you're behind a router/NAT, this may differ from your local IP</li>
              <li>Your IP address can reveal your approximate location</li>
              <li>Use a VPN to mask your real IP address</li>
            </ul>
          </div>
        </div>
      )}

      {loading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Fetching IP information...</p>
        </div>
      )}
    </div>
  );
};

export default IPInfo;
