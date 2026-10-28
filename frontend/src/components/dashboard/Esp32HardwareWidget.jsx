import React, { useState, useEffect } from 'react';
import { 
  Camera, Wifi, Droplets, Thermometer, Activity, Sliders, 
  ExternalLink, ArrowUpRight, Cpu, Zap
} from 'lucide-react';
import { fetchIotTelemetry } from '../../services/api';

export default function Esp32HardwareWidget({ onOpenEsp32Cam }) {
  const [telemetry, setTelemetry] = useState({
    deviceId: 'esp32cam-node-01',
    status: 'online',
    ip: '192.168.1.105',
    moisture: 42.5,
    temperature: 24.8,
    ph: 6.8,
    ec: 0.85,
    rssi: -62,
    updatedAt: 'Live'
  });

  useEffect(() => {
    let mounted = true;
    const loadTelemetry = async () => {
      try {
        const data = await fetchIotTelemetry();
        if (mounted && data) {
          setTelemetry(prev => ({ ...prev, ...data }));
        }
      } catch (e) {}
    };

    loadTelemetry();
    const interval = setInterval(loadTelemetry, 8000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="card glassmorphism" style={{
      border: '1px solid rgba(16, 185, 129, 0.35)',
      background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.75), rgba(6, 78, 59, 0.25))',
      position: 'relative',
      overflow: 'hidden',
      marginBottom: '1.25rem'
    }}>
      {/* Decorative background glow */}
      <div style={{
        position: 'absolute',
        top: '-40px',
        right: '-40px',
        width: '120px',
        height: '120px',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }}></div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.75rem',
        marginBottom: '0.85rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid var(--accent-green)',
            borderRadius: '8px',
            padding: '0.45rem',
            color: 'var(--accent-green)',
            display: 'flex'
          }}>
            <Cpu size={20} />
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              ESP32-CAM & IoT Soil Station
              <span className="badge-pill" style={{ 
                background: 'rgba(16, 185, 129, 0.15)', 
                color: '#10B981', 
                border: '1px solid rgba(16, 185, 129, 0.4)',
                fontSize: '0.72rem',
                padding: '2px 8px'
              }}>
                <Wifi size={11} /> {telemetry.status === 'online' ? 'Connected' : 'Offline'}
              </span>
            </h4>
            <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Node ID: {telemetry.deviceId} • IP: {telemetry.ip || '192.168.1.105'}
            </p>
          </div>
        </div>

        <button
          onClick={onOpenEsp32Cam}
          className="btn-pill-action"
          style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(6, 78, 59, 0.4))',
            color: 'var(--accent-green)',
            borderColor: 'var(--accent-green)',
            fontSize: '0.82rem',
            padding: '0.45rem 0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}
        >
          <Camera size={15} /> Launch ESP32 Live Stream <ArrowUpRight size={14} />
        </button>
      </div>

      {/* Real-time Hardware Telemetry Chips */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
        gap: '0.5rem'
      }}>
        <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '8px', padding: '0.55rem', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#38BDF8', fontSize: '0.75rem', marginBottom: '0.2rem' }}>
            <Droplets size={13} /> Moisture
          </div>
          <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#F8FAFC' }}>
            {telemetry.moisture}%
          </div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Capacitive v1.2</div>
        </div>

        <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '8px', padding: '0.55rem', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#F97316', fontSize: '0.75rem', marginBottom: '0.2rem' }}>
            <Thermometer size={13} /> Soil Temp
          </div>
          <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#F8FAFC' }}>
            {telemetry.temperature}°C
          </div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>DS18B20 Probe</div>
        </div>

        <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '8px', padding: '0.55rem', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#A855F7', fontSize: '0.75rem', marginBottom: '0.2rem' }}>
            <Activity size={13} /> Soil pH
          </div>
          <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#F8FAFC' }}>
            {telemetry.ph}
          </div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Calibrated Glass</div>
        </div>

        <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '8px', padding: '0.55rem', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#EAB308', fontSize: '0.75rem', marginBottom: '0.2rem' }}>
            <Sliders size={13} /> Salinity (EC)
          </div>
          <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#F8FAFC' }}>
            {telemetry.ec} <span style={{ fontSize: '0.7rem' }}>dS/m</span>
          </div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Direct Soil EC</div>
        </div>
      </div>
    </div>
  );
}
