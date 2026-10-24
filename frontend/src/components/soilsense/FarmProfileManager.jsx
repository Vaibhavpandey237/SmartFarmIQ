import React, { useState } from 'react';
import { 
  Bookmark, Calendar, MapPin, Eye, Trash2, ArrowLeftRight, 
  AlertCircle, ShieldCheck, Sprout, FileText, Layers 
} from 'lucide-react';

export default function FarmProfileManager({ 
  savedReports = [], 
  onViewReport, 
  onDeleteReport, 
  onClearAll 
}) {
  const [compareMode, setCompareMode] = useState(false);
  const [selectedScanA, setSelectedScanA] = useState(null);
  const [selectedScanB, setSelectedScanB] = useState(null);

  const handleSelectCompare = (scan) => {
    if (!selectedScanA) {
      setSelectedScanA(scan);
    } else if (!selectedScanB && scan.id !== selectedScanA.id) {
      setSelectedScanB(scan);
    } else {
      setSelectedScanA(scan);
      setSelectedScanB(null);
    }
  };

  return (
    <div className="farm-profile-container">
      {/* HEADER BAR */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Bookmark size={20} color="var(--accent-teal)" /> Saved Soil Scans & Field Profiles
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Track soil scans, compare seasonal samples, and access archived crop advisory reports.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {savedReports.length >= 2 && (
            <button 
              className={`btn-secondary ${compareMode ? 'active' : ''}`}
              onClick={() => { setCompareMode(!compareMode); setSelectedScanA(null); setSelectedScanB(null); }}
            >
              <ArrowLeftRight size={16} /> {compareMode ? 'Exit Compare' : 'Compare Two Scans'}
            </button>
          )}

          {savedReports.length > 0 && onClearAll && (
            <button className="btn-secondary" onClick={onClearAll} title="Clear history">
              <Trash2 size={16} /> Clear All
            </button>
          )}
        </div>
      </div>

      {/* COMPARISON DRAWER & OPTICAL LIMITS NOTICE */}
      {compareMode && (
        <div className="compare-drawer-box card">
          <div className="alert-box alert-info" style={{ marginBottom: '1rem' }}>
            <AlertCircle size={20} color="var(--accent-teal)" style={{ flexShrink: 0 }} />
            <div>
              <strong>Scientific Limits of Photographic Soil Comparison</strong>
              <p style={{ fontSize: '0.84rem', marginTop: '0.2rem' }}>
                Surface soil photographs taken at different times of the year can vary dramatically in darkness and hue due to soil moisture, organic matter, and ambient sunlight. <strong>Surface color changes do not prove a change in chemical soil health.</strong> Always verify seasonal trends with laboratory NPK soil testing.
              </p>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--text-main)' }}>
            Select two scans from the list below to compare side-by-side:
          </p>

          <div className="compare-grid">
            <div className="compare-col">
              <h4 style={{ fontSize: '0.92rem', color: 'var(--accent-teal)', marginBottom: '0.5rem' }}>Scan A (Benchmark)</h4>
              {selectedScanA ? (
                <div className="compare-card">
                  <p><strong>Field:</strong> {selectedScanA.fieldName || 'Plot #1'}</p>
                  <p><strong>Date:</strong> {selectedScanA.date}</p>
                  <p><strong>Soil Group:</strong> {selectedScanA.soilGroup || selectedScanA.predictedGroupName}</p>
                  <p><strong>Texture:</strong> {selectedScanA.soilTexture || selectedScanA.estimatedTextureName}</p>
                  <p><strong>Season & Water:</strong> {selectedScanA.season} • {selectedScanA.irrigation}</p>
                  <p><strong>Top Crop:</strong> {selectedScanA.topRecommendations?.[0]?.name || 'N/A'}</p>
                </div>
              ) : (
                <div className="compare-empty">Click a scan below to assign to Scan A</div>
              )}
            </div>

            <div className="compare-col">
              <h4 style={{ fontSize: '0.92rem', color: 'var(--accent-green)', marginBottom: '0.5rem' }}>Scan B (Comparison)</h4>
              {selectedScanB ? (
                <div className="compare-card">
                  <p><strong>Field:</strong> {selectedScanB.fieldName || 'Plot #1'}</p>
                  <p><strong>Date:</strong> {selectedScanB.date}</p>
                  <p><strong>Soil Group:</strong> {selectedScanB.soilGroup || selectedScanB.predictedGroupName}</p>
                  <p><strong>Texture:</strong> {selectedScanB.soilTexture || selectedScanB.estimatedTextureName}</p>
                  <p><strong>Season & Water:</strong> {selectedScanB.season} • {selectedScanB.irrigation}</p>
                  <p><strong>Top Crop:</strong> {selectedScanB.topRecommendations?.[0]?.name || 'N/A'}</p>
                </div>
              ) : (
                <div className="compare-empty">Click a second scan below to assign to Scan B</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SCANS LIST */}
      {savedReports.length === 0 ? (
        <div className="empty-state-box card">
          <Layers size={40} color="var(--text-muted)" />
          <h4 style={{ fontSize: '1.1rem', marginTop: '0.75rem' }}>No Saved Soil Scans Yet</h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: '400px', margin: '0.35rem auto' }}>
            Capture a soil photograph or run the crop recommendation engine to generate and store your first soil advisory report.
          </p>
        </div>
      ) : (
        <div className="scans-history-list">
          {(savedReports || []).map((scan) => {
            const isA = selectedScanA?.id === scan.id;
            const isB = selectedScanB?.id === scan.id;
            return (
              <div 
                key={scan.id} 
                className={`scan-history-item card ${isA ? 'selected-a' : ''} ${isB ? 'selected-b' : ''}`}
                onClick={() => compareMode && handleSelectCompare(scan)}
              >
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  {scan.previewUrl ? (
                    <img src={scan.previewUrl} alt="Soil" className="history-soil-thumb" />
                  ) : (
                    <div className="history-soil-thumb-placeholder">
                      <Layers size={20} color="var(--accent-teal)" />
                    </div>
                  )}

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>
                        {scan.fieldName || 'Soil Scan'}
                      </h4>
                      <span className="badge-pill">
                        {scan.soilGroup || scan.predictedGroupName || 'Alluvial Soil'}
                      </span>
                      {scan.soilTexture && (
                        <span className="badge-pill" style={{ background: 'rgba(20, 184, 166, 0.15)', color: 'var(--accent-teal)' }}>
                          {scan.soilTexture}
                        </span>
                      )}
                    </div>

                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      <Calendar size={13} style={{ display: 'inline', marginRight: '4px' }} />
                      {scan.date} • {scan.district ? `${scan.district}, ` : ''}{scan.state || 'General Region'}
                    </p>

                    {scan.topRecommendations && scan.topRecommendations.length > 0 && (
                      <p style={{ fontSize: '0.82rem', color: 'var(--accent-green)', marginTop: '0.25rem' }}>
                        <Sprout size={13} style={{ display: 'inline', marginRight: '4px' }} />
                        Recommended: {(scan.topRecommendations || []).slice(0, 3).map(c => c?.name || c).join(', ')}
                      </p>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  {compareMode ? (
                    <button className="btn-secondary" style={{ fontSize: '0.8rem' }}>
                      {isA ? 'Selected as A' : isB ? 'Selected as B' : 'Select'}
                    </button>
                  ) : (
                    <>
                      <button 
                        className="btn-secondary" 
                        onClick={(e) => { e.stopPropagation(); onViewReport && onViewReport(scan); }}
                        title="View Official PDF Report"
                      >
                        <FileText size={15} /> View Report
                      </button>
                      {onDeleteReport && (
                        <button 
                          className="btn-icon" 
                          onClick={(e) => { e.stopPropagation(); onDeleteReport(scan.id); }}
                          title="Delete report"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
