import React from 'react';
import { Sprout, LogOut, Sun, Moon, Download, Menu } from 'lucide-react';

export default function Navbar({
  user,
  theme,
  toggleTheme,
  onLogout,
  onTabClick,
  mobileMenuOpen,
  setMobileMenuOpen,
  hasResult,
  onOpenInstallModal
}) {
  return (
    <header className="navbar">
      <div className="brand">
        <div className="brand-icon">
          <Sprout size={24} />
        </div>
        <div>
          <h1 className="brand-title">Smart Farm IQ</h1>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Smart Agricultural Intelligence & Crop Platform</p>
        </div>
      </div>

      <div className="nav-actions">
        {/* Install / Download App Button */}
        <button 
          type="button"
          className="btn-primary install-app-btn"
          onClick={onOpenInstallModal}
          title="Download and Install Smart Farm IQ App on Android, iPhone, or PC"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '0.42rem 0.85rem',
            fontSize: '0.82rem',
            fontWeight: 700,
            borderRadius: '10px',
            boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)',
            cursor: 'pointer'
          }}
        >
          <Download size={15} /> <span>Download App</span>
        </button>
        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span 
              style={{ fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }} 
              onClick={() => onTabClick('dashboard')}
            >
              {user.role === 'ADMIN' ? '👑' : '👤'} {user.name || user.username}
            </span>
            <button className="btn-icon" onClick={onLogout} title="Logout & Return to Login">
              <LogOut size={18} />
            </button>
          </div>
        )}

        <button className="btn-icon" onClick={toggleTheme} title="Toggle Theme">
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button className="hamburger-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <Menu size={20} /> Menu
        </button>

        {hasResult && (
          <button className="btn-secondary" onClick={() => window.print()}>
            <Download size={14} /> PDF
          </button>
        )}
      </div>
    </header>
  );
}
