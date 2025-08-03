import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import './QRCodeGenerator.css';

const QRCodeGenerator = () => {
  const [input, setInput] = useState('');
  const [size, setSize] = useState(200);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setError('');
  };

  const handleDownload = () => {
    const canvas = document.getElementById('qr-code-canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.download = 'qrcode.png';
      link.click();
    }
  };

  return (
    <div className="qr-generator">
      <div className="tool-header">
        <h1>QR Code Generator</h1>
        <p>Generate QR codes for text, URLs, and more</p>
      </div>
      <div className="qr-controls">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter text or URL..."
          className="qr-input"
        />
        <label htmlFor="size">Size:</label>
        <select id="size" value={size} onChange={e => setSize(Number(e.target.value))}>
          <option value={128}>128px</option>
          <option value={200}>200px</option>
          <option value={256}>256px</option>
          <option value={320}>320px</option>
        </select>
        <button onClick={handleDownload} className="btn btn-download" disabled={!input}>
          📥 Download
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="qr-preview">
        {input ? (
          <QRCodeCanvas
            id="qr-code-canvas"
            value={input}
            size={size}
            level="H"
            includeMargin={true}
          />
        ) : (
          <div className="qr-placeholder">Enter text or URL to generate QR code</div>
        )}
      </div>
    </div>
  );
};

export default QRCodeGenerator;
