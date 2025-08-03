import React from 'react';
import './Navigation.css';

const Navigation = ({ currentTool, onToolChange }) => {
  const tools = [
    { id: 'home', name: 'Home', icon: '🏠' },
    { id: 'json-prettier', name: 'JSON Prettier', icon: '🔧' },
    { id: 'ip-info', name: 'IP Info', icon: '🌐' },
    { id: 'qr-code', name: 'QR Code', icon: '📱' }
  ];

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <h2>Web Tools</h2>
        </div>
        <div className="nav-links">
          {tools.map((tool) => (
            <button
              key={tool.id}
              className={`nav-link ${currentTool === tool.id ? 'active' : ''}`}
              onClick={() => onToolChange(tool.id)}
            >
              <span className="nav-icon">{tool.icon}</span>
              <span className="nav-text">{tool.name}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
