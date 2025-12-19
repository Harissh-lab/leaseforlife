/**
 * Voice Session Modal Component
 * Displays character in center when voice session is active
 */
export default function VoiceSessionModal({ character }) {
  return (
    <div className="voice-session-modal">
      <div className="modal-character-display">
        <img 
          src={character.image}
          alt={character.name}
          className="modal-character-image"
        />
      </div>
    </div>
  );
}
