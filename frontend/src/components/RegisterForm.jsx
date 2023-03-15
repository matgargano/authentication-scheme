import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import { TOKEN_NAME } from '../utils/constants';


const RegisterForm = () => {
  const [username, setUsername] = useState('mat');
  const [email, setEmail] = useState('mat@statenweb.com');
  const [password, setPassword] = useState('abcd1234');
  const navigate = useNavigate();
  const {response, error, isLoading, fetchData:registerUser} = useAxios('http://localhost:3000/api/auth/register');



  const handleSubmit = async (event) => {
    event.preventDefault();
      
      const result = await registerUser({method: 'POST', data: {username, email, password}});
      console.log('a', result, TOKEN_NAME);
      localStorage.setItem(TOKEN_NAME, JSON.stringify(result));
      // Handle the successful login result here (e.g., save token, navigate to a protected route)
      navigate('/welcome');
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
      </div>
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
        {isLoading ? 'Loading...' : 'Register'}
      </button>
    </form>
  );
};

export default RegisterForm;