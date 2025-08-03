import { useState } from 'react'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import JsonPrettier from './pages/tools/JsonPrettier'
import './App.css'

function App() {
  const [currentTool, setCurrentTool] = useState('home')

  const renderCurrentTool = () => {
    switch (currentTool) {
      case 'home':
        return <Home />
      case 'json-prettier':
        return <JsonPrettier />
      case 'ip-info':
        return <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>IP Info Tool</h2>
          <p>Coming Soon...</p>
        </div>
      case 'qr-code':
        return <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>QR Code Generator</h2>
          <p>Coming Soon...</p>
        </div>
      default:
        return <Home />
    }
  }

  return (
    <div className="app">
      <Navigation currentTool={currentTool} onToolChange={setCurrentTool} />
      <main className="main-content">
        {renderCurrentTool()}
      </main>
    </div>
  )
}

export default App
