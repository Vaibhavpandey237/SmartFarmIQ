import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, Upload, RefreshCw, AlertCircle, CheckCircle2, 
  Sparkles, X, Eye, HelpCircle, Layers, ShieldAlert, Sprout, ArrowRight, UserX, AlertTriangle
} from 'lucide-react';
import { analyzeSoilImage } from '../../services/api.js';

export default function SoilScanner({ onScanComplete, externalFile, onClearExternalFile, onSwitchToDiagnosis }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [validationError, setValidationError] = useState(null);
  const [warningMsg, setWarningMsg] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);

  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  // Auto-process external file if passed from parent hero button
  useEffect(() => {
    if (externalFile) {
      handleFile(externalFile);
      if (onClearExternalFile) onClearExternalFile();
    }
  }, [externalFile]);

  // Quick Demo Samples (High-resolution authentic soil photographs for easy testing)
  const DEMO_SOIL_SAMPLES = [
    {
      name: 'Alluvial River Plain Soil',
      type: 'alluvial',
      url: 'https://images.unsplash.com/photo-1598880940371-c756e015fea1?w=500&auto=format&fit=crop&q=80',
      tag: 'Gangetic Basin'
    },
    {
      name: 'Deccan Black Cotton (Regur)',
      type: 'black',
      url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&auto=format&fit=crop&q=80',
      tag: 'Maharashtra Vertisol'
    },
    {
      name: 'Red Lateritic Upland Soil',
      type: 'laterite',
      url: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=500&auto=format&fit=crop&q=80',
      tag: 'Western Ghats Leached'
    },
    {
      name: 'Arid Thar Desert Sand',
      type: 'arid_desert',
      url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=500&auto=format&fit=crop&q=80',
      tag: 'Rajasthan Aridisol'
    }
  ];

  const handleFile = (file) => {
    if (!file) return;
    setErrorMsg('');
    setValidationError(null);
    setWarningMsg('');

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid photograph file (PNG, JPG, or WEBP).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('File size exceeds 10MB limit. Please upload a smaller image.');
      return;
    }

    const url = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreviewUrl(url);
    // Automatically trigger analysis for seamless experience
    runAnalysis(file, url);
  };

  const handleDemoSelect = async (demo) => {
    setErrorMsg('');
    setValidationError(null);
    setWarningMsg('');
    try {
      setAnalyzing(true);
      const res = await fetch(demo.url);
      const blob = await res.blob();
      const file = new File([blob], `${demo.type}_sample.jpg`, { type: 'image/jpeg' });
      setSelectedFile(file);
      setPreviewUrl(demo.url);
      await runAnalysis(file, demo.url);
    } catch (e) {
      setErrorMsg('Failed to load demo soil sample. Please upload a local photo.');
    } finally {
      setAnalyzing(false);
    }
  };

  // Device Camera Access
  const startCamera = async () => {
    setErrorMsg('');
    setValidationError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      setCameraStream(stream);
      setCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setErrorMsg('Could not open device camera. Please check camera permissions or upload a local file.');
      setCameraActive(false);
    }
  };

  const captureCameraPhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], `soil_capture_${Date.now()}.jpg`, { type: 'image/jpeg' });
        setSelectedFile(file);
        const url = URL.createObjectURL(blob);
        setPreviewUrl(url);
        stopCamera();
        runAnalysis(file, url);
      }
    }, 'image/jpeg', 0.92);
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setCameraActive(false);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setErrorMsg('');
    setValidationError(null);
    setWarningMsg('');
    stopCamera();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onScanComplete) {
      onScanComplete(null);
    }
  };

  const runAnalysis = async (fileToAnalyze = selectedFile, customPreview = previewUrl) => {
    if (!fileToAnalyze) return;
    setAnalyzing(true);
    setErrorMsg('');
    setValidationError(null);
    setWarningMsg('');

    try {
      const result = await analyzeSoilImage(fileToAnalyze);
      if (result.cautionMessage) {
        setWarningMsg(result.cautionMessage);
      }
      if (onScanComplete) {
        onScanComplete({
          ...result,
          previewUrl: customPreview || previewUrl
        });
      }
    } catch (err) {
      // Clear any previous valid results
      if (onScanComplete) {
        onScanComplete(null);
      }

      const code = err.code || 'VALIDATION_FAILED';
      const msg = err.customMessage || err.message || 'Image processing failed.';
      const sub = err.subMessage || 'Please ensure the photograph clearly shows agricultural soil under natural daylight.';

      setValidationError({
        code,
        message: msg,
        subMessage: sub,
        suggestionTab: err.suggestionTab || null
      });
      setErrorMsg(msg);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div id="soil-scanner-section" className="soil-scanner-wrapper">
      {/* 🌿 DEDICATED PLANT LEAF REJECTION BANNER */}
      {validationError && validationError.code === 'PLANT_LEAF_DETECTED' && (
        <div 
          className="alert-box" 
          style={{ 
            marginBottom: '1.5rem', 
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            borderLeft: '5px solid #10B981',
            borderRadius: '12px',
            padding: '1.25rem',
            display: 'flex',
            gap: '1rem',
            alignItems: 'flex-start'
          }}
        >
          <div style={{ 
            background: 'rgba(16, 185, 129, 0.2)', 
            borderRadius: '50%', 
            padding: '8px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Sprout size={24} style={{ color: '#10B981' }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
              <strong style={{ fontSize: '1.05rem', color: '#10B981', fontWeight: 700 }}>
                🌿 {validationError.message}
              </strong>
              <span style={{ 
                fontSize: '0.72rem', 
                background: '#EF4444', 
                color: '#FFF', 
                padding: '2px 8px', 
                borderRadius: '6px', 
                fontWeight: 600,
                letterSpacing: '0.3px'
              }}>
                SoilSense: केवल मिट्टी मान्य है (Only Soil Allowed)
              </span>
            </div>
            
            <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginTop: '0.45rem', lineHeight: 1.55 }}>
              {validationError.subMessage}
            </p>

            <div style={{ 
              marginTop: '0.75rem', 
              padding: '0.65rem 0.85rem', 
              background: 'rgba(0, 0, 0, 0.15)', 
              borderRadius: '8px', 
              fontSize: '0.82rem',
              color: 'var(--text-muted)'
            }}>
              💡 <strong>नोट:</strong> पत्ती के रोग (जैसे अगेती झुलसा, धब्बा रोग, कीट क्षति) का सटीक इलाज जानने के लिए हमारे <strong>Plant Disease Diagnosis</strong> मॉडल का प्रयोग करें।
            </div>

            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {onSwitchToDiagnosis && (
                <button 
                  type="button" 
                  className="btn-primary"
                  style={{ 
                    background: '#10B981', 
                    borderColor: '#10B981', 
                    padding: '0.6rem 1.25rem', 
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                  onClick={() => onSwitchToDiagnosis(selectedFile)}
                >
                  <Sprout size={18} />
                  <span>पौधे की बीमारी जांचें (Open Plant Disease Diagnosis)</span>
                  <ArrowRight size={16} />
                </button>
              )}
              <button 
                type="button" 
                className="btn-secondary"
                style={{ padding: '0.6rem 1.1rem', fontSize: '0.88rem' }}
                onClick={handleReset}
              >
                <RefreshCw size={14} style={{ marginRight: '6px' }} />
                मिट्टी की फोटो अपलोड करें (Upload Soil Photo)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 👤 HUMAN / PORTRAIT REJECTION BANNER */}
      {validationError && validationError.code === 'HUMAN_DETECTED' && (
        <div 
          className="alert-box alert-error" 
          style={{ 
            marginBottom: '1.5rem', 
            borderLeft: '5px solid #EF4444', 
            borderRadius: '12px', 
            padding: '1.25rem' 
          }}
        >
          <UserX size={26} style={{ flexShrink: 0, color: '#EF4444' }} />
          <div style={{ flex: 1 }}>
            <strong style={{ fontSize: '1rem', color: '#EF4444' }}>
              👤 {validationError.message}
            </strong>
            <p style={{ fontSize: '0.88rem', marginTop: '0.35rem' }}>
              {validationError.subMessage}
            </p>
            <div style={{ marginTop: '0.75rem' }}>
              <button type="button" className="btn-secondary" onClick={handleReset}>
                <RefreshCw size={14} style={{ marginRight: '6px' }} />
                खेत की मिट्टी की फोटो अपलोड करें (Upload Soil Photo)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ⚠️ GENERIC / NON-SOIL REJECTION BANNER */}
      {validationError && !['PLANT_LEAF_DETECTED', 'HUMAN_DETECTED'].includes(validationError.code) && (
        <div 
          className="alert-box alert-error" 
          style={{ 
            marginBottom: '1.5rem', 
            borderLeft: '5px solid #F59E0B', 
            borderRadius: '12px', 
            padding: '1.25rem' 
          }}
        >
          <AlertTriangle size={24} style={{ flexShrink: 0, color: '#F59E0B' }} />
          <div style={{ flex: 1 }}>
            <strong style={{ fontSize: '1rem', color: '#F59E0B' }}>
              ⚠️ {validationError.message}
            </strong>
            <p style={{ fontSize: '0.88rem', marginTop: '0.35rem' }}>
              {validationError.subMessage}
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
              💡 सुझाव: कैमरे को ज़मीन या गमले की मिट्टी से 15–30 सेमी की दूरी पर रखें और प्राकृतिक रोशनी में स्पष्ट फोटो लें।
            </p>
            <div style={{ marginTop: '0.75rem' }}>
              <button type="button" className="btn-secondary" onClick={handleReset}>
                <RefreshCw size={14} style={{ marginRight: '6px' }} />
                पुनः प्रयास करें (Try Again with Soil Photo)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FALLBACK ERROR BANNER (Only if no structured validationError) */}
      {errorMsg && !validationError && (
        <div className="alert-box alert-error" style={{ marginBottom: '1.25rem' }}>
          <AlertCircle size={20} style={{ flexShrink: 0 }} />
          <div>
            <strong>Image Validation Notice</strong>
            <p style={{ fontSize: '0.88rem', marginTop: '0.25rem' }}>{errorMsg}</p>
          </div>
        </div>
      )}

      {/* WARNING BANNER */}
      {warningMsg && (
        <div className="alert-box alert-warning" style={{ marginBottom: '1.25rem' }}>
          <ShieldAlert size={20} style={{ flexShrink: 0, color: '#F59E0B' }} />
          <div>
            <strong>Optical Accuracy Alert</strong>
            <p style={{ fontSize: '0.88rem', marginTop: '0.25rem' }}>{warningMsg}</p>
          </div>
        </div>
      )}

      {/* CAMERA VIEW MODAL / INLINE */}
      {cameraActive && (
        <div className="camera-live-box">
          <div className="camera-header">
            <span><Camera size={16} /> Live Soil Camera Feed</span>
            <button className="btn-icon" onClick={stopCamera} title="Close Camera">
              <X size={18} />
            </button>
          </div>
          <video ref={videoRef} autoPlay playsInline className="camera-video"></video>
          <div className="camera-controls">
            <button className="btn-primary" onClick={captureCameraPhoto}>
              <Camera size={18} /> Capture Soil Photograph
            </button>
            <button className="btn-secondary" onClick={stopCamera}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* MAIN UPLOAD / DROPZONE */}
      {!cameraActive && (
        <div className="soil-dropzone-container">
          {/* Soil Only Quality Header Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.6rem',
            padding: '0.4rem 0.8rem',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            fontSize: '0.8rem',
            color: 'var(--text-muted)'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, color: 'var(--accent-teal)' }}>
              <Layers size={14} /> Strict Soil Optical Filter Active
            </span>
            <span>केवल मिट्टी (Soil Only) • Leaves, faces & non-soil auto-rejected</span>
          </div>

          <div
            className={`dropzone soil-dropzone ${dragActive ? 'drag-active' : ''} ${previewUrl ? 'has-preview' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleFile(e.dataTransfer.files[0]);
              }
            }}
            onClick={() => !previewUrl && fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              id="soil-file-input"
              ref={fileInputRef} 
              accept="image/png,image/jpeg,image/webp,image/jpg" 
              style={{ display: 'none' }}
              onChange={(e) => handleFile(e.target.files?.[0])}
            />

            {previewUrl ? (
              <div className="soil-preview-wrapper" onClick={(e) => e.stopPropagation()}>
                <img src={previewUrl} alt="Soil Sample Preview" className="soil-preview-img" />
                <div className="preview-overlay-actions">
                  <button className="btn-pill-action" onClick={handleReset} title="Remove image">
                    <X size={14} /> Remove & Retake
                  </button>
                  <button className="btn-pill-action" onClick={() => fileInputRef.current?.click()} title="Change image">
                    <Upload size={14} /> Change Photo
                  </button>
                </div>
              </div>
            ) : (
              <div className="dropzone-empty-state">
                <div className="dropzone-icon-circle">
                  <Layers size={32} color="var(--accent-teal)" />
                </div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginTop: '0.75rem' }}>
                  Capture or Upload Soil Photograph (मिट्टी की फोटो)
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: '420px', margin: '0.35rem auto 1rem' }}>
                  Drag & drop soil photo here, or use device camera. SoilSense strictly accepts agricultural soil, sand, clay, or field dirt.
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button 
                    type="button" 
                    className="btn-secondary" 
                    onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                  >
                    <Upload size={16} /> Browse Files
                  </button>
                  <button 
                    type="button" 
                    className="btn-secondary" 
                    onClick={(e) => { e.stopPropagation(); startCamera(); }}
                  >
                    <Camera size={16} /> Open Camera
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ACTION BUTTON & PROGRESS */}
          {previewUrl && (
            <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
              <button 
                className="btn-primary" 
                style={{ minWidth: '240px', padding: '0.85rem 1.75rem', fontSize: '1rem' }}
                onClick={() => runAnalysis()} 
                disabled={analyzing}
              >
                {analyzing ? (
                  <>
                    <RefreshCw size={20} className="spin" />
                    <span>Analyzing Soil Aggregate & Minerals...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={20} />
                    <span>Run SoilSense AI Identification</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* RADAR SCANNING SIMULATION */}
          {analyzing && (
            <div className="scanning-progress-box">
              <div className="scan-radar-line"></div>
              <p style={{ fontSize: '0.85rem', color: 'var(--accent-teal)', fontWeight: 600, marginTop: '0.5rem' }}>
                🔬 Verifying authentic soil minerals • Evaluating particle granularity • Calibrating optical confidence...
              </p>
            </div>
          )}

          {/* QUICK DEMO BENCHMARK SAMPLES */}
          <div className="demo-samples-bar">
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Eye size={14} /> Quick Demo Soil Samples:
            </span>
            <div className="demo-chips-list">
              {DEMO_SOIL_SAMPLES.map((demo, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="demo-soil-chip"
                  onClick={() => handleDemoSelect(demo)}
                  disabled={analyzing}
                  title={`Test with ${demo.name} (${demo.tag})`}
                >
                  <img src={demo.url} alt={demo.name} className="demo-chip-thumb" />
                  <span>{demo.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
