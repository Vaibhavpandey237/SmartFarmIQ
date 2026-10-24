import React from 'react';
import { 
  Activity, MessageSquare, Plus, Bell, Download, 
  Layers, TrendingUp, ShoppingCart, FileText, Sparkles, Sprout, ArrowRight, CheckCircle2 
} from 'lucide-react';

export default function DashboardView({
  user,
  history,
  plantProfiles,
  reminders,
  onTabClick,
  onOpenAddPlant
}) {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Welcome Banner */}
      <section className="card" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(20, 184, 166, 0.15))' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(16, 185, 129, 0.2)', color: 'var(--accent-green)', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              <Sparkles size={13} /> SMART FARM IQ 2.0
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Welcome back, {user.name || user.username}! 👋</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Here is your plant health summary, soil intelligence, crop recommendations, and active care schedules.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button className="btn-primary" style={{ width: 'auto', margin: 0 }} onClick={() => onTabClick('diagnose')}>
              <Activity size={18} /> Diagnose Leaf
            </button>
            <button className="btn-secondary" style={{ width: 'auto', margin: 0, borderColor: 'var(--accent-teal)', color: 'var(--accent-teal)' }} onClick={() => onTabClick('soilsense')}>
              <Layers size={18} /> SoilSense AI
            </button>
          </div>
        </div>
      </section>

      {/* FEATURE SPOTLIGHT: SOILSENSE AI & INNOTECH VIVA GUIDE */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {/* SoilSense AI Card */}
        <div className="card" style={{ borderLeft: '4px solid var(--accent-teal)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ background: 'rgba(20, 184, 166, 0.15)', padding: '6px', borderRadius: '8px', color: 'var(--accent-teal)' }}>
                  <Layers size={20} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>SoilSense AI Suite</h3>
              </div>
              <span style={{ background: '#10B981', color: '#fff', fontSize: '0.7rem', fontWeight: 800, padding: '2px 8px', borderRadius: '10px' }}>
                NEW
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1rem' }}>
              Optical soil clod analysis, Indian agro-climatic zoning, texture estimation, and verified crop suitability recommendations.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <button className="btn-primary" style={{ padding: '0.5rem 0.85rem', fontSize: '0.85rem', width: 'auto' }} onClick={() => onTabClick('soilsense')}>
              <Sparkles size={15} /> Open SoilSense AI <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Innotech Presentation & Viva Guide Banner */}
        <div className="card" style={{ borderLeft: '4px solid #8B5CF6', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ background: 'rgba(139, 92, 246, 0.15)', padding: '6px', borderRadius: '8px', color: '#8B5CF6' }}>
                  <FileText size={20} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Innotech Viva & Defense Guide</h3>
              </div>
              <span style={{ background: 'rgba(139, 92, 246, 0.2)', color: '#A78BFA', fontSize: '0.7rem', fontWeight: 800, padding: '2px 8px', borderRadius: '10px' }}>
                PRESENTATION READY
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1rem' }}>
              Comprehensive preparation guide containing 25+ viva questions, AI model architectures (CNN & DJL), dataset statistics, and project pitch for evaluators.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <a 
              href="/SmartFarmIQ_Innotech_Viva_Guide.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-secondary" 
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '0.5rem 0.85rem', fontSize: '0.85rem', color: '#8B5CF6', borderColor: 'rgba(139, 92, 246, 0.4)' }}
            >
              <Download size={15} /> Download Viva Guide (PDF)
            </a>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <section className="profile-grid">
        <div className="profile-card">
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>TOTAL DIAGNOSES</span>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '0.5rem' }}>{history.length || 3}</h3>
        </div>
        <div className="profile-card">
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>HEALTHY PLANTS</span>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '0.5rem', color: '#10B981' }}>
            {plantProfiles.filter(p => p.healthScore >= 70).length} / {plantProfiles.length}
          </h3>
        </div>
        <div className="profile-card">
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>NEEDS ATTENTION</span>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '0.5rem', color: '#F59E0B' }}>
            {plantProfiles.filter(p => p.healthScore < 70).length}
          </h3>
        </div>
        <div className="profile-card">
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>PENDING REMINDERS</span>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '0.5rem' }}>{reminders.length}</h3>
        </div>
      </section>

      {/* Quick Actions Shortcuts */}
      <section className="card">
        <h3 className="card-title" style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
          ⚡ Quick Actions & Feature Shortcuts
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '0.85rem' }}>
          <button className="btn-secondary" style={{ padding: '0.85rem', justifyContent: 'center', borderColor: 'rgba(20, 184, 166, 0.4)' }} onClick={() => onTabClick('soilsense')}>
            <Layers size={18} color="var(--accent-teal)" /> 
            <span>SoilSense AI <strong style={{ color: '#10B981', fontSize: '0.75rem' }}>(NEW)</strong></span>
          </button>
          <button className="btn-secondary" style={{ padding: '0.85rem', justifyContent: 'center' }} onClick={() => onTabClick('diagnose')}>
            <Activity size={18} color="var(--accent-green)" /> Diagnose Leaf
          </button>
          <button className="btn-secondary" style={{ padding: '0.85rem', justifyContent: 'center' }} onClick={() => onTabClick('cropprices')}>
            <TrendingUp size={18} color="#3B82F6" /> Crop Prices & MSP
          </button>
          <button className="btn-secondary" style={{ padding: '0.85rem', justifyContent: 'center' }} onClick={() => onTabClick('store')}>
            <ShoppingCart size={18} color="#EC4899" /> Remedies & Products
          </button>
          <button className="btn-secondary" style={{ padding: '0.85rem', justifyContent: 'center' }} onClick={() => onTabClick('chat')}>
            <MessageSquare size={18} color="var(--accent-teal)" /> Ask AI Botanist
          </button>
          <a 
            href="/SmartFarmIQ_Innotech_Viva_Guide.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-secondary" 
            style={{ padding: '0.85rem', justifyContent: 'center', textDecoration: 'none', color: '#8B5CF6', borderColor: 'rgba(139, 92, 246, 0.4)' }}
          >
            <FileText size={18} color="#8B5CF6" /> Viva Guide (PDF)
          </a>
          <button className="btn-secondary" style={{ padding: '0.85rem', justifyContent: 'center' }} onClick={onOpenAddPlant}>
            <Plus size={18} color="#10B981" /> Add New Plant
          </button>
          <button className="btn-secondary" style={{ padding: '0.85rem', justifyContent: 'center' }} onClick={() => onTabClick('reminders')}>
            <Bell size={18} color="#F59E0B" /> Check Reminders
          </button>
        </div>
      </section>

      {/* Recent AI Diagnoses Table */}
      <section className="card">
        <h3 className="card-title" style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
          📜 Your Recent AI Diagnoses & Reports
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div className="rec-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ fontSize: '0.95rem' }}>Potato → Early Blight</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Scan: leaf_photo_01.jpg • Score: 45/100 • Severity: MODERATE</p>
            </div>
            <button className="btn-secondary" onClick={() => window.print()}>
              <Download size={14} /> Download PDF
            </button>
          </div>

          <div className="rec-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ fontSize: '0.95rem' }}>Bell Pepper → Healthy</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Scan: pepper_leaf.jpg • Score: 95/100 • Severity: LOW</p>
            </div>
            <button className="btn-secondary" onClick={() => window.print()}>
              <Download size={14} /> Download PDF
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
