// Game Constants
export const GAME_CONFIG = {
  TOTAL_LEVELS: 10,
  KITCHEN_LEVELS_COUNT: 5,
  GLITCH_DURATION: 500,
  BACKGROUND_TRANSITION_DURATION: 800,
  SPEAKING_PULSE_DURATION: 600,
  CHARACTER_MODAL_SIZE: 300,
};

// Level Constants
export const LEVEL_RANGES = {
  KITCHEN: { min: 1, max: 5 },
  LIVING_ROOM: { min: 6, max: 10 },
};

// Asset Paths
export const ASSETS = {
  BACKGROUNDS: {
    kitchen: '/backgrounds/kitchen.png',
    living_room: '/backgrounds/living_room.jpg',
    kitchen_special: '/backgrounds/kitchen_bg.png',
  },
  CHARACTERS: {
    xylax: '/xylax.png',
    toaster: '/toaster.png',
  },
};

// Local Storage Keys
export const STORAGE_KEYS = {
  CURRENT_LEVEL: 'currentLevel',
};

// Character Info
export const CHARACTERS = {
  XYLAX: { name: 'Xylax', image: ASSETS.CHARACTERS.xylax },
  TOASTER: { name: 'Toaster', image: ASSETS.CHARACTERS.toaster },
};
