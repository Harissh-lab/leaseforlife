/**
 * Hint Section Component
 * Displays hint button and alien character with speech bubble
 */
export default function HintSection({ showHint, onToggle, hint }) {
  return (
    <div className="hint-section">
      <button
        onClick={onToggle}
        className="hint-button px-6 py-3 bg-purple-600 text-white rounded-full font-bold shadow-lg transition-all"
        aria-label={showHint ? 'Hide hint' : 'Show hint'}
      >
        {showHint ? '✕' : '💡'}
      </button>

      {showHint && <HintBubble hint={hint} />}
    </div>
  );
}

/**
 * Hint Bubble with Alien Character
 */
function HintBubble({ hint }) {
  return (
    <div className="alien-hint-wrapper">
      <div className="speech-bubble">
        <p className="text-sm font-semibold">{hint}</p>
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
  );
}
