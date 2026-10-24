import React, { useState } from 'react';
import { 
  Download, 
  Smartphone, 
  Monitor, 
  Apple, 
  Check, 
  X, 
  Sparkles, 
  CheckCircle2, 
  MoreVertical, 
  PlusSquare, 
  ShieldCheck,
  ArrowRight,
  Info
} from 'lucide-react';

export default function InstallAppModal({ isOpen, onClose, onInstallClick, hasNativePrompt }) {
  const [activePlatform, setActivePlatform] = useState(() => {
    if (typeof navigator !== 'undefined') {
      const ua = navigator.userAgent || '';
      if (/Android/i.test(ua)) return 'android';
      if (/iPhone|iPad|iPod/i.test(ua)) return 'ios';
    }
    return 'android';
  });

  const [promptAttempted, setPromptAttempted] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const triggerDownload = (url, filename) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 5000);
  };

  const handleInstallClick = async () => {
    setPromptAttempted(true);
    if (hasNativePrompt && onInstallClick) {
      try {
        await onInstallClick();
      } catch (e) {
        console.warn('Native prompt error:', e);
      }
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(5, 10, 15, 0.85)',
      backdropFilter: 'blur(10px)',
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
          maxWidth: '560px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'var(--bg-card, #0B1315)',
          border: '1px solid rgba(16, 185, 129, 0.35)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)',
          borderRadius: '20px',
          padding: '1.75rem',
          position: 'relative',
          color: 'var(--text-main, #ECFDF5)'
        }}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'rgba(255, 255, 255, 0.06)',
            border: 'none',
            borderRadius: '50%',
            color: 'var(--text-muted, #94A3B8)',
            cursor: 'pointer',
            padding: '7px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          title="Close"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #10B981, #059669)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.45)',
            flexShrink: 0
          }}>
            <Smartphone size={32} color="#FFFFFF" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>
                Smart Farm IQ App
              </h3>
              <span style={{ 
                fontSize: '0.68rem', 
                background: 'linear-gradient(135deg, #10B981, #047857)', 
                color: '#fff', 
                padding: '2px 8px', 
                borderRadius: '12px', 
                fontWeight: 800,
                letterSpacing: '0.05em'
              }}>
                OFFICIAL APP
              </span>
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted, #94A3B8)', margin: '3px 0 0 0' }}>
              Install directly on your Android phone, Windows PC, or iPhone.
            </p>
          </div>
        </div>

        {/* Platform Selector Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.4rem',
          background: 'rgba(0, 0, 0, 0.35)',
          padding: '5px',
          borderRadius: '12px',
          marginBottom: '1.25rem',
          border: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <button 
            type="button"
            onClick={() => { setActivePlatform('android'); setPromptAttempted(false); }}
            style={{
              flex: 1,
              padding: '0.6rem 0.5rem',
              borderRadius: '9px',
              border: 'none',
              background: activePlatform === 'android' ? 'var(--accent-green, #10B981)' : 'transparent',
              color: activePlatform === 'android' ? '#fff' : 'var(--text-muted, #94A3B8)',
              fontWeight: 700,
              fontSize: '0.84rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <Smartphone size={16} /> Android Phone
          </button>

          <button 
            type="button"
            onClick={() => { setActivePlatform('pc'); setPromptAttempted(false); }}
            style={{
              flex: 1,
              padding: '0.6rem 0.5rem',
              borderRadius: '9px',
              border: 'none',
              background: activePlatform === 'pc' ? 'var(--accent-green, #10B981)' : 'transparent',
              color: activePlatform === 'pc' ? '#fff' : 'var(--text-muted, #94A3B8)',
              fontWeight: 700,
              fontSize: '0.84rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <Monitor size={16} /> Windows PC
          </button>

          <button 
            type="button"
            onClick={() => { setActivePlatform('ios'); setPromptAttempted(false); }}
            style={{
              flex: 1,
              padding: '0.6rem 0.5rem',
              borderRadius: '9px',
              border: 'none',
              background: activePlatform === 'ios' ? 'var(--accent-green, #10B981)' : 'transparent',
              color: activePlatform === 'ios' ? '#fff' : 'var(--text-muted, #94A3B8)',
              fontWeight: 700,
              fontSize: '0.84rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <Apple size={16} /> iPhone (iOS)
          </button>
        </div>

        {/* ANDROID VIEW */}
        {activePlatform === 'android' && (
          <div>
            {/* Primary Action Button */}
            <button 
              type="button"
              className="btn-primary" 
              onClick={handleInstallClick}
              style={{
                width: '100%',
                padding: '0.95rem',
                fontSize: '1.05rem',
                fontWeight: 800,
                justifyContent: 'center',
                boxShadow: '0 8px 25px rgba(16, 185, 129, 0.45)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '9px',
                borderRadius: '12px',
                marginBottom: '1rem',
                background: 'linear-gradient(135deg, #10B981, #059669)',
                color: '#FFFFFF'
              }}
            >
              <Smartphone size={22} /> {hasNativePrompt ? 'Tap to Install App on Android' : 'Install Smart Farm IQ App'}
            </button>

            {/* Why WebAPK explanation note */}
            <div style={{
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: '12px',
              padding: '0.85rem 1rem',
              marginBottom: '1.1rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px'
            }}>
              <ShieldCheck size={20} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '0.82rem', lineHeight: '1.5' }}>
                <strong style={{ color: '#34D399', display: 'block', marginBottom: '2px' }}>
                  No Parse Error / 100% Genuine Android App:
                </strong>
                Android me Google Chrome direct official <strong>WebAPK</strong> install karta hai. Kisi corrupted ya third-party .apk ki zaroorat nahi hai.
              </div>
            </div>

            {/* Step-by-Step Native Chrome Guide */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '14px',
              padding: '1rem',
              marginBottom: '1rem'
            }}>
              <span style={{ 
                fontSize: '0.78rem', 
                fontWeight: 800, 
                color: '#34D399', 
                textTransform: 'uppercase', 
                display: 'block', 
                marginBottom: '0.75rem',
                letterSpacing: '0.04em'
              }}>
                📲 Mobile Me Install Karne Ka Sabse Asan Tarika (Chrome):
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {/* Step 1 */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: '#10B981',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>1</div>
                  <div style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                    Chrome browser ke top-right me <strong>Three Dots ( <MoreVertical size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /> ⋮ )</strong> par tap karein.
                  </div>
                </div>

                {/* Step 2 */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: '#10B981',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>2</div>
                  <div style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                    Menu me <strong>"Install app"</strong> ya <strong>"Add to Home screen"</strong> (ऐप इंस्टॉल करें) par tap karein.
                  </div>
                </div>

                {/* Step 3 */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: '#10B981',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>3</div>
                  <div style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                    Popup aane par <strong>"Install"</strong> dabayein — App aapke Android phone ke app drawer me bina kisi parse error ke turant install ho jayegi!
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.78rem',
              color: 'var(--text-muted, #94A3B8)',
              background: 'rgba(255, 255, 255, 0.03)',
              padding: '0.6rem 0.8rem',
              borderRadius: '10px'
            }}>
              <CheckCircle2 size={16} color="#10B981" />
              <span>Full screen offline support & camera access for leaf disease scanning</span>
            </div>
          </div>
        )}

        {/* WINDOWS PC VIEW */}
        {activePlatform === 'pc' && (
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.25rem' }}>
              {/* Bat Launcher Button */}
              <button 
                type="button"
                className="btn-primary" 
                onClick={() => triggerDownload('/apps/SmartFarmIQ-Windows-App.bat', 'SmartFarmIQ-Windows-App.bat')}
                style={{
                  width: '100%',
                  padding: '0.9rem',
                  fontSize: '1rem',
                  fontWeight: 800,
                  justifyContent: 'center',
                  boxShadow: '0 8px 25px rgba(59, 130, 246, 0.35)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)'
                }}
              >
                <Download size={20} /> Download Windows App Launcher (.bat)
              </button>

              {hasNativePrompt && (
                <button 
                  type="button"
                  className="btn-secondary" 
                  onClick={handleInstallClick}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    justifyContent: 'center',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    borderRadius: '12px',
                    borderColor: 'rgba(16, 185, 129, 0.4)',
                    color: '#34D399'
                  }}
                >
                  <Sparkles size={18} /> Install as Chrome/Edge App
                </button>
              )}
            </div>

            {downloadSuccess && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                color: '#60A5FA',
                fontSize: '0.82rem',
                fontWeight: 700,
                marginBottom: '1rem',
                background: 'rgba(59, 130, 246, 0.12)',
                padding: '0.5rem',
                borderRadius: '8px'
              }}>
                <CheckCircle2 size={16} /> Launcher downloaded! Double-click to create Desktop shortcut.
              </div>
            )}

            <div style={{
              background: 'rgba(59, 130, 246, 0.05)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              borderRadius: '12px',
              padding: '0.9rem',
              fontSize: '0.82rem',
              lineHeight: '1.6'
            }}>
              <p style={{ fontWeight: 700, color: '#60A5FA', margin: '0 0 0.4rem 0' }}>
                💻 Windows PC Installation Steps:
              </p>
              <ol style={{ paddingLeft: '1.25rem', margin: 0 }}>
                <li>Upar diye gaye <strong>"Download Windows App Launcher (.bat)"</strong> button par click karein.</li>
                <li>Downloaded file <strong>SmartFarmIQ-Windows-App.bat</strong> par double-click karein.</li>
                <li>Aapke Windows Desktop par <strong>Smart Farm IQ</strong> ka standalone app shortcut ban jayega!</li>
              </ol>
            </div>
          </div>
        )}

        {/* IOS (IPHONE) VIEW */}
        {activePlatform === 'ios' && (
          <div>
            <div style={{
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: '14px',
              padding: '1rem',
              marginBottom: '1rem'
            }}>
              <span style={{ 
                fontSize: '0.78rem', 
                fontWeight: 800, 
                color: 'var(--accent-green, #10B981)', 
                textTransform: 'uppercase', 
                display: 'block', 
                marginBottom: '0.75rem',
                letterSpacing: '0.04em'
              }}>
                🍏 iPhone (Safari) Me App Kaise Lagayein:
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: '#10B981',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>1</div>
                  <div style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                    Safari browser me niche bottom bar par <strong>Share icon (⬆️)</strong> dabayein.
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: '#10B981',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>2</div>
                  <div style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                    Niche scroll karke <strong>"Add to Home Screen"</strong> (+ icon) par tap karein.
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: '#10B981',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>3</div>
                  <div style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                    Top right me <strong>"Add"</strong> dabayein — App seedhe aapke iPhone screen par ban jayegi!
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
