import { useState } from 'react';
import { useConversation } from '@elevenlabs/react';

const XylaxVoice = ({ currentLevelData, onLevelWin, onSpeakingChange, onSessionActiveChange, levelId }) => {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const conversation = useConversation({
    onMessage: (message) => {
      handleMessage(message);
    },
    onError: (error) => {
      handleError(error);
    },
  });

  /**
   * Generate system prompt based on level data
   * This creates a unified problem statement for the AI agent
   */
  const generateSystemPrompt = (levelData) => {
    if (!levelData) return '';

    const { persona, objective, hook, id } = levelData;
    return `You are ${persona}.

Your primary objective in this interaction is: ${objective}

Begin the conversation by saying: "${hook}"

After the user responds, guide them through the learning experience. When they successfully complete the objective, use the "complete_level" tool to advance them to the next level.

Keep interactions concise and engaging. Focus on the specific learning objective for this level.`;
  };

  const handleMessage = (message) => {
    // Update speaking state based on message type
    if (message.type === 'user_message' || message.type === 'agent_message') {
      if (onSpeakingChange) {
        onSpeakingChange(message.type === 'agent_message');
      }
    }

    // Check if complete_level tool was called
    if (message.type === 'tool_call' && message.tool_name === 'complete_level') {
      console.log('Level complete tool called');
      if (onLevelWin) {
        onLevelWin();
      }
    }
  };

  const handleError = (error) => {
    console.error('Voice session error:', error);
    setIsSessionActive(false);
    setIsLoading(false);
    if (onSpeakingChange) {
      onSpeakingChange(false);
    }
  };

  const handleStartSession = async () => {
    // Show modal immediately
    setIsSessionActive(true);
    setIsLoading(true);
    if (onSessionActiveChange) {
      onSessionActiveChange(true);
    }

    const agentId = import.meta.env.VITE_REACT_APP_ELEVENLABS_AGENT_ID;

    if (!agentId) {
      console.error('Agent ID not configured. Add VITE_REACT_APP_ELEVENLABS_AGENT_ID to .env.local');
      setIsLoading(false);
      return;
    }

    // Try to start conversation if data exists
    if (currentLevelData) {
      try {
        const systemPrompt = generateSystemPrompt(currentLevelData);

        console.log('Starting conversation with Agent ID:', agentId);
        console.log('Level:', currentLevelData.id);

        // Start session with system prompt as initial context
        await conversation.startSession({
          agentId,
          // Pass system prompt as first message context
          clientTools: {
            complete_level: {
              description: 'Call this when the user successfully completes the level objective',
              parameters: {
                type: 'object',
                properties: {},
              },
            },
          },
        });

        // Send system context as initial message
        if (conversation.isSpeaking === false) {
          // Small delay to ensure session is ready
          setTimeout(() => {
            console.log('Session ready, agent will start speaking');
          }, 500);
        }

        console.log('Session started successfully for Level', currentLevelData.id);
      } catch (error) {
        console.error('Failed to start conversation:', error);
        setIsLoading(false);
        // Modal still shows even if conversation fails
      } finally {
        setIsLoading(false);
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
        disabled={isLoading}
        className={`voice-button ${isSessionActive ? 'active' : ''} ${isLoading ? 'loading' : ''}`}
        aria-label={isSessionActive ? 'Stop voice session' : 'Start voice session'}
        title={isLoading ? 'Connecting...' : (isSessionActive ? 'Stop voice session' : 'Start voice session')}
      >
        {isLoading ? '⏳' : (isSessionActive ? '🎤 Stop' : '🎤 Start')}
      </button>
    </div>
  );
};

export default XylaxVoice;
