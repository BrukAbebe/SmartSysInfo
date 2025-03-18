import { useState } from 'react';

export default function QueryForm({ onSubmit, loading }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !loading) { 
      onSubmit(query);
      setQuery('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        className="flex-1 appearance-none bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
        type="text"
        placeholder="Ask about your system..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={loading}
      />
      <button
        className={`bg-teal-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors ${
          loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-teal-600'
        }`}
        type="submit"
        disabled={loading} 
      >
        {loading ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
}