import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import './App.css';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import WelcomePage from './components/WelcomePage';
import PrivateRoute from './RouteHelpers/PrivateRoute';
import { TOKEN_NAME } from './utils/constants';

function App({ authenticated }) {
  const [userData,] = useState(() => {
    return localStorage.getItem(TOKEN_NAME);
  })

  return (
    <div className="App">
      <p>
        <Link to="/register">Register</Link> | <Link to="/login">Login</Link>{' '}
      </p>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/welcome"
          element={<WelcomePage />} authenticated={authenticated} />
        
      </Routes>

      <pre>{JSON.stringify(userData, 0, 1)}</pre>
    </div>
  );
}

export default App;