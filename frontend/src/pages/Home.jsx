import { useState, useEffect } from 'react';
import QueryForm from '../components/QueryForm';
import ResponseDisplay from '../components/ResponseDisplay';
import { useSystemQuery } from '../hooks/useSystemQuery';

export default function Home() {
  const { loading, error, data, submitQuery, currentQuery } = useSystemQuery();
  const [messages, setMessages] = useState([]);

  const handleQuerySubmit = (query) => {
    console.log('Submitting query:', query, 'Time:', new Date().toLocaleTimeString());
    setMessages((prev) => [
      ...prev,
      { type: 'user', content: { text: query, timestamp: new Date() } },
    ]);
    submitQuery(query);
  };

  useEffect(() => {
    if (data && messages.length > 0 && messages[messages.length - 1].type === 'user' && messages[messages.length - 1].content.text === currentQuery) {
      setMessages((prev) => [
        ...prev,
        { type: 'system', content: { data, query: currentQuery, timestamp: new Date() } },
      ]);
    }
  }, [data, currentQuery, messages]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-indigo-700 text-white p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-center md:text-4xl">
          Smart System Info
        </h1>
      </header>
      <div className="bg-teal-50 p-4 border-b border-teal-200">
        <p className="text-sm text-center text-teal-800 max-w-2xl mx-auto">
          Gain real-time insights into your system’s performance with an advanced monitoring tool designed for efficiency and ease of use.
        </p>
      </div>
      <main className="flex-1 overflow-y-auto p-6 space-y-6 max-w-4xl mx-auto w-full">
        {messages.length === 0 && !loading && !error && (
          <p className="text-center text-gray-600 text-lg">
            Begin exploring your system—ask about CPU, memory, network, or user activity.
          </p>
        )}
        {messages.map((msg, index) => (
          <ResponseDisplay
            key={index}
            message={msg}
            loading={loading && index === messages.length - 1 && msg.type === 'user'}
            error={error && index === messages.length - 1 && msg.type === 'user'}
          />
        ))}
        {loading && messages.length > 0 && messages[messages.length - 1].type === 'user' && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-700 p-4 rounded-lg max-w-xs shadow-sm">
              <p className="text-sm">Processing your request...</p>
            </div>
          </div>
        )}
      </main>
      <footer className="bg-white p-6 border-t border-gray-200 sticky bottom-0 max-w-4xl mx-auto w-full shadow-md">
        <QueryForm onSubmit={handleQuerySubmit} loading={loading} />
      </footer>
    </div>
  );
}