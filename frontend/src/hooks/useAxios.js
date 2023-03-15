import { useState, useEffect } from 'react';
import axios from 'axios';
import { TOKEN_NAME } from '../utils/constants';

function useAxios(url, ) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (options = {}) => {
    const token = localStorage.getItem(TOKEN_NAME);
    const headers = {
      ...options.headers,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    setIsLoading(true);

    try {
      const res = await axios(url, { ...options, headers: headers });
      const data = res.data;

      if (![200,201].includes(res.status)) {
        setError(data);
        return;
      }

      setResponse(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  

  return { response, error, isLoading, fetchData };
}

export default useAxios;