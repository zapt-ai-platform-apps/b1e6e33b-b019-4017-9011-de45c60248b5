import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient';
import * as Sentry from '@sentry/browser';
import Message from './Message';
import InputForm from './InputForm';
import Header from './Header';

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

      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({ input }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const { content, timestamp } = await response.json();
      
      setMessages(prev => [...prev, {
        content,
        role: 'assistant',
        timestamp
      }]);
      setInput('');
    } catch (error) {
      Sentry.captureException(error);
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        content: error.message || "Sorry, I'm having trouble connecting. Please try again.",
        role: 'error'
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <Header />
      
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

export default ChatInterface;