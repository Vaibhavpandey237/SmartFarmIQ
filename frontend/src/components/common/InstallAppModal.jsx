import React, { useState } from 'react';
import { Download, Smartphone, Monitor, Apple, Check, X, Sparkles, FolderArchive, ArrowDownToLine, CheckCircle2 } from 'lucide-react';

export default function InstallAppModal({ isOpen, onClose, onInstallClick, hasNativePrompt }) {
  const [activePlatform, setActivePlatform] = useState(() => {
    if (typeof navigator !== 'undefined') {
      if (navigator.userAgent.includes('Android')) return 'android';
      if (navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad')) return 'ios';
    }
    return 'pc';
  });

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

  const handlePrimaryInstall = () => {
    // 1. Try native PWA install prompt if browser supports it
    if (onInstallClick) {
      try {
        onInstallClick();
      } catch (e) {}
    }

    // 2. Start direct file download according to platform
    if (activePlatform === 'android') {
      triggerDownload('/apps/SmartFarmIQ-Android-App.apk', 'SmartFarmIQ-Android-App.apk');
    } else if (activePlatform === 'pc') {
      triggerDownload('/apps/SmartFarmIQ-Windows-App.bat', 'SmartFarmIQ-Windows-App.bat');
    } else {
      triggerDownload('/apps/SmartFarmIQ-App-Package.zip', 'SmartFarmIQ-App-Package.zip');
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(5, 10, 15, 0.8)',
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
          maxWidth: '540px',
          width: '100%',
          background: 'var(--bg-card)',
          border: '1px solid rgba(16, 185, 129, 0.35)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)',
          borderRadius: '18px',
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
            padding: '6px'
          }}
          title="Close"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #10B981, #059669)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.4)',
            flexShrink: 0
          }}>
            <Smartphone size={30} color="#FFFFFF" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Download Smart Farm IQ App</h3>
              <span style={{ fontSize: '0.65rem', background: '#10B981', color: '#fff', padding: '2px 7px', borderRadius: '10px', fontWeight: 800 }}>APP</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
              Install direct app on Android Phone, Windows Desktop, or iPhone.
            </p>
          </div>
        </div>

        {/* Primary Download & Install Button */}
        <div style={{ marginBottom: '1.25rem' }}>
          <button 
            type="button"
            className="btn-primary" 
            onClick={handlePrimaryInstall}
            style={{
              width: '100%',
              padding: '0.9rem',
              fontSize: '1.05rem',
              fontWeight: 800,
              justifyContent: 'center',
              boxShadow: '0 8px 25px rgba(16, 185, 129, 0.4)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Download size={22} /> 1-Click Download & Install App Now
          </button>
          
          {downloadSuccess && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              color: '#10B981',
              fontSize: '0.82rem',
              fontWeight: 700,
              marginTop: '0.6rem',
              background: 'rgba(16, 185, 129, 0.12)',
              padding: '0.4rem',
              borderRadius: '8px'
            }}>
              <CheckCircle2 size={16} /> App installer downloaded! Check your browser downloads folder.
            </div>
          )}
        </div>

        {/* Direct Download Options Box */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          padding: '0.9rem',
          marginBottom: '1.25rem'
        }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.6rem' }}>
            Direct Download Options:
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.6rem' }}>
            <a 
              href="/apps/SmartFarmIQ-Windows-App.bat"
              download="SmartFarmIQ-Windows-App.bat"
              onClick={() => setDownloadSuccess(true)}
              className="btn-secondary"
              style={{
                fontSize: '0.8rem',
                padding: '0.55rem',
                justifyContent: 'center',
                textDecoration: 'none',
                borderColor: 'rgba(59, 130, 246, 0.4)',
                color: '#60A5FA'
              }}
            >
              <Monitor size={15} /> Windows App (.bat)
            </a>

            <a 
              href="/apps/SmartFarmIQ-Android-App.apk"
              download="SmartFarmIQ-Android-App.apk"
              onClick={() => setDownloadSuccess(true)}
              className="btn-secondary"
              style={{
                fontSize: '0.8rem',
                padding: '0.55rem',
                justifyContent: 'center',
                textDecoration: 'none',
                borderColor: 'rgba(16, 185, 129, 0.4)',
                color: '#34D399'
              }}
            >
              <Smartphone size={15} /> Android App (.apk)
            </a>

            <a 
              href="/apps/SmartFarmIQ-App-Package.zip"
              download="SmartFarmIQ-App-Package.zip"
              onClick={() => setDownloadSuccess(true)}
              className="btn-secondary"
              style={{
                fontSize: '0.8rem',
                padding: '0.55rem',
                justifyContent: 'center',
                textDecoration: 'none',
                borderColor: 'rgba(168, 85, 247, 0.4)',
                color: '#C084FC'
              }}
            >
              <FolderArchive size={15} /> Full Package (.zip)
            </a>
          </div>
        </div>

        {/* Platform Selector Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.4rem',
          background: 'rgba(0, 0, 0, 0.25)',
          padding: '4px',
          borderRadius: '10px',
          marginBottom: '1rem'
        }}>
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
            <Apple size={15} /> iPhone
          </button>
        </div>

        {/* Step-by-Step Instructions */}
        <div style={{
          background: 'rgba(16, 185, 129, 0.05)',
          border: '1px solid rgba(16, 185, 129, 0.15)',
          borderRadius: '12px',
          padding: '0.85rem',
          fontSize: '0.82rem',
          lineHeight: '1.6'
        }}>
          {activePlatform === 'pc' && (
            <div>
              <p style={{ fontWeight: 700, color: '#60A5FA', margin: '0 0 0.4rem 0' }}>
                💻 Windows Desktop App Installation:
              </p>
              <ol style={{ paddingLeft: '1.25rem', margin: 0 }}>
                <li>Upar diye gaye <strong>"Windows App (.bat)"</strong> button par click karke file download karein.</li>
                <li>Downloaded file <strong>SmartFarmIQ-Windows-App.bat</strong> par double-click karein.</li>
                <li>Aapke Windows Desktop par <strong>Smart Farm IQ</strong> ka standalone app shortcut ban jayega!</li>
              </ol>
            </div>
          )}

          {activePlatform === 'android' && (
            <div>
              <p style={{ fontWeight: 700, color: 'var(--accent-green)', margin: '0 0 0.4rem 0' }}>
                📱 Android Phone Installation:
              </p>
              <ol style={{ paddingLeft: '1.25rem', margin: 0 }}>
                <li>Upar <strong>"Android App (.apk)"</strong> download karein ya browser me <strong>Three Dots (⋮)</strong> dabayein.</li>
                <li>Menu me <strong>"Install app"</strong> ya <strong>"Add to Home screen"</strong> par tap karein.</li>
                <li>App aapke phone ke app drawer me bina Play Store ke install ho jayegi!</li>
              </ol>
            </div>
          )}

          {activePlatform === 'ios' && (
            <div>
              <p style={{ fontWeight: 700, color: 'var(--accent-green)', margin: '0 0 0.4rem 0' }}>
                🍏 iPhone (Safari) Installation:
              </p>
              <ol style={{ paddingLeft: '1.25rem', margin: 0 }}>
                <li>Safari browser me niche bottom bar par <strong>Share icon (⬆️)</strong> dabayein.</li>
                <li>Scroll karke <strong>"Add to Home Screen"</strong> par tap karein.</li>
                <li>Home screen par Smart Farm IQ app icon ban jayega!</li>
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
