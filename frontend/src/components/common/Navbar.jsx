import React from 'react';
import { Sprout, LogOut, Sun, Moon, Download, Menu, FileText } from 'lucide-react';

export default function Navbar({
  user,
  theme,
  toggleTheme,
  onLogout,
  onTabClick,
  mobileMenuOpen,
  setMobileMenuOpen,
  hasResult
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
        <a 
          href="/SmartFarmIQ_Innotech_Viva_Guide.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-secondary" 
          style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '0.4rem 0.75rem', fontSize: '0.8rem', color: '#8B5CF6', borderColor: 'rgba(139, 92, 246, 0.4)' }}
          title="Download Innotech Viva & Defense Guide PDF"
        >
          <FileText size={15} /> <span>Viva Guide</span>
        </a>

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
