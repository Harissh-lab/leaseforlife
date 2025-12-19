import { useConversation } from '@elevenlabs/react';
import { useEffect } from 'react';

const VoiceController = ({ levelData, onSuccess }) => {
  const conversation = useConversation({
    onMessage: (message) => {
      console.log('Message received:', message);
      
      // Check if the message contains a tool call for complete_level
      if (message.type === 'tool_call' && message.tool_name === 'complete_level') {
        console.log('Level completed! Tool call detected.');
        // Trigger the success callback to increment the level
        if (onSuccess) {
          onSuccess();
        }
      }
    },
    onError: (error) => {
      console.error('Conversation error:', error);
    },
  });

  const startSession = async () => {
    try {
      // Start the conversation with dynamic variables from levelData
      await conversation.startSession({
        agentId: process.env.REACT_APP_ELEVENLABS_AGENT_ID,
        overrides: {
          agent: {
            prompt: {
              dynamicVariables: {
                persona: levelData.persona,
                objective: levelData.objective,
                hook: levelData.hook,
              },
            },
          },
        },
      });
      console.log('Session started with level data:', {
        persona: levelData.persona,
        objective: levelData.objective,
        hook: levelData.hook,
      });
    } catch (error) {
      console.error('Failed to start session:', error);
    }
  };

  const endSession = async () => {
    try {
      await conversation.endSession();
      console.log('Session ended');
    } catch (error) {
      console.error('Failed to end session:', error);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (conversation.status === 'connected') {
        endSession();
      }
    };
  }, []);

  return (
    <div className="voice-controller">
      <div className="flex flex-col items-center gap-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-3">
            Level {levelData.id}
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className={`w-4 h-4 rounded-full transition-all ${
              conversation.status === 'connected' ? 'bg-green-500 animate-pulse shadow-lg shadow-green-500/50' : 'bg-gray-500'
            }`} />
            <p className="text-lg text-gray-200 font-medium">
              {conversation.status === 'connected' ? 'Session Active' : 'Ready to Start'}
            </p>
          </div>
        </div>

        <div className="flex gap-4 w-full">
          <button
            onClick={startSession}
            disabled={conversation.status === 'connected'}
            className="flex-1 px-6 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all shadow-lg"
          >
            {conversation.status === 'connected' ? '🎙️ Connected' : '🎤 Start Voice Session'}
          </button>

          <button
            onClick={endSession}
            disabled={conversation.status !== 'connected'}
            className="px-6 py-4 bg-red-600 text-white rounded-xl font-bold text-lg hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all shadow-lg"
          >
            🛑
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceController;
