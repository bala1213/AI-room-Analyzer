
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Chat } from '@google/genai';
import { createChat } from '../services/geminiService';
import { Message, Sender } from '../types';
import { LoadingSpinner, SendIcon, SparklesIcon } from './ui';

const Chatbot: React.FC = () => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([
      {
        text: "Hello! Ask me anything about home organization, decluttering, or interior design.",
        sender: Sender.Bot,
      }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize the chat session when the component mounts
    setChat(createChat());
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    if (!currentMessage.trim() || isLoading || !chat) return;

    const userMessage: Message = { text: currentMessage, sender: Sender.User };
    setMessages((prev) => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    try {
      const response = await chat.sendMessage({ message: userMessage.text });
      const botMessage: Message = { text: response.text, sender: Sender.Bot };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        text: "Sorry, I encountered an error. Please try again.",
        sender: Sender.Error,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [currentMessage, isLoading, chat]);

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] max-w-3xl mx-auto bg-gray-800/50 border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
      <div className="flex-grow p-6 overflow-y-auto">
        <div className="flex flex-col gap-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-end gap-2 ${
                msg.sender === Sender.User ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === Sender.Bot && <SparklesIcon className="h-6 w-6 text-blue-400 mb-1 flex-shrink-0" />}
              <div
                className={`max-w-md lg:max-w-lg px-4 py-3 rounded-2xl ${
                  msg.sender === Sender.User
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : msg.sender === Sender.Bot
                    ? 'bg-gray-700 text-gray-200 rounded-bl-none'
                    : 'bg-red-900/80 text-red-200 rounded-bl-none border border-red-700'
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
             <div className="flex items-end gap-2 justify-start">
              <SparklesIcon className="h-6 w-6 text-blue-400 mb-1" />
              <div className="max-w-md lg:max-w-lg px-4 py-3 rounded-2xl bg-gray-700 text-gray-200 rounded-bl-none">
                <LoadingSpinner />
              </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="p-4 bg-gray-800 border-t border-gray-700">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <input
            type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            placeholder="Ask for organization tips..."
            className="flex-grow bg-gray-900 border border-gray-600 rounded-full py-2.5 px-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!currentMessage.trim() || isLoading}
            className="bg-blue-600 text-white rounded-full p-2.5 transition-colors hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <SendIcon className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
