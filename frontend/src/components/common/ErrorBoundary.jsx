import React from 'react';
import { AlertTriangle, RefreshCw, Home, LogOut } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('SoilSense AI / Smart Farm IQ Caught Error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleResetApp = () => {
    localStorage.removeItem('plant_user');
    localStorage.removeItem('plant_token');
    localStorage.removeItem('plant_soil_history');
    window.location.reload();
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0B1315',
          color: '#ECFDF5',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          padding: '2rem'
        }}>
          <div style={{
            maxWidth: '560px',
            width: '100%',
            background: 'rgba(18, 30, 33, 0.95)',
            border: '1px solid rgba(239, 68, 68, 0.35)',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(239, 68, 68, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
              color: '#EF4444'
            }}>
              <AlertTriangle size={32} />
            </div>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#F87171', marginBottom: '0.5rem' }}>
              Application Display Notice
            </h2>

            <p style={{ fontSize: '0.9rem', color: '#94A3B8', marginBottom: '1.25rem', lineHeight: 1.6 }}>
              A client rendering exception occurred. We have preserved your local data and provided quick recovery actions below:
            </p>

            {this.state.error && (
              <div style={{
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '0.85rem 1rem',
                fontSize: '0.82rem',
                color: '#FCA5A5',
                fontFamily: 'monospace',
                textAlign: 'left',
                overflowX: 'auto',
                marginBottom: '1.5rem',
                maxHeight: '140px'
              }}>
                {this.state.error.toString()}
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={this.handleReload}
                style={{
                  background: 'linear-gradient(135deg, #10B981, #14B8A6)',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '0.75rem 1.4rem',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <RefreshCw size={16} /> Refresh Page
              </button>

              <button
                onClick={this.handleResetApp}
                style={{
                  background: 'rgba(239, 68, 68, 0.15)',
                  color: '#F87171',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  padding: '0.75rem 1.4rem',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <LogOut size={16} /> Reset Session & Login
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
