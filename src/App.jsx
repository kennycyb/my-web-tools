import { useState } from 'react'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import JsonPrettier from './pages/tools/JsonPrettier'
import QRCodeGenerator from './pages/tools/QRCodeGenerator'
import Calculator from './pages/tools/Calculator'
import TimestampConverter from './pages/tools/TimestampConverter'
import Base64Tool from './pages/tools/Base64Tool'
import IPInfo from './pages/tools/IPInfo'
import './App.css'

function App() {
  const [currentTool, setCurrentTool] = useState('home')

  const renderCurrentTool = () => {
    switch (currentTool) {
      case 'home':
        return <Home />
      case 'json-prettier':
        return <JsonPrettier />
      case 'calculator':
        return <Calculator />
      case 'timestamp-converter':
        return <TimestampConverter />
      case 'base64-tool':
        return <Base64Tool />
      case 'ip-info':
        return <IPInfo />
      case 'qr-code':
        return <QRCodeGenerator />
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
