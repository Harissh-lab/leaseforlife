import { useState, useEffect } from 'react';

/**
 * Custom hook for managing UI effects and animations
 */
export const useUIEffects = (currentLevel) => {
  const [glitchActive, setGlitchActive] = useState(false);
  const [backgroundTransition, setBackgroundTransition] = useState(false);

  useEffect(() => {
    if (currentLevel > 1) {
      setGlitchActive(true);
      setBackgroundTransition(true);

      const glitchTimer = setTimeout(() => {
        setGlitchActive(false);
      }, 500);

      const bgTimer = setTimeout(() => {
        setBackgroundTransition(false);
      }, 800);

      return () => {
        clearTimeout(glitchTimer);
        clearTimeout(bgTimer);
      };
    }
  }, [currentLevel]);

  return {
    glitchActive,
    backgroundTransition,
  };
};
