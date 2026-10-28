import React, { useState } from 'react';
import { Target, Layers, ShieldAlert, CheckCircle2, Eye, EyeOff } from 'lucide-react';

export default function YoloDetectionOverlay({
  imageUrl,
  yoloData,
  onSelectBox
}) {
  const [showBoxes, setShowBoxes] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  if (!imageUrl) return null;

  const boxes = yoloData?.boxes || [];
  const totalLesions = yoloData?.total_lesions ?? boxes.filter(b => b.class_name !== 'healthy_tissue').length;
  const affectedPct = yoloData?.affected_area_pct ?? 14.5;
  const dominantDisease = yoloData?.dominant_disease || (boxes[0]?.label || 'Healthy Leaf Tissue');

  // Coordinate normalizer for responsive SVG overlay
  const imgWidth = yoloData?.image_width || 640;
  const imgHeight = yoloData?.image_height || 480;

  return (
    <div style={{ marginTop: '1rem', marginBottom: '1.25rem' }}>
      {/* Header Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.6rem',
        marginBottom: '0.6rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {totalLesions === 0 ? (
            <span className="badge-pill" style={{ 
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(6, 78, 59, 0.25))',
              color: '#10B981',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              fontSize: '0.78rem'
            }}>
              <CheckCircle2 size={13} /> YOLOv5 + OpenCV: 0 Lesions (Healthy Foliage)
            </span>
          ) : (
            <span className="badge-pill" style={{ 
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(220, 38, 38, 0.25))',
              color: '#EF4444',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              fontSize: '0.78rem'
            }}>
              <Target size={13} /> YOLOv5 Multi-Lesion Detector
            </span>
          )}
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Status: <strong style={{ color: totalLesions === 0 ? '#10B981' : '#F8FAFC' }}>
              {totalLesions === 0 ? 'No Pathological Lesions' : `${totalLesions} Lesions (${affectedPct}% Surface Affected)`}
            </strong>
            {yoloData?.opencv_rendered && (
              <span style={{ marginLeft: '6px', color: '#38BDF8', fontSize: '0.72rem' }}>
                • OpenCV Rendered
              </span>
            )}
          </span>
        </div>

        <button 
          className="btn-pill-action"
          onClick={() => setShowBoxes(!showBoxes)}
          style={{ fontSize: '0.75rem', padding: '0.3rem 0.65rem' }}
        >
          {showBoxes ? <><EyeOff size={13} /> Hide Bounding Boxes</> : <><Eye size={13} /> Show Bounding Boxes</>}
        </button>
      </div>

      {/* Interactive Image Frame with Responsive SVG Bounding Box Layer */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '520px',
        margin: '0 auto',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        background: '#0F172A',
        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.5)'
      }}>
        <img 
          src={imageUrl} 
          alt="Analyzed leaf" 
          style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
        />

        {showBoxes && boxes.length > 0 && (
          <svg
            viewBox={`0 0 ${imgWidth} ${imgHeight}`}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none'
            }}
          >
            {boxes.map((box, idx) => {
              const x = box.xmin;
              const y = box.ymin;
              const w = box.xmax - box.xmin;
              const h = box.ymax - box.ymin;
              const isHovered = hoveredIndex === idx;
              const boxColor = box.color || '#EF4444';

              return (
                <g 
                  key={idx} 
                  style={{ pointerEvents: 'all', cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Bounding box rectangle */}
                  <rect
                    x={x}
                    y={y}
                    width={w}
                    height={h}
                    fill={isHovered ? `${boxColor}33` : `${boxColor}1A`}
                    stroke={boxColor}
                    strokeWidth={isHovered ? 3.5 : 2}
                    strokeDasharray={box.class_name === 'healthy_tissue' ? '6,6' : 'none'}
                    rx={4}
                  />

                  {/* Corner markers */}
                  <circle cx={x} cy={y} r={isHovered ? 4 : 2.5} fill={boxColor} />
                  <circle cx={x + w} cy={y} r={isHovered ? 4 : 2.5} fill={boxColor} />
                  <circle cx={x} cy={y + h} r={isHovered ? 4 : 2.5} fill={boxColor} />
                  <circle cx={x + w} cy={y + h} r={isHovered ? 4 : 2.5} fill={boxColor} />

                  {/* Label badge above bounding box */}
                  <g transform={`translate(${x}, ${Math.max(18, y - 6)})`}>
                    <rect
                      x={0}
                      y={-14}
                      width={Math.min(w + 30, 160)}
                      height={18}
                      fill={boxColor}
                      rx={3}
                    />
                    <text
                      x={4}
                      y={-2}
                      fill="#FFFFFF"
                      fontSize="10"
                      fontFamily="sans-serif"
                      fontWeight="bold"
                    >
                      {box.label ? box.label.split('(')[0] : 'Lesion'} {Math.round((box.confidence || 0.85) * 100)}%
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
        )}
      </div>

      {/* Lesion Legend List */}
      <div style={{
        marginTop: '0.85rem',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        justifyContent: 'center'
      }}>
        {boxes.map((b, i) => (
          <div
            key={i}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              background: hoveredIndex === i ? 'rgba(30, 41, 59, 0.9)' : 'rgba(15, 23, 42, 0.6)',
              border: `1px solid ${hoveredIndex === i ? (b.color || '#EF4444') : 'var(--border-color)'}`,
              borderRadius: '6px',
              padding: '0.25rem 0.55rem',
              fontSize: '0.74rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: b.color || '#EF4444'
            }}></span>
            <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{b.label || b.class_name}</span>
            <span style={{ color: 'var(--text-muted)' }}>({Math.round((b.confidence || 0.85) * 100)}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}
