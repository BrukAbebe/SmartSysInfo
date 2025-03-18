import ReactMarkdown from 'react-markdown';

export default function ResponseDisplay({ message, loading, error }) {
  if (loading) return null;
  if (error) {
    return (
      <div className="flex justify-start">
        <div className="bg-red-100 text-red-700 p-3 rounded-lg max-w-xs md:max-w-md">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  const { type, content } = message;

  if (type === 'user') {
    return (
      <div className="flex justify-end">
        <div className="bg-gray-200 text-gray-800 p-3 rounded-lg max-w-xs md:max-w-md shadow-sm">
          <p>{content.text}</p>
          <p className="text-xs text-gray-800 mt-1">
            {new Date(content.timestamp).toLocaleTimeString()}
          </p>
        </div>
      </div>
    );
  }

  if (type === 'system') {
    const { data, query, timestamp } = content;
    const { organizedResponse } = data;

    // Check for a custom message from the backend
    if (data.message || !organizedResponse || organizedResponse.includes('No valid intent')) {
      return (
        <div className="flex justify-start">
          <div className="bg-gray-200 text-gray-800 p-3 rounded-lg max-w-xs md:max-w-md shadow-sm">
            <p className="font-semibold">System:</p>
            <p>{data.message || (query === 'hello' ? 'Hello! How can I assist you?' : 'Sorry, I didn’t understand that. Try asking about PC-related topics like cpu, memory, disk, network, etc.')}</p>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(timestamp).toLocaleTimeString()}
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex justify-start">
        <div className="bg-gray-200 text-gray-800 p-3 rounded-lg max-w-xs md:max-w-md shadow-sm">
          <p className="font-semibold">System Response:</p>
          <div className="prose prose-sm text-gray-700 mt-1">
            <ReactMarkdown>{organizedResponse}</ReactMarkdown>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {new Date(timestamp).toLocaleTimeString()}
          </p>
        </div>
      </div>
    );
  }

  return null;
}