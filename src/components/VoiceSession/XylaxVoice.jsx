import { useState } from 'react';
import { useConversation } from '@elevenlabs/react';

/**
 * XylaxVoice Component
 * Manages voice conversation with ElevenLabs AI agent
 */
export default function XylaxVoice({
  currentLevelData,
  onLevelWin,
  onSpeakingChange,
  onSessionActiveChange,
}) {
  const [isSessionActive, setIsSessionActive] = useState(false);

  const conversation = useConversation({
    onMessage: (message) => handleMessage(message),
    onError: (error) => handleError(error),
  });

  /**
   * Handle incoming messages from the conversation
   */
  const handleMessage = (message) => {
    // Update speaking state
    if (message.type === 'agent_message' && onSpeakingChange) {
      onSpeakingChange(true);
    } else if (message.type === 'user_message' && onSpeakingChange) {
      onSpeakingChange(false);
    }

    // Detect level completion
    if (message.type === 'tool_call' && message.tool_name === 'complete_level') {
      onLevelWin?.();
    }
  };

  /**
   * Handle conversation errors
   */
  const handleError = (error) => {
    console.error('Voice session error:', error.message);
    setIsSessionActive(false);
    onSpeakingChange?.(false);
  };

  /**
   * Start voice session and show modal
   */
  const startSession = async () => {
    setIsSessionActive(true);
    onSessionActiveChange?.(true);

    if (!currentLevelData) return;

    try {
      const { persona, objective, hook } = currentLevelData;
      await conversation.startSession({
        dynamicVariables: { persona, objective, hook },
      });
    } catch (error) {
      console.error('Failed to start conversation:', error.message);
    }
  };

  /**
   * Stop voice session and hide modal
   */
  const stopSession = async () => {
    setIsSessionActive(false);
    onSessionActiveChange?.(false);
    onSpeakingChange?.(false);

    try {
      await conversation.endSession();
    } catch (error) {
      console.log('Session ended');
    }
  };

  /**
   * Toggle between start and stop
   */
  const handleToggle = async () => {
    if (isSessionActive) {
      await stopSession();
    } else {
      await startSession();
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`voice-button ${isSessionActive ? 'active' : ''}`}
      aria-label={isSessionActive ? 'Stop voice session' : 'Start voice session'}
      title={isSessionActive ? 'Stop conversation' : 'Start conversation'}
    >
      {isSessionActive ? '🎤 Stop' : '🎤 Start'}
    </button>
  );
}
