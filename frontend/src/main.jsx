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

// Register PWA Service Worker for Offline & Installable App capability
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((reg) => {
      console.log('✅ Smart Farm IQ PWA Service Worker active:', reg.scope);
    }).catch((err) => {
      console.warn('PWA Service Worker registration skipped:', err);
    });
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)

