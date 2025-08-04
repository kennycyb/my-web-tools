import React, { useState } from 'react';
import './Base64Tool.css';

const Base64Tool = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode'); // 'encode' or 'decode'
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setError('');
    setOutput('');
  };

  const handleConvert = () => {
    setError('');
    setOutput('');
    try {
      if (mode === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
    } catch {
      setError('Invalid input for BASE64 ' + mode + '.');
    }
  };

  return (
    <div className="base64-tool">
      <div className="tool-header">
        <h1>BASE64 Encoder / Decoder</h1>
        <p>Encode or decode text using BASE64</p>
      </div>
      <div className="base64-controls">
        <select value={mode} onChange={e => setMode(e.target.value)} className="mode-select">
          <option value="encode">Encode</option>
          <option value="decode">Decode</option>
        </select>
        <textarea
          value={input}
          onChange={handleInputChange}
          placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter BASE64 to decode...'}
          className="base64-input"
          rows={4}
        />
        <button onClick={handleConvert} className="btn btn-convert" disabled={!input}>
          Convert
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
      {output && (
        <div className="base64-result">
          <strong>Result:</strong>
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );
};

export default Base64Tool;
