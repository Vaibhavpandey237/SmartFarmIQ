import React, { useState, useEffect } from 'react';
import { 
  Layers, Sprout, Sparkles, Droplets, Camera, ArrowRight, 
  BookOpen, Bookmark, ShieldCheck, HelpCircle, CheckCircle2, 
  MapPin, Sliders, RefreshCw 
} from 'lucide-react';
import SoilScanner from './SoilScanner';
import SoilResultCard from './SoilResultCard';
import CropRecommendationEngine from './CropRecommendationEngine';
import SoilImprovementGuide from './SoilImprovementGuide';
import FarmProfileManager from './FarmProfileManager';
import SoilReportModal from './SoilReportModal';
import { fetchSoilScanHistory, saveSoilScanRecord, clearSoilScanHistory } from '../../services/api.js';

export default function SoilSenseView({ user }) {
  // Navigation Sub-tab inside SoilSense AI
  const [activeSubTab, setActiveSubTab] = useState('scanner'); // 'scanner' | 'recommendations' | 'guide' | 'history'

  // Current Scan State
  const [currentScanResult, setCurrentScanResult] = useState(null);
  const [selectedSoilGroup, setSelectedSoilGroup] = useState('alluvial');
  const [selectedSoilTexture, setSelectedSoilTexture] = useState('loam');
  const [externalFile, setExternalFile] = useState(null);

  // Saved Reports History
  const [savedReports, setSavedReports] = useState([]);
  const [activeReportModal, setActiveReportModal] = useState(null);

  // Load saved soil scans on mount
  useEffect(() => {
    loadSoilHistory();
  }, []);

  const loadSoilHistory = async () => {
    try {
      const data = await fetchSoilScanHistory();
      setSavedReports(data || []);
    } catch (e) {}
  };

  const scrollToSection = (sectionId) => {
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        el.classList.add('pulse-focus');
        setTimeout(() => el.classList.remove('pulse-focus'), 2200);
      }
    }, 70);
  };

  const handleHeroScanSoil = () => {
    setActiveSubTab('scanner');
    // Open system file chooser synchronously from direct user click
    const fileInput = document.getElementById('hero-soil-file-input') || document.getElementById('soil-file-input');
    if (fileInput) {
      fileInput.click();
    }
    // Also scroll down smoothly to scanner workspace
    scrollToSection('soil-scanner-section');
  };

  const handleHeroCropRecommendations = () => {
    setActiveSubTab('recommendations');
    scrollToSection('crop-recommendations-section');
  };

  const handleScanComplete = (scanResult) => {
    setCurrentScanResult(scanResult);
    if (scanResult.predictedGroup) {
      setSelectedSoilGroup(scanResult.predictedGroup);
    }
    if (scanResult.estimatedTexture) {
      setSelectedSoilTexture(scanResult.estimatedTexture);
    }
  };

  const handleSoilGroupChange = (newGroup, newTexture) => {
    setSelectedSoilGroup(newGroup);
    if (newTexture) setSelectedSoilTexture(newTexture);
  };

  const handleProceedToRecommendations = (data) => {
    if (data?.soilGroupKey) setSelectedSoilGroup(data.soilGroupKey);
    if (data?.soilTextureKey) setSelectedSoilTexture(data.soilTextureKey);
    setActiveSubTab('recommendations');
    scrollToSection('crop-recommendations-section');
  };

  const handleSaveReport = async (reportData) => {
    const record = {
      id: reportData.id || `SSR-${Date.now().toString().slice(-6)}`,
      date: reportData.date || new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      timestamp: new Date().toISOString(),
      previewUrl: currentScanResult?.previewUrl || reportData.previewUrl,
      soilGroup: reportData.soilGroup || reportData.selectedGroup || selectedSoilGroup,
      predictedGroupName: currentScanResult?.predictedGroupName,
      soilTexture: reportData.soilTexture || reportData.selectedTexture || selectedSoilTexture,
      confidencePct: currentScanResult?.confidencePct || 82.5,
      state: reportData.state || 'Uttar Pradesh',
      district: reportData.district || 'Bareilly',
      season: reportData.season || 'kharif',
      irrigation: reportData.irrigation || 'limited',
      topRecommendations: reportData.topRecommendations || [],
      ...reportData
    };

    await saveSoilScanRecord(record);
    await loadSoilHistory();
  };

  const handleDeleteReport = async (reportId) => {
    const updated = savedReports.filter(r => r.id !== reportId);
    setSavedReports(updated);
    localStorage.setItem('plant_soil_history', JSON.stringify(updated));
  };

  const handleClearAllHistory = async () => {
    if (window.confirm('Are you sure you want to clear your saved soil scan history?')) {
      await clearSoilScanHistory();
      setSavedReports([]);
    }
  };

  return (
    <div className="soilsense-view-wrapper">
      {/* HIDDEN HERO FILE INPUT FOR DIRECT CAPTURE/BROWSE */}
      <input 
        type="file" 
        id="hero-soil-file-input" 
        accept="image/png,image/jpeg,image/webp,image/jpg" 
        style={{ display: 'none' }}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            setExternalFile(e.target.files[0]);
            setActiveSubTab('scanner');
            scrollToSection('soil-scanner-section');
          }
        }}
      />

      {/* HERO SECTION */}
      <section className="soilsense-hero-card card">
        <div className="soilsense-hero-content">
          <div className="badge-pill hero-badge">
            <Sparkles size={14} /> AI-Powered Agricultural Soil Intelligence
          </div>
          <h2 className="soilsense-hero-title">
            Discover Your Soil, Grow the Right Crop.
          </h2>
          <p className="soilsense-hero-description">
            Upload or photograph agricultural soil clods for optical soil group identification and physical texture evaluation. SoilSense AI integrates Indian agro-climatic zones, seasonal cycles, and water availability to recommend the most productive, verified crops for your field.
          </p>

          <div className="soilsense-hero-actions">
            <button 
              type="button"
              className="btn-primary hero-btn"
              onClick={handleHeroScanSoil}
              title="Upload soil image or open camera scanner"
            >
              <Camera size={18} /> Scan Soil
            </button>
            <button 
              type="button"
              className="btn-secondary hero-btn"
              onClick={handleHeroCropRecommendations}
              title="Open multi-factor crop recommendation engine"
            >
              <Sprout size={18} /> Get Crop Recommendations
            </button>
          </div>
        </div>

        <div className="soilsense-hero-visual">
          <div className="hero-soil-card-visual">
            <img 
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=80" 
              alt="Agricultural Soil Clod" 
              className="hero-soil-img"
            />
            <div className="hero-visual-badge">
              <Layers size={16} color="var(--accent-teal)" />
              <div>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  Surface Scan Active
                </span>
                <p style={{ fontSize: '0.85rem', fontWeight: 700, margin: 0 }}>
                  Indian Soil Group & Texture Matrix
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS 3-STEP PIPELINE */}
      <section className="soilsense-steps-grid">
        <div className="step-card">
          <div className="step-number">1</div>
          <div className="step-content">
            <h4 className="step-title">Capture & Validate</h4>
            <p className="step-desc">
              Photograph soil clods under natural daylight. The AI validates sample clarity, surface texture, and rejects non-soil objects.
            </p>
          </div>
        </div>

        <div className="step-card">
          <div className="step-number">2</div>
          <div className="step-content">
            <h4 className="step-title">Classify Group & Texture</h4>
            <p className="step-desc">
              Determines major Indian soil group (Alluvial, Black, Red, Laterite, Desert) and physical texture (Loam, Clay, Sand) with calibrated confidence.
            </p>
          </div>
        </div>

        <div className="step-card">
          <div className="step-number">3</div>
          <div className="step-content">
            <h4 className="step-title">Smart Crop Advisory</h4>
            <p className="step-desc">
              Cross-references verified ICAR data with your state, season, and water access to rank top suitable crops with actionable field steps.
            </p>
          </div>
        </div>
      </section>

      {/* MODULE SUB-NAVIGATION BAR */}
      <div className="soilsense-subnav-bar">
        <button 
          className={`subnav-btn ${activeSubTab === 'scanner' ? 'active' : ''}`}
          onClick={() => {
            setActiveSubTab('scanner');
            scrollToSection('soil-scanner-section');
          }}
        >
          <Camera size={16} /> Soil Scanner & Identification
        </button>
        <button 
          className={`subnav-btn ${activeSubTab === 'recommendations' ? 'active' : ''}`}
          onClick={() => {
            setActiveSubTab('recommendations');
            scrollToSection('crop-recommendations-section');
          }}
        >
          <Sprout size={16} /> Smart Crop Recommendations
        </button>
        <button 
          className={`subnav-btn ${activeSubTab === 'guide' ? 'active' : ''}`}
          onClick={() => {
            setActiveSubTab('guide');
            scrollToSection('soil-guide-section');
          }}
        >
          <BookOpen size={16} /> Soil Improvement & Stewardship
        </button>
        <button 
          className={`subnav-btn ${activeSubTab === 'history' ? 'active' : ''}`}
          onClick={() => {
            setActiveSubTab('history');
            scrollToSection('farm-history-section');
          }}
        >
          <Bookmark size={16} /> Saved Reports ({savedReports.length})
        </button>
      </div>

      {/* SUB-TAB VIEWS */}
      <div className="soilsense-view-body">
        {/* TAB 1: SCANNER & ANALYSIS */}
        {activeSubTab === 'scanner' && (
          <div className="scanner-tab-layout">
            <SoilScanner 
              onScanComplete={handleScanComplete} 
              externalFile={externalFile}
              onClearExternalFile={() => setExternalFile(null)}
            />

            {currentScanResult && (
              <div style={{ marginTop: '2rem' }}>
                <SoilResultCard 
                  result={currentScanResult}
                  onProceedToRecommendations={handleProceedToRecommendations}
                  onSaveReport={handleSaveReport}
                  onPrintReport={() => setActiveReportModal({
                    ...currentScanResult,
                    soilGroup: currentScanResult.predictedGroupName,
                    soilTexture: currentScanResult.estimatedTextureName,
                    topRecommendations: []
                  })}
                  onSoilGroupChange={handleSoilGroupChange}
                />
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SMART CROP RECOMMENDATIONS */}
        {activeSubTab === 'recommendations' && (
          <CropRecommendationEngine 
            initialSoilGroup={selectedSoilGroup}
            initialTexture={selectedSoilTexture}
            onSaveReport={handleSaveReport}
            onPrintReport={(report) => setActiveReportModal(report || {
              soilGroup: selectedSoilGroup,
              soilTexture: selectedSoilTexture
            })}
          />
        )}

        {/* TAB 3: SOIL IMPROVEMENT & STEWARDSHIP */}
        {activeSubTab === 'guide' && (
          <SoilImprovementGuide currentSoilGroup={selectedSoilGroup} />
        )}

        {/* TAB 4: FARM HISTORY & REPORTS */}
        {activeSubTab === 'history' && (
          <FarmProfileManager 
            savedReports={savedReports}
            onViewReport={(rep) => setActiveReportModal(rep)}
            onDeleteReport={handleDeleteReport}
            onClearAll={handleClearAllHistory}
          />
        )}
      </div>

      {/* PRINTABLE REPORT MODAL */}
      {activeReportModal && (
        <SoilReportModal 
          reportData={activeReportModal}
          user={user}
          onClose={() => setActiveReportModal(null)}
        />
      )}
    </div>
  );
}
