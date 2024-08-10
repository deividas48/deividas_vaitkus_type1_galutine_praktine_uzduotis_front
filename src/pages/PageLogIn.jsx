// src/pages/PageLogIn.jsx

import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // +#afterLogInSubmitToPreviosPage

import { AuthContext } from '../components/context/authContext'; // #loginFoundation

export default function PageLogIn() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/login',
        { email, password }, // { email, password } is used to send (to back-end) these variables
        // as part of the HTTP POST request's body when trying to log
        // in = { email: email, password: password }
      );
      login(response.data.token);
      navigate(-1); // #afterLogInSubmitToPreviosPage
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div>
      <h1>Log In Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
