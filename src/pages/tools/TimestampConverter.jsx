import React, { useState } from 'react';
import './TimestampConverter.css';

const TimestampConverter = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState('to-date'); // 'to-date' or 'to-timestamp'
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setError('');
    setResult('');
  };

  const handleConvert = () => {
    setError('');
    setResult('');
    if (mode === 'to-date') {
      // Convert timestamp to date
      const ts = Number(input);
      if (isNaN(ts) || input.trim() === '') {
        setError('Please enter a valid timestamp.');
        return;
      }
      try {
        const date = new Date(ts * (ts > 9999999999 ? 1 : 1000));
        if (isNaN(date.getTime())) throw new Error();
        setResult(date.toLocaleString());
      } catch {
        setError('Invalid timestamp.');
      }
    } else {
      // Convert date to timestamp
      const date = new Date(input);
      if (isNaN(date.getTime())) {
        setError('Please enter a valid date/time string.');
        return;
      }
      setResult(Math.floor(date.getTime() / 1000));
    }
  };

  return (
    <div className="timestamp-converter">
      <div className="tool-header">
        <h1>Timestamp Converter</h1>
        <p>Convert between Unix timestamps and human-readable dates</p>
      </div>
      <div className="converter-controls">
        <select value={mode} onChange={e => setMode(e.target.value)} className="mode-select">
          <option value="to-date">Timestamp → Date</option>
          <option value="to-timestamp">Date → Timestamp</option>
        </select>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder={mode === 'to-date' ? 'Enter Unix timestamp...' : 'Enter date/time (e.g. 2025-08-04 12:34)'}
          className="converter-input"
        />
        <button onClick={handleConvert} className="btn btn-convert" disabled={!input}>
          Convert
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
      {result && (
        <div className="converter-result">
          <strong>Result:</strong> {result}
        </div>
      )}
    </div>
  );
};

export default TimestampConverter;
