# Setup Instructions

## Background Images

Save the background images in the `public/backgrounds/` folder:

1. **Kitchen Background** (for levels 1-5):
   - Save the kitchen image as: `public/backgrounds/kitchen.jpg`
   - This is the image with the grey carpet where level stones will appear

2. **Living Room Background** (for levels 6-10):
   - Save your living room image as: `public/backgrounds/living_room.jpg`

## Features Implemented

### ✅ Candy Crush Style Level Map
- **Level Stones**: Grey stones on the carpet area that light up in green for the current level
- **Visual States**:
  - 🔒 **Locked** (levels not yet reached): Dark grey stones with reduced opacity
  - ✅ **Completed** (past levels): Blue stones with checkmarks
  - 🟢 **Current** (active level): Glowing green stone with pulsing animation
- **Interactive**: Click on any unlocked stone to jump to that level
- **Positioned**: Stones appear on the grey carpet path in the kitchen (levels 1-5 only)

### ✨ Button Hover Glow Effects
All buttons now have glowing effects on hover:
- **Navigation buttons**: Glow in their respective colors (grey/green)
- **Hint button**: Purple glow effect
- **Voice controller buttons**: Color-matched glow effects
- **Smooth transitions**: All hover effects animate smoothly

### 🎮 Level System
- Levels 1-5: Kitchen location with level map visible
- Levels 6-10: Living room location (no level map)
- Green stone indicates current level with:
  - Continuous glow animation
  - Pulsing ring effect
  - Brighter appearance

### 🎨 Visual Polish
- Glitch effects on level changes
- Cross-fade background transitions
- Alien hint character with speech bubble
- Full-screen responsive layout

## How to Use

1. Install dependencies:
   ```bash
   npm install
   ```

2. Place your background images in `public/backgrounds/`

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The level map will appear on the grey carpet area when playing levels 1-5 in the kitchen!
