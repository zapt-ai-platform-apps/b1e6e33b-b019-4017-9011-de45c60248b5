import React from 'react';

const InputForm = ({ input, loading, handleSubmit, setInput }) => {
  return (
    <form onSubmit={handleSubmit} className="p-4 bg-black/50 border-t border-blue-400/20">
      <div className="max-w-4xl mx-auto flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          className="flex-1 p-4 rounded-lg bg-gray-800/60 border border-gray-600/20 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 box-border"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-4 rounded-lg font-medium transition-all ${
            loading
              ? 'bg-gray-600/30 cursor-not-allowed'
              : 'bg-blue-600/30 hover:bg-blue-500/40 cursor-pointer'
          } text-blue-100 border border-blue-400/20`}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </form>
  );
};

export default InputForm;