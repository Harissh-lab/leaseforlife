import { useState } from 'react';
import { useConversation } from '@elevenlabs/react';

const XylaxVoice = ({ currentLevelData, onLevelWin, onSpeakingChange, onSessionActiveChange }) => {
  const [isSessionActive, setIsSessionActive] = useState(false);

  const conversation = useConversation({
    onMessage: (message) => {
      handleMessage(message);
    },
    onError: (error) => {
      handleError(error);
    },
  });

  const handleMessage = (message) => {
    // Update speaking state based on message type
    if (message.type === 'user_message' || message.type === 'agent_message') {
      if (onSpeakingChange) {
        onSpeakingChange(message.type === 'agent_message');
      }
    }
    
    // Check if complete_level tool was called
    if (message.type === 'tool_call' && message.tool_name === 'complete_level') {
      if (onLevelWin) {
        onLevelWin();
      }
    }
  };

  const handleError = (error) => {
    console.error('Voice session error:', error);
    setIsSessionActive(false);
    if (onSpeakingChange) {
      onSpeakingChange(false);
    }
  };

  const handleStartSession = async () => {
    // Show modal immediately
    setIsSessionActive(true);
    if (onSessionActiveChange) {
      onSessionActiveChange(true);
    }
    
    // Try to start conversation if data exists
    if (currentLevelData) {
      const { persona, objective, hook } = currentLevelData;
      const agentId = import.meta.env.VITE_REACT_APP_ELEVENLABS_AGENT_ID;
      console.log('Agent ID:', agentId);
      try {
        await conversation.startSession({
          agentId,
          dynamicVariables: {
            persona,
            objective,
            hook,
          },
        });
        console.log('Session started successfully');
      } catch (error) {
        console.error('Failed to start conversation:', error);
        // Modal still shows even if conversation fails
      }
    }
  };

  const handleStopSession = async () => {
    // Close modal immediately
    setIsSessionActive(false);
    if (onSessionActiveChange) {
      onSessionActiveChange(false);
    }
    
    // Try to end conversation gracefully
    try {
      await conversation.endSession();
    } catch (error) {
      console.log('Session cleanup:', error.message);
    }
    
    if (onSpeakingChange) {
      onSpeakingChange(false);
    }
  };

  const toggleConversation = async () => {
    if (isSessionActive) {
      await handleStopSession();
    } else {
      await handleStartSession();
    }
  };

  return (
    <div className="xylax-voice-controller">
      <button
        onClick={toggleConversation}
        className={`voice-button ${isSessionActive ? 'active' : ''}`}
        aria-label={isSessionActive ? 'Stop voice session' : 'Start voice session'}
      >
        {isSessionActive ? '🎤 Stop' : '🎤 Start'}
      </button>
    </div>
  );
};

export default XylaxVoice;
