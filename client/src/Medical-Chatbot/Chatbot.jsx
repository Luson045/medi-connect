import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Send, X, Bot, MessageCircle } from 'lucide-react';
import { mode } from '../store/atom';
import { useRecoilValue } from 'recoil';

const Chatbot = ({isOpen, setIsOpen}) => {
  const [messages, setMessages] = useState([
    { type: 'incoming', text: 'Hi there\nHow can I help you today?' },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [apiUrl, setApiUrl] = useState('');
  const chatboxRef = useRef(null);
  const textareaRef = useRef(null);
  const dark = useRecoilValue(mode); // Access the dark mode state
  const about_message =
    'At Med-Space, we envision a world where accessing outpatient care is as simple as a few clicks. By leveraging technology and innovation, we aim to provide a platform that bridges the gap between patients and healthcare providers, making high-quality care accessible to everyone, anywhere. Founder of Med-space is Luson Basumatary.';
  const loadConfig = useCallback(async () => {
    try {
      setApiKey('AIzaSyCfkCLUWHRRDB2OZeY9ro5y8pMcDtnCNCo'); //add your api key
      setApiUrl(
        `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
      );
    } catch (error) {
      console.error('Error loading config:', error);
    }
  }, [apiKey]);

  useEffect(() => {
    loadConfig();
  }, [loadConfig]);

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  const generateResponse = async (message) => {
    if (!apiKey) return;

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: message + about_message }],
          },
        ],
      }),
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error.message);
      return data.candidates[0].content.parts[0].text.replace(
        /\*\*(.*?)\*\*/g,
        '$1',
      );
    } catch (error) {
      console.error('Error generating response:', error);
      return 'Sorry, I encountered an error. Please try again later.';
    }
  };

  const handleChat = async () => {
    if (!inputMessage.trim()) return;

    const newMessages = [
      ...messages,
      { type: 'outgoing', text: inputMessage },
      { type: 'incoming', text: 'Thinking...' },
    ];
    setMessages(newMessages);
    setInputMessage('');

    const response = await generateResponse(inputMessage);
    newMessages[newMessages.length - 1].text = response;
    setMessages([...newMessages]);
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'inherit';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && window.innerWidth > 800) {
      e.preventDefault();
      handleChat();
    }
  };

  return (
    <div className="relative z-50">
      <div className={`absolute bottom-[110%] right-0 ${isOpen ? "scale-100" : "scale-0"} origin-bottom-right duration-300 z-10 w-80 md:w-96 ${dark === "dark" ? "bg-[#141B2A]/50 backdrop-blur-[9px]" : "bg-white"}  rounded-lg shadow-xl max-h-[60vh] flex flex-col`}>
        <div className="flex justify-between items-center p-4 bg-blue-500 text-white rounded-t-lg">
          <h2 className="text-xl font-bold">Chatbot</h2>
          <button onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div ref={chatboxRef} className="flex-grow overflow-y-auto p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === 'outgoing' ? 'justify-end' : 'items-start'
                } mb-4 `}
            >
              {message.type === 'incoming' && (
                <Bot size={24} className="mr-2 text-blue-500 flex-shrink-0" />
              )}
              <div
                className={`p-3 rounded-lg ${message.type === 'outgoing'
                  ? 'bg-blue-500 text-white'
                  : `${dark === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-gray-200 text-gray-800'}`
                  } max-w-[80%]`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        <div className={`p-4 border-t ${dark === "dark" ? "border-t-gray-700" : ""}`}>
          <div className="flex items-center gap-2">
            <textarea
              ref={textareaRef}
              value={inputMessage}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter a message..."
              className={`flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2  focus:ring-blue-500 max-h-12 ${dark === "dark" ? "bg-gray-800 text-gray-200" : "text-gray-800"} overflow-hidden`}
              rows={1}
            />
            <button
              onClick={handleChat}
              className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 transition-colors"
            >
              <Send size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
