import React, { useState } from 'react';
import { 
  CheckCircle2, AlertTriangle, Droplets, Waves, Activity, 
  HelpCircle, ArrowRight, Bookmark, Printer, Edit3, 
  Layers, Compass, Info, Check 
} from 'lucide-react';
import { INDIAN_SOIL_GROUPS, SOIL_TEXTURE_CLASSES } from '../../data/soilCropKnowledgeBase';

export default function SoilResultCard({ 
  result, 
  onProceedToRecommendations, 
  onSaveReport, 
  onPrintReport,
  onSoilGroupChange 
}) {
  if (!result) return null;

  const [activeSoilKey, setActiveSoilKey] = useState(result.predictedGroup || 'alluvial');
  const [activeTextureKey, setActiveTextureKey] = useState(result.estimatedTexture || 'loam');
  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const currentSoil = INDIAN_SOIL_GROUPS[activeSoilKey] || INDIAN_SOIL_GROUPS.alluvial;
  const currentTexture = SOIL_TEXTURE_CLASSES[activeTextureKey] || SOIL_TEXTURE_CLASSES.loam;

  const handleGroupSelect = (groupKey) => {
    setActiveSoilKey(groupKey);
    if (onSoilGroupChange) {
      onSoilGroupChange(groupKey, activeTextureKey);
    }
  };

  const handleTextureSelect = (textureKey) => {
    setActiveTextureKey(textureKey);
    if (onSoilGroupChange) {
      onSoilGroupChange(activeSoilKey, textureKey);
    }
  };

  const handleSave = () => {
    if (onSaveReport) {
      onSaveReport({
        ...result,
        selectedGroup: activeSoilKey,
        selectedTexture: activeTextureKey
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  return (
    <div className="soil-result-card-container">
      {/* LOW CONFIDENCE OR BLURRY ALERT */}
      {result.isLowConfidence && (
        <div className="alert-box alert-warning" style={{ marginBottom: '1.25rem' }}>
          <AlertTriangle size={20} color="#F59E0B" style={{ flexShrink: 0 }} />
          <div>
            <strong>Low Optical Confidence Warning</strong>
            <p style={{ fontSize: '0.86rem', marginTop: '0.2rem' }}>
              {result.cautionMessage || 'The AI model detected transitional or mixed surface reflections. Because surface color can be influenced by moisture or lighting, we recommend verifying with a soil health lab or manually selecting your confirmed soil group below.'}
            </p>
          </div>
        </div>
      )}

      <div className="soil-result-header-grid">
        {/* SOIL PHOTO PREVIEW & CONFIDENCE */}
        <div className="soil-thumb-column">
          {result.previewUrl ? (
            <div className="result-img-wrapper">
              <img src={result.previewUrl} alt="Soil Sample" className="result-soil-img" />
              <div className="soil-sample-badge">
                <Layers size={13} /> Optical Sample
              </div>
            </div>
          ) : (
            <div className="result-img-placeholder">
              <Layers size={36} color="var(--accent-teal)" />
            </div>
          )}

          {/* CONFIDENCE GAUGE */}
          <div className="confidence-meter-box">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                Optical Confidence:
              </span>
              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: result.confidencePct >= 75 ? 'var(--accent-green)' : '#F59E0B' }}>
                {result.confidencePct}%
              </span>
            </div>
            <div className="confidence-track">
              <div 
                className="confidence-fill" 
                style={{ 
                  width: `${Math.min(100, result.confidencePct)}%`,
                  backgroundColor: result.confidencePct >= 75 ? 'var(--accent-green)' : '#F59E0B'
                }}
              ></div>
            </div>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
              *Calibrated from surface color matrix and macro-granularity.
            </p>
          </div>
        </div>

        {/* CLASSIFICATION DETAILS */}
        <div className="soil-details-column">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <span className="badge-pill">Major Indian Soil Group</span>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 700, margin: '0.35rem 0 0.15rem', color: 'var(--text-main)' }}>
                {currentSoil.name}
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--accent-teal)', fontWeight: 600 }}>
                {currentSoil.hindiName}
              </p>
            </div>

            <button 
              className="btn-pill-action" 
              onClick={() => setIsEditing(!isEditing)}
              title="Manually correct classification if known from Soil Health Card"
            >
              <Edit3 size={14} /> {isEditing ? 'Done Correcting' : 'Correct Classification'}
            </button>
          </div>

          {/* MANUAL CORRECTION ACCORDION */}
          {isEditing && (
            <div className="manual-correction-box">
              <p style={{ fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--accent-teal)' }}>
                Select Confirmed Major Soil Group:
              </p>
              <div className="group-chips-grid">
                {Object.keys(INDIAN_SOIL_GROUPS).map((key) => {
                  const grp = INDIAN_SOIL_GROUPS[key];
                  const isSelected = activeSoilKey === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      className={`group-chip-btn ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleGroupSelect(key)}
                    >
                      {grp.name.split(' (')[0]}
                      {isSelected && <Check size={14} style={{ marginLeft: '4px' }} />}
                    </button>
                  );
                })}
              </div>

              <p style={{ fontSize: '0.84rem', fontWeight: 600, margin: '0.75rem 0 0.5rem', color: 'var(--accent-teal)' }}>
                Select Soil Texture Class:
              </p>
              <div className="group-chips-grid">
                {Object.keys(SOIL_TEXTURE_CLASSES).map((key) => {
                  const txt = SOIL_TEXTURE_CLASSES[key];
                  const isSelected = activeTextureKey === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      className={`group-chip-btn ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleTextureSelect(key)}
                    >
                      {txt.name.split(' (')[0]}
                      {isSelected && <Check size={14} style={{ marginLeft: '4px' }} />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* SEPARATE SOIL TEXTURE BADGE */}
          <div className="texture-highlight-box">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Layers size={18} color="var(--accent-teal)" />
              <div>
                <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)' }}>
                  Physical Soil Texture Class (Distinct from Soil Group)
                </span>
                <p style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  {currentTexture.name}
                </p>
              </div>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
              Composition: {currentTexture.composition} • Workability: {currentTexture.feel}
            </p>
          </div>

          {/* ALTERNATIVE CANDIDATE CLASSES */}
          {result.alternativeClasses && result.alternativeClasses.length > 0 && !isEditing && (
            <div className="alternative-classes-row">
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                Alternative Candidates:
              </span>
              {result.alternativeClasses.map((alt, idx) => (
                <span key={idx} className="alt-chip">
                  {alt.name} ({alt.confidence}%)
                </span>
              ))}
            </div>
          )}

          {/* DESCRIPTION */}
          <p style={{ fontSize: '0.88rem', lineHeight: '1.5', marginTop: '0.75rem', color: 'var(--text-main)' }}>
            {currentSoil.description}
          </p>
        </div>
      </div>

      {/* AGRONOMIC ESTIMATES GRID */}
      <div className="agronomic-estimates-grid">
        <div className="estimate-card">
          <div className="estimate-icon-wrap" style={{ background: 'rgba(20, 184, 166, 0.15)', color: 'var(--accent-teal)' }}>
            <Droplets size={20} />
          </div>
          <div>
            <span className="estimate-label">Typical Water Retention</span>
            <p className="estimate-value">{currentSoil.waterRetention.split(';')[0]}</p>
            <span className="estimate-tag">Typical Estimate</span>
          </div>
        </div>

        <div className="estimate-card">
          <div className="estimate-icon-wrap" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-green)' }}>
            <Waves size={20} />
          </div>
          <div>
            <span className="estimate-label">Drainage & Aeration</span>
            <p className="estimate-value">{currentSoil.drainage.split(';')[0]}</p>
            <span className="estimate-tag">Field Behavior</span>
          </div>
        </div>

        <div className="estimate-card">
          <div className="estimate-icon-wrap" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B' }}>
            <Activity size={20} />
          </div>
          <div>
            <span className="estimate-label">Optimal pH Range</span>
            <p className="estimate-value">{currentSoil.phRange.optimal.split(' (')[0]}</p>
            <span className="estimate-tag">{currentSoil.phRange.optimal.split('(')[1]?.replace(')', '') || 'Verified Range'}</span>
          </div>
        </div>

        <div className="estimate-card">
          <div className="estimate-icon-wrap" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#3B82F6' }}>
            <Compass size={20} />
          </div>
          <div>
            <span className="estimate-label">Key Indian Regions</span>
            <p className="estimate-value" style={{ fontSize: '0.85rem' }}>
              {(currentSoil?.states || []).slice(0, 4).join(', ')}...
            </p>
            <span className="estimate-tag">{currentSoil.coveragePct.split(' of')[0]} of India</span>
          </div>
        </div>
      </div>

      {/* LIMITATIONS & NEXT STEPS */}
      <div className="limitations-next-steps-grid">
        <div className="card-sub-block">
          <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#EF4444', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
            <AlertTriangle size={16} /> Agronomic Limitations to Manage
          </h4>
          <ul className="info-bullets">
            {(currentSoil?.limitations || []).map((lim, idx) => (
              <li key={idx}>{lim}</li>
            ))}
          </ul>
        </div>

        <div className="card-sub-block">
          <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
            <CheckCircle2 size={16} /> Recommended Agronomic Next Steps
          </h4>
          <ul className="info-bullets">
            {(result?.recommendedNextSteps || []).map((stp, idx) => (
              <li key={idx}>{stp}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* SCIENTIFIC DISCLAIMER */}
      <div className="scientific-disclaimer-box">
        <Info size={16} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--accent-teal)' }} />
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.45' }}>
          <strong>Scientific Principle:</strong> Geographical soil groups (e.g. Vertisols, Alfisols) cannot be identified with 100% certainty solely from surface photographs. Black-looking soil is not guaranteed to be Black Cotton soil, nor is reddish soil guaranteed to be Red Alfisol. Use this optical assessment in conjunction with local knowledge or laboratory soil testing.
        </p>
      </div>

      {/* ACTIONS FOOTER */}
      <div className="result-actions-footer">
        <button 
          className="btn-primary" 
          onClick={() => onProceedToRecommendations && onProceedToRecommendations({
            soilGroupKey: activeSoilKey,
            soilTextureKey: activeTextureKey
          })}
        >
          <span>Get Crop Recommendations</span>
          <ArrowRight size={18} />
        </button>

        <button 
          className="btn-secondary" 
          onClick={handleSave}
          title="Save scan result to your farm profile"
        >
          <Bookmark size={16} /> {savedSuccess ? 'Saved to Profile ✓' : 'Save Scan'}
        </button>

        {onPrintReport && (
          <button 
            className="btn-secondary" 
            onClick={onPrintReport}
            title="Open printable SoilSense report"
          >
            <Printer size={16} /> Print / Save PDF
          </button>
        )}
      </div>
    </div>
  );
}
