import { useState } from 'react';
import './LevelMap.css';

const LEVEL_POSITIONS = [
  { level: 1, x: 55, y: 130 },
  { level: 2, x: 45, y: 105 },
  { level: 3, x: 55, y: 80 },
  { level: 4, x: 45, y: 55 },
  { level: 5, x: 55, y: 30 },
];

/**
 * LevelMap Component
 * Displays interactive level progression stones for kitchen levels
 */
export default function LevelMap({ currentLevel, onLevelSelect, onStartLevel }) {
  const [hoveredLevel, setHoveredLevel] = useState(null);

  /**
   * Determine level status (current, completed, locked)
   */
  const getLevelStatus = (level) => {
    if (level === currentLevel) return 'current';
    return level < currentLevel ? 'completed' : 'locked';
  };

  /**
   * Handle stone click - either start level or navigate
   */
  const handleStoneClick = (level, status) => {
    if (status === 'locked') return;

    if (status === 'current') {
      onStartLevel?.();
    } else {
      onLevelSelect(level);
    }
  };

  return (
    <div className="level-map-container">
      <div className="level-map">
        {LEVEL_POSITIONS.map(({ level, x, y }) => (
          <LevelStone
            key={level}
            level={level}
            x={x}
            y={y}
            status={getLevelStatus(level)}
            isHovered={hoveredLevel === level}
            onMouseEnter={() => setHoveredLevel(level)}
            onMouseLeave={() => setHoveredLevel(null)}
            onClick={() => handleStoneClick(level, getLevelStatus(level))}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * LevelStone Component
 * Individual level stone with status indicators
 */
function LevelStone({
  level,
  x,
  y,
  status,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) {
  const image = level === 5 ? '/toaster.png' : '/level_green.png';

  return (
    <div
      className={`level-stone-wrapper ${status}`}
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <div className="level-label">Level {level}</div>

      <div
        className={`level-stone ${status} ${isHovered ? 'hovered' : ''}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        role="button"
        tabIndex={status === 'locked' ? -1 : 0}
        aria-label={`Level ${level} - ${status}`}
      >
        <img src={image} alt={`Level ${level}`} className="stone-image" />

        <div className="stone-content">
          <span className={`level-number ${status === 'current' ? 'large' : ''}`}>
            {level}
          </span>
          {status === 'completed' && <div className="check-mark">✓</div>}
        </div>

        {status === 'current' && <div className="pulse-ring" />}
      </div>
    </div>
  );
}
