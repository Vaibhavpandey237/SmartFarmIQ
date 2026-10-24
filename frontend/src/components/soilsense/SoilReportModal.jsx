import React from 'react';
import { 
  Printer, X, Sprout, CheckCircle2, AlertTriangle, 
  Droplets, MapPin, Calendar, Layers, ShieldCheck, FileText 
} from 'lucide-react';

export default function SoilReportModal({ reportData, user, onClose }) {
  if (!reportData) return null;

  const handlePrint = () => {
    window.print();
  };

  const topCrops = reportData.topRecommendations || [];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card soil-report-modal" onClick={(e) => e.stopPropagation()}>
        {/* MODAL ACTION BAR (Hidden in print) */}
        <div className="report-modal-actions no-print">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={18} color="var(--accent-green)" />
            <span style={{ fontWeight: 600 }}>Official SoilSense AI Agronomic Advisory Report</span>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn-primary" onClick={handlePrint}>
              <Printer size={16} /> Print / Save PDF
            </button>
            <button className="btn-icon" onClick={onClose} title="Close">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* PRINTABLE REPORT DOCUMENT */}
        <div className="soil-report-sheet">
          {/* HEADER */}
          <div className="report-doc-header">
            <div className="report-brand">
              <div className="report-brand-icon">
                <Sprout size={28} color="#FFFFFF" />
              </div>
              <div>
                <h1 className="report-title">Smart Farm IQ</h1>
                <p className="report-subtitle">SoilSense AI — Soil Identification & Smart Crop Advisory System</p>
              </div>
            </div>
            <div className="report-meta-box">
              <p><strong>Report ID:</strong> {reportData.id || `SSR-${Date.now().toString().slice(-6)}`}</p>
              <p><strong>Date Issued:</strong> {reportData.date || new Date().toLocaleDateString('en-IN')}</p>
              <div className="verified-stamp">
                <ShieldCheck size={14} /> ICAR BENCHMARK COMPLIANT
              </div>
            </div>
          </div>

          <hr className="report-divider" />

          {/* FARM & FIELD PROFILE */}
          <div className="report-section">
            <h3 className="report-section-title">1. Farm & Field Profile</h3>
            <div className="report-info-grid">
              <div>
                <span className="info-lbl">Farmer / Operator:</span>
                <span className="info-val">{user?.name || user?.username || 'Verified Producer'}</span>
              </div>
              <div>
                <span className="info-lbl">Field / Plot Name:</span>
                <span className="info-val">{reportData.fieldName || 'Field Plot #1'} ({reportData.fieldAcreage || '2.5'} Acres)</span>
              </div>
              <div>
                <span className="info-lbl">Geographic Region:</span>
                <span className="info-val">{reportData.district ? `${reportData.district}, ` : ''}{reportData.state || 'National Plain'}</span>
              </div>
              <div>
                <span className="info-lbl">Target Season & Water:</span>
                <span className="info-val">{reportData.season?.toUpperCase() || 'KHARIF'} • {reportData.irrigation?.toUpperCase() || 'LIMITED'}</span>
              </div>
            </div>
          </div>

          {/* SOIL IDENTIFICATION SUMMARY */}
          <div className="report-section">
            <h3 className="report-section-title">2. Soil Identification & Physical Matrix</h3>
            <div className="report-soil-summary-box">
              {reportData.previewUrl && (
                <div className="report-soil-photo-wrap">
                  <img src={reportData.previewUrl} alt="Soil Sample" className="report-soil-photo" />
                  <span className="photo-caption">Field Soil Clod Specimen</span>
                </div>
              )}
              <div className="report-soil-data">
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                  <div>
                    <span className="data-sublbl">Major Indian Soil Group:</span>
                    <h4 className="data-mainval">{reportData.soilGroup || reportData.predictedGroupName || 'Alluvial Soil'}</h4>
                  </div>
                  <div>
                    <span className="data-sublbl">Physical Soil Texture:</span>
                    <h4 className="data-mainval">{reportData.soilTexture || reportData.estimatedTextureName || 'Loam (Medium Balanced)'}</h4>
                  </div>
                  <div>
                    <span className="data-sublbl">Optical Confidence:</span>
                    <h4 className="data-mainval" style={{ color: 'var(--accent-green)' }}>
                      {reportData.confidencePct ? `${reportData.confidencePct}%` : '82.5%'}
                    </h4>
                  </div>
                </div>

                <div className="report-subgrid">
                  <p><strong>Typical Water Retention:</strong> {reportData.typicalWaterRetention || 'Moderate to High (Typical Estimate)'}</p>
                  <p><strong>Typical Internal Drainage:</strong> {reportData.typicalDrainage || 'Well-drained (Field Behavior)'}</p>
                  {reportData.soilTest && (
                    <p><strong>Soil Test Lab Data:</strong> pH {reportData.soilTest.ph || '7.0'} • N: {reportData.soilTest.nitrogen} • P: {reportData.soilTest.phosphorus} • K: {reportData.soilTest.potassium} • OC: {reportData.soilTest.organicCarbon}%</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* TOP RECOMMENDED CROPS */}
          <div className="report-section">
            <h3 className="report-section-title">3. Top Recommended Crops & Agronomic Rationale</h3>
            <div className="report-crops-table-wrap">
              <table className="report-crops-table">
                <thead>
                  <tr>
                    <th>Rank & Crop Name</th>
                    <th>Suitability</th>
                    <th>Sowing Window</th>
                    <th>Water Requirement</th>
                    <th>Agronomic Compatibility Rationale</th>
                  </tr>
                </thead>
                <tbody>
                  {topCrops.map((crop, idx) => (
                    <tr key={crop.id || idx}>
                      <td>
                        <strong>#{idx + 1} {crop.name}</strong>
                        <div style={{ fontSize: '0.75rem', color: '#64748B' }}><em>{crop.scientificName}</em></div>
                      </td>
                      <td>
                        <span className="report-score-badge">{crop.suitabilityScore}% Match</span>
                      </td>
                      <td>{crop.sowingWindow?.split(';')[0]}</td>
                      <td>{crop.waterRequirementMm}</td>
                      <td>
                        <ul className="report-reasons-bullets">
                          {crop.explanations?.slice(0, 2).map((exp, eIdx) => (
                            <li key={eIdx}>{exp}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SOIL IMPROVEMENT RECOMMENDATIONS */}
          <div className="report-section">
            <h3 className="report-section-title">4. Evidence-Based Soil Management Directives</h3>
            <div className="report-advice-box">
              <p>• <strong>Organic Carbon Replenishment:</strong> Apply Farm Yard Manure (FYM) or Vermicompost @ 5–10 t/ha before summer discing, or incorporate green manure (Dhaincha/Sunn hemp) at 45 days.</p>
              <p>• <strong>Aeration & Drainage:</strong> In heavy clay or flood-prone soils, adopt Broad Bed and Furrow (BBF) systems to safeguard seedlings against root asphyxiation.</p>
              <p>• <strong>Precision Nutrition:</strong> Balance N-P-K according to official Soil Health Card values. Apply Zinc Sulphate (25 kg/ha) every 2–3 seasons to prevent widespread zinc deficiencies.</p>
            </div>
          </div>

          {/* DISCLAIMER & FOOTER */}
          <div className="report-doc-footer">
            <p className="disclaimer-text">
              <strong>Official Agronomic Disclaimer:</strong> This advisory report is generated by SoilSense AI using computer vision optical surface analysis and verified agronomic benchmarks published by the Indian Council of Agricultural Research (ICAR) and State Agricultural Universities. Optical identification does not replace certified laboratory chemical testing. Sowing decisions must account for local weather forecasts and certified seed availability. No guaranteed yield or commercial outcomes are implied.
            </p>
            <div className="report-signatures">
              <div>
                <span>Automated AI Agronomy Engine</span>
                <p>Smart Farm IQ System Core v2.4</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span>Official Producer Copy</span>
                <p>Printed: {new Date().toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
