import React from 'react';

const Message = ({ message }) => {
  return (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-3xl p-4 rounded-lg ${
        message.role === 'user' 
          ? 'bg-blue-600/30 border border-blue-400/20' 
          : message.role === 'error'
            ? 'bg-red-600/30 border border-red-400/20'
            : 'bg-gray-800/60 border border-gray-600/20'
      }`}>
        <p className="text-gray-100">{message.content}</p>
      </div>
    </div>
  );
};

export default Message;