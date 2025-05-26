import React, { useEffect, useState, useRef, memo } from 'react';
import { MicIcon, SendIcon, Loader2Icon, XIcon, PaletteIcon, LayoutGridIcon, LayersIcon, SaveIcon, UndoIcon, RedoIcon, SettingsIcon, SearchIcon, SlidersIcon, ImageIcon, PaperclipIcon, CameraIcon } from 'lucide-react';
type Message = {
  type: 'user' | 'bot';
  content: string;
  timestamp: number;
};
interface VoiceCommandSuggestion {
  command: string;
  description: string;
}
export function Chat() {
  const [messages, setMessages] = useState<Message[]>([{
    type: 'bot',
    content: "Hello! I'm an AI assistant that can help you with a variety of tasks. Feel free to ask me anything - from answering questions and explaining concepts to helping you analyze information or generate ideas.",
    timestamp: Date.now()
  }]);
  const [isRecording, setIsRecording] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isProcessingVoice, setIsProcessingVoice] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showLanguageSelect, setShowLanguageSelect] = useState(false);
  const [voiceVolume, setVoiceVolume] = useState(0);
  const [showCustomization, setShowCustomization] = useState(false);
  const [selectedPattern, setSelectedPattern] = useState('grid');
  const [colorScheme, setColorScheme] = useState('#6366F1');
  const patternTypes = [{
    id: 'grid',
    label: 'Grid Pattern',
    icon: LayoutGridIcon
  }, {
    id: 'dots',
    label: 'Dot Pattern',
    icon: LayersIcon
  }, {
    id: 'lines',
    label: 'Line Pattern',
    icon: LayersIcon
  }];
  const voiceCommandSuggestions: VoiceCommandSuggestion[] = [{
    command: 'Create a pattern',
    description: 'Generate a new design pattern'
  }, {
    command: 'Customize colors',
    description: 'Modify pattern colors'
  }, {
    command: 'Adjust layout',
    description: 'Change pattern layout'
  }, {
    command: 'Save pattern',
    description: 'Save current design'
  }];
  const supportedLanguages = [{
    code: 'en',
    name: 'English'
  }, {
    code: 'es',
    name: 'Spanish'
  }, {
    code: 'fr',
    name: 'French'
  }, {
    code: 'de',
    name: 'German'
  }, {
    code: 'zh',
    name: 'Chinese'
  }];
  // Enhanced bot responses
  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    // General knowledge responses
    if (input.includes('explain') || input.includes('what is') || input.includes('how does')) {
      return "I'll help you understand this topic. To provide the most accurate explanation, could you specify:\n\n1. What specific aspects you'd like to learn about\n2. Your current level of understanding\n3. Any particular context you're interested in";
    }
    // Help with tasks
    if (input.includes('help') || input.includes('assist') || input.includes('can you')) {
      return "I'd be happy to help you with that. To better assist you, could you:\n\n1. Describe the specific outcome you're looking for\n2. Provide any relevant details or constraints\n3. Let me know if you have any preferences for how we approach this";
    }
    // Analysis requests
    if (input.includes('analyze') || input.includes('evaluate') || input.includes('compare')) {
      return "I can help you analyze this. Let's break it down systematically:\n\n1. What are the key elements you want to examine?\n2. Are there specific criteria you want to focus on?\n3. Would you like a detailed analysis or a high-level overview?";
    }
    // Creative requests
    if (input.includes('create') || input.includes('generate') || input.includes('write')) {
      return 'I can help you create something. To get started:\n\n1. What style or tone are you looking for?\n2. Are there any specific elements you want to include?\n3. Do you have any examples that could guide the direction?';
    }
    // Default response for greetings
    if (input.includes('hello') || input.includes('hi ')) {
      return 'Hello! How can I assist you today? I can help with:\n\n1. Answering questions\n2. Explaining concepts\n3. Analyzing information\n4. Generating ideas';
    }
    // Default response for unrecognized inputs
    return "I understand you're interested in this topic. To help you better, could you:\n\n1. Clarify your specific question or goal\n2. Provide any relevant context\n3. Let me know what type of response would be most helpful";
  };
  const handleQuickReply = (reply: string) => {
    // Add user's quick reply to messages
    const userMessage: Message = {
      type: 'user',
      content: reply,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, userMessage]);
    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        type: 'bot',
        content: getBotResponse(reply),
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle file upload
      handleQuickReply(`Uploaded file: ${file.name}`);
    }
  };
  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true
      });
      // Handle camera capture
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      console.error('Camera access denied:', error);
    }
  };
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [messages]);
  const handleSend = () => {
    if (inputValue.trim()) {
      const userMessage: Message = {
        type: 'user',
        content: inputValue,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, userMessage]);
      setInputValue('');
      // Simulate typing delay and response
      setTimeout(() => {
        const botMessage: Message = {
          type: 'bot',
          content: getBotResponse(userMessage.content),
          timestamp: Date.now()
        };
        setMessages(prev => [...prev, botMessage]);
      }, 1000);
    }
  };
  const handleVoiceChat = () => {
    if (isRecording) {
      setIsRecording(false);
      setIsProcessingVoice(true);
      // Simulate voice processing
      setTimeout(() => {
        setIsProcessingVoice(false);
        const voiceMessage: Message = {
          type: 'user',
          content: 'Can you explain how memory works?',
          timestamp: Date.now()
        };
        setMessages(prev => [...prev, voiceMessage]);
        // Bot response to voice message
        setTimeout(() => {
          const botMessage: Message = {
            type: 'bot',
            content: getBotResponse(voiceMessage.content),
            timestamp: Date.now()
          };
          setMessages(prev => [...prev, botMessage]);
        }, 1000);
      }, 2000);
    } else {
      setIsRecording(true);
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  useEffect(() => {
    let volumeInterval: NodeJS.Timeout;
    if (isRecording) {
      volumeInterval = setInterval(() => {
        setVoiceVolume(Math.random());
      }, 100);
    }
    return () => clearInterval(volumeInterval);
  }, [isRecording]);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState('');
  return <main className="fixed inset-0 flex flex-col bg-gradient-to-br from-[#0A0B1A] to-[#151A33]">
      <header className="flex-shrink-0 flex items-center justify-between px-4 py-3 bg-[#0A0B1A]/50 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
            <span className="text-white text-sm font-medium">AI</span>
          </div>
          <span className="text-white text-sm font-medium">AI Assistant</span>
        </div>
      </header>
      {/* Chat Messages Area - Fixed height with overflow */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            {message.type === 'bot' && <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center mr-2 flex-shrink-0">
                <span className="text-white text-sm font-medium">AI</span>
              </div>}
            <div className={`
              max-w-[80%] rounded-2xl px-4 py-3 
              ${message.type === 'user' ? 'bg-purple-600 text-white rounded-br-none' : 'bg-[#1C1F2E] text-white rounded-bl-none'}
            `}>
              <p className="text-[15px] leading-relaxed whitespace-pre-wrap">
                {message.content}
              </p>
              <div className="mt-1 text-xs opacity-60">
                {new Date(message.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })}
              </div>
            </div>
            {message.type === 'user' && <div className="w-8 h-8 rounded-full bg-purple-600/20 flex items-center justify-center ml-2 flex-shrink-0">
                <span className="text-purple-400 text-sm font-medium">You</span>
              </div>}
          </div>)}
        {/* Voice Recording UI */}
        {(isRecording || isProcessingVoice) && <div className="flex items-center justify-center my-4 bg-[#1C1F2E] rounded-full p-2">
            <div className="flex items-center space-x-3">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-purple-500 rounded-full opacity-25 animate-ping"></div>
                <div className="relative w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  {isRecording ? <div className="flex space-x-1">
                      {[...Array(3)].map((_, i) => <div key={i} className="w-1 h-3 bg-white rounded-full animate-pulse" style={{
                  animationDelay: `${i * 0.15}s`
                }} />)}
                    </div> : <Loader2Icon className="w-4 h-4 text-white animate-spin" />}
                </div>
              </div>
              <span className="text-gray-400 text-sm">
                {isRecording ? 'Listening...' : 'Processing...'}
              </span>
              {isRecording && <button onClick={() => setIsRecording(false)} className="text-sm text-purple-400 hover:text-purple-300">
                  Cancel
                </button>}
            </div>
          </div>}
        <div ref={chatEndRef} />
      </div>
      {/* Quick Actions Panel - Fixed at bottom */}
      {showQuickActions && <div className="flex-shrink-0 p-4 bg-[#1C1F2E] border-t border-gray-800">
          <div className="space-y-4">
            {/* Topic Selection with File Actions */}
            <div className="flex items-center space-x-2">
              <select value={selectedTopic} onChange={e => setSelectedTopic(e.target.value)} className="flex-1 px-3 py-2 bg-[#2C2F3E] text-white rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500">
                <option value="">Select a topic</option>
                <option value="math">Mathematics</option>
                <option value="science">Science</option>
                <option value="history">History</option>
                <option value="language">Language</option>
              </select>
              <label className="p-2 text-gray-400 hover:text-white cursor-pointer">
                <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*,.pdf,.doc,.docx" />
                <PaperclipIcon className="w-5 h-5" />
              </label>
              <button onClick={handleCameraCapture} className="p-2 text-gray-400 hover:text-white">
                <CameraIcon className="w-5 h-5" />
              </button>
              <button onClick={() => setShowQuickActions(false)} className="p-2 text-gray-400 hover:text-white">
                
              </button>
            </div>
            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600/10 text-purple-400 rounded-lg hover:bg-purple-600/20 transition-colors" onClick={() => handleQuickReply('Explain this topic')}>
                <SearchIcon className="w-4 h-4" />
                <span>Explain Topic</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600/10 text-blue-400 rounded-lg hover:bg-blue-600/20 transition-colors" onClick={() => handleQuickReply('Give me practice questions')}>
                <div className="w-4 h-4" />
                <span>Practice</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-green-600/10 text-green-400 rounded-lg hover:bg-green-600/20 transition-colors" onClick={() => handleQuickReply('Show me examples')}>
                <ImageIcon className="w-4 h-4" />
                <span>Examples</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-amber-600/10 text-amber-400 rounded-lg hover:bg-amber-600/20 transition-colors" onClick={() => handleQuickReply('Quiz me on this topic')}>
                <PaletteIcon className="w-4 h-4" />
                <span>Quiz Me</span>
              </button>
            </div>
            {/* Custom Input Field */}
            <div className="relative">
              <input type="text" placeholder="Enter specific question or topic..." className="w-full px-4 py-2 bg-[#2C2F3E] text-white rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500" onKeyPress={e => e.key === 'Enter' && handleQuickReply(e.currentTarget.value)} />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-purple-600 text-white rounded-md hover:bg-purple-700" onClick={() => handleQuickReply(document.querySelector('input')?.value || '')}>
                <SendIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>}
      {/* Input Area - Fixed at bottom */}
      <div className="flex-shrink-0 p-4 bg-[#0A0B1A]/50 border-t border-gray-800">
        <div className="flex items-center space-x-2">
          <button onClick={handleVoiceChat} className={`p-3 rounded-full transition-all flex-shrink-0
              ${isRecording ? 'bg-purple-600 text-white' : 'bg-[#1C1F2E] text-gray-400 hover:text-white hover:bg-[#2C2F3E]'}`} aria-label={isRecording ? 'Stop recording' : 'Start voice recording'}>
            <MicIcon className="w-5 h-5" />
          </button>
          <div className="flex-1 bg-[#1C1F2E] rounded-full flex items-center min-w-0">
            {/* File and Camera buttons */}
            <div className="flex-shrink-0 flex items-center px-2 space-x-1">
              <label className="p-2 text-gray-400 hover:text-white cursor-pointer">
                <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*,.pdf,.doc,.docx" />
                <PaperclipIcon className="w-5 h-5" />
              </label>
              <button onClick={handleCameraCapture} className="p-2 text-gray-400 hover:text-white">
                <CameraIcon className="w-5 h-5" />
              </button>
            </div>
            {/* Input field */}
            <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyPress={handleKeyPress} placeholder="Type your message..." className="flex-1 min-w-0 px-2 py-2 bg-transparent text-white focus:outline-none placeholder-gray-500" />
            {/* Send button */}
            {inputValue && <div className="flex-shrink-0">
                <button onClick={handleSend} className="p-2 m-1 bg-purple-600 rounded-full text-white hover:bg-purple-700 transition-colors" aria-label="Send message">
                  <SendIcon className="w-4 h-4" />
                </button>
              </div>}
          </div>
        </div>
      </div>
    </main>;
}