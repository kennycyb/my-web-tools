import React, { useState } from 'react';
import './JsonPrettier.css';

const JsonPrettier = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [indent, setIndent] = useState(2);

  const formatJson = () => {
    try {
      setError('');
      if (!input.trim()) {
        setOutput('');
        return;
      }

      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indent);
      setOutput(formatted);
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`);
      setOutput('');
    }
  };

  const minifyJson = () => {
    try {
      setError('');
      if (!input.trim()) {
        setOutput('');
        return;
      }

      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`);
      setOutput('');
    }
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      // Could add a toast notification here
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const validateJson = () => {
    try {
      if (!input.trim()) {
        setError('');
        return;
      }
      JSON.parse(input);
      setError('✅ Valid JSON');
    } catch (err) {
      setError(`❌ Invalid JSON: ${err.message}`);
    }
  };

  return (
    <div className="json-prettier">
      <div className="tool-header">
        <h1>JSON Prettier & Formatter</h1>
        <p>Format, minify, and validate JSON data</p>
      </div>

      <div className="json-controls">
        <div className="control-group">
          <label htmlFor="indent">Indent spaces:</label>
          <select
            id="indent"
            value={indent}
            onChange={(e) => setIndent(Number(e.target.value))}
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
            <option value={8}>8 spaces</option>
          </select>
        </div>

        <div className="button-group">
          <button onClick={formatJson} className="btn btn-primary">
            🎨 Format
          </button>
          <button onClick={minifyJson} className="btn btn-secondary">
            📦 Minify
          </button>
          <button onClick={validateJson} className="btn btn-info">
            ✅ Validate
          </button>
          <button onClick={clearAll} className="btn btn-warning">
            🗑️ Clear
          </button>
        </div>
      </div>

      {error && (
        <div className={`error-message ${error.startsWith('✅') ? 'success' : 'error'}`}>
          {error}
        </div>
      )}

      <div className="json-editor">
        <div className="editor-section">
          <h3>Input JSON</h3>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your JSON here..."
            className="json-textarea"
            rows={15}
          />
        </div>

        <div className="editor-section">
          <div className="output-header">
            <h3>Formatted Output</h3>
            {output && (
              <button onClick={copyToClipboard} className="btn btn-copy">
                📋 Copy
              </button>
            )}
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Formatted JSON will appear here..."
            className="json-textarea output"
            rows={15}
          />
        </div>
      </div>
    </div>
  );
};

export default JsonPrettier;
