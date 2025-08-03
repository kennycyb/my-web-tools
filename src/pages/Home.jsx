import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="hero-section">
        <h1>Welcome to Web Tools</h1>
        <p className="hero-subtitle">
          A collection of useful web development and utility tools
        </p>
      </div>

      <div className="tools-grid">
        <div className="tool-card">
          <div className="tool-icon">🔧</div>
          <h3>JSON Prettier</h3>
          <p>Format, minify, and validate JSON data with ease</p>
          <div className="tool-features">
            <span>• Format JSON</span>
            <span>• Minify JSON</span>
            <span>• Validate syntax</span>
          </div>
        </div>

        <div className="tool-card">
          <div className="tool-icon">🌐</div>
          <h3>IP Information</h3>
          <p>Get detailed information about IP addresses</p>
          <div className="tool-features">
            <span>• Current IP</span>
            <span>• Geolocation</span>
            <span>• ISP Details</span>
          </div>
        </div>

        <div className="tool-card">
          <div className="tool-icon">📱</div>
          <h3>QR Code Generator</h3>
          <p>Generate QR codes for text, URLs, and more</p>
          <div className="tool-features">
            <span>• Custom text</span>
            <span>• URLs</span>
            <span>• Download options</span>
          </div>
        </div>

        <div className="tool-card coming-soon">
          <div className="tool-icon">🔐</div>
          <h3>Base64 Encoder</h3>
          <p>Encode and decode Base64 strings</p>
          <div className="tool-features">
            <span>• Coming Soon</span>
          </div>
        </div>
      </div>

      <div className="features-section">
        <h2>Why Use Our Tools?</h2>
        <div className="features-list">
          <div className="feature">
            <span className="feature-icon">⚡</span>
            <div>
              <h4>Fast & Responsive</h4>
              <p>All tools run client-side for maximum speed and privacy</p>
            </div>
          </div>
          <div className="feature">
            <span className="feature-icon">🔒</span>
            <div>
              <h4>Privacy First</h4>
              <p>Your data never leaves your browser</p>
            </div>
          </div>
          <div className="feature">
            <span className="feature-icon">📱</span>
            <div>
              <h4>Mobile Friendly</h4>
              <p>Works perfectly on all devices</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
