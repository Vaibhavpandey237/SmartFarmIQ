import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ErrorBoundary from './components/common/ErrorBoundary.jsx'
import './index.css'

// Global safety net for unhandled errors
window.addEventListener('error', (event) => {
  console.error('SoilSense AI Global Window Error:', event.error || event.message);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('SoilSense AI Unhandled Rejection:', event.reason);
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)

