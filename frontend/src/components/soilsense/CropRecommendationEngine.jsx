import React, { useState, useEffect } from 'react';
import { 
  Sprout, Droplets, Sun, Calendar, MapPin, Sliders, 
  CheckCircle2, AlertCircle, ArrowRight, ExternalLink, 
  HelpCircle, Sparkles, BookOpen, Printer, Bookmark, Activity, Zap, Cpu
} from 'lucide-react';
import { 
  INDIAN_SOIL_GROUPS, 
  SOIL_TEXTURE_CLASSES, 
  INDIAN_STATES_DISTRICTS 
} from '../../data/soilCropKnowledgeBase.js';
import { calculateCropRecommendations } from '../../services/soilRecommendationEngine.js';
import SoilSensorTelemetryPanel from './SoilSensorTelemetryPanel.jsx';

// Bulletproof fallback in case knowledge base array is empty or undefined
const SAFE_STATES_DISTRICTS = (INDIAN_STATES_DISTRICTS && INDIAN_STATES_DISTRICTS.length > 0) 
  ? INDIAN_STATES_DISTRICTS 
  : [
      { state: 'Uttar Pradesh', districts: ['Varanasi', 'Lucknow', 'Kanpur', 'Prayagraj', 'Bareilly', 'Agra', 'Aligarh'] },
      { state: 'Punjab', districts: ['Ludhiana', 'Amritsar', 'Patiala', 'Jalandhar', 'Bathinda'] },
      { state: 'Haryana', districts: ['Karnal', 'Hisar', 'Ambala', 'Rohtak', 'Sirsa'] },
      { state: 'Maharashtra', districts: ['Pune', 'Nashik', 'Nagpur', 'Aurangabad', 'Solapur'] },
      { state: 'Madhya Pradesh', districts: ['Indore', 'Bhopal', 'Ujjain', 'Jabalpur', 'Gwalior'] },
      { state: 'Gujarat', districts: ['Ahmedabad', 'Surat', 'Rajkot', 'Vadodara', 'Bhavnagar'] },
      { state: 'Rajasthan', districts: ['Jaipur', 'Jodhpur', 'Kota', 'Bikaner', 'Udaipur', 'Barmer'] }
    ];

export default function CropRecommendationEngine({ 
  initialSoilGroup = 'alluvial', 
  initialTexture = 'loam', 
  onSaveReport, 
  onPrintReport 
}) {
  // Field Form State
  const [selectedSoilGroup, setSelectedSoilGroup] = useState(initialSoilGroup);
  const [selectedTexture, setSelectedTexture] = useState(initialTexture);
  const [selectedState, setSelectedState] = useState('Uttar Pradesh');
  const [selectedDistrict, setSelectedDistrict] = useState(() => {
    const s = SAFE_STATES_DISTRICTS.find(item => item.state === 'Uttar Pradesh') || SAFE_STATES_DISTRICTS[0];
    return s?.districts?.[0] || 'Varanasi';
  });
  const [selectedSeason, setSelectedSeason] = useState('kharif');
  const [selectedIrrigation, setSelectedIrrigation] = useState('limited');
  const [farmingGoal, setFarmingGoal] = useState('all');

  // Live Hardware Sensor & Soil Health Card Telemetry State
  const [sensorTelemetry, setSensorTelemetry] = useState(() => {
    const b = INDIAN_SOIL_GROUPS[initialSoilGroup]?.sensorBenchmark;
    return b ? {
      moisture: b.moisturePct,
      temperature: b.tempC,
      ph: b.ph,
      ec: b.ecDsm,
      nitrogen: b.nitrogenKgHa,
      phosphorus: b.phosphorusKgHa,
      potassium: b.potassiumKgHa,
      organicCarbon: b.organicCarbonPct,
      sandPct: b.sandPct,
      siltPct: b.siltPct,
      clayPct: b.clayPct
    } : {
      moisture: 45,
      temperature: 25.5,
      ph: 7.3,
      ec: 0.85,
      nitrogen: 220,
      phosphorus: 18,
      potassium: 280,
      organicCarbon: 0.55,
      sandPct: 40,
      siltPct: 40,
      clayPct: 20
    };
  });

  const [showTelemetryPanel, setShowTelemetryPanel] = useState(true);

  // Farm Field Details
  const [fieldName, setFieldName] = useState('Field Plot #1');
  const [fieldAcreage, setFieldAcreage] = useState('2.5');

  // Recommendation Results State
  const [recommendationsData, setRecommendationsData] = useState(null);
  const [selectedCropModal, setSelectedCropModal] = useState(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Sync initial props
  useEffect(() => {
    if (initialSoilGroup) setSelectedSoilGroup(initialSoilGroup);
    if (initialTexture) setSelectedTexture(initialTexture);
  }, [initialSoilGroup, initialTexture]);

  // Update district when state changes
  useEffect(() => {
    const stateObj = SAFE_STATES_DISTRICTS.find(s => s.state === selectedState);
    if (stateObj && stateObj.districts && stateObj.districts.length > 0) {
      setSelectedDistrict(stateObj.districts[0]);
    }
  }, [selectedState]);

  // Compute recommendations whenever parameters or live telemetry change
  useEffect(() => {
    runRecommendation();
  }, [
    selectedSoilGroup, 
    selectedTexture, 
    selectedState, 
    selectedDistrict, 
    selectedSeason, 
    selectedIrrigation, 
    farmingGoal, 
    sensorTelemetry
  ]);

  const runRecommendation = () => {
    const results = calculateCropRecommendations({
      soilGroupKey: selectedSoilGroup,
      soilTextureKey: selectedTexture,
      state: selectedState,
      district: selectedDistrict,
      season: selectedSeason,
      irrigation: selectedIrrigation,
      soilTest: sensorTelemetry,
      farmingGoal
    });

    setRecommendationsData(results);
  };

  const handleSaveToProfile = () => {
    if (onSaveReport && recommendationsData) {
      const fullReport = {
        id: `soil_report_${Date.now()}`,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        timestamp: new Date().toISOString(),
        fieldName,
        fieldAcreage,
        state: selectedState,
        district: selectedDistrict,
        season: selectedSeason,
        irrigation: selectedIrrigation,
        soilGroup: INDIAN_SOIL_GROUPS[selectedSoilGroup]?.name || selectedSoilGroup,
        soilTexture: SOIL_TEXTURE_CLASSES[selectedTexture]?.name || selectedTexture,
        soilTest: sensorTelemetry,
        topRecommendations: recommendationsData.recommendations,
        isPreliminary: recommendationsData.isPreliminary
      };
      onSaveReport(fullReport);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  const activeStateObj = SAFE_STATES_DISTRICTS.find(s => s.state === selectedState) || SAFE_STATES_DISTRICTS[0];

  return (
    <div id="crop-recommendations-section" className="crop-engine-wrapper">
      {/* PRELIMINARY NOTICE WHEN DATA IS MINIMAL */}
      {recommendationsData?.isPreliminary && (
        <div className="alert-box alert-warning" style={{ marginBottom: '1.25rem' }}>
          <AlertCircle size={20} color="#F59E0B" style={{ flexShrink: 0 }} />
          <div>
            <strong>Preliminary Recommendation Advisory</strong>
            <p style={{ fontSize: '0.86rem', marginTop: '0.2rem' }}>
              Recommendations are currently preliminary because key field inputs ({recommendationsData.missingFactors?.join(', ') || 'field details'}) are missing. Provide exact details below for field-calibrated results.
            </p>
          </div>
        </div>
      )}

      {/* 📡 LIVE HARDWARE SENSOR & SOIL HEALTH CARD (SHC) TELEMETRY DASHBOARD */}
      <SoilSensorTelemetryPanel 
        currentSoilGroup={selectedSoilGroup}
        sensorData={sensorTelemetry}
        onSensorDataChange={(updated) => setSensorTelemetry(updated)}
        onSoilGroupSelect={(groupKey) => setSelectedSoilGroup(groupKey)}
        selectedState={selectedState}
        selectedDistrict={selectedDistrict}
        onLocationChange={(newState, newDistrict) => {
          setSelectedState(newState);
          setSelectedDistrict(newDistrict);
        }}
      />

      {/* MULTI-FACTOR INPUTS CARD */}
      <div className="card crop-engine-form-card">
        <h3 className="card-title" style={{ fontSize: '1.15rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sliders size={20} color="var(--accent-teal)" /> Smart Field & Agronomic Parameters
          </span>
        </h3>
        <p className="card-subtitle">
          Align soil group, location, season, and irrigation resources to compute verified agronomic compatibility scores.
        </p>

        <div className="form-fields-grid">
          {/* STATE SELECTION */}
          <div className="form-group">
            <label className="field-label">
              <MapPin size={15} /> State & Region
            </label>
            <select 
              className="styled-select" 
              value={selectedState} 
              onChange={(e) => setSelectedState(e.target.value)}
            >
              {(SAFE_STATES_DISTRICTS || []).map((s, idx) => (
                <option key={idx} value={s.state}>{s.state}</option>
              ))}
            </select>
          </div>

          {/* DISTRICT SELECTION */}
          <div className="form-group">
            <label className="field-label">
              <MapPin size={15} /> District
            </label>
            <select 
              className="styled-select" 
              value={selectedDistrict} 
              onChange={(e) => setSelectedDistrict(e.target.value)}
            >
              {(activeStateObj?.districts || ['Varanasi', 'Lucknow', 'Kanpur']).map((d, idx) => (
                <option key={idx} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* SOWING SEASON */}
          <div className="form-group">
            <label className="field-label">
              <Calendar size={15} /> Intended Sowing Season
            </label>
            <select 
              className="styled-select" 
              value={selectedSeason} 
              onChange={(e) => setSelectedSeason(e.target.value)}
            >
              <option value="kharif">Kharif (Monsoon: June – October)</option>
              <option value="rabi">Rabi (Winter: October – March)</option>
              <option value="zaid">Zaid (Summer: March – June)</option>
              <option value="annual">Perennial / Whole Year Planting</option>
            </select>
          </div>

          {/* IRRIGATION AVAILABILITY */}
          <div className="form-group">
            <label className="field-label">
              <Droplets size={15} /> Irrigation Availability
            </label>
            <select 
              className="styled-select" 
              value={selectedIrrigation} 
              onChange={(e) => setSelectedIrrigation(e.target.value)}
            >
              <option value="rainfed">Rainfed (100% Dependent on Monsoon)</option>
              <option value="limited">Limited (1–2 Protective / Critical Irrigations)</option>
              <option value="reliable">Reliable (Assured Tube-well / Canal / Drip)</option>
            </select>
          </div>

          {/* MAJOR SOIL GROUP OVERRIDE */}
          <div className="form-group">
            <label className="field-label">
              <Sprout size={15} /> Active Soil Group
            </label>
            <select 
              className="styled-select" 
              value={selectedSoilGroup} 
              onChange={(e) => setSelectedSoilGroup(e.target.value)}
            >
              {Object.keys(INDIAN_SOIL_GROUPS).map((k) => (
                <option key={k} value={k}>{INDIAN_SOIL_GROUPS[k].name}</option>
              ))}
            </select>
          </div>

          {/* SOIL TEXTURE OVERRIDE */}
          <div className="form-group">
            <label className="field-label">
              <Sprout size={15} /> Physical Soil Texture
            </label>
            <select 
              className="styled-select" 
              value={selectedTexture} 
              onChange={(e) => setSelectedTexture(e.target.value)}
            >
              {Object.keys(SOIL_TEXTURE_CLASSES).map((k) => (
                <option key={k} value={k}>{SOIL_TEXTURE_CLASSES[k].name}</option>
              ))}
            </select>
          </div>

          {/* FARMING OBJECTIVE */}
          <div className="form-group">
            <label className="field-label">
              <Sparkles size={15} /> Farming Goal
            </label>
            <select 
              className="styled-select" 
              value={farmingGoal} 
              onChange={(e) => setFarmingGoal(e.target.value)}
            >
              <option value="all">All Balanced Regional Crops</option>
              <option value="cash_crop">Commercial Cash & High-Value Crops</option>
              <option value="staple_food">Food Grain & Staple Cereals</option>
              <option value="drought_hardy">Low-Water & Drought Resilient</option>
              <option value="soil_restoring">Soil Restoring & Nitrogen-Fixing Legumes</option>
            </select>
          </div>

          {/* FIELD IDENTITY */}
          <div className="form-group">
            <label className="field-label">
              Field / Plot Name & Size
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="text" 
                className="styled-input" 
                value={fieldName} 
                onChange={(e) => setFieldName(e.target.value)} 
                placeholder="e.g. North Plot" 
              />
              <input 
                type="text" 
                className="styled-input" 
                style={{ width: '90px' }} 
                value={fieldAcreage} 
                onChange={(e) => setFieldAcreage(e.target.value)} 
                placeholder="Acres" 
              />
            </div>
          </div>
        </div>

        {/* TOGGLE OPTIONAL SOIL TEST DATA */}
        <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--bg-card-border)' }}>
          <button 
            type="button" 
            className="btn-pill-action" 
            onClick={() => setShowSoilTestInputs(!showSoilTestInputs)}
          >
            {showSoilTestInputs ? '▲ Hide Soil Health Card Lab Inputs' : '▼ Add Soil Health Card Data (pH, N-P-K, OC)'}
          </button>

          {showSoilTestInputs && (
            <div className="soil-test-inputs-drawer">
              <div className="form-fields-grid" style={{ marginTop: '0.85rem' }}>
                <div className="form-group">
                  <label className="field-label">
                    Soil pH: <strong>{soilPh}</strong> (Optimal: 6.5–7.8)
                  </label>
                  <input 
                    type="range" 
                    min="4.5" 
                    max="9.0" 
                    step="0.1" 
                    value={soilPh} 
                    onChange={(e) => setSoilPh(e.target.value)} 
                    className="styled-slider"
                  />
                  <div className="ph-scale-legend">
                    <span style={{ color: '#EF4444' }}>Acidic (&lt;6.0)</span>
                    <span style={{ color: 'var(--accent-green)' }}>Neutral (6.5–7.5)</span>
                    <span style={{ color: '#3B82F6' }}>Alkaline (&gt;8.0)</span>
                  </div>
                </div>

                <div className="form-group">
                  <label className="field-label">Available Nitrogen (N)</label>
                  <select className="styled-select" value={nitrogenStatus} onChange={(e) => setNitrogenStatus(e.target.value)}>
                    <option value="low">Low (&lt; 280 kg/ha)</option>
                    <option value="medium">Medium (280 – 560 kg/ha)</option>
                    <option value="high">High (&gt; 560 kg/ha)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="field-label">Available Phosphorus (P)</label>
                  <select className="styled-select" value={phosphorusStatus} onChange={(e) => setPhosphorusStatus(e.target.value)}>
                    <option value="low">Low (&lt; 10 kg/ha)</option>
                    <option value="medium">Medium (10 – 25 kg/ha)</option>
                    <option value="high">High (&gt; 25 kg/ha)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="field-label">Available Potassium (K)</label>
                  <select className="styled-select" value={potassiumStatus} onChange={(e) => setPotassiumStatus(e.target.value)}>
                    <option value="low">Low (&lt; 110 kg/ha)</option>
                    <option value="medium">Medium (110 – 280 kg/ha)</option>
                    <option value="high">High (&gt; 280 kg/ha)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="field-label">Organic Carbon (% OC)</label>
                  <input 
                    type="number" 
                    step="0.05" 
                    className="styled-input" 
                    value={organicCarbon} 
                    onChange={(e) => setOrganicCarbon(e.target.value)} 
                    placeholder="e.g. 0.55" 
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* PRIMARY ACTION BUTTON TO GENERATE/UPDATE RECOMMENDATIONS */}
        <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--bg-card-border)', display: 'flex', gap: '0.85rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <button 
            type="button" 
            className="btn-primary" 
            onClick={runRecommendation}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.6rem', fontSize: '0.95rem' }}
          >
            <Sparkles size={18} /> Update Crop Recommendations
          </button>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Calculated across verified ICAR & Agricultural University datasets
          </span>
        </div>
      </div>

      {/* TOP RANKED CROPS SECTION */}
      <div className="ranked-crops-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sprout size={22} color="var(--accent-green)" /> Top Recommended Crops for Your Field
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Ranked using verified ICAR agronomic thresholds • Showing top {recommendationsData?.recommendations?.length || 0} viable crops
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              className="btn-secondary" 
              onClick={handleSaveToProfile}
              title="Save this advisory report to your profile"
            >
              <Bookmark size={16} /> {savedSuccess ? 'Saved ✓' : 'Save to Farm Profile'}
            </button>
            {onPrintReport && (
              <button 
                className="btn-secondary" 
                onClick={onPrintReport}
                title="Print or download PDF SoilSense Report"
              >
                <Printer size={16} /> Download PDF
              </button>
            )}
          </div>
        </div>

        {/* CROPS LIST */}
        <div className="crops-grid">
          {recommendationsData?.recommendations?.map((crop, idx) => (
            <div key={crop.id} className="crop-card">
              <div className="crop-card-image-wrap">
                <img src={crop.image} alt={crop.name} className="crop-card-img" />
                <div className="crop-rank-badge">#{idx + 1} Recommendation</div>
                <div className={`crop-score-pill ${crop.badgeClass}`}>
                  {crop.suitabilityScore}% Match • {crop.suitabilityLabel}
                </div>
              </div>

              <div className="crop-card-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h4 className="crop-name">{crop.name}</h4>
                  <span className="crop-category-tag">{crop.category.split('/')[0]}</span>
                </div>
                <p className="crop-scientific-name"><em>{crop.scientificName}</em></p>

                {/* 📍 WHERE IT GROWS BEST (सर्वोत्तम उत्पादक क्षेत्र) */}
                <div style={{
                  background: 'rgba(20, 184, 166, 0.08)',
                  border: '1px solid rgba(20, 184, 166, 0.25)',
                  borderRadius: '8px',
                  padding: '8px 10px',
                  margin: '0.6rem 0'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent-teal)' }}>
                    <MapPin size={13} /> Where It Grows Best (सर्वोत्तम उत्पादक क्षेत्र):
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', margin: '3px 0 0', lineHeight: '1.35' }}>
                    {crop.whereItGrowsBest || `Top States: ${crop.majorStates.join(', ')}`}
                  </p>
                </div>

                {/* 📡 SENSOR SYNERGY BADGES */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', margin: '0.4rem 0 0.6rem' }}>
                  <span style={{ fontSize: '0.72rem', padding: '3px 7px', borderRadius: '6px', background: 'rgba(6, 182, 212, 0.12)', color: '#06B6D4', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Droplets size={11} /> Water: {crop.waterRequirementMm}
                  </span>
                  <span style={{ fontSize: '0.72rem', padding: '3px 7px', borderRadius: '6px', background: 'rgba(16, 185, 129, 0.12)', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Activity size={11} /> pH: {crop.phRange.optimal}
                  </span>
                  {sensorTelemetry?.ec > 2.5 && (
                    <span style={{
                      fontSize: '0.72rem',
                      padding: '3px 7px',
                      borderRadius: '6px',
                      background: crop.suitableSoils.includes('saline_alkaline') ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.15)',
                      color: crop.suitableSoils.includes('saline_alkaline') ? '#10B981' : '#EF4444',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontWeight: 600
                    }}>
                      <Zap size={11} /> {crop.suitableSoils.includes('saline_alkaline') ? 'Salt-Tolerant ✓' : 'Salinity Stress Risk'}
                    </span>
                  )}
                </div>

                {/* ⚡ SENSOR REMEDIATION ADVICE */}
                {crop.sensorRemedyAdvice && crop.sensorRemedyAdvice.length > 0 && (
                  <div style={{
                    background: 'rgba(245, 158, 11, 0.08)',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    borderRadius: '8px',
                    padding: '6px 8px',
                    margin: '0.4rem 0',
                    fontSize: '0.76rem',
                    color: '#F59E0B',
                    lineHeight: '1.3'
                  }}>
                    <strong>⚡ Field Advisory:</strong> {crop.sensorRemedyAdvice[0]}
                  </div>
                )}

                {/* TRANSPARENT COMPATIBILITY BREAKDOWN */}
                <div className="score-breakdown-bar">
                  <div className="breakdown-segment" title={`Soil Fit: ${crop.breakdown.soilFit}/35`}>
                    <span className="segment-label">Soil</span>
                    <span className="segment-val">{crop.breakdown.soilFit}</span>
                  </div>
                  <div className="breakdown-segment" title={`Season Fit: ${crop.breakdown.seasonFit}/25`}>
                    <span className="segment-label">Season</span>
                    <span className="segment-val">{crop.breakdown.seasonFit}</span>
                  </div>
                  <div className="breakdown-segment" title={`Water Fit: ${crop.breakdown.waterFit}/25`}>
                    <span className="segment-label">Water</span>
                    <span className="segment-val">{crop.breakdown.waterFit}</span>
                  </div>
                  <div className="breakdown-segment" title={`Chemical/pH Fit: ${crop.breakdown.chemicalFit}/10`}>
                    <span className="segment-label">pH/Sensor</span>
                    <span className="segment-val">{crop.breakdown.chemicalFit}</span>
                  </div>
                </div>

                {/* WHY THIS CROP SUITS THE FIELD */}
                <div className="crop-reasons-box">
                  <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-teal)', marginBottom: '0.35rem' }}>
                    Why this crop suits your field:
                  </p>
                  <ul className="reasons-list">
                    {(crop.explanations || []).slice(0, 3).map((exp, eIdx) => (
                      <li key={eIdx}>{exp}</li>
                    ))}
                  </ul>
                </div>

                {/* KEY AGRONOMIC ATTRIBUTES */}
                <div className="crop-meta-row">
                  <div className="meta-item">
                    <span className="meta-label"><Calendar size={12} /> Sowing Window</span>
                    <span className="meta-value">{crop.sowingWindow.split(';')[0]}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label"><Droplets size={12} /> Water Needs</span>
                    <span className="meta-value">{crop.waterRequirementMm}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label"><Sun size={12} /> Temp Range</span>
                    <span className="meta-value">{crop.tempRangeC.split('(')[0]}</span>
                  </div>
                </div>

                <div className="crop-card-footer">
                  <button 
                    className="btn-secondary" 
                    style={{ width: '100%', fontSize: '0.85rem', padding: '0.6rem' }}
                    onClick={() => setSelectedCropModal(crop)}
                  >
                    <BookOpen size={14} /> Full Agronomic Cultivation Guide
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DETAILED CROP AGRONOMIC MODAL */}
      {selectedCropModal && (
        <div className="modal-backdrop" onClick={() => setSelectedCropModal(null)}>
          <div className="modal-card modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                  {selectedCropModal.name} — Comprehensive Field Guide
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  <em>{selectedCropModal.scientificName}</em> • Source: {selectedCropModal.sourceReference} (Reviewed: {selectedCropModal.lastReviewed})
                </p>
              </div>
              <button className="btn-icon" onClick={() => setSelectedCropModal(null)}>✕</button>
            </div>

            <div className="modal-body">
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                <img 
                  src={selectedCropModal.image} 
                  alt={selectedCropModal.name} 
                  style={{ width: '120px', height: '90px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} 
                />
                <div>
                  <div className={`crop-score-pill ${selectedCropModal.badgeClass}`} style={{ display: 'inline-block' }}>
                    {selectedCropModal.suitabilityScore}% Suitability Rating • {selectedCropModal.suitabilityLabel}
                  </div>
                  <p style={{ fontSize: '0.86rem', marginTop: '0.5rem', color: 'var(--text-main)' }}>
                    Optimal pH Range: <strong>{selectedCropModal.phRange.optimal}</strong> • Water Tolerance: <strong>{selectedCropModal.waterTolerance}</strong>
                  </p>
                </div>
              </div>

              <div className="crop-detail-sections">
                {/* WHERE IT GROWS BEST */}
                <div className="card-sub-block" style={{ marginBottom: '1rem', background: 'rgba(20, 184, 166, 0.08)', border: '1px solid rgba(20, 184, 166, 0.25)' }}>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--accent-teal)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={16} /> सर्वोत्तम उत्पादक क्षेत्र (Where It Grows Best in India)
                  </h4>
                  <p style={{ fontSize: '0.88rem', lineHeight: '1.5', margin: 0 }}>
                    {selectedCropModal.whereItGrowsBest || `Major Producing States: ${selectedCropModal.majorStates.join(', ')}`}
                  </p>
                </div>

                <div className="card-sub-block" style={{ marginBottom: '1rem' }}>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--accent-teal)', marginBottom: '0.4rem' }}>
                    🌱 Critical Growing Conditions & Soil Considerations
                  </h4>
                  <p style={{ fontSize: '0.88rem', lineHeight: '1.5' }}>
                    {selectedCropModal.growingConsiderations}
                  </p>
                </div>

                <div className="card-sub-block" style={{ marginBottom: '1rem' }}>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--accent-green)', marginBottom: '0.4rem' }}>
                    🚜 Practical Next Steps Before Sowing
                  </h4>
                  <p style={{ fontSize: '0.88rem', lineHeight: '1.5' }}>
                    {selectedCropModal.preSowingSteps}
                  </p>
                </div>

                <div className="card-sub-block">
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#3B82F6', marginBottom: '0.4rem' }}>
                    📍 Major Producing States & Benchmark Agronomy
                  </h4>
                  <p style={{ fontSize: '0.88rem' }}>
                    Widely cultivated across: {selectedCropModal.majorStates.join(', ')}.
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                    Verified Reference: {selectedCropModal.sourceReference}
                  </p>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setSelectedCropModal(null)}>
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
