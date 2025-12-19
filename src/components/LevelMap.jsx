import { useState } from 'react';
import './LevelMap.css';

const LevelMap = ({ currentLevel, onLevelSelect, onStartLevel }) => {
  const [hoveredLevel, setHoveredLevel] = useState(null);

  // Define positions for 5 stones with specific y coordinates
  const levelPositions = [
    { level: 1, x: 55, y: 130 },  // Bottom (align with lvl 3)
    { level: 2, x: 45, y: 105 },  // Left (align with lvl 4)
    { level: 3, x: 55, y: 80 },   // Right (+5px)
    { level: 4, x: 45, y: 55 },   // Left (-5px)
    { level: 5, x: 55, y: 30 },   // Right (align with lvl 3)
  ];

  const getLevelStatus = (level) => {
    if (level === currentLevel) return 'current';
    if (level < currentLevel) return 'completed';
    return 'locked';
  };

  const handleStoneClick = (level, status) => {
    if (status === 'locked') return;
    
    if (status === 'current') {
      // Current stone - start the level
      if (onStartLevel) {
        onStartLevel();
      }
    } else {
      // Other stones - navigate to level
      onLevelSelect(level);
    }
  };

  return (
    <div className="level-map-container">
      <div className="level-map">
        {/* Level stones - Zig Zag arrangement */}
        {levelPositions.map(({ level, x, y }) => {
          const status = getLevelStatus(level);
          const isHovered = hoveredLevel === level;
          
          return (
            <div
              key={level}
              className={`level-stone-wrapper ${status}`}
              style={{
                left: `${x}%`,
                top: `${y}%`,
              }}
            >
              {/* Level label above stone */}
              <div className="level-label">Level {level}</div>
              
              {/* Stone */}
              <div
                className={`level-stone ${status} ${isHovered ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredLevel(level)}
                onMouseLeave={() => setHoveredLevel(null)}
                onClick={() => handleStoneClick(level, status)}
              >
                <img 
                  src={level === 5 ? '/toaster.png' : '/level_green.png'}
                  alt={`Level ${level}`}
                  className="stone-image"
                />
                <div className="stone-content">
                  {status === 'current' ? (
                    <span className="level-number-large">{level}</span>
                  ) : (
                    <span className="level-number">{level}</span>
                  )}
                  {status === 'completed' && (
                    <div className="check-mark">✓</div>
                  )}
                </div>
                
                {/* Pulsing ring for current level */}
                {status === 'current' && (
                  <div className="pulse-ring" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LevelMap;
