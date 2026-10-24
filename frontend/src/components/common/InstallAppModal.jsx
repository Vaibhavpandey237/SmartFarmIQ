import React, { useState } from 'react';
import { Download, Smartphone, Monitor, Apple, Check, X, Sparkles, ExternalLink } from 'lucide-react';

export default function InstallAppModal({ isOpen, onClose, onInstallClick, hasNativePrompt }) {
  const [activePlatform, setActivePlatform] = useState('android');

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(5, 10, 15, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '1rem'
    }}>
      <div 
        className="card" 
        onClick={(e) => e.stopPropagation()} 
        style={{
          maxWidth: '520px',
          width: '100%',
          background: 'var(--bg-card)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
          borderRadius: '16px',
          padding: '1.75rem',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #10B981, #059669)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 20px rgba(16, 185, 129, 0.35)'
          }}>
            <Smartphone size={28} color="#FFFFFF" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Install Smart Farm IQ</h3>
              <span style={{ fontSize: '0.65rem', background: '#10B981', color: '#fff', padding: '2px 6px', borderRadius: '10px', fontWeight: 800 }}>PWA</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
              Use offline, fast startup, and native full-screen app experience.
            </p>
          </div>
        </div>

        {/* Direct Native Install Button */}
        {hasNativePrompt ? (
          <div style={{ marginBottom: '1.25rem' }}>
            <button 
              className="btn-primary" 
              onClick={onInstallClick}
              style={{
                width: '100%',
                padding: '0.85rem',
                fontSize: '1rem',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(16, 185, 129, 0.35)'
              }}
            >
              <Download size={20} /> 1-Click Install App Now
            </button>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '0.5rem' }}>
              ⚡ Instant install — No Play Store or App Store account required!
            </p>
          </div>
        ) : null}

        {/* Platform Selector Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.4rem',
          background: 'rgba(0, 0, 0, 0.25)',
          padding: '4px',
          borderRadius: '10px',
          marginBottom: '1.25rem'
        }}>
          <button 
            type="button"
            onClick={() => setActivePlatform('android')}
            style={{
              flex: 1,
              padding: '0.5rem',
              borderRadius: '8px',
              border: 'none',
              background: activePlatform === 'android' ? 'var(--accent-green)' : 'transparent',
              color: activePlatform === 'android' ? '#fff' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <Smartphone size={15} /> Android
          </button>
          <button 
            type="button"
            onClick={() => setActivePlatform('ios')}
            style={{
              flex: 1,
              padding: '0.5rem',
              borderRadius: '8px',
              border: 'none',
              background: activePlatform === 'ios' ? 'var(--accent-green)' : 'transparent',
              color: activePlatform === 'ios' ? '#fff' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <Apple size={15} /> iPhone / iPad
          </button>
          <button 
            type="button"
            onClick={() => setActivePlatform('pc')}
            style={{
              flex: 1,
              padding: '0.5rem',
              borderRadius: '8px',
              border: 'none',
              background: activePlatform === 'pc' ? 'var(--accent-green)' : 'transparent',
              color: activePlatform === 'pc' ? '#fff' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <Monitor size={15} /> Windows / PC
          </button>
        </div>

        {/* Step-by-Step Instructions */}
        <div style={{
          background: 'rgba(16, 185, 129, 0.05)',
          border: '1px solid rgba(16, 185, 129, 0.15)',
          borderRadius: '12px',
          padding: '1rem',
          fontSize: '0.85rem',
          lineHeight: '1.6',
          marginBottom: '1rem'
        }}>
          {activePlatform === 'android' && (
            <div>
              <p style={{ fontWeight: 700, color: 'var(--accent-green)', margin: '0 0 0.5rem 0' }}>
                📱 Android Installation Steps:
              </p>
              <ol style={{ paddingLeft: '1.25rem', margin: 0 }}>
                <li>Browser (Chrome / Edge) ke top-right me <strong>Three Dots (⋮)</strong> par click karein.</li>
                <li>Menu me <strong>"Install app"</strong> ya <strong>"Add to Home screen"</strong> par tap karein.</li>
                <li>Confirm karne par Smart Farm IQ aapke phone ke app drawer me install ho jayega!</li>
              </ol>
            </div>
          )}

          {activePlatform === 'ios' && (
            <div>
              <p style={{ fontWeight: 700, color: 'var(--accent-green)', margin: '0 0 0.5rem 0' }}>
                🍏 iPhone / iPad (Safari) Installation Steps:
              </p>
              <ol style={{ paddingLeft: '1.25rem', margin: 0 }}>
                <li>Safari browser me niche bottom bar par <strong>Share icon (⬆️)</strong> dabayein.</li>
                <li>Scroll karke <strong>"Add to Home Screen"</strong> (+ icon) par tap karein.</li>
                <li>Top right me <strong>"Add"</strong> dabayein — Home screen par app icon ban jayega!</li>
              </ol>
            </div>
          )}

          {activePlatform === 'pc' && (
            <div>
              <p style={{ fontWeight: 700, color: 'var(--accent-green)', margin: '0 0 0.5rem 0' }}>
                💻 Windows / Mac PC Installation Steps:
              </p>
              <ol style={{ paddingLeft: '1.25rem', margin: 0 }}>
                <li>Chrome / Edge browser ke address bar me right side par <strong>Install Icon (⊕ / 💻)</strong> par click karein.</li>
                <li><strong>"Install"</strong> button dabayein.</li>
                <li>App Desktop shortcut ban jayegi aur alag standalone window me khulegi!</li>
              </ol>
            </div>
          )}
        </div>

        {/* Feature Highlights */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0.5rem',
          textAlign: 'center',
          fontSize: '0.75rem',
          color: 'var(--text-muted)'
        }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.5rem', borderRadius: '8px' }}>
            ⚡ <strong>Instant Load</strong>
            <div>Works fast on 2G/3G</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.5rem', borderRadius: '8px' }}>
            🌿 <strong>SoilSense AI</strong>
            <div>Full camera scanner</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.5rem', borderRadius: '8px' }}>
            📶 <strong>Offline Ready</strong>
            <div>Cache supported</div>
          </div>
        </div>
      </div>
    </div>
  );
}
