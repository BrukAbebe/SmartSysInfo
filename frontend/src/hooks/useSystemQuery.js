import { useState } from 'react';
import { sendSystemQuery } from '../services/api';

export const useSystemQuery = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [currentQuery, setCurrentQuery] = useState(null); 

  const submitQuery = async (query) => {
    setLoading(true);
    setError(null);
    setData(null); 
    setCurrentQuery(query);
    try {
      const result = await sendSystemQuery(query);
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, submitQuery, currentQuery };
};