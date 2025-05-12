import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Image from './assets/rg.avif';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      setSuccessMessage('Iyandikisha yakozwe neza! Urahita woherezwa kuri dashboard...');
      setTimeout(() => navigate('/Login'), 1500); 
    } else {
      setErrorMessage(data.error || 'Iyandikisha yanze. Ongera ugerageze.');
    }
  };

  return (
   <div 
      className="flex items-center justify-center min-h-screen bg-cover"
      style={{ backgroundImage: `url(${Image})` }}
    >
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <p></p>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-600">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border border-gray-300 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

          <button
            type="submit"
            className="w-full bg-gray-400 text-white py-2 px-4 rounded hover:bg-pink-300 transition duration-200"
          >
            Register
          </button>

          {/* Link to Login */}
          <p className="text-sm text-center text-gray-600 mt-4">
            Ufite konti?{' '}
            <Link to="/" className="text-blue-500 hover:underline">
              Injira hano
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
