import React, { useState, useEffect, useRef } from 'react';
import { supabase } from './supabaseClient';
import * as Sentry from '@sentry/browser';
import Message from './components/Message';
import InputForm from './components/InputForm';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    try {
      setLoading(true);
      const userMessage = { content: input, role: 'user' };
      setMessages(prev => [...prev, userMessage]);

      // Mock API call - replace with actual API implementation
      const assistantMessage = {
        content: "This is a mock response. Implement the API to get real answers.",
        role: 'assistant',
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setInput('');
    } catch (error) {
      Sentry.captureException(error);
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        content: "Sorry, I'm having trouble connecting. Please try again.",
        role: 'error'
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <header className="p-4 bg-black/50 border-b border-blue-400/20">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            Tech Titans
          </h1>
          <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400 hover:text-cyan-400 transition-colors">
            Made on ZAPT
          </a>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message, index) => (
            <Message key={index} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <InputForm
        input={input}
        loading={loading}
        handleSubmit={handleSubmit}
        setInput={setInput}
      />
    </div>
  );
};

export default function App() {
  return <ChatInterface />;
}