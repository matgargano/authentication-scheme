import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getAuthHeaders from '../utils/getAuthHeaders';
import validateStatus from '../utils/validateStatus';

function useRequireAuth() {
  const navigate = useNavigate();

  useEffect(() => {
    
    async function checkAuth() {
      const {data} = await axios.get('http://localhost:3000/api/auth/me', 
      {validateStatus:validateStatus(),
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json',
        },}
      );
      
      debugger;
      if (!data.isAuthenticated) {
        navigate('/login');
      }
    }

    checkAuth();
  }, [navigate]);

  return null;
}

export default useRequireAuth;