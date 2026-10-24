import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, Upload, RefreshCw, AlertCircle, CheckCircle2, 
  Sparkles, X, Eye, HelpCircle, Layers, ShieldAlert 
} from 'lucide-react';
import { analyzeSoilImage } from '../../services/api.js';

export default function SoilScanner({ onScanComplete, externalFile, onClearExternalFile }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
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
      setErrorMsg('Unable to access device camera. Please check camera permissions or upload an image from your device.');
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
        setPreviewUrl(URL.createObjectURL(blob));
        stopCamera();
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
    setWarningMsg('');
    stopCamera();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const runAnalysis = async (fileToAnalyze = selectedFile, customPreview = previewUrl) => {
    if (!fileToAnalyze) return;
    setAnalyzing(true);
    setErrorMsg('');
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
      setErrorMsg(err.message || 'Image processing failed. Please ensure the photograph clearly shows soil surface clods under natural light.');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div id="soil-scanner-section" className="soil-scanner-wrapper">
      {/* ERROR BANNER */}
      {errorMsg && (
        <div className="alert-box alert-error" style={{ marginBottom: '1.25rem' }}>
          <AlertCircle size={20} style={{ flexShrink: 0 }} />
          <div>
            <strong>Image Validation Notice</strong>
            <p style={{ fontSize: '0.88rem', marginTop: '0.25rem' }}>{errorMsg}</p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Tip: Photograph soil at 20–30 cm distance in open natural daylight. Clear away large stones, plant branches, or debris.
            </p>
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
                  Capture or Upload Soil Photograph
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: '420px', margin: '0.35rem auto 1rem' }}>
                  Drag & drop soil photo here, or use device camera. Supports PNG, JPG, WEBP up to 10MB.
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
                    <span>Analyzing Soil Aggregate & Reflectance...</span>
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
                🔬 Extracting color matrix • Evaluating particle granularity • Calibrating optical confidence...
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
