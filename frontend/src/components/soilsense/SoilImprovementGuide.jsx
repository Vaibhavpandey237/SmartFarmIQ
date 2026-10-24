import React from 'react';
import { 
  Sprout, Leaf, Waves, Activity, Shield, 
  HelpCircle, AlertCircle, CheckCircle2, BookOpen 
} from 'lucide-react';
import { GENERAL_SOIL_MANAGEMENT_ADVICE } from '../../data/soilCropKnowledgeBase';

export default function SoilImprovementGuide({ currentSoilGroup = 'alluvial' }) {
  const ICONS = {
    Leaf: <Leaf size={24} color="var(--accent-green)" />,
    Waves: <Waves size={24} color="var(--accent-teal)" />,
    Activity: <Activity size={24} color="#F59E0B" />,
    Shield: <Shield size={24} color="#3B82F6" />
  };

  return (
    <div className="soil-improvement-container">
      {/* EDUCATIONAL VS LAB DISCLAIMER */}
      <div className="alert-box alert-info" style={{ marginBottom: '1.5rem' }}>
        <HelpCircle size={20} color="var(--accent-teal)" style={{ flexShrink: 0 }} />
        <div>
          <strong>Educational Agronomic Guidance vs. Soil Health Card Testing</strong>
          <p style={{ fontSize: '0.86rem', marginTop: '0.25rem' }}>
            The practices below represent scientifically established soil stewardship principles recommended by ICAR and State Agricultural Universities. Specific chemical fertilizer rates (urea, DAP, MOP) or chemical amendments (lime, gypsum) must always be calculated from your certified laboratory <strong>Soil Health Card</strong> to avoid fertilizer waste, groundwater contamination, and soil toxicity.
          </p>
        </div>
      </div>

      <div className="guidelines-grid">
        {(GENERAL_SOIL_MANAGEMENT_ADVICE || []).map((item) => (
          <div key={item.id} className="card guideline-card">
            <div className="guideline-header">
              <div className="guideline-icon-box">
                {ICONS[item.icon] || <Sprout size={24} color="var(--accent-green)" />}
              </div>
              <div>
                <span className="badge-pill">{item.category}</span>
                <h3 className="guideline-title">{item.title}</h3>
              </div>
            </div>

            <p className="guideline-summary">{item.summary}</p>

            <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--accent-teal)', margin: '1rem 0 0.5rem' }}>
              Recommended Best Practices:
            </h4>
            <ul className="guideline-tips-list">
              {(item.actionableTips || []).map((tip, idx) => (
                <li key={idx} className="tip-item">
                  <CheckCircle2 size={16} color="var(--accent-green)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>

            <div className="guideline-footer">
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Source: <strong>{item.verifiedSource}</strong>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
