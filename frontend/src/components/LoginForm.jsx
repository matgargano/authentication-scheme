import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import { TOKEN_NAME } from '../utils/constants';

const LoginForm = () => {
  const [email, setEmail] = useState('mat@statenweb.com');
  const [password, setPassword] = useState('abcd1234');
  const {response, error, isLoading, fetchData:loginUser} = useAxios('http://localhost:3000/api/auth/login');
  const navigate = useNavigate();

  useEffect(() => {
    if(!!response){
      const { token } = response;
      localStorage.setItem(TOKEN_NAME, token);
      navigate('/welcome')
    }
  }, [response])

  const handleSubmit = async (event) => {
    event.preventDefault();
    loginUser({method: 'POST', data: {email,password}});
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm;