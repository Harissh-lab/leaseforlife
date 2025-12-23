import { LEVEL_RANGES, ASSETS, CHARACTERS } from '../constants/config';

/**
 * Get the appropriate background image for the current level
 */
export const getBackgroundForLevel = (currentLevel, levelLocation) => {
  if (currentLevel === 5) {
    return ASSETS.BACKGROUNDS.kitchen_special;
  }
  return ASSETS.BACKGROUNDS[levelLocation] || ASSETS.BACKGROUNDS.kitchen;
};

/**
 * Get the appropriate character for the current level
 */
export const getCharacterForLevel = (currentLevel) => {
  if (currentLevel >= LEVEL_RANGES.KITCHEN.min && currentLevel <= LEVEL_RANGES.KITCHEN.max) {
    if (currentLevel === 5) {
      return CHARACTERS.TOASTER;
    }
    return CHARACTERS.XYLAX;
  }
  return CHARACTERS.XYLAX; // Default character
};

/**
 * Load saved level from localStorage or return default
 */
export const loadSavedLevel = () => {
  const saved = localStorage.getItem('currentLevel');
  return saved ? parseInt(saved, 10) : 1;
};

/**
 * Save level to localStorage
 */
export const saveLevelToStorage = (level) => {
  localStorage.setItem('currentLevel', level.toString());
};

/**
 * Clear level from localStorage
 */
export const clearLevelFromStorage = () => {
  localStorage.removeItem('currentLevel')
}
