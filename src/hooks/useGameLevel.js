import { useState, useEffect } from 'react';
import { loadSavedLevel, saveLevelToStorage, clearLevelFromStorage } from '../utils/gameHelpers';

/**
 * Custom hook for managing game level state with localStorage persistence
 */
export const useGameLevel = () => {
  const [currentLevel, setCurrentLevel] = useState(loadSavedLevel);

  useEffect(() => {
    saveLevelToStorage(currentLevel);
  }, [currentLevel]);

  const nextLevel = () => {
    setCurrentLevel(prev => (prev < 5 ? prev + 1 : prev));
  };

  const previousLevel = () => {
    setCurrentLevel(prev => (prev > 1 ? prev - 1 : prev));
  };

  const selectLevel = (level) => {
    if (level >= 1 && level <= 5) {
      setCurrentLevel(level);
    }
  };

  const resetGame = () => {
    clearLevelFromStorage();
    setCurrentLevel(1);
  };

  return {
    currentLevel,
    setCurrentLevel,
    nextLevel,
    previousLevel,
    selectLevel,
    resetGame,
  };
};
