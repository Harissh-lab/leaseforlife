import { useState, useEffect } from 'react'
import './App.css'
import levelsData from './data/levels.json'
import LevelMap from './components/LevelMap'
import XylaxVoice from './components/XylaxVoice'
import { GAME_CONFIG, LEVEL_RANGES, STORAGE_KEYS } from './constants/config'
import { 
  loadSavedLevel, 
  saveLevelToStorage, 
  clearLevelFromStorage,
  getBackgroundForLevel,
  getCharacterForLevel,
} from './utils/gameHelpers'

function App() {
  const [currentLevel, setCurrentLevel] = useState(loadSavedLevel)
  const [showHint, setShowHint] = useState(false)
  const [glitchActive, setGlitchActive] = useState(false)
  const [backgroundTransition, setBackgroundTransition] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isSessionActive, setIsSessionActive] = useState(false)

  const levelData = levelsData.find(level => level.id === currentLevel) || levelsData[0]
  const currentBackground = getBackgroundForLevel(currentLevel, levelData.location)
  const currentCharacter = getCharacterForLevel(currentLevel)

  // Trigger glitch effect when level changes
  useEffect(() => {
    if (currentLevel > 1) {
      setGlitchActive(true)
      setBackgroundTransition(true)
      
      const timer = setTimeout(() => {
        setGlitchActive(false)
      }, GAME_CONFIG.GLITCH_DURATION)

      const bgTimer = setTimeout(() => {
        setBackgroundTransition(false)
      }, GAME_CONFIG.BACKGROUND_TRANSITION_DURATION)

      return () => {
        clearTimeout(timer)
        clearTimeout(bgTimer)
      }
    }
  }, [currentLevel])

  // Save current level to localStorage
  useEffect(() => {
    saveLevelToStorage(currentLevel)
  }, [currentLevel])

  // Log session state changes (for debugging)
  useEffect(() => {
    console.log('Session active:', isSessionActive)
  }, [isSessionActive])

  const handleLevelComplete = () => {
    if (currentLevel < 10) {
      setCurrentLevel(prev => prev + 1)
    } else {
      alert('Congratulations! You completed all levels!')
    }
  }

  const handlePreviousLevel = () => {
    if (currentLevel > 1) {
      setCurrentLevel(prev => prev - 1)
    }
  }

  const handleLevelSelect = (level) => {
    setCurrentLevel(level)
  }

  const handleStartOver = () => {
    if (window.confirm('Are you sure you want to start over? Your progress will be lost.')) {
      clearLevelFromStorage()
      setCurrentLevel(1)
      setShowHint(false)
    }
  }

  return (
    <div className={`app-container ${glitchActive ? 'glitch-active' : ''}`}>
      {/* Background Layer 1 (outgoing) */}
      <div 
        className={`background-layer ${backgroundTransition ? 'fade-out' : ''} ${isSessionActive ? 'dimmed' : ''}`}
        style={{ 
          backgroundImage: `url(${currentBackground})`,
        }}
      />
      
      {/* Background Layer 2 (incoming) - for cross-fade */}
      {backgroundTransition && (
        <div 
          className="background-layer fade-in"
          style={{ 
            backgroundImage: `url(${currentBackground})`,
          }}
        />
      )}

      {/* Glitch overlay */}
      {glitchActive && <div className="glitch-overlay" />}

      {/* Voice Session Modal - Centered Character */}
      {isSessionActive && (
        <div className="voice-session-modal">
          <div className="modal-character-display">
            <img 
              src={currentCharacter.image}
              alt={currentCharacter.name}
              className="modal-character-image"
            />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="content-wrapper">
        {/* Level indicator - Top Left Corner */}
        <div className="top-left-corner">
          <div className="level-badge">
            <h1 className="text-3xl font-bold text-white">
              Level {currentLevel} / 10
            </h1>
            <p className="text-sm text-gray-200 uppercase tracking-wide">
              {levelData.location.replace('_', ' ')}
            </p>
          </div>
        </div>

        {/* Voice Controller and Agent - Top Right Corner */}
        <div className="top-right-corner">
          <div className="agent-voice-container">
            {/* Agent Image */}
            <div className={`agent-image ${isSpeaking ? 'speaking' : ''}`}>
              <img 
                src={currentCharacter.image}
                alt={currentCharacter.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Voice Controller */}
            <XylaxVoice 
              currentLevelData={levelData}
              onLevelWin={handleLevelComplete}
              onSpeakingChange={setIsSpeaking}
              onSessionActiveChange={setIsSessionActive}
            />
          </div>
        </div>

        {/* Level Map - Positioned on the carpet area */}
        {levelData.location === 'kitchen' && currentLevel <= LEVEL_RANGES.KITCHEN.max && (
          <LevelMap 
            currentLevel={currentLevel}
            onLevelSelect={handleLevelSelect}
            onStartLevel={() => {
              // Trigger voice session start from stone click
              const startButton = document.querySelector('.voice-controller button:first-of-type');
              if (startButton && !startButton.disabled) {
                startButton.click();
              }
            }}
          />
        )}

        {/* Bottom Controls */}
        <div className="bottom-controls">
          {/* Hint Button - Bottom Left */}
          <div className="hint-section">
            <button
              onClick={() => setShowHint(!showHint)}
              className="hint-button px-6 py-3 bg-purple-600 text-white rounded-full font-bold shadow-lg transition-all"
            >
              {showHint ? '✕' : '💡'}
            </button>

            {/* Alien Character with Speech Bubble */}
            {showHint && (
              <div className="alien-hint-wrapper">
                <div className="speech-bubble">
                  <p className="text-sm font-semibold">{levelData.hint}</p>
                  <div className="speech-bubble-arrow" />
                </div>
                <div className="alien-character">
                  <div className="alien-body">
                    <div className="alien-eye left-eye" />
                    <div className="alien-eye right-eye" />
                    <div className="alien-antenna">
                      <div className="antenna-ball" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation buttons - Bottom Right */}
          <div className="navigation-buttons">
            <button
              onClick={handleStartOver}
              className="nav-button px-5 py-2 bg-red-600 text-white rounded-lg transition-all font-semibold text-sm hover:bg-red-700"
            >
              🔄 Start Over
            </button>
            <button
              onClick={handlePreviousLevel}
              disabled={currentLevel === 1}
              className="nav-button px-5 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all font-semibold text-sm"
            >
              ← Previous
            </button>
            <button
              onClick={handleLevelComplete}
              disabled={currentLevel === 10}
              className="nav-button px-5 py-2 bg-green-600 text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all font-semibold text-sm"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
