import React, { useState, useEffect } from 'react';
import { 
  Droplets, Thermometer, Activity, Zap, Leaf, Sparkles, 
  Shield, Layers, Grid, MapPin, Sliders, RefreshCw, 
  Radio, CheckCircle2, AlertTriangle, Compass, Info, Cpu
} from 'lucide-react';
import { INDIAN_SOIL_GROUPS, SENSOR_PARAMETERS_METADATA } from '../../data/soilCropKnowledgeBase';

export default function SoilSensorTelemetryPanel({ 
  currentSoilGroup = 'alluvial',
  sensorData,
  onSensorDataChange,
  onSoilGroupSelect,
  selectedState,
  selectedDistrict,
  onLocationChange
}) {
  // Local Sensor State initialized from props or defaults
  const [moisture, setMoisture] = useState(sensorData?.moisture ?? 45);
  const [temperature, setTemperature] = useState(sensorData?.temperature ?? 25.5);
  const [ph, setPh] = useState(sensorData?.ph ?? 7.3);
  const [ec, setEc] = useState(sensorData?.ec ?? 0.85);
  const [nitrogen, setNitrogen] = useState(sensorData?.nitrogen ?? 220);
  const [phosphorus, setPhosphorus] = useState(sensorData?.phosphorus ?? 18);
  const [potassium, setPotassium] = useState(sensorData?.potassium ?? 280);
  const [organicCarbon, setOrganicCarbon] = useState(sensorData?.organicCarbon ?? 0.55);
  const [sandPct, setSandPct] = useState(sensorData?.sandPct ?? 40);
  const [siltPct, setSiltPct] = useState(sensorData?.siltPct ?? 40);
  const [clayPct, setClayPct] = useState(sensorData?.clayPct ?? 20);

  // Simulated IoT Live Stream Toggle
  const [isLiveStreamActive, setIsLiveStreamActive] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsStatus, setGpsStatus] = useState(null);

  // Sync when currentSoilGroup changes to load benchmark preset
  useEffect(() => {
    if (currentSoilGroup && INDIAN_SOIL_GROUPS[currentSoilGroup]?.sensorBenchmark) {
      applySoilBenchmark(currentSoilGroup, false);
    }
  }, [currentSoilGroup]);

  // Push updates up to parent whenever any sensor value changes
  useEffect(() => {
    if (onSensorDataChange) {
      onSensorDataChange({
        moisture: parseFloat(moisture),
        temperature: parseFloat(temperature),
        ph: parseFloat(ph),
        ec: parseFloat(ec),
        nitrogen: parseFloat(nitrogen),
        phosphorus: parseFloat(phosphorus),
        potassium: parseFloat(potassium),
        organicCarbon: parseFloat(organicCarbon),
        sandPct: parseFloat(sandPct),
        siltPct: parseFloat(siltPct),
        clayPct: parseFloat(clayPct)
      });
    }
  }, [moisture, temperature, ph, ec, nitrogen, phosphorus, potassium, organicCarbon, sandPct, siltPct, clayPct]);

  // Live IoT micro-fluctuation timer
  useEffect(() => {
    let interval = null;
    if (isLiveStreamActive) {
      interval = setInterval(() => {
        // Small realistic micro-jitter
        setMoisture(prev => Math.min(95, Math.max(10, +(prev + (Math.random() * 0.8 - 0.4)).toFixed(1))));
        setTemperature(prev => Math.min(48, Math.max(12, +(prev + (Math.random() * 0.4 - 0.2)).toFixed(1))));
        setEc(prev => Math.min(15, Math.max(0.1, +(prev + (Math.random() * 0.08 - 0.04)).toFixed(2))));
      }, 2500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLiveStreamActive]);

  const applySoilBenchmark = (groupKey, notifyParentGroup = true) => {
    const grp = INDIAN_SOIL_GROUPS[groupKey];
    if (grp?.sensorBenchmark) {
      const b = grp.sensorBenchmark;
      setMoisture(b.moisturePct);
      setTemperature(b.tempC);
      setPh(b.ph);
      setEc(b.ecDsm);
      setNitrogen(b.nitrogenKgHa);
      setPhosphorus(b.phosphorusKgHa);
      setPotassium(b.potassiumKgHa);
      setOrganicCarbon(b.organicCarbonPct);
      setSandPct(b.sandPct);
      setSiltPct(b.siltPct);
      setClayPct(b.clayPct);

      if (notifyParentGroup && onSoilGroupSelect) {
        onSoilGroupSelect(groupKey);
      }
    }
  };

  const handleGpsDetect = () => {
    if (!navigator.geolocation) {
      setGpsStatus('Geolocation not supported by browser.');
      return;
    }
    setGpsLoading(true);
    setGpsStatus('Reading device GPS coordinates...');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGpsLoading(false);
        const { latitude, longitude } = pos.coords;
        setGpsStatus(`Lat: ${latitude.toFixed(4)}°, Lon: ${longitude.toFixed(4)}° (GPS Locked)`);
        
        // Intelligent zone approximation
        if (latitude > 28.0) {
          if (longitude < 76.0 && onLocationChange) onLocationChange('Rajasthan', 'Bikaner');
          else if (longitude < 78.0 && onLocationChange) onLocationChange('Punjab', 'Ludhiana');
          else if (onLocationChange) onLocationChange('Uttar Pradesh', 'Bareilly');
        } else if (latitude < 15.0) {
          if (longitude < 77.0 && onLocationChange) onLocationChange('Kerala', 'Palakkad');
          else if (onLocationChange) onLocationChange('Tamil Nadu', 'Coimbatore');
        } else {
          if (longitude < 76.0 && onLocationChange) onLocationChange('Gujarat', 'Rajkot');
          else if (longitude < 80.0 && onLocationChange) onLocationChange('Maharashtra', 'Nagpur');
          else if (onLocationChange) onLocationChange('Odisha', 'Cuttack');
        }
      },
      (err) => {
        setGpsLoading(false);
        setGpsStatus('GPS access denied or unavailable. Using manual state/district selection.');
      },
      { timeout: 8000 }
    );
  };

  // Helper ratings for Govt Soil Health Card (SHC)
  const getPhRating = (val) => {
    if (val < 5.5) return { label: 'Strongly Acidic (अम्लीय)', color: '#EF4444' };
    if (val < 6.5) return { label: 'Moderately Acidic', color: '#F59E0B' };
    if (val <= 7.8) return { label: 'Neutral / Ideal (उदासीन)', color: '#10B981' };
    if (val <= 8.5) return { label: 'Mildly Alkaline', color: '#F59E0B' };
    return { label: 'Highly Sodic/Alkaline (क्षारीय)', color: '#EF4444' };
  };

  const getEcRating = (val) => {
    if (val < 2.0) return { label: 'Normal / Non-Saline (सामान्य)', color: '#10B981' };
    if (val <= 4.0) return { label: 'Moderate Salinity Risk', color: '#F59E0B' };
    return { label: 'Severe Salinity Hazard (अत्यधिक लवणीय)', color: '#EF4444' };
  };

  const getNRating = (val) => {
    if (val < 280) return { label: 'Low (<280 kg/ha - कम)', color: '#EF4444' };
    if (val <= 560) return { label: 'Medium (280–560 kg/ha - मध्यम)', color: '#10B981' };
    return { label: 'High (>560 kg/ha - पर्याप्त)', color: '#3B82F6' };
  };

  const getOcRating = (val) => {
    if (val < 0.50) return { label: 'Low (<0.50% - कम)', color: '#EF4444' };
    if (val <= 0.75) return { label: 'Medium (0.50–0.75% - मध्यम)', color: '#10B981' };
    return { label: 'High (>0.75% - उत्तम)', color: '#10B981' };
  };

  return (
    <div className="card soil-telemetry-panel" style={{
      background: 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(20, 184, 166, 0.25)',
      borderRadius: '16px',
      padding: '1.5rem',
      marginBottom: '2rem'
    }}>
      {/* HEADER & LIVE TELEMETRY SWITCH */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Cpu size={22} color="var(--accent-teal)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>
              📡 Live Soil IoT Sensor & Govt Soil Health Card (SHC) Telemetry
            </h3>
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: '0.3rem 0 0 0' }}>
            Multi-probe real-time acquisition: Capacitive Moisture, DS18B20 Temp, pH Electrode, EC Salinity & SHC N-P-K benchmarks.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            type="button"
            className={`btn-pill-action ${isLiveStreamActive ? 'active-pulse' : ''}`}
            onClick={() => setIsLiveStreamActive(!isLiveStreamActive)}
            style={{
              background: isLiveStreamActive ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.05)',
              borderColor: isLiveStreamActive ? '#10B981' : 'rgba(255,255,255,0.15)',
              color: isLiveStreamActive ? '#10B981' : 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 600
            }}
          >
            <Radio size={14} className={isLiveStreamActive ? 'animate-pulse' : ''} />
            {isLiveStreamActive ? 'Live IoT Connected (Streaming)' : 'Simulate Live IoT Stream'}
          </button>

          <button
            type="button"
            className="btn-pill-action"
            onClick={handleGpsDetect}
            disabled={gpsLoading}
            title="Detect GPS coordinates to lock regional agro-climatic soil zone"
            style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            <MapPin size={14} color="#F43F5E" />
            {gpsLoading ? 'Acquiring GPS...' : 'Detect GPS Location'}
          </button>
        </div>
      </div>

      {gpsStatus && (
        <div style={{
          fontSize: '0.8rem',
          color: gpsStatus.includes('Locked') ? '#10B981' : 'var(--text-muted)',
          marginBottom: '1rem',
          padding: '6px 12px',
          background: 'rgba(255,255,255,0.03)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <Compass size={14} /> {gpsStatus}
        </div>
      )}

      {/* 8 MAJOR INDIAN SOIL PRESET SELECTOR (ICAR-NBSS&LUP) */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--accent-teal)' }}>
            ⚡ Load Calibrated Indian Soil Group Benchmark (ICAR 8 Groups):
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Type 1 to Type 8 Major Classifications
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
          gap: '0.5rem'
        }}>
          {Object.keys(INDIAN_SOIL_GROUPS).map((key) => {
            const grp = INDIAN_SOIL_GROUPS[key];
            const isSelected = currentSoilGroup === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => applySoilBenchmark(key, true)}
                className={`group-chip-btn ${isSelected ? 'selected' : ''}`}
                style={{
                  padding: '8px 10px',
                  fontSize: '0.78rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  textAlign: 'left',
                  borderRadius: '10px',
                  background: isSelected ? 'rgba(20, 184, 166, 0.2)' : 'rgba(255,255,255,0.03)',
                  border: isSelected ? '1px solid #14B8A6' : '1px solid rgba(255,255,255,0.08)',
                  color: isSelected ? '#FFFFFF' : 'var(--text-main)',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.72rem', color: isSelected ? 'var(--accent-teal)' : 'var(--text-muted)' }}>
                    Type {grp.typeNumber || '•'}
                  </span>
                  {isSelected && <CheckCircle2 size={12} color="#14B8A6" />}
                </div>
                <strong style={{ fontSize: '0.84rem', marginTop: '2px' }}>
                  {grp.name.split(' (')[0]}
                </strong>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '1px' }}>
                  {grp.hindiName.split(' (')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SENSORS & HEALTH CARD METRICS GRID */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1.25rem'
      }}>
        {/* 1. SOIL MOISTURE */}
        <div className="telemetry-card" style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Droplets size={18} color="#06B6D4" />
              <strong style={{ fontSize: '0.9rem' }}>Soil Moisture</strong>
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#06B6D4' }}>{moisture}%</span>
          </div>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: '4px 0 8px' }}>
            Sensor: <strong>Capacitive Moisture Sensor</strong> • Paani ki availability
          </p>
          <input
            type="range"
            min="5"
            max="100"
            step="1"
            value={moisture}
            onChange={(e) => setMoisture(parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: '#06B6D4' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            <span>Wilting Pt: &lt;20%</span>
            <span style={{ color: moisture >= 40 && moisture <= 65 ? '#10B981' : '#F59E0B' }}>
              {moisture < 25 ? 'Low Moisture (Dry)' : moisture > 75 ? 'Saturated / Waterlogged' : 'Optimal Available Water'}
            </span>
            <span>Saturation: &gt;75%</span>
          </div>
        </div>

        {/* 2. SOIL TEMPERATURE */}
        <div className="telemetry-card" style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Thermometer size={18} color="#F97316" />
              <strong style={{ fontSize: '0.9rem' }}>Soil Temperature</strong>
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#F97316' }}>{temperature}°C</span>
          </div>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: '4px 0 8px' }}>
            Sensor: <strong>DS18B20 Thermal Probe</strong> • Root-zone thermal activity
          </p>
          <input
            type="range"
            min="10"
            max="45"
            step="0.5"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: '#F97316' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            <span>Cool &lt;18°C</span>
            <span style={{ color: temperature >= 20 && temperature <= 32 ? '#10B981' : '#F59E0B' }}>
              {temperature < 18 ? 'Temperate / Winter Root Zone' : temperature > 34 ? 'Heat Stress Zone' : 'Optimal Metabolic Range'}
            </span>
            <span>Hot &gt;35°C</span>
          </div>
        </div>

        {/* 3. SOIL pH */}
        <div className="telemetry-card" style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Activity size={18} color="#10B981" />
              <strong style={{ fontSize: '0.9rem' }}>Soil pH</strong>
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: getPhRating(ph).color }}>{ph}</span>
          </div>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: '4px 0 8px' }}>
            Sensor: <strong>Calibrated pH Probe</strong> • Acidity & Alkalinity status
          </p>
          <input
            type="range"
            min="3.5"
            max="10.5"
            step="0.1"
            value={ph}
            onChange={(e) => setPh(parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: '#10B981' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', marginTop: '4px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Scale: 0–14</span>
            <span style={{ fontWeight: 700, color: getPhRating(ph).color }}>
              {getPhRating(ph).label}
            </span>
          </div>
        </div>

        {/* 4. EC / SALINITY */}
        <div className="telemetry-card" style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Zap size={18} color="#EC4899" />
              <strong style={{ fontSize: '0.9rem' }}>EC (Salinity)</strong>
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: getEcRating(ec).color }}>{ec} <span style={{ fontSize: '0.75rem' }}>dS/m</span></span>
          </div>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: '4px 0 8px' }}>
            Sensor: <strong>Direct Soil EC Sensor</strong> • Dissolved salts indication
          </p>
          <input
            type="range"
            min="0.1"
            max="12.0"
            step="0.1"
            value={ec}
            onChange={(e) => setEc(parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: '#EC4899' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', marginTop: '4px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Threshold: 2.0 dS/m</span>
            <span style={{ fontWeight: 700, color: getEcRating(ec).color }}>
              {getEcRating(ec).label}
            </span>
          </div>
        </div>

        {/* 5. NITROGEN (N) */}
        <div className="telemetry-card" style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Leaf size={18} color="#22C55E" />
              <strong style={{ fontSize: '0.9rem' }}>Available N</strong>
            </div>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#22C55E' }}>{nitrogen} <span style={{ fontSize: '0.72rem' }}>kg/ha</span></span>
          </div>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: '4px 0 8px' }}>
            Method: <strong>Alkaline Permanganate / SHC</strong> • Leaf vegetative vigor
          </p>
          <input
            type="range"
            min="50"
            max="650"
            step="10"
            value={nitrogen}
            onChange={(e) => setNitrogen(parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: '#22C55E' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', marginTop: '4px' }}>
            <span style={{ color: 'var(--text-muted)' }}>SHC Rating:</span>
            <span style={{ fontWeight: 700, color: getNRating(nitrogen).color }}>
              {getNRating(nitrogen).label}
            </span>
          </div>
        </div>

        {/* 6. PHOSPHORUS (P) */}
        <div className="telemetry-card" style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={18} color="#EAB308" />
              <strong style={{ fontSize: '0.9rem' }}>Available P</strong>
            </div>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#EAB308' }}>{phosphorus} <span style={{ fontSize: '0.72rem' }}>kg/ha</span></span>
          </div>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: '4px 0 8px' }}>
            Method: <strong>Olsen / Bray Spectrophotometer</strong> • Root & tillering
          </p>
          <input
            type="range"
            min="4"
            max="50"
            step="1"
            value={phosphorus}
            onChange={(e) => setPhosphorus(parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: '#EAB308' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', marginTop: '4px' }}>
            <span style={{ color: 'var(--text-muted)' }}>SHC Standard:</span>
            <span style={{ fontWeight: 700, color: phosphorus < 10 ? '#EF4444' : '#10B981' }}>
              {phosphorus < 10 ? 'Low (<10 kg/ha)' : phosphorus <= 25 ? 'Medium (10–25)' : 'High (>25)'}
            </span>
          </div>
        </div>

        {/* 7. POTASSIUM (K) */}
        <div className="telemetry-card" style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Shield size={18} color="#8B5CF6" />
              <strong style={{ fontSize: '0.9rem' }}>Available K</strong>
            </div>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#8B5CF6' }}>{potassium} <span style={{ fontSize: '0.72rem' }}>kg/ha</span></span>
          </div>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: '4px 0 8px' }}>
            Method: <strong>Ammonium Acetate Flame Photo</strong> • Immunity & quality
          </p>
          <input
            type="range"
            min="60"
            max="550"
            step="10"
            value={potassium}
            onChange={(e) => setPotassium(parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: '#8B5CF6' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', marginTop: '4px' }}>
            <span style={{ color: 'var(--text-muted)' }}>SHC Standard:</span>
            <span style={{ fontWeight: 700, color: potassium < 108 ? '#EF4444' : '#10B981' }}>
              {potassium < 108 ? 'Low (<108 kg/ha)' : potassium <= 280 ? 'Medium (108–280)' : 'High (>280 kg/ha)'}
            </span>
          </div>
        </div>

        {/* 8. ORGANIC CARBON (OC) */}
        <div className="telemetry-card" style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Layers size={18} color="#14B8A6" />
              <strong style={{ fontSize: '0.9rem' }}>Organic Carbon (OC)</strong>
            </div>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: getOcRating(organicCarbon).color }}>{organicCarbon}%</span>
          </div>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: '4px 0 8px' }}>
            Method: <strong>Walkley-Black Lab Test</strong> • Soil biological humus
          </p>
          <input
            type="range"
            min="0.10"
            max="3.50"
            step="0.05"
            value={organicCarbon}
            onChange={(e) => setOrganicCarbon(parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: '#14B8A6' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', marginTop: '4px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Soil Organic Health:</span>
            <span style={{ fontWeight: 700, color: getOcRating(organicCarbon).color }}>
              {getOcRating(organicCarbon).label}
            </span>
          </div>
        </div>
      </div>

      {/* 9. SOIL TEXTURE FRACTIONS (SAND %, SILT %, CLAY %) */}
      <div style={{
        marginTop: '1.25rem',
        padding: '1rem',
        borderRadius: '12px',
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Grid size={18} color="#6366F1" />
            <strong style={{ fontSize: '0.92rem' }}>Physical Texture Analysis (Bouyoucos Hydrometer Method)</strong>
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Sand: <strong style={{ color: '#F59E0B' }}>{sandPct}%</strong> • Silt: <strong style={{ color: '#3B82F6' }}>{siltPct}%</strong> • Clay: <strong style={{ color: '#EC4899' }}>{clayPct}%</strong>
          </div>
        </div>

        {/* Visual Composition Bar */}
        <div style={{ width: '100%', height: '14px', borderRadius: '7px', overflow: 'hidden', display: 'flex', background: 'rgba(255,255,255,0.1)' }}>
          <div style={{ width: `${sandPct}%`, background: '#F59E0B', transition: 'width 0.3s' }} title={`Sand: ${sandPct}%`} />
          <div style={{ width: `${siltPct}%`, background: '#3B82F6', transition: 'width 0.3s' }} title={`Silt: ${siltPct}%`} />
          <div style={{ width: `${clayPct}%`, background: '#EC4899', transition: 'width 0.3s' }} title={`Clay: ${clayPct}%`} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginTop: '6px', color: 'var(--text-muted)' }}>
          <span style={{ color: '#F59E0B' }}>● Coarse Sand ({sandPct}%)</span>
          <span style={{ color: '#3B82F6' }}>● Medium Silt ({siltPct}%)</span>
          <span style={{ color: '#EC4899' }}>● Fine Sticky Clay ({clayPct}%)</span>
        </div>
      </div>
    </div>
  );
}
