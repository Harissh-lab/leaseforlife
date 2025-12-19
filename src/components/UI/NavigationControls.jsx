/**
 * Navigation Controls Component
 * Handles level navigation (previous, next, start over)
 */
export default function NavigationControls({ currentLevel, onPrevious, onNext, onStartOver }) {
  return (
    <div className="navigation-buttons">
      <button
        onClick={onStartOver}
        className="nav-button px-5 py-2 bg-red-600 text-white rounded-lg transition-all font-semibold text-sm hover:bg-red-700"
        title="Restart the game from level 1"
      >
        🔄 Start Over
      </button>
      <button
        onClick={onPrevious}
        disabled={currentLevel === 1}
        className="nav-button px-5 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all font-semibold text-sm"
        title="Go to previous level"
      >
        ← Previous
      </button>
      <button
        onClick={onNext}
        disabled={currentLevel === 10}
        className="nav-button px-5 py-2 bg-green-600 text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all font-semibold text-sm"
        title="Go to next level"
      >
        Next →
      </button>
    </div>
  );
}
