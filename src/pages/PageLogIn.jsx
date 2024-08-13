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
    <main className="items-center min-h-screen bg-white mt-4 mb-4 p-4 rounded-lg">
      <h2 className="titleOfForm">Log In</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col py-4 w-full form_register pt-4"
      >
        <div className="pairs mb-4">
          <label className="pairs_label_full pairs_label_full_register">
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="pairs_input_full input_register"
          />
        </div>
        <div className="pairs mb-4">
          <label className="pairs_label_full pairs_label_full_register">
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="pairs_input_full input_register"
          />
        </div>
        {error && (
          <p style={{ color: 'red' }}>
            <div className="pairs mb-4">
              <div className="pairs_label_full pairs_label_full_register" />
              <div className="pairs_input_full input_register fakeInputRemoveStyle justify-start">
                {error}
              </div>
            </div>
          </p>
        )}
        <div className="pairs mb-4">
          <div className="pairs_label_full pairs_label_full_register" />
          <div className="pairs_input_full input_register fakeInputRemoveStyle justify-end">
            <button type="submit">
              <div className="bg-custom-primary-color text-white rounded-md py-2 px-4 transition-all duration-300 ease-in-out hover:bg-custom-color-secondary">
                Log In
              </div>
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
